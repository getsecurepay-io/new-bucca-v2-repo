from django.db.models.functions import Coalesce
from django.utils import encoding
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import serializers, filters
from rest_framework.decorators import permission_classes, action
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.models import Group
from django.core.mail import send_mail, EmailMessage
from rest_framework import status
from rest_framework.generics import get_object_or_404, UpdateAPIView 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.serializers import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum, Q, F, Count

from django.template.loader import render_to_string
from django.conf import settings
from uritemplate import partial

from .filters import VendorReviewRatingFilter
from .models import Company, Device, User, Vendor, Department, StaffLevel, SIDAdmin, Payment_keys, VendorReviewRating
from transaction.models import MealTransaction
from .schemas import LoginSchema, ResetPasswordEmailSchema, ConfirmPasswordLinkSchema, ResetPasswordSchema, UpdatePasswordSchema, ChangeCompanyIdSchema, CompanyRefCodeSchema, ConfirmResetTokenSchema
from .serializers import AdminResetPasswordSerializer, ChangeUserStatusSerializer, CompanySerializer, SIDSerializer, \
    BulkEmployeeSerializer, UserBalanceSerializer, VendorSerializer, CompanyAdminSerializer, GroupSerializer, \
    LoginSerializer, \
    EmailSerializer, ChangePasswordSerializer, ResetPasswordSerializer, ChangeCompanyIdSerializer, \
    ChangeCompanyRefSerializer, DepartmentSerializer, \
    TreasurySerializer, StaffLevelSerializer, DeviceSerializer, ConfirmResetTokenSerializer, VendorStaffSerializer, \
    SIDAdminSerializer, \
    StaffUpdateUserSerializer, AdminUpdateUserSerializer, GetUserAppCodeSerializer, GetUserTokenFromAppCodeSerializer, \
    EmployeeSerializer, \
    PaymentKeySerializer, UpdateDeviceSerializer, GetDeviceStatusSerializer, VendorReviewRatingSerializer

from .permissions import IsCompanyAdminOrIsCompanyActOrIsVendorOrIsStaff, IsCompanyAdminOrIsSIDOrIsCompanyAct, IsCompanyAdminOrIsSIDOrIsVendorOrIsStaff, IsEmployee, IsSIDPermission, IsCompanyAdmin, IsSIDorCompAdm, ReadOnly, IsVendor

from .helpers import create_transfer_recipient, get_company
from .token import default_token_generator
from .utils import CustomPagination, EmailThread, get_random_string, generateKey, app_id_error
from .schemas import LoginSchema
from django.utils.encoding import force_bytes, force_text
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.http import Http404
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from datetime import date, time, datetime, timedelta
from decouple import config
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

import coreapi
import base64
import pyotp
import rsa
import json

domain = config('domain')

class CompanyViewSet(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    # permission_classes = [IsSIDPermission]
    permission_classes=[IsSIDPermission | ReadOnly]
    pagination_class = CustomPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            company=serializer.save()
            return Response(CompanySerializer(company).data, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message.append(f'{field_name} already exist')
                else:
                    error_message.append(f'{field_name} is {field_errors[0].code}')
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                }, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk):
        serializer = self.get_serializer(data=request.data, partial=True)
        if serializer.is_valid():
            try:
                instance = Company.objects.get(pk=pk)
                account_number = serializer.validated_data.get('account_number', None)
                bank_code = serializer.validated_data.get('bank_code', None)
                user_name = serializer.validated_data.get('name', instance.name)
                if account_number is not None or bank_code is not None:
                    if instance.account_number != account_number or instance.bank_code != bank_code:
                        result = create_transfer_recipient(account_number, bank_code, user_name, instance)
                        if result is not None:
                            instance.transfer_recipient = result
                        else:
                            # raise serializers.ValidationError({'error':'Unable to create transfer recipient for company'})
                            return Response({
                                'code': 400,
                                'message': 'Unable to create transfer recipient for company'
                            }, status=status.HTTP_400_BAD_REQUEST)
                if instance.sid_transfer_recipient is None:
                    sid = SIDAdmin.objects.get(name='sid')
                    sid_account_number = sid.account_number
                    sid_bank_code = sid.bank_code
                    sid_user_name = f'sid_{user_name}'
                    sid_result = create_transfer_recipient(sid_account_number, sid_bank_code, sid_user_name, instance)
                    if sid_result is not None:
                        instance.sid_transfer_recipient = sid_result
                    else:
                        # raise serializers.ValidationError({'error':'Unable to create transfer recipient for sid'})
                        return Response({
                            'code': 400,
                            'message': 'Unable to create transfer recipient for sid'
                        }, status=status.HTTP_400_BAD_REQUEST)
                instance = serializer.update(instance, serializer.validated_data)
                return Response({
                    'code': 200,
                    'message': 'Company updated successfully',
                    'data': CompanySerializer(instance).data
                }, status=status.HTTP_200_OK)
            except Company.DoesNotExist:
                return Response({
                    'code': 404,
                    'message': 'Company does not exist'
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message.append(f'{field_name} already exist')
                else:
                    error_message.append(f'{field_name} is {field_errors[0].code}')
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class DepartmentViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all department
    
    create:
    Create a new department

    retrieve:
    Return the department with the given id

    update:
    Update (full) department info with the given id

    partial_update:
    Update (partial) department info with the given id

    delete:
    Delete department with the given id
    """
    permission_classes=[IsSIDorCompAdm]
    serializer_class = DepartmentSerializer
    pagination_class = CustomPagination   
    def get_queryset(self):
        request = self.request
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                departments = Department.objects.filter(company=company.id).order_by('-id')
                return departments
            raise ValidationError(app_id_error)  
        else:
            departments = Department.objects.all()
            company = self.request.query_params.get('company')
            if company is not None:
                departments = departments.filter(company__id=company).order_by('-id')
            return departments

    def create(self, request, *args, **kwargs):
        print(request.user.groups.first().name)
        serializer = DepartmentSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            department = serializer.save()
            return Response(DepartmentSerializer(department).data, status=status.HTTP_201_CREATED)
        else:
            print("HERE")
            default_errors = serializer.errors
            new_error = {}
            for field_name, field_errors in default_errors.items():
                new_error[field_name] = field_errors[0]
            return Response(new_error, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class DeviceViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all department
    
    create:
    Create a new department

    retrieve:
    Return the department with the given id

    update:
    Update (full) department info with the given id

    partial_update:
    Update (partial) department info with the given id

    delete:
    Delete department with the given id
    """
    permission_classes=[IsSIDorCompAdm]
    serializer_class = DeviceSerializer
    pagination_class = CustomPagination   
    def get_queryset(self):
        request = self.request
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                devices = Device.objects.filter(company=company.id)
                return devices
            raise ValidationError(app_id_error)  
        else:
            devices = Device.objects.all()
            company = self.request.query_params.get('company')
            if company is not None:
                devices = devices.filter(company__id=company)
            return devices


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class StaffLevelViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all staff level
    
    create:
    Create a new staff level

    retrieve:
    Return the staff level with the given id

    update:
    Update (full) staff level info with the given id

    partial_update:
    Update (partial) staff level info with the given id

    delete:
    Delete staff level with the given id
    """
    permission_classes=[IsSIDorCompAdm]
    serializer_class = StaffLevelSerializer
    pagination_class = CustomPagination   
    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            staff_level = StaffLevel.objects.filter(company=company.id).order_by('-id')
            return staff_level
        raise ValidationError(app_id_error)

    def get_queryset(self):
        request = self.request
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                staff_level = StaffLevel.objects.filter(company=company.id).order_by('-id')
                return staff_level
            raise ValidationError(app_id_error)  
        else:
            staff_level = StaffLevel.objects.all()
            company = self.request.query_params.get('company')
            if company is not None:
                staff_level = staff_level.filter(company__id=company)
            return staff_level


class LoginView(APIView):
    permission_classes=[AllowAny]
    authentication_classes = []
    schema = LoginSchema

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data['password']
            try:
                print(email)
                user = User.objects.get(Q(email=email)|Q(phone_number=email))
                print(user)
                if user.check_password(password):
                    if user.is_verified:
                        # data = Payment_keys.objects.filter(company=user.company.id).first()
                        # company_image = user.company.image
                        if user.groups.filter(name='emp').exists():
                            data = Payment_keys.objects.filter(company=user.company.id).first()
                            company_image = user.company.image
                            if user.department is None or user.staff_level is None:
                                return Response({
                                    'status':'failed',
                                    'message':'Kindly meet the admin to complete your registration',
                                    'resolve':'Department or Staff Level does not exist'
                                }, status=status.HTTP_401_UNAUTHORIZED)
                            elif (user.company.use_card == True and user.card_id is None) or (user.company.use_biometric == True and (user.biometrics_a is None and user.biometrics_b is None)):
                                return Response({
                                    'status':'failed',
                                    'message':'Kindly meet the admin to complete your registration',
                                    'resolve':'Identification means not present'
                                }, status=status.HTTP_401_UNAUTHORIZED)
                            else:
                                if user.is_active:
                                    login(request, user)
                                    refresh = RefreshToken.for_user(user)
                                    today_date = datetime.date(datetime.today()) # Monday is 0, Sunday is 6
                                    comp_no_of_booking_days = user.company.allowed_booking_day
                                    # week_start = today_date - timedelta(days=today_date.isoweekday() % 7) + timedelta(days=1) if today_date.weekday() < 5 else today_date - timedelta(days=today_date.isoweekday() % 7) + timedelta(days=8)
                                    current_day_monday = today_date - timedelta(days=today_date.weekday())
                                    week_start = current_day_monday if today_date.weekday() < comp_no_of_booking_days - 1 else current_day_monday + timedelta(days=7)
                                    company_image = user.company.image
                                    staff_lev_id = request.user.staff_level_id
                                    try:
                                        staff_level = get_object_or_404(StaffLevel, id=staff_lev_id)
                                    except:
                                        staff_level = None
                                    daily_limit = staff_level.daily_limit
                                    # Directly
                                    daily_limit_used = \
                                    MealTransaction.objects.filter(user_id=request.user.id, company=request.user.company_id,
                                                                delivery_date=today_date,
                                                                status__in=('pending', 'delivered', 'ticket-printed')).aggregate(
                                        TOTAL=Sum('total'))['TOTAL']
                                    print('daily_limit_used: ', (daily_limit_used if daily_limit_used != None else 0))
                                    print('current time', datetime.now().time())
                                    daily_limit_left_actual = (
                                                daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                                    daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0
                                    return Response({
                                        'user': {
                                            'id': user.id,
                                            'email': user.email,
                                            'first_name': user.first_name,
                                            'last_name': user.last_name,
                                            'role': user.groups.first().name,
                                            'staff_level': user.staff_level.name,
                                            'image': user.image.url if user.image else None,
                                            'public_key': data.public_key if data else None,
                                            'company_image':company_image.url if company_image else None,
                                            'department': user.department.name,
                                            'personal_balance': user.balance,
                                            'daily_limit': user.staff_level.daily_limit,
                                            'allow_same_day_booking': user.company.allow_same_day_delivery,
                                            'allow_mix_txn': user.company.is_comp_allow_txn_mix,
                                            'cancelling_grace_period_in_hours': user.company.cancelling_grace_period_in_hours,
                                            'no_of_booking_days': comp_no_of_booking_days,
                                            'start_booking_date': week_start,
                                            'end_booking_date': week_start + timedelta(days=(comp_no_of_booking_days - 1)),
                                            'today_daily_limit_left': daily_limit_left
                                        },
                                        'refresh': str(refresh),
                                        'access': str(refresh.access_token),
                                        'access_duration': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                                        'app_id':user.company.app_key if user.company else user.company
                                    }, status=status.HTTP_200_OK)
                                else:
                                    return Response({
                                        "code": 110,
                                        "message": "Account is deactivated",
                                        "resolve": "Please contact admin"
                                    }, status=status.HTTP_401_UNAUTHORIZED)
                        # elif user.groups.filter(name='ven').exists():
                        elif user.groups.filter(Q(name='ven') | Q(name='cmp_adm') | Q(name='cmp_act')).exists():
                            data = Payment_keys.objects.filter(company=user.company.id).first()
                            company_image = user.company.image
                            if user.is_active:
                                login(request, user)
                                refresh = RefreshToken.for_user(user)
                                print(user.groups)
                                return Response({
                                    'user': {
                                        'id': user.id,
                                        'email': user.email,
                                        'first_name': user.first_name,
                                        'last_name': user.last_name,
                                        'role': user.groups.first().name,
                                        # 'staff_level': user.staff_level.name if user.staff_level else None,
                                        'image': user.image.url if user.image else None,
                                        # 'department': user.department.name if user.department else None,
                                        'personal_balance': user.balance if user.groups.first().name == 'ven' else user.company.balance,
                                        'public_key': data.public_key if data else None,
                                        'company_image': company_image.url if company_image else None
                                        # 'daily_limit': user.staff_level.daily_limit if user.staff_level else None,
                                        # 'daily_limit_left': user.staff_level.daily_limit - user.personal_balance if user.staff_level else None
                                    },
                                    'refresh': str(refresh),
                                    'access': str(refresh.access_token),
                                    'access_duration': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                                    'app_id':user.company.app_key if user.company else user.company
                                }, status=status.HTTP_200_OK)
                            else:
                                return Response({
                                    "code": 110,
                                    "message": "Account is deactivated",
                                    "resolve": "Please contact admin"
                                }, status=status.HTTP_401_UNAUTHORIZED)
                        else:
                            if user.is_active:
                                login(request, user)
                                refresh = RefreshToken.for_user(user)
                                print(user.groups)
                                return Response({
                                    'user': {
                                        'id': user.id,
                                        'email': user.email,
                                        'first_name': user.first_name,
                                        'last_name': user.last_name,
                                        'role': user.groups.first().name,
                                        # 'staff_level': user.staff_level.name if user.staff_level else None,
                                        'image': user.image.url if user.image else None,
                                        # 'department': user.department.name if user.department else None,
                                        'personal_balance': user.balance,
                                        # 'public_key': data.public_key if data else None,
                                        # 'company_image': company_image.url if company_image else None
                                        # 'daily_limit': user.staff_level.daily_limit if user.staff_level else None,
                                        # 'daily_limit_left': user.staff_level.daily_limit - user.personal_balance if user.staff_level else None
                                    },
                                    'refresh': str(refresh),
                                    'access': str(refresh.access_token),
                                    'access_duration': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                                    'app_id':user.company.app_key if user.company else user.company
                                }, status=status.HTTP_200_OK)
                            else:
                                return Response({
                                    "code": 110,
                                    "message": "Account is deactivated",
                                    "resolve": "Please contact admin"
                                }, status=status.HTTP_401_UNAUTHORIZED)
                    else:
                        return Response({
                            'code': 406,
                            'message':'User is not verified',
                            'resolve':'Kindly reset your password'
                        }, status=status.HTTP_406_NOT_ACCEPTABLE)
                else:
                    return Response({
                        "code": 120,
                        "message": "incorect password",
                        "resolve": "The password does not match with the email"
                    }, status=status.HTTP_401_UNAUTHORIZED)
            except User.DoesNotExist:
                return Response({
                    "code": 120,
                    "message": "user does not exist",
                    "resolve": "There's no account matching this email"
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message += f'{field_name} already exist'
                else:
                    error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)



class GroupViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all group
    
    create:
    Create a new group

    retrieve:
    Return the group with the given id

    update:
    Update (full) group info with the given id

    partial_update:
    Update (partial) group info with the given id

    delete:
    Delete group with the given id
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsSIDPermission|ReadOnly]
    pagination_class = CustomPagination

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'Successful'
            }, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message += f'{field_name} already exist'
                else:
                    error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


# class SIDViewSet(ModelViewSet):
#     """
#     list:
#     Retuns a list of all sid
    
#     create:
#     Create a new sid

#     retrieve:
#     Return the sid with the given id

#     update:
#     Update (full) sid info with the given id

#     partial_update:
#     Update (partial) sid info with the given id

#     delete:
#     Delete sid with the given id
#     """
#     permission_classes=[AllowAny]
#     serializer_class = SIDSerializer  
#     pagination_class = CustomPagination 
#     def get_queryset(self):
#         return get_user_model().objects.filter(groups__name='sid')

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({
#                 'status': 'Successful',
#                 'message': 'User created successfully'
#             }, status=status.HTTP_201_CREATED)
#         else:
#             default_errors = serializer.errors
#             new_error = {}
#             for field_name, field_errors in default_errors.items():
#                 new_error[field_name] = field_errors[0]
#             return Response(new_error, status=status.HTTP_400_BAD_REQUEST)


class SIDViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all sid admin
    
    create:
    Create a new sid admin

    retrieve:
    Return the sid admin with the given id

    update:
    Update (full) sid admin info with the given id

    partial_update:
    Update (partial) sid admin info with the given id

    delete:
    Delete sid admin with the given id
    """
    # permission_classes=[IsSIDPermission | ReadOnly]
    permission_classes=[AllowAny]
    serializer_class = SIDAdminSerializer   
    pagination_class = CustomPagination
    def get_queryset(self):
        return SIDAdmin.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'Successful',
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        else:
            # default_errors = serializer.errors
            # print(default_errors)
            # error_message = ''
            # for field_name, field_errors in default_errors.items():
            #     if field_errors[0].code == 'unique':
            #         error_message += f'{field_name} already exist'
            #     else:
            #         error_message += f'{field_name} is {field_errors[0].code},'
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            # return Response({
            #     'code': 400,
            #     'message': error_message
            #     }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )

class TreasuryViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all company accountant
    
    create:
    Create a new company accountant

    retrieve:
    Return the company accountant with the given id

    update:
    Update (full) company accountant info with the given id

    partial_update:
    Update (partial) company accountant info with the given id

    delete:
    Delete company accountant with the given id
    """
    permission_classes = [IsSIDorCompAdm]
    serializer_class = TreasurySerializer   
    pagination_class = CustomPagination
    def get_queryset(self):
        request = self.request
        print ('user:',request.user)
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                company = get_company(self.request)
                comp_admin = get_user_model().objects.filter(groups__name='cmp_act', company=company.id)
                return comp_admin
            raise ValidationError(app_id_error)  
        else:
            comp_admin = get_user_model().objects.filter(groups__name='cmp_act')
            company = self.request.query_params.get('company')
            if company is not None:
                comp_admin = comp_admin.filter(company__id=company)
            return comp_admin

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'Successful',
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message += f'{field_name} already exist'
                else:
                    error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class CompanyAdminViewSet(ModelViewSet):
    permission_classes = [IsSIDorCompAdm]
    serializer_class = CompanyAdminSerializer
    pagination_class = CustomPagination
    """
    list:
    Retuns a list of all sid
    
    create:
    Create a new sid

    retrieve:
    Return the sid with the given id

    update:
    Update (full) sid info with the given id

    partial_update:
    Update (partial) sid info with the given id

    delete:
    Delete sid with the given id
    """
    def get_queryset(self):
        request = self.request
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                company = get_company(self.request)
                comp_admin = get_user_model().objects.filter(groups__name='cmp_adm', company=company.id)
                return comp_admin
            raise ValidationError(app_id_error)  
        else:
            comp_admin = get_user_model().objects.filter(groups__name='cmp_adm')
            company = self.request.query_params.get('company')
            if company is not None:
                comp_admin = comp_admin.filter(company__id=company)
            return comp_admin

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'Successful',
                'message': 'User created successfully'
            }, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message.append(f'{field_name} already exist')
                else:
                    error_message.append(f'{field_name} is {field_errors[0].code}')
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                }, status=status.HTTP_400_BAD_REQUEST)


class StaffUpdateUserProfile(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StaffUpdateUserSerializer

    @swagger_auto_schema(request_body=StaffUpdateUserSerializer)
    def patch(self, request):
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            # return Response({
            #     'status': 'Successful',
            #     'message': 'User details changed successfully',
            #     'user': StaffUpdateUserSerializer(user).data
            # }, status=status.HTTP_200_OK)
            return Response(StaffUpdateUserSerializer(user).data, status=status.HTTP_200_OK)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message += f'{field_name} already exist'
                else:
                    error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


class AdminUpdateUserProfile(UpdateAPIView):
    permission_classes = [IsSIDorCompAdm]
    serializer_class = AdminUpdateUserSerializer

    @swagger_auto_schema(request_body=AdminUpdateUserSerializer)
    def patch(self, request, pk):
        print('>>>>>>>>DATA SENT<<<<<<<<', request.data)
        user_group = request.user.groups.first().name
        if user_group == 'sid':
            company = request.data.get('company', None)
            if company is None:
                return Response({
                    'message':'Company is not provided'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            company = request.user.company
        user = User.objects.get(id=pk, company=company)
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            phone_number = serializer.validated_data.get('phone_number')
            if email is not None:
                if User.objects.exclude(id=pk).filter(email=email).exists():
                    return Response({
                        'code': 400,
                        'message': 'Email already in use'
                    }, status=status.HTTP_400_BAD_REQUEST)
            if phone_number is not None:
                if User.objects.exclude(id=pk).filter(phone_number=phone_number).exists():
                    return Response({
                        'code': 400,
                        'message': 'Phone number already in use'
                    }, status=status.HTTP_400_BAD_REQUEST)
            user = serializer.save()
            return Response({
                'status': 'Successful',
                'message': 'User details changed successfully',
                'user': AdminUpdateUserSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                if field_errors[0].code == 'unique':
                    error_message += f'{field_name} already exist'
                else:
                    error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
            }, status=status.HTTP_400_BAD_REQUEST)
            

# class EmployeeViewSet(ModelViewSet):
#     """
#     list:
#     Retuns a list of all employee
    
#     create:
#     Create a new employee

#     retrieve:
#     Return the employee with the given employee

#     update:
#     Update (full) employee info with the given employee

#     partial_update:
#     Update (partial) employee info with the given employee

#     delete:
#     Delete employee with the given employee
#     """
#     serializer_class = EmployeeSerializer
#     permission_classes = [AllowAny]
#     pagination_class = CustomPagination
#     def get_queryset(self):
#         company = get_company(self.request)
#         if company is not None:
#             employees = get_user_model().objects.filter(groups__name='emp', company=company.id)
#             return employees
#         raise ValidationError('Include App Id in request header')

#     def create(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({
#                 'status': 'Successful'
#             }, status=status.HTTP_201_CREATED)
#         else:
#             default_errors = serializer.errors
#             new_error = {}
#             for field_name, field_errors in default_errors.items():
#                 new_error[field_name] = field_errors[0]
#             return Response(new_error, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class BulkEmployeeViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all employee
    
    create:
    Create a new employee

    retrieve:
    Return the employee with the given employee

    update:
    Update (full) employee info with the given employee

    partial_update:
    Update (partial) employee info with the given employee

    delete:
    Delete employee with the given employee
    """
    serializer_class = BulkEmployeeSerializer
    permission_classes = [IsSIDorCompAdm]
    pagination_class = CustomPagination
    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            employees = get_user_model().objects.filter(groups__name='emp', company=company.id)
            return employees
        raise ValidationError(app_id_error)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            result = serializer.save()
            no_of_staffs = len(result['employees'])
            return Response({
                'status': 'Success',
                'message': f'{no_of_staffs} staffs created successfully'
            }, status=status.HTTP_201_CREATED)
        else:
            company = get_company(self.request)
            if company is None:
                return Response(app_id_error, status=status.HTTP_401_UNAUTHORIZED)
            default_errors = serializer.errors
            fields = []
            for field in default_errors['employees']:
                row_error = []
                for field_name, field_errors in field.items():
                    error_messages = f'{field_name} is {field_errors[0].code}'
                    if field_errors[0].code == 'unique':
                        error_messages = f'{field_name} already exist'
                    row_error.append(error_messages)
                fields.append({"error":', '.join(row_error)})
            return Response(fields, status=status.HTTP_400_BAD_REQUEST)




@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class VendorViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all vendor
    
    create:
    Create a new vendor

    retrieve:
    Return the vendor with the given vendor id

    update:
    Update (full) vendor info with the given vendor id

    partial_update:
    Update (partial) vendor info with the given vendor id

    delete:
    Delete vendor with the given vendor
    """
    serializer_class = VendorSerializer
    permission_classes = [IsSIDorCompAdm]
    pagination_class = CustomPagination
    lookup_field = 'user__pk'

    def get_queryset(self):
        request = self.request
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                company = get_company(self.request)
                vendors = Vendor.objects.filter(company=company.id, user__is_active=True)
                return vendors
            raise ValidationError(app_id_error)  
        else:
            vendors = Vendor.objects.all()
            company = self.request.query_params.get('company')
            if company is not None:
                vendors = vendors.filter(company__id=company, user__is_active=True)
            return vendors

    def create(self, request, *args, **kwargs):
        print('Vendor created by', request.user.email)
        serializer = self.get_serializer(data=request.data, context={'user': request.user, 'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'Successful'
            }, status=status.HTTP_201_CREATED)
        else:
            # default_errors = serializer.errors
            # print(default_errors)
            # error_message = ''
            # for field_name, field_errors in default_errors.items():
            #     print(field_errors)
            #     error_message += f'{field_name} is {field_errors[0].code},'
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class VendorStaffViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all vendor staff
    
    create:
    Create a new vendor staff

    retrieve:
    Return the vendor staff with the given vendor staff

    update:
    Update (full) vendor staff info with the given vendor staff

    partial_update:
    Update (partial) vendor staff info with the given vendor staff

    delete:
    Delete vendor staff with the given vendor staff
    """
    serializer_class = VendorStaffSerializer
    permission_classes = [IsVendor | ReadOnly]
    pagination_class = CustomPagination
    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            employees = get_user_model().objects.filter(groups__name='ven_staff', company=company.id)
            return employees
        raise ValidationError(app_id_error)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'Successful'
            }, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'limit', openapi.IN_QUERY, description="Number of results to return per page.", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'offset', openapi.IN_QUERY, description="The initial index from which to return the results.", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'search', openapi.IN_QUERY, description="Filter using the user partal data (email, first name or last name)", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class CompanyStaff(APIView):
    permission_classes = [IsSIDorCompAdm]
    def get(self, request):
        if request.user.groups.first().name == 'cmp_adm':
            # company = get_company(request)
            company = request.user.company
            staffs = User.objects.filter(company=company, groups__name='emp')
            # raise ValidationError(app_id_error)  
            # return Response(EmployeeSerializer(staffs, many=True).data, status=status.HTTP_200_OK)
        else:
            staffs = User.objects.filter(groups__name='emp')
            company = self.request.query_params.get('company')
            if company is not None:
                staffs = staffs.filter(company__id=company)
        search = request.query_params.get('search', None)
        if search is not None:
            staffs = staffs.filter(Q(first_name__icontains=search)|Q(last_name__icontains=search)|Q(email__icontains=search)|Q(phone_number__icontains=search))
        # paginator = LimitOffsetPagination()
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(staffs.order_by('-id'), request)
        serializer = EmployeeSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class ResetPasswordEmail(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = []
    schema = ResetPasswordEmailSchema

    @swagger_auto_schema(request_body=EmailSerializer)
    def post(self,request):
        serializer = EmailSerializer(data=request.data)
        token_generator=default_token_generator
        if serializer.is_valid():
            email_address = serializer.data.get("email").lower()
            print(email_address)
            try:
                user = User.objects.get(email=email_address, is_active=True)
                keygen = generateKey()
                key = base64.b32encode(keygen.returnValue(email_address).encode())
                OTP = pyotp.TOTP(key, interval=settings.OTP_TIMEOUT)
                print(OTP.now())
                subject = 'Reset Your Password'
                message = f'Your reset password OTP is {OTP.now()}. Please note, the otp expires in 5 minutes. Please visit {domain} to reset your password.'
                # from_email = settings.EMAIL_HOST_USER
                to_list = [email_address]
                # print(message)
                # send_mail(subject, message, from_email, to_list, fail_silently=True)
                # print("Kindly check your mail to reset your password")
                sender = settings.EMAIL_HOST_USER
                # sender = 'noreply@tpssupport.ng'
                email = EmailMessage(subject, message, sender, to_list)
                EmailThread(email).start()
                # return Response({'status':'Successful'},status=status.HTTP_200_OK)
                return Response({
                    'status':'Successful', 
                    'message': "OTP has been sent to your mail, Please check your spam folder if you can't find it in your inbox.", 
                    'otp':f'{OTP.now()}', 
                    'otp_expiry': settings.OTP_TIMEOUT
                    },status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'message':'User with the email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        default_errors = serializer.errors
        print(default_errors)
        error_message = ''
        for field_name, field_errors in default_errors.items():
            error_message += f'{field_name} is {field_errors[0].code},'
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'code': 400,
            'message': error_message
            }, status=status.HTTP_400_BAD_REQUEST)


# This is used to confirm reset password link (NOT IN USE)
class ConfirmPasswordLink(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = []
    schema = ConfirmPasswordLinkSchema

    def get(self, request, uidb64, token):
        token_generator = default_token_generator
        # user_id = request.data.get("uidb64")
        # token = request.data.get("token")
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and token_generator.check_token(user, token):
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status':"failed",
                'message':"Link has expired"
            }, status=status.HTTP_400_BAD_REQUEST)


class ConfirmResetToken(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = []
    schema = ConfirmResetTokenSchema

    @swagger_auto_schema(request_body=ConfirmResetTokenSerializer)
    def post(self, request):
        serializer = ConfirmResetTokenSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email'].lower()
            token = serializer.validated_data['token']
            try:
                user = User.objects.get(email=email)
                keygen = generateKey()
                key = base64.b32encode(keygen.returnValue(email).encode())  # Generating Key
                OTP = pyotp.TOTP(key, interval=settings.OTP_TIMEOUT)  # TOTP Model
                print(OTP.verify(token))
                if OTP.verify(token):
                    login(request, user)
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'status': 'Successful',
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'message': 'OTP verification successful'
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'status': 'failed',
                        'message': 'OTP verification failed'
                    }, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response({'message':'User with the email does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


class ResetPassword(APIView):
    schema = ResetPasswordSchema

    @swagger_auto_schema(request_body=ResetPasswordSerializer)
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            password_1 = serializer.validated_data["password"]
            password_2 = serializer.validated_data["confirm_password"]
            if password_1 == password_2:
                user = User.objects.get(id=request.user.id)
                user.set_password(password_1)
                user.is_verified = True
                user.save()
                print(user)
                return Response({
                    'code':200,
                    'message':'User password changed successfully',
                    'resolve':'You can now proceed to login'
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'code':'400',
                    'message':"Password don't match",
                    'resolve':'Ensure the two passwords are same'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                error_message.append(f'{field_name} is {field_errors[0].code}')
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(error_message)
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                'resolve': "Fix error in input"
            }, status=status.HTTP_400_BAD_REQUEST)


class AdminResetPassword(APIView):
    permission_classes = [IsSIDorCompAdm]

    @swagger_auto_schema(request_body=AdminResetPasswordSerializer)
    def patch(self, request):
        serializer = AdminResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            adm_user = request.user
            if adm_user.groups.filter(name="sid"):
                if 'company' in serializer.validated_data:
                    company = serializer.validated_data['company']
                else:
                    return Response({
                        'code': 400,
                        'message': 'company is required',
                        'resolve': "Fix error in input"
                    }, status=status.HTTP_400_BAD_REQUEST)
            else:
                company = adm_user.company
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            try:
                user = User.objects.get(Q(email=email)|Q(phone_number=email), company=company)
                user.set_password(password)
                user.save()
                return Response({
                    'code': 204,
                    'message': 'User password updated successfully'
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({
                    'code': 404,
                    'message': 'User does not exist',
                    'resolve': "Check the user details"
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                error_message.append(f'{field_name} is {field_errors[0].code}')
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            print(error_message)
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                'resolve': "Fix error in input"
            }, status=status.HTTP_400_BAD_REQUEST)



class UpdatePassword(APIView):
    schema = UpdatePasswordSchema

    @swagger_auto_schema(request_body=ChangePasswordSerializer)
    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data["old_password"]
            if not user.check_password(old_password):
                return Response({
                    'status':"failed",
                    'message':"Incorrect Password"
                }, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(serializer.validated_data["new_password"])
            user.save()
            return Response({
                'status':"success",
                'message':"Password changed successfully"
            },status=status.HTTP_200_OK)
        default_errors = serializer.errors
        print(default_errors)
        error_message = ''
        for field_name, field_errors in default_errors.items():
            error_message += f'{field_name} is {field_errors[0].code},'
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({
            'code': 400,
            'message': error_message
            }, status=status.HTTP_400_BAD_REQUEST)


class ChangeCompanyId(APIView):
    permission_classes = [IsSIDPermission]
    schema = ChangeCompanyIdSchema

    def get_object(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            return Response(app_id_error, status=status.HTTP_401_UNAUTHORIZED)

    @swagger_auto_schema(request_body=ChangeCompanyIdSerializer)
    def patch(self, request, pk):
        company = self.get_object(pk)
        serializer = ChangeCompanyIdSerializer(data=request.data)
        if serializer.is_valid():
            app_key = serializer.validated_data['app_key']
            company.app_key = app_key
            company.save()
            return Response({
                'status':'success',
                'message':'Company key changed successfully'
            }, status=status.HTTP_200_OK)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


class CompanyRefCode(APIView):
    permission_classes = [IsAuthenticated]
    schema = CompanyRefCodeSchema
    
    def get(self, request):
        company = get_company(request)
        if company is not None:
            return Response(company.ref_code, status=status.HTTP_200_OK)
        else:
            return Response(app_id_error, status=status.HTTP_401_UNAUTHORIZED)

    @swagger_auto_schema(request_body=ChangeCompanyRefSerializer)
    def patch(self, request):
        company = get_company(request)
        if company is not None:
            serializer = ChangeCompanyRefSerializer(data=request.data)
            # company.ref_code = get_random_string(7)
            company.ref_code = serializer.validated_data['ref_code']
            company.save()
            return Response({
                'status':'success',
                'message':'Company ref_code changed successfully'
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error':'App-Id is not provided'
            }, status=status.HTTP_401_UNAUTHORIZED)


class GetUserAppCode(APIView):
    permission_classes = [IsSIDorCompAdm]
    serializer_class = GetUserAppCodeSerializer

    @swagger_auto_schema(request_body=GetUserAppCodeSerializer, manual_parameters=[openapi.Parameter('App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER)])
    def post(self, request):
        user_group = request.user.groups.first().name
        if user_group == 'sid':
            company = request.data.get('company', None)
            if company is None:
                return Response({
                    'message':'Company is not provided'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            company = get_company(request)
            if company is None:
                return Response(app_id_error, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            queryset = User.objects.filter(Q(email=email, company=company)|Q(phone_number=email, company=company))
            print(queryset)
            # user = get_object_or_404(User, email=email)
            if len(queryset) == 0:
                return Response({
                    'code': 404,
                    'message': 'User does not exist'
                }, status=status.HTTP_404_NOT_FOUND)
            elif len(queryset) > 1:
                return Response({
                    'code': 404,
                    'message': 'User does not exist'
                }, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({
                    'code': 200,
                    'message': 'App code fetched successfully',
                    'user_app_code': queryset[0].app_code,
                    'user_id': queryset[0].id
                }, status=status.HTTP_200_OK)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


class GetUserTokenFromAppCode(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    serializer_class = GetUserTokenFromAppCodeSerializer

    @swagger_auto_schema(request_body=GetUserTokenFromAppCodeSerializer, manual_parameters=[openapi.Parameter('App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER)])
    def post(self, request):
        # company = get_company(request)
        # if request.user.is_authenticated:
        #     company = request.user.company
        # if company is None:
        #     return Response(app_id_error, status=status.HTTP_401_UNAUTHORIZED)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            app_code = serializer.validated_data['user_app_code']
            # queryset = User.objects.filter(app_code=app_code, company=company)
            queryset = User.objects.filter(app_code=app_code)
            # user = get_object_or_404(User, email=email)
            user = get_object_or_404(queryset)
            if not user.is_active:
                return Response({
                    "code": 110,
                    "message": "Your account has been deactivated",
                    "resolve": "please verify your account"
                }, status=status.HTTP_401_UNAUTHORIZED)
            if user.is_verified:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                today_date = datetime.date(datetime.today()) # Monday is 0, Sunday is 6
                current_day_monday = today_date - timedelta(days=today_date.weekday())
                comp_no_of_booking_days = user.company.allowed_booking_day
                week_start = current_day_monday if today_date.weekday() < comp_no_of_booking_days - 1 else current_day_monday + timedelta(days=7)
                # week_start = today_date - timedelta(days=today_date.isoweekday() % 7) + timedelta(days=1) if today_date.weekday() < 5 else today_date - timedelta(days=today_date.isoweekday() % 7) + timedelta(days=8)
                staff_lev_id = request.user.staff_level_id
                try:
                    staff_level = get_object_or_404(StaffLevel, id=staff_lev_id)
                except:
                    staff_level = None
                daily_limit = staff_level.daily_limit
                # Directly
                daily_limit_used = \
                MealTransaction.objects.filter(user_id=request.user.id, company=request.user.company_id,
                                                delivery_date=today_date,
                                                status__in=('pend', 'del')).aggregate(
                    TOTAL=Sum('total'))['TOTAL']
                print('daily_limit_used: ', (daily_limit_used if daily_limit_used != None else 0))
                daily_limit_left_actual = (
                            daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0
                return Response({
                    'user': {
                            'id': user.id,
                            'email': user.email,
                            'first_name': user.first_name,
                            'last_name': user.last_name,
                            'role': user.groups.first().name,
                            'staff_level': user.staff_level.name,
                            'image': user.image.url if user.image else None,
                            'department': user.department.name,
                            'personal_balance': user.balance,
                            'daily_limit': user.staff_level.daily_limit,
                            'allow_same_day_booking': user.company.allow_same_day_delivery,
                            'allow_mix_txn': user.company.is_comp_allow_txn_mix,
                            'no_of_booking_days': comp_no_of_booking_days,
                            'start_booking_date': week_start,
                            'end_booking_date': week_start + timedelta(days=(comp_no_of_booking_days - 1)),
                            'today_daily_limit_left': daily_limit_left
                    },
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'access_duration': settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    'app_id':user.company.app_key if user.company else user.company
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "code": 110,
                    "message": "Your account is not verified",
                    "resolve": "please verify your account"
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


class ChangeUserStatusView(APIView):
    permission_classes = [IsSIDorCompAdm]

    @swagger_auto_schema(request_body=ChangeUserStatusSerializer, manual_parameters=[openapi.Parameter('App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER)])
    def post(self, request):
        user_group = request.user.groups.first().name
        if user_group == 'sid':
            company = request.data.get('company', None)
            if company is None:
                return Response({
                    'message':'Company is not provided'
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            company = get_company(request)
            if company is None:
                return Response(app_id_error, status=status.HTTP_401_UNAUTHORIZED)
        serializer = ChangeUserStatusSerializer(data=request.data)
        if serializer.is_valid():
            user_email = serializer.validated_data['user_email']
            user_status = serializer.validated_data['status']
            try:
                user = User.objects.get(Q(email=user_email)|Q(phone_number=user_email)) if request.user.groups.filter(name='sid').exists() else User.objects.get(Q(email=user_email)|Q(phone_number=user_email), company = company) 
                # User.objects.get(company = company, email=user_email)
                user.is_active = user_status
                user.save()
                return Response({
                    'message':'Status updated successfully.'
                }, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({
                    'message': 'User does not exist'
                }, status=status.HTTP_404_NOT_FOUND)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = ''
            for field_name, field_errors in default_errors.items():
                error_message += f'{field_name} is {field_errors[0].code},'
            # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                'code': 400,
                'message': error_message
                }, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'company', openapi.IN_QUERY, description="company id, (this filter only works for SID admin)", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]
        )
    )
class UserReport(APIView):
    permission_classes = [IsCompanyAdminOrIsSIDOrIsCompanyAct]
    def get(self, request):
        user_group = request.user.groups.first().name
        users = User.objects.all()
        if user_group == 'sid':
            company = request.data.get('company', None)
            if company is not None:
                users = users.filter(company__id=company)
        else:
            users = users.filter(company=request.user.company)
        result = [
            {
                "title": "users",
                "count": users.count()
            },
            {
                "title": "staffs",
                "count": users.filter(groups__name='emp').count()
            },
            {
                "title": "vendors",
                "count": users.filter(groups__name='ven').count()
            },
            {
                "title": "company admin",
                "count": users.filter(groups__name='cmp_adm').count()
            },
            {
                "title": "company accountant",
                "count": users.filter(groups__name='cmp_act').count()
            },
            {
                "title": "company",
                "count": Company.objects.all().count() if user_group == 'sid' else None
            },
            {
                "title": "active user",
                "count": users.filter(is_active=True).count()
            },
            {
                "title": "inactive user",
                "count": users.filter(is_active=False).count()
            }
        ]
        return Response(result, status=status.HTTP_200_OK)


class TestEncryptionOne(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        # (pubkey, privkey) = rsa.newkeys(512)
        # privkey = "PrivateKey(9150542654521725106192058214196152002631735445034218648053735671354986000774827168994947616661405440324700153306487736754584841687260163016403091528918669, 65537, 1491883184515077479281354685424811696417597589608780173862919658336939825722226527664563329935517368436186313733008474428396285516230919240602524212562273, 5607998908724742105590603503785196296209935796001130250092836048212797289084364889, 1631694799420450811111114297609403939947295736762676266954156328479304021)"
        # pubkey = "PublicKey(9150542654521725106192058214196152002631735445034218648053735671354986000774827168994947616661405440324700153306487736754584841687260163016403091528918669, 65537)"
        response_data = {
            'status':True,
            'message':'Hello world'
        }
        message = json.dumps(response_data)
        message = message.encode('utf-8')
        # crypto = rsa.encrypt(message, pubkey)
        crypto = rsa.encrypt(message, rsa.PublicKey(9150542654521725106192058214196152002631735445034218648053735671354986000774827168994947616661405440324700153306487736754584841687260163016403091528918669, 
        65537))
        # print(">>>>>>>>PRIVATE<<<<<<<<<<<",privkey)
        # print(">>>>>>>>PUBLIC<<<<<<<<<<<<",pubkey)
        message = rsa.decrypt(crypto, rsa.PrivateKey(9150542654521725106192058214196152002631735445034218648053735671354986000774827168994947616661405440324700153306487736754584841687260163016403091528918669,
        65537, 1491883184515077479281354685424811696417597589608780173862919658336939825722226527664563329935517368436186313733008474428396285516230919240602524212562273, 
        5607998908724742105590603503785196296209935796001130250092836048212797289084364889, 1631694799420450811111114297609403939947295736762676266954156328479304021)).decode('utf-8')
        print(">>>MESSAGE<<<",message)
        return Response({
            'encrpyt': base64.urlsafe_b64encode(crypto)
        }, status=status.HTTP_200_OK)

# def test_data():
#     base_64 = "bWOJDU4lG3QsqOu1Y3SNt3bM3_FUNq2hPdqyyTbkp2y8tKSnt56oIKfWulmFmp6T9kO5PPLouX_vIutg3vrnAg=="
#     res = base64.urlsafe_b64decode(base_64)
#     print(res)
#     return res


class TestEncryptionTwo(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # (pubkey, privkey) = rsa.newkeys(512)
        response_data = {
            'status':True,
            'message':'Hello world'
        }
        # key = get_random_bytes(16)
        key="12edwg534jkd8hdf"
        key = bytes(key, 'utf-8')
        cipher = AES.new(key, AES.MODE_EAX)
        message = json.dumps(response_data)
        message = message.encode('utf-8')
        # print(base64.urlsafe_b64encode(key))
        print(type(message))

        ciphertext, tag = cipher.encrypt_and_digest(message)
        # ciphertext = cipher.encrypt(message)
        
        # ciphertext
        # '\xd6\x83\x8dd!VT\x92\xaa`A\x05\xe0\x9b\x8b\xf1'
        # obj2 = AES.new('This is a key123', AES.MODE_CBC, 'This is an IV456')
        # obj2.decrypt(ciphertext)
        # 'The answer is no'

        # message = json.dumps(response_data)
        # message = message.encode('utf-8')
        # ciphertext = obj.encrypt(message)
        print(ciphertext)
        # crypto = rsa.encrypt(message, pubkey)
        # print(privkey)
        # print(type(crypto))
        # message = rsa.decrypt(crypto, privkey).decode('utf-8')
        encrypted_text = base64.urlsafe_b64encode(ciphertext)

        data = cipher.decrypt_and_verify(ciphertext)
        print(data)
        # return encrypted_text
        return Response({
            # 'encrpyt': str(crypto, 'utf-8')
            "encrypt": encrypted_text
        }, status=status.HTTP_200_OK)


from Crypto.Cipher import AES
from hashlib import md5
import base64

password = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
# input = 'hello world'
# input = {'status':True,'message':'Hello world','data':[{'id':1,"message":"message 1"},{'id':2,"message":"message 2"}]}
input = {
    'status': True,
    'message': 'Hello world',
    'data':[
        {
            'id': 1,
            "message": "message 1"
        },
        {
            'id':2,
            "message": ['hello', 'world']
        }
    ]
}

BLOCK_SIZE = 16

def pad (data):
    data = str(data)
    pad = BLOCK_SIZE - len(data) % BLOCK_SIZE
    return data + pad * chr(pad)

def unpad (padded):
    pad = ord(chr(padded[-1]))
    return padded[:-pad]

def get_key_iv (password):
    m = md5()
    m.update(password.encode('utf-8'))
    key = m.hexdigest()

    m = md5()
    m.update((password + key).encode('utf-8'))
    iv = m.hexdigest()
    
    return [key,iv]

def _encrypt(data, password):

    key,iv = get_key_iv(password)
    data = pad(data)

    # key = key.encode('utf-8') # Added
    key = key[:16].encode('utf-8')
    iv = iv[:16].encode('utf-8') # Added

    # aes = AES.new(key, AES.MODE_CBC, iv[:16])
    print(">>>>key<<<<", key)
    print(">>>>>iv<<<<<",iv)
    aes = AES.new(key, AES.MODE_CBC, iv) # Changed

    data = data.encode('utf-8') # Added

    encrypted = aes.encrypt(data)
    print(">>>>>>>>>>>>encrypted<<<<<<<<", encrypted, type(encrypted))
    # return base64.urlsafe_b64encode(encrypted)
    return base64.b64encode(encrypted)

def _decrypt(edata, password):
    edata = base64.urlsafe_b64decode(edata)
    key,iv = get_key_iv(password)

    # key = key.encode('utf-8') # Added
    # iv = iv[:16].encode('utf-8') # Added
    key = key[:16].encode('utf-8')
    iv = iv[:16].encode('utf-8')

    # aes = AES.new(key, AES.MODE_CBC, iv[:16])
    aes = AES.new(key, AES.MODE_CBC, iv) # Changed

    return unpad(aes.decrypt(edata))

def results():
    output = _encrypt(input, password) 
    plaintext = _decrypt(output, password)
    print(plaintext)


class TestEncryption(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        key,iv = get_key_iv(password)
        key = key[:16].encode('utf-8') # Added
        iv = iv[:16].encode('utf-8') # Added
        output = _encrypt(json.dumps(input), password) 
        print(output, ">>>>>HERE<<<<",type(output))
        plaintext = _decrypt(output, password)
        print("plain text",plaintext)
        return Response({
            'iv': iv,
            'key': key,
            'password': password,
            'output': output,
            'input': input
        })


class PaymentKeyViewSet(ModelViewSet):
    queryset =Payment_keys.objects.all()
    serializer_class = PaymentKeySerializer
    permission_classes = [AllowAny]
    pagination_class = CustomPagination


class UpdateDeviceView(APIView):

    @swagger_auto_schema(request_body=UpdateDeviceSerializer)
    def post(self,request):

        serializer= UpdateDeviceSerializer(data=request.data)

        if serializer.is_valid():
            company = get_company(self.request)
            device_id = serializer.validated_data['device_id']
            device_code = serializer.validated_data['device_code']
            the_status = serializer.validated_data['status']


            device = Device.objects.get(company=company,device_code=device_code)

            device.is_active = the_status
            device.device_id = device_id
            device.save()


            return Response({
                'code':'200',
                'message': 'Device onboarded successfully'

            },status=status.HTTP_200_OK)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                error_message.append(f'{field_name} is {field_errors[0].code}')
            
            (error_message)
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                'resolve': "Fix error in input",
                }, status=status.HTTP_400_BAD_REQUEST)

class GetDeviceStatusView(APIView):

    @swagger_auto_schema(request_body=GetDeviceStatusSerializer)
    def post(self,request):

        serializer= GetDeviceStatusSerializer(data=request.data)

        if serializer.is_valid():
            company = get_company(self.request)
            device_id = serializer.validated_data['device_id']
            print('Device used',company,company.id,device_id)
            
            try:
                device = Device.objects.get(company=company,device_iid=device_id)
            except:
                return Response({
                'code': 400,
                'message': 'Device does not exist',
                'resolve': "Contact Admin",
                }, status=status.HTTP_400_BAD_REQUEST)
            device.is_active 


            return Response({
                'code':'200',
                'device_status': device.is_active,
                'message': 'Device status pulled'

            },status=status.HTTP_200_OK)
        else:
            default_errors = serializer.errors
            print(default_errors)
            error_message = []
            for field_name, field_errors in default_errors.items():
                error_message.append(f'{field_name} is {field_errors[0].code}')
            
            (error_message)
            return Response({
                'code': 400,
                'message': ', '.join(error_message),
                'resolve': "Fix error shown in the message",
                }, status=status.HTTP_400_BAD_REQUEST)


class UserBalance(APIView):
    permission_classes = [IsEmployee]
    def post(self, request):
        serializer = UserBalanceSerializer(data=request.data)
        if serializer.is_valid():
            order_date = serializer.validated_data['order_date']
            staff_lev_id = request.user.staff_level_id
            try:
                staff_level = get_object_or_404(StaffLevel, id=staff_lev_id)
            except:
                staff_level = None
            daily_limit = staff_level.daily_limit
            print("Init", daily_limit)
            daily_limit_used = MealTransaction.objects.filter(user_id=request.user.id, company=request.user.company_id, delivery_date=order_date, status__in=('pending', 'delivered', 'ticket-printed')).aggregate(TOTAL=Sum('total'))['TOTAL']
            print('daily_limit_used: ', (daily_limit_used if daily_limit_used != None else 0))
            daily_limit_left_actual = (daily_limit - (daily_limit_used if daily_limit_used != None else 0))
            daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0
            return Response({
                'daily_limit_left': daily_limit_left,
                'personal_balance': request.user.balance,
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserInfo(APIView):
    permission_classes = [IsCompanyAdminOrIsSIDOrIsVendorOrIsStaff]
    def get(self, request):
        user = request.user
        user_group = request.user.groups.first().name
        daily_limit_left = None
        if (user_group == 'ven' or user_group == 'emp'):
            balance = user.balance
            if user_group == 'emp':
                today_date = datetime.date(datetime.today())
                daily_limit = user.staff_level.daily_limit
                daily_limit_used = MealTransaction.objects.filter(user_id=request.user.id, company=request.user.company_id,delivery_date=today_date,status__in=('pending', 'delivered', 'ticket-printed')).aggregate(TOTAL=Sum('total'))['TOTAL']
                print('daily_limit_used: ', (daily_limit_used if daily_limit_used != None else 0))
                daily_limit_left_actual = (daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0
        elif (user_group == 'cmp_adm' or user_group == 'cmp_act'):
            balance = user.company.balance
        if user_group in ['ven', 'emp', 'cmp_adm', 'cmp_act']:
            data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.groups.first().name,
                'staff_level': user.staff_level.name if user.staff_level else None,
                'image': user.image.url if user.image else None,
                'company_image': user.company.image.url if user.company.image and user.company is not None else None,
                'department': user.department.name if user.department else None,
                'cancelling_grace_period_in_hours': user.company.cancelling_grace_period_in_hours,
                'personal_balance': balance,
                'daily_limit': user.staff_level.daily_limit if user.staff_level else None,
                'allow_same_day_booking': user.company.allow_same_day_delivery if user.company is not None else None,
                'allow_mix_txn': user.company.is_comp_allow_txn_mix if user.company is not None else None,
                'today_daily_limit_left': daily_limit_left if user.company is not None else None
            }
        else:
            balance = Company.objects.all().aggregate(Sum('sid_balance'))['sid_balance__sum']
            data = {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': user.groups.first().name,
                'staff_level': user.staff_level.name if user.staff_level else None,
                'image': user.image.url if user.image else None,
                'company_image': None,
                'department': None,
                'personal_balance': balance,
                'daily_limit': None,
                'allow_same_day_booking': None,
                'allow_mix_txn': None,
                'today_daily_limit_left': None
            }
        return Response(data, status=status.HTTP_200_OK)


class BiometricData(APIView):
    permission_classes = [IsCompanyAdmin]

    def get(self, request):
        user = request.user
        staffs = User.objects.filter(company = user.company, groups__name='emp', biometrics_a__isnull=False)
        result = []
        for staff in staffs:
            result.append({
                'app_code': staff.app_code,
                'biometrics_a': staff.biometrics_a
            })
        return Response(result, status=status.HTTP_200_OK)


# @method_decorator(
#     name='get', decorator=swagger_auto_schema(
#         manual_parameters=[
#             openapi.Parameter(
#                 'app_code', openapi.IN_QUERY, description="company app key", type=openapi.TYPE_STRING
#                 )
#
#             ]
#         )
#     )
# class GetPubKeyView(APIView):
#     permission_classes = [AllowAny]
#
#     def get(self, request):
#         app_code = self.request.query_params.get('app_code')
#         data = Payment_keys.objects.filter(app_key=app_code).first()
#         return Response({
#             'status': 'success',
#             'key': data.public_key
#         },status=status.HTTP_200_OK)



@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
@method_decorator(
    name='create', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
@method_decorator(
    name='get_rating_statistics', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class VendorReviewRatingViewset(ModelViewSet):
    queryset = VendorReviewRating.objects.all()
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = VendorReviewRatingFilter
    serializer_class = VendorReviewRatingSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = CustomPagination
    http_method_names = ["get", "post", "patch"]

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            return self.queryset.filter(company=company.id).select_related('food', 'vendor')
        raise ValidationError('Include App Id in request header')

    @action(methods=['GET'], detail=False, url_path=r'(?P<vendor_id>[\w-]+)/stats')
    def get_rating_statistics(self, request,vendor_id, pk=None):
        qs = self.get_queryset().filter(vendor_id=vendor_id)
        alltime_rating = 0
        sliced_rating = 0

        alltime_qs = qs.aggregate(alltime_count=Count('id'), alltime_sum=Coalesce(Sum('rating'), 0))
        if alltime_qs['alltime_count'] >0:
            alltime_rating = alltime_qs['alltime_sum']/ alltime_qs['alltime_count']
        filterset_class = VendorReviewRatingFilter(request=request, data=request.GET, queryset=qs)
        if filterset_class.is_valid():
            qs = filterset_class.qs

        sliced_qs = qs.aggregate(sliced_count=Count('id'), sliced_sum=Coalesce(Sum('rating'), 0))
        if sliced_qs['sliced_count']  >0:
            sliced_rating = sliced_qs['sliced_sum'] / sliced_qs['sliced_count']

        data =  {
            'alltime_rating': alltime_rating, 
            'sliced_rating': sliced_rating,
            'alltime_count': alltime_qs['alltime_count'],
            'sliced_count': sliced_qs['sliced_count']
        }
        return Response(
            {'code': 200, 'data':data}, status=status.HTTP_200_OK)



