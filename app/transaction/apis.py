import csv
from datetime import datetime, timedelta
from math import ceil

from django.db import connection
import collections, json, requests, logging, psycopg2, hashlib, hmac
from django.db.models.aggregates import Count
from django.db.models import Sum, F, Q, Case, When, Value
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend

from django.db.models import (
    Q,
    F,
    Value,
    IntegerField
)



from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, RetrieveUpdateAPIView, \
    get_object_or_404
from rest_framework import mixins, status, views, generics, viewsets, permissions, filters
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from rest_framework.permissions import IsAuthenticated

from django.utils import timezone
from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import psycopg2
from rest_framework.permissions import AllowAny
from django.template.loader import render_to_string
from django.conf import settings
from decouple import config


from account.permissions import AllowBooking, IsCompanyAdmin, IsCompanyAdminOrIsSIDOrIsCompanyAct, IsCompanyAdminOrIsSIDOrIsVendorOrIsStaff, IsSIDPermission, IsSIDorCompAdm, check_booking_time

logger = logging.getLogger(__name__)

from .schemas import *

from .models import (MealTransaction, Void_transaction,
                     Staff_TopupHistory, Company_TopupHistory,
                     PaystackCompanyAutoTopup, FoodReviewQuestion,
                     FoodReviewQuestionOption, FoodReviewResponse)

from .serializers import BulkMealTransactionSerializer, CheckCashoutSerializer, ConfirmAutoTopupSerializer, \
    TransactionSpiltReportSerializer, Void_transactionSerializer, \
    SelfServiceUpdateMealTransactionSerializer, SelfServiceUpdateMealTransactionXSerializer, \
    StaffMealTransactionHistorySerializer, VendorMealTransactionHistorySerializer, \
    CompanyMealTransactionHistorySerializer, SIDMealTransactionHistorySerializer, \
    SIDWithdrawalHistorySerializer, VendorWithdrawalHistorySerializer, CompanyWithdrawalHistorySerializer, \
    StaffTopUpHistorySerializer, CompanyTopUpHistorySerializer, VoidTxnSerializer, VendorConfirmDeliverySerializer, \
    GlobalVariableSerializer, LatestMealTransactionSerializer, FoodReviewQuestionSerializer,\
    FoodReviewQuestionCreateSerializer, FoodReviewResponseSerializer, FoodReviewCreateResponseSerializer, \
    FoodReviewQuestionUpdateSerializer


from account.helpers import get_company, get_company_id, get_company_paystack
from account.utils import CustomPagination, get_random_string
from account.models import Company, User, StaffLevel, Device, Vendor, SIDAdmin
from .models import MealTransaction, Void_transaction, Receipts, GlobalVariable, Staff_TopupHistory, \
    Company_TopupHistory, WithdrawalHistory, Paystack_Webhook
from food.models import Food
from .utils import get_paystack_ledger,paystack_transfer_charge, verify_transaction

# PAYSTACK_APP_SHARED_SECRET = b'sk_test_3c1ad8807f89cb1ace70a9e46ce5ee80052c3422'
# paystack_headers = {'Content-Type': 'application/json',
#                     'Authorization': 'Bearer sk_test_3c1ad8807f89cb1ace70a9e46ce5ee80052c3422'}
# PAYSTACK_APP_SHARED_SECRET = b'sk_test_e09447efa9212de14ce59949c86aadafe1b54e0d'
# paystack_headers = {'Content-Type': 'application/json',
#                     'Authorization': 'Bearer sk_test_e09447efa9212de14ce59949c86aadafe1b54e0d'}
#



PAYSTACK_APP_SHARED_SECRET = config('paystack_test_key')
paystack_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {PAYSTACK_APP_SHARED_SECRET}'}


paystack_bal_url = 'https://api.paystack.co/balance'
paystack_transfer = 'https://api.paystack.co/transfer'


class GlobalVariableViewSet(ModelViewSet):
    queryset = GlobalVariable.objects.all()
    serializer_class = GlobalVariableSerializer
    permission_classes = [SIDAdmin]
    pagination_class = CustomPagination


@method_decorator(
    name='get_latest_meal', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        ),
    )

@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        ),
    )
class BulkTransactionViewSet(ModelViewSet):
    """
    list:
    Retuns a list of all employee

    create:
    Create a new txn

    retrieve:
    Return the txn with the given employee

    update:
    Update (full) txn info with the given employee

    partial_update:
    Update (partial) txn info with the given employee

    delete:
    Delete txn with the given employee
    """
    serializer_class = BulkMealTransactionSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            meal_txn = MealTransaction.objects.filter(company=company.id)
            return meal_txn
        raise ValidationError('Include App Id in request header')

    def create(self, request, *args, **kwargs):
        '''

        Sample :
        {
            "orders": [{
                "quantity": 2,
                "food": 1,
                "delivery_date": "2021-10-02",
                "comment": "Add food"
            },
                {
                    "quantity": 2,
                    "food": 1,
                    "delivery_date": "2021-10-01",
                    "comment": "Add food"
                }],
            "platform": "WEB",
            "place": "company"
        }
        '''
        # if not check_booking_time():
        #     return Response({
        #         'code': 406,
        #         'message': 'You have exceeded the ordering hours'
        #     }, status=status.HTTP_406_NOT_ACCEPTABLE)
        company = get_company(self.request)
        if company is not None:

            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                platform = serializer.validated_data['platform']
                result = serializer.save()
                print('result', result)
                # if (all(x == 'true' for x in result.values())):
                if result['resp'] == 'created successfully':
                    print('true result', result)
                    return Response({'code': 201,
                                     'status': str(result['orders']) + ' Orders created successfully'},
                                    status=status.HTTP_201_CREATED)
                else:
                    print(' false result', dict(result))
                    if platform.lower() !='web':
                        return Response({'code': 400,
                                         'message': ' \n '.join(dict(result)['resp']),
                                         'resolve': 'Kindly modify your order or Contact the Admin  '},
                                        status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({'code': 400,
                                         'message': dict(result)['resp'],
                                         'resolve': 'Kindly modify your order or Contact the Admin  '},
                                        status=status.HTTP_400_BAD_REQUEST)

                # return Response(BulkMealTransactionSerializer(result, many=True).data, status=status.HTTP_201_CREATED)
            else:
                default_errors = serializer.errors
                affected_rows = []
                for index, error in enumerate(default_errors['orders']):
                    if len(error) > 0:
                        affected_rows.append(index)
                print(affected_rows)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # return Response({"message":f"Invalid data in rows: {affected_rows}"}, status=status.HTTP_400_BAD_REQUEST)

        raise ValidationError('Include App Id in request header')


    def partial_update(self, request, pk):
        # if not check_booking_time():
        #     return Response({
        #         'code': 406,
        #         'message': 'You have exceeded the ordering hours'
        #     }, status=status.HTTP_406_NOT_ACCEPTABLE)
        try:
            meal_transaction = MealTransaction.objects.get(id=pk, company=request.user.company)
            if request.user.groups.filter(name='cmp_adm').exists() or meal_transaction.user == request.user:
                if meal_transaction.status == 'pending':
                    # hours_before_cancelling_order = request.user.company.cancelling_grace_period_in_hours
                    # print(meal_transaction.delivery_date - timedelta(hours=hours_before_cancelling_order))
                    # if datetime.combine(meal_transaction.delivery_date, datetime.min.time()) - timedelta(hours=hours_before_cancelling_order) >= datetime.now():
                    if meal_transaction.delivery_date > datetime.now().date():
                        meal_transaction.status = 'cancelled'
                        meal_transaction.save()
                        return Response({
                            'code': 200,
                            'message': 'Transaction cancelled successfully'
                        }, status=status.HTTP_200_OK)
                    else:
                        return Response({
                            'code': 400,
                            'message': 'Sorry, the transaction already exceeded the grace period and cannot be cancel'
                        }, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({
                        'code': 400,
                        'message': f'Transaction already {meal_transaction.status}'
                    }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'code': 403,
                    'message': 'You do not have the permission to perform this action'
                }, status=status.HTTP_403_FORBIDDEN)
        except MealTransaction.DoesNotExist:
            return Response({
                'code': 404,
                'message': 'Transaction does not exist'
            }, status=status.HTTP_404_NOT_FOUND)

    @action(methods=['GET'],detail=False, serializer_class=LatestMealTransactionSerializer, url_path='latest-meal')
    def get_latest_meal(self, request, pk=None):
        data = self.get_queryset().filter(user=request.user, status='delivered').order_by('-date_created').first()
        if not data:
            return Response({'code': 200, 'data': {}}, status=status.HTTP_200_OK)
        serializer = self.serializer_class(data)
        return Response({'code': 200, 'data': serializer.data}, status=status.HTTP_200_OK)



@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class Void_transactionViewSet(ModelViewSet):
    queryset = Void_transaction.objects.all()
    serializer_class = Void_transactionSerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            void_txn = Void_transaction.objects.filter(company=company.id)
            return void_txn
        raise ValidationError('Include App Id in request header')


# @method_decorator(
#     name='post', decorator=swagger_auto_schema(
#         manual_parameters=[
#             openapi.Parameter(
#                 'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
#                 )
#             ],
#         )
#     )
# class MealDeliveryBySelfServiceXView(views.APIView):
#     # permission_classes = (AllowAny,)
#     schema = MealDeliveryBySelfServiceSchema

#     @swagger_auto_schema(request_body=SelfServiceUpdateMealTransactionXSerializer)
#     def post(self, request):
#         print('start serializer', datetime.now().time())

#         company = get_company(self.request)
#         if company is not None:
#             serializer = SelfServiceUpdateMealTransactionXSerializer(data=request.data)
#             if serializer.is_valid():

#                 device_id = serializer.validated_data['device_id']
#                 verification_type = serializer.validated_data['verification_type']
#                 user_id = serializer.validated_data['user_id']
#                 delivery_date = datetime.now().date()
#                 # delivery_date = "2021-10-01"
#                 try:
#                     device = get_object_or_404(Device, device_id=device_id, company=company)
#                     is_active = device.is_active
#                     device_iid = device.id
#                     device_comp = device.company_id

#                     user = get_object_or_404(User, id=user_id)
#                     user_company = user.company_id

#                 except:
#                     is_active = None
#                     device_iid = 0
#                     return Response({
#                         "code": 400,
#                         "status": "Failed",
#                         "message": "Device does not exist, contact admin"
#                     }, status=status.HTTP_409_CONFLICT)

#                 if device_comp == user_company:

#                     if is_active:
#                         vendor_names = []
#                         receipts_id = {}
#                         receipts = []
#                         vendor_users = {}
#                         delivery_status = {}
#                         is_receipt_id = []

#                         is_receipt = MealTransaction.objects.filter(user=user,
#                                                                     delivery_date=delivery_date).values(
#                             "receipt_no").distinct()
#                         print('is_receipt', is_receipt)
#                         for rect in is_receipt:
#                             if rect['receipt_no'] is not None:
#                                 is_receipt_id.append(rect['receipt_no'])
#                             print('rec_no', is_receipt_id)

#                         if not is_receipt_id:
#                             vendors_user_id = MealTransaction.objects.filter(user=user,
#                                                                              delivery_date=delivery_date,
#                                                                              status='pending').values(
#                                 "vendor_user_id").distinct()

#                             for vendor_user_id in vendors_user_id:
#                                 vend_user_id = vendor_user_id['vendor_user_id']
#                                 # rec = Receipts()
#                                 rec = Receipts.objects.create()
#                                 print('rec_id', rec.id)

#                                 vendor_first_name = \
#                                     User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
#                                         'first_name']
#                                 vendor_last_name = \
#                                     User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
#                                         'last_name']
#                                 vendor_name = vendor_first_name + ' ' + vendor_last_name
#                                 vendor_names.append(vendor_name)
#                                 receipts_id[vend_user_id] = rec.id

#                                 vendor_users[vend_user_id] = vendor_name

#                             meals_ordered = MealTransaction.objects.filter(user=user, delivery_date=delivery_date,
#                                                                            status='pending').values("id", "vendor_user_id",
#                                                                                                  "user_id",
#                                                                                                  "total", "sub_total",
#                                                                                                  "company_id",
#                                                                                                  "company_amount",
#                                                                                                  "personal_amount",
#                                                                                                  "service_fee")

#                             for meal_ordered in meals_ordered:
#                                 # Update Meal Transaction Model
#                                 meal = get_object_or_404(MealTransaction, id=meal_ordered["id"])
#                                 meal.delivered_date = datetime.now().date()
#                                 meal.delivered_time = datetime.now().time()
#                                 meal.status = 'delivered'
#                                 meal.self_service_device_id = device_iid
#                                 meal.verification_type = verification_type
#                                 meal.receipt_no_id = receipts_id[meal_ordered["vendor_user_id"]]
#                                 meal.save()

#                                 print('meal order  delivered with receipt no.: ' + str(receipts_id[
#                                                                                            meal_ordered[
#                                                                                                "vendor_user_id"]]) + ' and txn_id: ' + str(
#                                     meal_ordered["id"]))

#                                 # Vendor Credit
#                                 vendor_user = get_object_or_404(User, id=meal_ordered['vendor_user_id'])
#                                 vendor_bal = vendor_user.balance
#                                 print('vendor balance before txn: ', vendor_bal)
#                                 vendor_user.balance = vendor_bal + meal_ordered['sub_total']
#                                 vendor_user.save()
#                                 print('vendor balance after txn: ', vendor_user.balance)

#                                 # SID Credit
#                                 the_sid_user = get_object_or_404(GlobalVariable, variable_name='sid')
#                                 sid_user_id = int(the_sid_user.variable_text)
#                                 sid_user = get_object_or_404(User, id=sid_user_id)
#                                 sid_bal = sid_user.balance
#                                 print('sid balance before txn: ', sid_bal)
#                                 sid_user.balance = sid_bal + meal_ordered['service_fee']
#                                 sid_user.save()
#                                 print('sid balance after txn: ', sid_user.balance)

#                                 # Company Debit
#                                 comp_user = get_object_or_404(Company, id=meal_ordered['company_id'])
#                                 comp_bal = comp_user.balance
#                                 print('company balance before txn: ', comp_bal)
#                                 comp_user.balance = comp_bal - meal_ordered['company_amount']
#                                 comp_user.sid_balance = comp_user.sid_balance + meal_ordered['service_fee']
#                                 comp_user.save()
#                                 print('company balance after txn: ', comp_user.balance)

#                                 # Staff Debit if personal fund was used
#                                 staff_user = get_object_or_404(User, id=meal_ordered['user_id'])
#                                 staff_bal = staff_user.balance
#                                 print('staff balance before txn: ', staff_bal)
#                                 staff_user.balance = staff_bal - meal_ordered['personal_amount']
#                                 staff_user.save()
#                                 print('staff balance after txn: ', staff_user.balance)

#                             # Generate receipt
#                             # Step 1 : Get the staff name
#                             staff_first_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
#                                 'first_name']
#                             staff_last_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
#                                 'last_name']
#                             staff_name = staff_first_name + ' ' + staff_last_name
#                             print('staff name', staff_name)
#                             print('receipts', receipts)

#                             # Add  receipt
#                             for vendor_user, vendor_name in vendor_users.items():
#                                 receipt = {}
#                                 receipt['vendor'] = vendor_name
#                                 total = MealTransaction.objects.filter(user=user, delivery_date=delivery_date,
#                                                                        vendor_user_id=vendor_user,
#                                                                        status='delivered').aggregate(TOTAL=Sum('total'))[
#                                     'TOTAL']
#                                 receipt['total'] = total
#                                 receipt['receipt_no'] = receipts_id[vendor_user]
#                                 receipt['orders'] = ' '
#                                 print('first receipt', receipt)
#                                 receipts.append(receipt)
#                             print('the receipts', receipts)
#                             meal_delivered_orders = MealTransaction.objects.filter(user=user,
#                                                                                    delivery_date=delivery_date,
#                                                                                    status='delivered').values("receipt_no",
#                                                                                                         "vendor_user_id",
#                                                                                                         "user_id",
#                                                                                                         "food",
#                                                                                                         "unit_price",
#                                                                                                         "quantity",
#                                                                                                         "total",
#                                                                                                         "sub_total",
#                                                                                                         "company_amount",
#                                                                                                         "personal_amount",
#                                                                                                         "service_fee")
#                             for meal_delivered_order in meal_delivered_orders:

#                                 food = get_object_or_404(Food, id=meal_delivered_order['food'])
#                                 food_name = food.name

#                                 meal = food_name + "  " + str(meal_delivered_order['unit_price']) + "  " + str(
#                                     meal_delivered_order[
#                                         'quantity']) + "  " + str(meal_delivered_order['total']) + " \n "

#                                 print('receipts', receipts)

#                                 for vend_user, vend_name in vendor_users.items():
#                                     if vend_user == meal_delivered_order['vendor_user_id']:
#                                         for rec in (receipts):
#                                             print('rec: ', rec)
#                                             if rec['vendor'] == vend_name:
#                                                 rec['orders'] = rec['orders'] + meal
#                             return Response(
#                                 {'code': 200,
#                                  'staff': staff_name,
#                                  'vendor_receipts': receipts}, status=status.HTTP_200_OK)

#                         else:
#                             print('end serializer', datetime.now().time())

#                             return Response(
#                                 {'code': 400,
#                                  'message': 'Order Already delivered',
#                                  'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

#                     elif is_active is False:
#                         return Response(
#                             {'code': 400,
#                              'message': 'Device is Deactivated',
#                              'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

#                     else:
#                         print('end serializer', datetime.now().time())

#                         return Response(
#                             {'code': 400,
#                              'message': 'Device is Invalid',
#                              'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
#                 else:
#                     print('end serializer', datetime.now().time())

#                     return Response(
#                         {'code': 400,
#                          'message': 'Device cannot be used by this staff',
#                          'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
#             else:
#                 return Response(serializer.custom_full_errors, status=status.HTTP_400_BAD_REQUEST)

#         raise ValidationError('Include App Id in request header')


@method_decorator(
    name='post', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class MealDeliveryBySelfServiceXView(views.APIView):
    # permission_classes = (AllowAny,)
    schema = MealDeliveryBySelfServiceSchema

    @swagger_auto_schema(request_body=SelfServiceUpdateMealTransactionXSerializer)
    def post(self, request):
        print('start serializer', datetime.now().time())
        print(request)
        company = get_company(self.request)
        if company is not None:
            serializer = SelfServiceUpdateMealTransactionXSerializer(data=request.data)
            if serializer.is_valid():

                device_id = serializer.validated_data['device_id']
                verification_type = serializer.validated_data['verification_type']
                user_id = serializer.validated_data['user_id']
                delivery_date = datetime.now().date()
                # delivery_date = "2021-10-01"
                try:
                    device = get_object_or_404(Device, device_iid=device_id, company=company)
                    is_active = device.is_active
                    device_iid = device.id
                    device_comp = device.company_id

                    user = get_object_or_404(User, id=user_id)
                    user_company = user.company_id

                except:
                    is_active = None
                    device_iid = 0
                    return Response({
                        "code": 400,
                        "status": "Failed",
                        "message": "Device does not exist, contact admin"
                    }, status=status.HTTP_400_BAD_REQUEST)

                if device_comp == user_company:

                    if is_active:
                        vendor_names = []
                        receipts_id = {}
                        receipts = []
                        vendor_users = {}
                        delivery_status = {}
                        is_receipt_id = []

                        is_receipt = MealTransaction.objects.filter(user=user,
                                                                    delivery_date=delivery_date).values(
                            "receipt_no").distinct()
                        print('is_receipt', is_receipt)
                        for rect in is_receipt:
                            if rect['receipt_no'] is not None:
                                is_receipt_id.append(rect['receipt_no'])
                            print('rec_no', is_receipt_id)

                        # if not is_receipt_id:
                        vendors_user_id = MealTransaction.objects.filter(user=user,
                                                                         delivery_date=delivery_date,
                                                                         status='pending').values(
                            "vendor_user_id").distinct()

                        for vendor_user_id in vendors_user_id:
                            vend_user_id = vendor_user_id['vendor_user_id']
                            # rec = Receipts()
                            rec = Receipts.objects.create()
                            print('rec_id', rec.id)

                            vendor_first_name = \
                                User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
                                    'first_name']
                            vendor_last_name = \
                                User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
                                    'last_name']
                            vendor_name = vendor_first_name + ' ' + vendor_last_name
                            vendor_names.append(vendor_name)
                            receipts_id[vend_user_id] = rec.id

                            vendor_users[vend_user_id] = vendor_name

                        meals_ordered = MealTransaction.objects.filter(user=user, delivery_date=delivery_date,
                                                                       status='pending').values("id", "vendor_user_id",
                                                                                             "user_id",
                                                                                             "total", "sub_total",
                                                                                             "company_id",
                                                                                             "company_amount",
                                                                                             "personal_amount",
                                                                                             "service_fee")

                        for meal_ordered in meals_ordered:
                            # Update Meal Transaction Model
                            meal = get_object_or_404(MealTransaction, id=meal_ordered["id"])
                            meal.delivered_date = datetime.now().date()
                            meal.delivered_time = datetime.now().time()
                            meal.status = 'delivered'
                            meal.self_service_device_id = device_iid
                            meal.verification_type = verification_type
                            meal.receipt_no_id = receipts_id[meal_ordered["vendor_user_id"]]
                            meal.save()

                            print('meal order  delivered with receipt no.: ' + str(receipts_id[
                                                                                       meal_ordered[
                                                                                           "vendor_user_id"]]) + ' and txn_id: ' + str(
                                meal_ordered["id"]))

                            # Vendor Credit
                            vendor_user = get_object_or_404(User, id=meal_ordered['vendor_user_id'])
                            vendor_bal = vendor_user.balance
                            print('vendor balance before txn: ', vendor_bal)
                            vendor_user.balance = vendor_bal + meal_ordered['sub_total']
                            vendor_user.save()
                            print('vendor balance after txn: ', vendor_user.balance)

                            # SID Credit
                            the_sid_user = get_object_or_404(GlobalVariable, variable_name='sid')
                            sid_user_id = int(the_sid_user.variable_text)
                            sid_user = get_object_or_404(User, id=sid_user_id)
                            sid_bal = sid_user.balance
                            print('sid balance before txn: ', sid_bal)
                            sid_user.balance = sid_bal + meal_ordered['service_fee']
                            sid_user.save()
                            print('sid balance after txn: ', sid_user.balance)

                            # Company Debit
                            comp_user = get_object_or_404(Company, id=meal_ordered['company_id'])
                            comp_bal = comp_user.balance
                            print('company balance before txn: ', comp_bal)
                            comp_user.balance = comp_bal - meal_ordered['company_amount']
                            comp_user.sid_balance = comp_user.sid_balance + meal_ordered['service_fee']
                            comp_user.save()
                            print('company balance after txn: ', comp_user.balance)

                            # Staff Debit if personal fund was used
                            staff_user = get_object_or_404(User, id=meal_ordered['user_id'])
                            staff_bal = staff_user.balance
                            print('staff balance before txn: ', staff_bal)
                            staff_user.balance = staff_bal - meal_ordered['personal_amount']
                            staff_user.save()
                            print('staff balance after txn: ', staff_user.balance)

                        # Generate receipt
                        # Step 1 : Get the staff name
                        staff_first_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
                            'first_name']
                        staff_last_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
                            'last_name']
                        staff_name = staff_first_name + ' ' + staff_last_name
                        print('staff name', staff_name)
                        print('receipts', receipts)

                        # Add  receipt
                        for vendor_user, vendor_name in vendor_users.items():
                            receipt = {}
                            receipt['vendor'] = vendor_name
                            total = MealTransaction.objects.filter(user=user, delivery_date=delivery_date,
                                                                   vendor_user_id=vendor_user,
                                                                   status='ticket-printed').aggregate(TOTAL=Sum('total'))[
                                'TOTAL']
                            receipt['total'] = total
                            receipt['receipt_no'] = receipts_id[vendor_user]
                            receipt['orders'] = ' '
                            receipt['the_orders']= []
                            print('first receipt', receipt)
                            receipts.append(receipt)

                        print('the receipts', receipts)
                        meal_delivered_orders = MealTransaction.objects.filter(user=user,
                                                                               delivery_date=delivery_date,
                                                                               status='delivered').values("receipt_no",
                                                                                                    "vendor_user_id",
                                                                                                    "user_id",
                                                                                                    "food",
                                                                                                    "unit_price",
                                                                                                    "quantity",
                                                                                                    "total",
                                                                                                    "sub_total",
                                                                                                    "company_amount",
                                                                                                    "personal_amount",
                                                                                                    "service_fee")
                        for meal_delivered_order in meal_delivered_orders:

                            food = get_object_or_404(Food, id=meal_delivered_order['food'])
                            food_name = food.name


                            # Returning order in strings
                            # meal = food_name + "  " + str(meal_delivered_order['unit_price']) + "  " + str(
                            #     meal_delivered_order[
                            #         'quantity']) + "  " + str(meal_delivered_order['total']) + " \n "
                            meal_object = {
                                 'food': food_name,
                                 'unit_price': meal_delivered_order['unit_price'],
                                 'quantity':  meal_delivered_order['quantity'],
                                 'total':   meal_delivered_order['total']
                            }
                            print('receipts', receipts)

                            for vend_user, vend_name in vendor_users.items():
                                if vend_user == meal_delivered_order['vendor_user_id']:
                                    for rec in (receipts):
                                        print('rec: ', rec)
                                        if rec['vendor'] == vend_name:
                                            # Returning order in strings
                                            # rec['orders'] = rec['orders'] + meal
                                            rec['the_orders'].append(meal_object)
                        return Response(
                            {'code': 200,
                             'staff': staff_name,
                             'vendor_receipts': receipts}, status=status.HTTP_200_OK)

                        # else:
                        #     print('end serializer', datetime.now().time())
                        #
                        #     return Response(
                        #         {'code': 400,
                        #          'message': 'Order Already delivered',
                        #          'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    elif is_active is False:
                        return Response(
                            {'code': 400,
                             'message': 'Device is Deactivated',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    else:
                        print('end serializer', datetime.now().time())

                        return Response(
                            {'code': 400,
                             'message': 'Device is Invalid',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    print('end serializer', datetime.now().time())

                    return Response(
                        {'code': 400,
                         'message': 'Device cannot be used by this staff',
                         'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.custom_full_errors, status=status.HTTP_400_BAD_REQUEST)

        raise ValidationError('Include App Id in request header')

#Not in use
class Not_MealDeliveryBySelfServiceWithoutDeliveryView(views.APIView):
    # permission_classes = (AllowAny,)
    schema = MealDeliveryBySelfServiceSchema

    @swagger_auto_schema(request_body=SelfServiceUpdateMealTransactionXSerializer)
    def post(self, request):
        print('start serializer', datetime.now().time())

        company = get_company(self.request)
        if company is not None:
            serializer = SelfServiceUpdateMealTransactionXSerializer(data=request.data)
            if serializer.is_valid():

                device_id = serializer.validated_data['device_id']
                verification_type = serializer.validated_data['verification_type']
                user_id = serializer.validated_data['user_id']
                # delivery_date = '2021-12-21'
                delivery_date = datetime.now().date()
               
                try:
                    device = get_object_or_404(Device, device_iid=device_id, company=company)
                    is_active = device.is_active
                    device_iid = device.id
                    device_comp = device.company_id

                    user = get_object_or_404(User, id=user_id)
                    user_company = user.company_id

                except:
                    is_active = None
                    device_iid = 0
                    return Response({
                        "code": 400,
                        "status": "Failed",
                        "message": "Device does not exist, contact admin"
                    }, status=status.HTTP_400_BAD_REQUEST)

                if device_comp == user_company:

                    if is_active:
                        vendor_names = []
                        receipts_id = {}
                        receipts = []
                        vendor_users = {}
                        delivery_status = {}
                        is_receipt_id = []

                        is_receipt = MealTransaction.objects.filter(user=user,
                                                                    delivery_date=delivery_date).values(
                            "receipt_no").distinct()

                            
                        the_receipts_id = MealTransaction.objects.filter(user=user, status='pending',
                                                                    delivery_date=delivery_date).values(
                            "receipt_no","vendor_user_id").distinct()
                        print('rec_id:',the_receipts_id)
                        print('is_receipt', is_receipt)
                        for rect in the_receipts_id:
                            if rect['receipt_no'] is not None:
                                is_receipt_id.append(rect['receipt_no'])
                            print('rec_no', is_receipt_id)


                        vendors_user_id = MealTransaction.objects.filter(user=user,
                                                                         delivery_date=delivery_date,
                                                                         status='pending').values(
                            "vendor_user_id","receipt_no_id").distinct()

                        for vendor_user_id in vendors_user_id:
                            vend_user_id = vendor_user_id['vendor_user_id']
                            # rec = Receipts()
                            if not is_receipt_id:

                                rec = Receipts.objects.create()
                                the_rec = rec.id
                            else:

                                the_rec  = vendor_user_id['receipt_no_id']

                            rec = Receipts.objects.create()
                            print('new_rec_id', rec.id)

                            vendor_first_name = \
                                User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
                                    'first_name']
                            vendor_last_name = \
                                User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
                                    'last_name']
                            vendor_name = vendor_first_name + ' ' + vendor_last_name
                            vendor_names.append(vendor_name)
                            print('vendor_user_id:',vend_user_id)
                            print('receipts_id:',receipts_id)
                            print('the_rec:',the_rec)
                            receipts_id[vend_user_id] = the_rec

                            vendor_users[vend_user_id] = vendor_name

                        meals_ordered = MealTransaction.objects.filter(user_id=20, delivery_date='2021-12-22',
                                                                       status='pending').values("id", "vendor_user_id",
                                                                                             "user_id",
                                                                                             "total", "sub_total",
                                                                                             "company_id",
                                                                                             "company_amount",
                                                                                             "personal_amount",
                                                                                             "service_fee",
                                                                                                "receipt_no")
                        # if not meals_ordered :
                        # return Response({
                        #     "code": 400,
                        #     "status": "error",
                        #     "message": "No Order is pending for current day"
                        # }, status=status.HTTP_400_BAD_REQUEST)
                        # else:
                        print('receipt:', receipts_id)
                        print('meals ordered:', meals_ordered)
                        if meals_ordered:
                            for meal_ordered in meals_ordered:
                                print('meal ordered:',meal_ordered)
                                # Update Meal Transaction Model
                                meal = get_object_or_404(MealTransaction, id=meal_ordered["id"])
                                meal.status = 'ticket-printed'
                                meal.self_service_device_id = device_iid
                                meal.verification_type = verification_type
                                print (meal_ordered['vendor_user_id'])
                                print ('receipts_id:',receipts_id)
                                meal.receipt_no_id = receipts_id[meal_ordered["vendor_user_id"]]
                                meal.save()

                                print('meal order  delivered with receipt no.: ' + str(receipts_id[
                                                                   meal_ordered[
                                                                       "vendor_user_id"]]) + ' and txn_id: ' + str(
                                    meal_ordered["id"]))

                                # # Vendor Credit
                                # vendor_user = get_object_or_404(User, id=meal_ordered['vendor_user_id'])
                                # vendor_bal = vendor_user.balance
                                # print('vendor balance before txn: ', vendor_bal)
                                # vendor_user.balance = vendor_bal + meal_ordered['sub_total']
                                # vendor_user.save()
                                # print('vendor balance after txn: ', vendor_user.balance)
                                #
                                # # SID Credit
                                # the_sid_user = get_object_or_404(GlobalVariable, variable_name='sid')
                                # sid_user_id = int(the_sid_user.variable_text)
                                # sid_user = get_object_or_404(User, id=sid_user_id)
                                # sid_bal = sid_user.balance
                                # print('sid balance before txn: ', sid_bal)
                                # sid_user.balance = sid_bal + meal_ordered['service_fee']
                                # sid_user.save()
                                # print('sid balance after txn: ', sid_user.balance)
                                #
                                # # Company Debit
                                # comp_user = get_object_or_404(Company, id=meal_ordered['company_id'])
                                # comp_bal = comp_user.balance
                                # print('company balance before txn: ', comp_bal)
                                # comp_user.balance = comp_bal - meal_ordered['company_amount']
                                # comp_user.sid_balance = comp_user.sid_balance + meal_ordered['service_fee']
                                # comp_user.save()
                                # print('company balance after txn: ', comp_user.balance)
                                #
                                # # Staff Debit if personal fund was used
                                # staff_user = get_object_or_404(User, id=meal_ordered['user_id'])
                                # staff_bal = staff_user.balance
                                # print('staff balance before txn: ', staff_bal)
                                # staff_user.balance = staff_bal - meal_ordered['personal_amount']
                                # staff_user.save()
                                # print('staff balance after txn: ', staff_user.balance)

                            # Generate receipt
                            # if not is_receipt_id:
                            #     the_status = 'ticket-printed'
                            # else:
                            #     the_status = 'pending'
                            # Step 1 : Get the staff name
                            staff_first_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
                                'first_name']
                            staff_last_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
                                'last_name']
                            staff_name = staff_first_name + ' ' + staff_last_name
                            print('staff name', staff_name)
                            print('receipts', receipts)

                            # Add  receipt
                            for vendor_user, vendor_name in vendor_users.items():
                                receipt = {}
                                receipt['vendor'] = vendor_name
                                total = MealTransaction.objects.filter(user=user, delivery_date=delivery_date,vendor_user_id=vendor_user,status='ticket-printed').aggregate(TOTAL=Sum('total'))[
                                    'TOTAL']
                                receipt['total'] = total
                                receipt['receipt_no'] = receipts_id[vendor_user]
                                receipt['orders'] = ' '
                                receipt['the_orders']= []
                                print('first receipt', receipt)
                                receipts.append(receipt)

                            print('the receipts', receipts)
                            meal_delivered_orders = MealTransaction.objects.filter(user=user,
                                                                                   delivery_date=delivery_date,
                                                                                   status='ticket-printed').values("receipt_no",
                                                                                                        "vendor_user_id",
                                                                                                        "user_id",
                                                                                                        "food",
                                                                                                        "unit_price",
                                                                                                        "quantity",
                                                                                                        "total",
                                                                                                        "sub_total",
                                                                                                        "company_amount",
                                                                                                        "personal_amount",
                                                                                                        "service_fee")
                            for meal_delivered_order in meal_delivered_orders:

                                food = get_object_or_404(Food, id=meal_delivered_order['food'])
                                food_name = food.name


                                # Returning order in strings
                                # meal = food_name + "  " + str(meal_delivered_order['unit_price']) + "  " + str(
                                #     meal_delivered_order[
                                #         'quantity']) + "  " + str(meal_delivered_order['total']) + " \n "
                                meal_object = {
                                     'food': food_name,
                                     'unit_price': meal_delivered_order['unit_price'],
                                     'quantity':  meal_delivered_order['quantity'],
                                     'total':   meal_delivered_order['total']
                                }
                                print('receipts', receipts)

                                for vend_user, vend_name in vendor_users.items():
                                    if vend_user == meal_delivered_order['vendor_user_id']:
                                        for rec in (receipts):
                                            print('rec: ', rec)
                                            if rec['vendor'] == vend_name:
                                                # Returning order in strings
                                                # rec['orders'] = rec['orders'] + meal
                                                rec['the_orders'].append(meal_object)
                            return Response(
                                {'code': 200,
                                 'staff': staff_name,
                                 'vendor_receipts': receipts}, status=status.HTTP_200_OK)

                                # else:
                                #     print('end serializer', datetime.now().time())
                                #
                                #     return Response(
                                #         {'code': 400,
                                #          'message': 'Order Already delivered',
                                #          'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            return Response(
                                {'code': 400,
                                 'message': 'No pending Order',
                                 'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    elif is_active is False:
                        return Response(
                            {'code': 400,
                             'message': 'Device is Deactivated',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    else:
                        print('end serializer', datetime.now().time())

                        return Response(
                            {'code': 400,
                             'message': 'Device is Invalid',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    print('end serializer', datetime.now().time())

                    return Response(
                        {'code': 400,
                         'message': 'Device cannot be used by this staff',
                         'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.custom_full_errors, status=status.HTTP_400_BAD_REQUEST)

        raise ValidationError('Include App Id in request header')


class MealDeliveryBySelfServiceWithoutDeliveryView(views.APIView):
    # permission_classes = (AllowAny,)
    schema = MealDeliveryBySelfServiceSchema

    @swagger_auto_schema(request_body=SelfServiceUpdateMealTransactionXSerializer)
    def post(self, request):
        print('start serializer', datetime.now().time())
        print(request.data, request.headers, '*********')
        company = get_company(self.request)
        if company is not None:
            serializer = SelfServiceUpdateMealTransactionXSerializer(data=request.data)
            if serializer.is_valid():

                device_id = serializer.validated_data['device_id']
                verification_type = serializer.validated_data['verification_type']
                user_id = serializer.validated_data['user_id']
                
                delivery_date = datetime.now().date()
               
                try:
                    device = get_object_or_404(Device, device_iid=device_id, company=company)
                    is_active = device.is_active
                    device_iid = device.id
                    device_comp = device.company_id

                    user = get_object_or_404(User, id=user_id)
                    user_company = user.company_id

                except:
                    is_active = None
                    device_iid = 0
                    return Response({
                        "code": 400,
                        "status": "Failed",
                        "message": "Device does not exist, contact admin"
                    }, status=status.HTTP_400_BAD_REQUEST)

                if device_comp == user_company:

                    if is_active:
                        vendor_names = []
                        receipts_id = {}
                        receipts = []
                        vendor_users = {}
                        delivery_status = {}
                        is_receipt_id = []

                        is_receipt = MealTransaction.objects.filter(user=user,
                                                                    delivery_date=delivery_date).values(
                            "receipt_no").distinct()

                            
                        the_receipts_id = MealTransaction.objects.filter(user=user, status='pending',
                                                                    delivery_date=delivery_date).values(
                            "receipt_no","vendor_user_id").distinct()
                        
                        print('delivery_date:',user.id, delivery_date)
                        print('rec_id:',the_receipts_id)
                        print('is_receipt', is_receipt)
                        for rect in the_receipts_id:
                            if rect['receipt_no'] is not None:
                                is_receipt_id.append(rect['receipt_no'])
                            print('rec_no', is_receipt_id)


                        vendors_user_id = MealTransaction.objects.filter(user=user,
                                                                         delivery_date=delivery_date,
                                                                         status='pending').values(
                            "vendor_user_id","receipt_no_id").distinct()

                        for vendor_user_id in vendors_user_id:
                            vend_user_id = vendor_user_id['vendor_user_id']
                            # rec = Receipts()
                            if not is_receipt_id:

                                rec = Receipts.objects.create()
                                the_rec = rec.id
                            else:

                                the_rec  = vendor_user_id['receipt_no_id']

                            

                            vendor_first_name = \
                                User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
                                    'first_name']
                            vendor_last_name = \
                                User.objects.filter(id=vend_user_id).values('first_name', 'last_name')[0][
                                    'last_name']
                            u = Vendor.objects.get(user_id=vend_user_id)
                            vendor_name = u.bussiness_name.upper()
                            # vendor_name = vendor_first_name + ' ' + vendor_last_name
                            vendor_names.append(vendor_name)
                            print('vendor_user_id:',vend_user_id)
                            print('receipts_id:',receipts_id)
                            print('the_rec:',the_rec)
                            receipts_id[vend_user_id] = the_rec

                            vendor_users[vend_user_id] = vendor_name

                        meals_ordered = MealTransaction.objects.filter(user =user, delivery_date=delivery_date,
                                                                       status='pending').values("id", "vendor_user_id",
                                                                                             "user_id",
                                                                                             "total", "sub_total",
                                                                                             "company_id",
                                                                                             "company_amount",
                                                                                             "personal_amount",
                                                                                             "service_fee",
                                                                                                "receipt_no")
                        # if not meals_ordered :
                        # return Response({
                        #     "code": 400,
                        #     "status": "error",
                        #     "message": "No Order is pending for current day"
                        # }, status=status.HTTP_400_BAD_REQUEST)
                        # else:
                        print('receipt:', receipts_id)
                        print('meals ordered:', meals_ordered)
                        if meals_ordered:
                            meal_ids= []
                            for meal_ordered in meals_ordered:
                                print('meal ordered:',meal_ordered)
                                # Update Meal Transaction Model
                                meal = get_object_or_404(MealTransaction, id=meal_ordered["id"])
                                meal.delivered_date = datetime.now().date()
                                meal.delivered_time = datetime.now().time()
                                meal.status = 'ticket-printed'
                                meal.self_service_device_id = device_iid
                                meal.verification_type = verification_type
                                print (meal_ordered['vendor_user_id'])
                                print ('receipts_id:',receipts_id)
                                meal.receipt_no_id = receipts_id[meal_ordered["vendor_user_id"]]
                                meal.save()
                                meal_ids.append(meal.id)

                                print('meal order  delivered with receipt no.: ' + str(receipts_id[
                                                                   meal_ordered[
                                                                       "vendor_user_id"]]) + ' and txn_id: ' + str(
                                    meal_ordered["id"]))

                                # # Vendor Credit
                                # vendor_user = get_object_or_404(User, id=meal_ordered['vendor_user_id'])
                                # vendor_bal = vendor_user.balance
                                # print('vendor balance before txn: ', vendor_bal)
                                # vendor_user.balance = vendor_bal + meal_ordered['sub_total']
                                # vendor_user.save()
                                # print('vendor balance after txn: ', vendor_user.balance)
                                #
                                # # SID Credit
                                # the_sid_user = get_object_or_404(GlobalVariable, variable_name='sid')
                                # sid_user_id = int(the_sid_user.variable_text)
                                # sid_user = get_object_or_404(User, id=sid_user_id)
                                # sid_bal = sid_user.balance
                                # print('sid balance before txn: ', sid_bal)
                                # sid_user.balance = sid_bal + meal_ordered['service_fee']
                                # sid_user.save()
                                # print('sid balance after txn: ', sid_user.balance)
                                #
                                # # Company Debit
                                # comp_user = get_object_or_404(Company, id=meal_ordered['company_id'])
                                # comp_bal = comp_user.balance
                                # print('company balance before txn: ', comp_bal)
                                # comp_user.balance = comp_bal - meal_ordered['company_amount']
                                # comp_user.sid_balance = comp_user.sid_balance + meal_ordered['service_fee']
                                # comp_user.save()
                                # print('company balance after txn: ', comp_user.balance)
                                #
                                # # Staff Debit if personal fund was used
                                # staff_user = get_object_or_404(User, id=meal_ordered['user_id'])
                                # staff_bal = staff_user.balance
                                # print('staff balance before txn: ', staff_bal)
                                # staff_user.balance = staff_bal - meal_ordered['personal_amount']
                                # staff_user.save()
                                # print('staff balance after txn: ', staff_user.balance)

                            # Generate receipt
                           
                            # Step 1 : Get the staff name
                            staff_first_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
                                'first_name']
                            staff_last_name = User.objects.filter(id=user_id).values('first_name', 'last_name')[0][
                                'last_name']
                            staff_name = staff_first_name + ' ' + staff_last_name
                            print('staff name', staff_name)
                            print('receipts', receipts)

                            # Add  receipt
                            for vendor_user, vendor_name in vendor_users.items():
                                receipt = {}
                                receipt['vendor'] = vendor_name
                                total = MealTransaction.objects.filter(user=user,id__in=meal_ids, delivery_date=delivery_date,vendor_user_id=vendor_user,status='ticket-printed').aggregate(TOTAL=Sum('total'))[
                                    'TOTAL']
                                receipt['total'] = total
                                receipt['receipt_no'] = receipts_id[vendor_user]
                                receipt['orders'] = ' '
                                receipt['the_orders']= []
                                print('first receipt', receipt)
                                receipts.append(receipt)

                            print('the receipts', receipts)
                            meal_delivered_orders = MealTransaction.objects.filter(user=user,id__in=meal_ids,
                                                                                   delivery_date=delivery_date,
                                                                                   status='ticket-printed').values("receipt_no",
                                                                                                        "vendor_user_id",
                                                                                                        "user_id",
                                                                                                        "food",
                                                                                                        "unit_price",
                                                                                                        "quantity",
                                                                                                        "total",
                                                                                                        "sub_total",
                                                                                                        "company_amount",
                                                                                                        "personal_amount",
                                                                                                        "service_fee",
                                                                                                        "meal_type__name")
                            for meal_delivered_order in meal_delivered_orders:

                                food = get_object_or_404(Food, id=meal_delivered_order['food'])
                                food_name = food.name


                                # Returning order in strings
                                # meal = food_name + "  " + str(meal_delivered_order['unit_price']) + "  " + str(
                                #     meal_delivered_order[
                                #         'quantity']) + "  " + str(meal_delivered_order['total']) + " \n "
                                meal_object = {
                                     'food': food_name,
                                     'unit_price': meal_delivered_order['unit_price'],
                                     'quantity':  meal_delivered_order['quantity'],
                                     'total':   meal_delivered_order['total'],
                                     'meal_type': meal_delivered_order['meal_type__name']
                                }
                                print('receipts', receipts)

                                for vend_user, vend_name in vendor_users.items():
                                    if vend_user == meal_delivered_order['vendor_user_id']:
                                        for rec in (receipts):
                                            print('rec: ', rec)
                                            if rec['vendor'] == vend_name:
                                                # Returning order in strings
                                                # rec['orders'] = rec['orders'] + meal
                                                rec['the_orders'].append(meal_object)
                            return Response(
                                {'code': 200,
                                 'staff': staff_name,
                                 'vendor_receipts': receipts}, status=status.HTTP_200_OK)

                                # else:
                                #     print('end serializer', datetime.now().time())
                                #
                                #     return Response(
                                #         {'code': 400,
                                #          'message': 'Order Already delivered',
                                #          'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            return Response(
                                {'code': 400,
                                 'message': 'No pending Order',
                                 'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    elif is_active is False:
                        return Response(
                            {'code': 400,
                             'message': 'Device is Deactivated',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    else:
                        print('end serializer', datetime.now().time())

                        return Response(
                            {'code': 400,
                             'message': 'Device is Invalid',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    print('end serializer', datetime.now().time())

                    return Response(
                        {'code': 400,
                         'message': 'Device cannot be used by this staff',
                         'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(serializer.custom_full_errors, status=status.HTTP_400_BAD_REQUEST)

        raise ValidationError('Include App Id in request header')

class VendorConfirmOrderView(views.APIView):
    schema = VendorConfirmDeliverySchema

    @swagger_auto_schema(request_body=VendorConfirmDeliverySerializer)
    def post(self,request):
        company = get_company(self.request)
        user_group = request.user.groups.all()[0].name
        if company is not None:
            serializer = VendorConfirmDeliverySerializer(data=request.data)
            if serializer.is_valid():
                receipt_id = serializer.validated_data['receipt_id']
                del_user = request.user
                user_group = request.user.groups.all()[0].name

                if  user_group =='ven':  # If it is the vendor that confirms delivery ( allow only ticket-printed status)
                    v = Vendor.objects.get(user =request.user)
                    if v.is_allow_any_day_ticket_scan:
                        meals_ordered = MealTransaction.objects.filter(company=del_user.company,vendor_user_id=del_user,receipt_no=receipt_id,status='ticket-printed').values("id", "status","vendor_user_id","user_id","personal_amount","company_amount","sub_total","company_id","service_fee","meal_type__name")
                    else:
                        meals_ordered = MealTransaction.objects.filter(delivery_date=datetime.now().date(),company=del_user.company,vendor_user_id=del_user,receipt_no=receipt_id,status='ticket-printed').values("id", "status","vendor_user_id","user_id","personal_amount","company_amount","sub_total","company_id","service_fee","meal_type__name")

                    meal_status = 'delivered'
                elif user_group == 'cmp_adm':  # For Company admin to delivery the food for the vendor for staff that did not deliver it nor cancel    
                    meals_ordered = MealTransaction.objects.filter(Q(status='ticket-printed')  | Q(status='pending')).filter(company=del_user.company,id=receipt_id).values("id", "status","vendor_user_id","user_id","personal_amount","company_amount","sub_total","company_id","service_fee","meal_type__name")
                    meal_status = 'force-delivered'
                else:
                    return Response({
                    "code": 401,
                    "status": "invalid",
                    "message": "Unauthorized User"
                }, status=status.HTTP_401_UNAUTHORIZED)
                
                if meals_ordered :
                    

                    for meal_ordered in meals_ordered:
                        # Update Meal Transaction Model
                        meal = get_object_or_404(MealTransaction, id=meal_ordered["id"])
                        meal.delivered_date = datetime.now().date()
                        meal.delivered_time = datetime.now().time()
                        meal.status = meal_status
                        meal.save()

                        # Vendor Credit
                        vendor_user = get_object_or_404(User, id=meal_ordered['vendor_user_id'])
                        vendor_bal = vendor_user.balance
                        print('vendor balance before txn: ', vendor_bal)
                        vendor_user.balance = vendor_bal + meal_ordered['sub_total']
                        vendor_user.save()
                        print('vendor balance after txn: ', vendor_user.balance)

                        

                        # Company Debit
                        comp_user = get_object_or_404(Company, id=meal_ordered['company_id'])
                        comp_bal = comp_user.balance
                        print('company balance before txn: ', comp_bal)
                        comp_user.balance = comp_bal - meal_ordered['company_amount']
                        # SID Credit
                        print('sid balance before txn: ', comp_user.sid_balance)
                        comp_user.sid_balance = comp_user.sid_balance + meal_ordered['service_fee']
                        comp_user.save()
                        print('company balance after txn: ', comp_user.balance)
                        print('sid balance after txn: ', comp_user.sid_balance)

                        # Staff Debit if personal fund was used
                        staff_user = get_object_or_404(User, id=meal_ordered['user_id'])
                        staff_bal = staff_user.balance
                        print('staff balance before txn: ', staff_bal)
                        staff_user.balance = staff_bal - meal_ordered['personal_amount']
                        staff_user.save()
                        print('staff balance after txn: ', staff_user.balance)

                    return Response({
                        "code": 200,
                        "status": "valid",
                        "message": "Order Successfully Delivered"
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        "code": 400,
                        "status": "invalid",
                        "message": "Meal Ticket Already Used or Invalid Ticket "
                    }, status=status.HTTP_400_BAD_REQUEST)
                    
            else:
                    return Response({
                        "code": 400,
                        "status": "invalid",
                        "message": "Invalid Data Passed"
                    }, status=status.HTTP_400_BAD_REQUEST)


# Get TOP -UP FOR STAFF OR COMPANY
@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class GetTopUpCodeView(views.APIView):
    # permission_classes = (AllowAny,)
    schema = GetTopUpCodeSchema

    def get(self, request):
        start = datetime.now().time()
        print('start generate code', start)
        company = get_company(self.request)
        if company is not None:
            random_val = get_random_string(20)
            user = request.user

            print('user', user)
            user_comp = user.company.id
            # comp_name = user.company.name.replace(' ','')
            comp_name = user.company.app_key
            comp_id = get_company_id(request)

            if user_comp == comp_id:
                user_group = request.user.groups.all()[0].name
                if user_group == 'emp':
                    ref = comp_name + '-EMP-' + random_val + '-' + str(user_comp)
                    end = datetime.now().time()
                    print('end generate code', end)
                    return Response(
                        {'code': 200,
                         'ref': ref
                         }, status=status.HTTP_200_OK)


                elif user_group == 'cmp_act':
                    ref = comp_name + '-COMP-' + random_val + '-' + str(user_comp)
                    end = datetime.now().time()
                    print('end generate code', end)
                    return Response(
                        {'code': 200,
                         'ref': ref
                         }, status=status.HTTP_200_OK)

                else:
                    end = datetime.now().time()
                    print('end generate code', end)
                    return Response(
                        {'code': 400,
                         'message': 'This User cannot Top-up',
                         'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                end = datetime.now().time()
                print('end generate code', end)
                return Response(
                    {'code': 400,
                     'message': 'Invalid User Company ',
                     'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

        raise ValidationError('Include App Id in request header')


class CheckPaystacWalletBalance(views.APIView):
    schema = CashoutViewSchema
    def get(self, request):
        company_id = request.GET.get('comp_id')
        user = request.user
        user_group = request.user.groups.all()[0].name
        company_id = user.company.id if user_group != 'sid' else company_id
        paystack_key = get_company_paystack(company_id)
        if not paystack_key:
            return Response(
                {'code': 400,
                 'message': 'Paystack configuration not found',
                 'resolve': 'Paystack configuration not dound'},
                status=status.HTTP_400_BAD_REQUEST)
        paystack_headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {paystack_key.private_key}'}
        paystack_request = requests.get(paystack_bal_url, headers=paystack_headers)
        if paystack_request.status_code != 200:
            return Response(
                {'code': 400,
                 'message': 'Paystack service not available',
                 'resolve': 'Paystack configuration not found'},
                status=status.HTTP_400_BAD_REQUEST)


        rr = requests.get(paystack_bal_url, headers=paystack_headers)
        return Response(
            {'code': 200,
             'message': 'result found ',
             'data': rr.json(),
             }, status=status.HTTP_200_OK)



class CashoutView(views.APIView):
    schema = CashoutViewSchema

    def get(self, request):
        start = datetime.now().time()
        print('start cashout', start)
        comp_param = request.GET.get('comp_id')
        random_val = get_random_string(20)
        user = request.user
        print('user', user)
        user_group = request.user.groups.all()[0].name
        user_id = user.id
        print('user group', user_group)
        # if user_group == 'sid':
        #     user_comp = 0
        #     comp_id = 0
        #     comp_name = 'SecureID'
        # else:
        user_ccomp=user.company
        user_comp = user.company.id if  user_group != 'sid' else None
        comp_id = get_company_id(request) if  user_group != 'sid' else None
        comp_name = user.company.name if  user_group != 'sid' else 'SIDA Admin'

        print('comp ', comp_name, comp_id)

        # the_sid_user = get_object_or_404(GlobalVariable, variable_name='sid')
        # print ('SID',)
        # sid_user_id = int(the_sid_user.variable_text)
        # sida = get_object_or_404(User, id=sid_user_id)
        
        # the_transfer_charge = get_object_or_404(GlobalVariable, variable_name='transfer_charge')
        # transfer_charge = float(the_transfer_charge.variable_text)
        
        print('Test A')

        # if user_comp == comp_id:
        #     print('Test B')

        # Company Cashout
        if (user_group == 'cmp_act') and (user_comp == comp_id):
            paystack_key = get_company_paystack(request.user.company)
            paystack_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {paystack_key.private_key}'}
            ref = comp_name + '-COMP-' + random_val + str(user_comp)
            comp = get_object_or_404(Company, id=user_comp)
            transfer_charge = paystack_transfer_charge(comp.balance)
            comp_balance = (comp.balance - transfer_charge) * 100  # Company bears the cost of their own cashout
            receipient_code = comp.transfer_recipient
            narration = comp.name + ' Wallet Balance Transfer  from Bucca Solution'

            payload = {'source': 'balance', 'reason': narration, 'amount': comp_balance,
                        'recipient': receipient_code, 'reference_no': ref}
            rr = requests.get(paystack_bal_url, headers=paystack_headers)
            bal_details = rr.json()
            main_bal = bal_details['data'][0]['balance']

            if main_bal > comp_balance:
                r = requests.post(paystack_transfer, data=json.dumps(payload), headers=paystack_headers)

                answer = r.json()
                print('Company Cashout Response: ', answer)

                if answer['status'] == False:
                    return Response({
                        'code': 400,
                        'message': answer['message'],
                        'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    the_status = answer['data']['status']
                    amount = answer['data']['amount'] / 100
                    recipient = answer['data']['recipient']
                    transfer_id = answer['data']['id']
                    reference_no = answer['data']['reference']
                    transfer_code = answer['data']['transfer_code']

                    if the_status.lower() == 'false':

                        return Response({
                            'code': 400,
                            'message': answer.message,
                            'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)


                    elif the_status.lower() == 'failed':
                        end = datetime.now().time()
                        print('end cashout', end)
                        return Response({
                            'code': 400,
                            'message': 'The  transfer  of ₦' + str(amount) + ' from the Bucca wallet failed',
                            'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    elif the_status.lower() == 'success':
                        # update balance and  Debit Company for the transfer charge
                        comp.balance = comp.balance - amount - transfer_charge
                        comp.save()

                        # Update Withdrawal history
                        comp_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                                                                                    transfer_id=transfer_id,
                                                                                    user_type='COMP',
                                                                                    withdrawal_charge=transfer_charge,
                                                                                    status=the_status,
                                                                                    reference_no=reference_no,
                                                                                    transfer_code=transfer_code,
                                                                                    recipient=recipient,
                                                                                    updated_status=the_status,
                                                                                    user=user, reason=narration,
                                                                                    account_debted_for_charge=comp.name + ' Company',
                                                                                    company=user_comp,
                                                                                    data=answer)
                        comp_withdrawalhistory.save()
                        end = datetime.now().time()
                        print('end cashout', end)

                        return Response(
                            {'code': 200,
                                'message': 'Your transfer  of ₦' + str(
                                    amount) + ' from the Bucca wallet was successful'
                                }, status=status.HTTP_200_OK)



                    else:
                        # update balance and  Debit Company for the transfer charge
                        comp.balance = comp.balance - amount - transfer_charge

                        # move to pending balance
                        comp.pending_balance = comp.pending_balance + amount + transfer_charge
                        comp.save()

                        # Update Withdrawal history
                        comp_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                                                                                    transfer_id=transfer_id,
                                                                                    user_type='COMP',
                                                                                    withdrawal_charge=transfer_charge,
                                                                                    status=the_status,
                                                                                    reference_no=reference_no,
                                                                                    transfer_code=transfer_code,
                                                                                    recipient=recipient,
                                                                                    updated_status=the_status,
                                                                                    user=user, reason=narration,
                                                                                    account_debted_for_charge=comp.name + ' Company',
                                                                                    company=user_comp,
                                                                                    data=answer)
                        comp_withdrawalhistory.save()

                        end = datetime.now().time()
                        print('end cashout', end)
                        return Response(
                            {'code': 200,
                                'message': 'The  transfer  of ₦' + str(
                                    amount) + ' from the Bucca wallet is being processed'
                                }, status=status.HTTP_200_OK)
            else:
                end = datetime.now().time()
                print('end cashout', end)
                return Response({
                    'code': 400,
                    'message': 'You Need to Top-up',
                    'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

        # Vendor Cashout
        elif (user_group == 'ven') and (user_comp == comp_id):
            print ('In vendor')
            cash_out_amount = request.GET.get('cash_out_amount')
            if not cash_out_amount:
                return Response(
                    {'code': 400,
                     'message': 'Cash amount  is required',
                     'resolve': 'Kindly provide the cash amount'},
                    status=status.HTTP_400_BAD_REQUEST)

            paystack_key = get_company_paystack(request.user.company)
            paystack_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {paystack_key.private_key}'}
            ref = comp_name + '-VEN-' + random_val + str(user_comp)
            ven_balance = user.balance
            if float(cash_out_amount) > ven_balance:
                return Response(
                    {'code': 400,
                     'message': 'Cash amount cannot be greater than total available  balance',
                     'resolve': 'Kindly provide cash amount less than or equal to your balance'},
                    status=status.HTTP_400_BAD_REQUEST)

            ven_balance = float(cash_out_amount) * 100
            vend_user = get_object_or_404(User, id=user.id)
            vend = get_object_or_404(Vendor, user_id=user.id)
            receipient_code = vend.transfer_recipient
            hold_status = vend.cash_hold
            vend_name = vend.bussiness_name
            narration = vend_name + ' Cashout from ' + comp_name + ' Bucca Solution'


            payload = {'source': 'balance', 'reason': narration, 'amount': ven_balance,
                        'recipient': receipient_code, 'reference_no': ref}

            rr = requests.get(paystack_bal_url, headers=paystack_headers)
            bal_details = rr.json()
            main_bal = bal_details['data'][0]['balance']
            print ('Bal:', main_bal, ven_balance)
            if not hold_status:
                print ('Not held')

                if main_bal > ven_balance:
                    r = requests.post(paystack_transfer, data=json.dumps(payload), headers=paystack_headers)
                    answer = r.json()
                    print(vend.bussiness_name, ' Vendor Cashout Response: ', answer)

                    if answer['status'] == False:

                        return Response({
                            'code': 400,
                            'message': answer['message'],
                            'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    else:

                        the_status = answer['data']['status']
                        amount = answer['data']['amount'] / 100
                        recipient = answer['data']['recipient']
                        transfer_id = answer['data']['id']
                        reference_no = answer['data']['reference']
                        transfer_code = answer['data']['transfer_code']
                        transfer_charge = paystack_transfer_charge(amount)
                        if the_status.lower() == 'false':
                            return Response({
                                'code': 400,
                                'message': answer.message,
                                'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                        elif the_status.lower() == 'failed':

                            end = datetime.now().time()
                            print('end cashout', end)
                            return Response({
                                'code': 400,
                                'message': 'Your Cashout of ₦' + str(
                                    amount) + 'from ' + comp_name + '  Bucca system failed',
                                'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                        elif the_status.lower() == 'success':
                            # update balance
                            vend_user.balance = vend_user.balance - amount
                            vend_user.save()

                            # Debit SID for the transfer charge
                            
                            user_ccomp.sid_balance = user_ccomp.sid_balance - transfer_charge
                            user_ccomp.save()
                            # sida.balance = sida.balance - transfer_charge
                            # sida.save()

                            # Update Withdrawal history
                            vend_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                                                                                        transfer_id=transfer_id,
                                                                                        user_type='VEN',
                                                                                        withdrawal_charge=transfer_charge,
                                                                                        status=the_status,
                                                                                        reference_no=reference_no,
                                                                                        transfer_code=transfer_code,
                                                                                        recipient=recipient,
                                                                                        updated_status=the_status,
                                                                                        user=user, reason=narration,
                                                                                        account_debted_for_charge='SIDD',
                                                                                        company=user_comp,
                                                                                        data=answer)
                            vend_withdrawalhistory.save()

                            end = datetime.now().time()
                            print('end cashout', end)
                            return Response(
                                {'code': 200,
                                    'message': 'Your Cashout of ₦' + str(
                                        amount) + 'from ' + comp_name + '  Bucca system was successful',
                                    }, status=status.HTTP_200_OK)


                        elif the_status.lower() == 'pending':
                            # update balance
                            vend_user.balance = vend_user.balance - amount
                            vend_user.save()

                            # Debit SID for the transfer charge
                            
                            # sida.balance = sida.balance - transfer_charge
                            # sida.save()

                            # move to pending balance for vendor
                            vend_user.pending_balance = vend_user.pending_balance + amount
                            vend_user.save()

                            # move transfer charge to sid pending balance
                            user_ccomp.sid_pending_balance = user_ccomp.sid_pending_balance + transfer_charge
                            

                            user_ccomp.sid_balance = user_ccomp.sid_balance - transfer_charge
                            user_ccomp.save()

                            # Update Withdrawal history
                            vend_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                                                                                        transfer_id=transfer_id,
                                                                                        user_type='VEN',
                                                                                        withdrawal_charge=transfer_charge,
                                                                                        status=the_status,
                                                                                        reference_no=reference_no,
                                                                                        transfer_code=transfer_code,
                                                                                        recipient=recipient,
                                                                                        updated_status=the_status,
                                                                                        user=user, reason=narration,
                                                                                        account_debted_for_charge='SIDD',
                                                                                        company=user_comp,
                                                                                        data=answer)
                            vend_withdrawalhistory.save()

                            end = datetime.now().time()
                            print('end cashout')

                            return Response(
                                {'code': 200,
                                    'message': 'Cashout of #' + str(amount) + 'was being processed'
                                    }, status=status.HTTP_200_OK)
                else:
                    end = datetime.now().time()
                    print('end cashout', end)
                    return Response({
                        'code': 400,
                        'message': 'Company Need to Top-up',
                        'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)


            else:
                end = datetime.now().time()
                print('end cashout', end)
                return Response({
                    'code': 400,
                    'message': 'Your account is being held',
                    'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)


        # SID Admin Cashout
        elif user_group == 'sid':
            print ('SIDA')
            
            comp_id = comp_param  # Receives comp_id to cash out per company  or 0 for all
            print('comp param', comp_param)
            comp = get_object_or_404(Company, id=comp_id)
            paystack_key = get_company_paystack(comp)
            paystack_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {paystack_key.private_key}'}

            sid_user = get_object_or_404(SIDAdmin, user_id=user.id)

            receipient_code = comp.sid_transfer_recipient
            print ('SID RECEIPENT: ', receipient_code,' paystack: ',paystack_key)
            the_transfer_charge = get_object_or_404(GlobalVariable, variable_name='transfer_charge')
            transfer_charge = float(the_transfer_charge.variable_text)
            sid_transfer_charge = paystack_transfer_charge(comp.sid_balance)

            # Amount set aside for handling cashouts: sum of the companys and vendors
            
            comp_id = int(comp_id)

            if (comp_id) == 0:
                sid_charge_handling = transfer_charge * ( Vendor.objects.count())
                sid_bal = comp.sid_balance - sid_charge_handling - sid_transfer_charge
                sid_balance = sid_bal * 100

                narration = 'SID Cashout from all companies on  Bucca Solution'
                ref = comp_name + '-SID-' + random_val + '-' + str(comp_id)


            else:
                sid_charge_handling = transfer_charge * ( Vendor.objects.filter(company_id=comp_id).count())
                sid_bal = comp.sid_balance - sid_charge_handling - sid_transfer_charge
                sid_balance = sid_bal * 100
                the_company = get_object_or_404(Company, id=comp_id)
                compp_name = the_company.name
                ref = comp_name + '-SID-' + random_val + '-' + str(comp_id)
                narration = 'SID Cashout from ' + compp_name + ' Bucca Solution'

            payload = {'source': 'balance', 'reason': narration, 'amount': sid_balance,
                        'recipient': receipient_code, 'reference_no': ref}

            rr = requests.get(paystack_bal_url, headers=paystack_headers)
            bal_details = rr.json()
            main_bal = bal_details['data'][0]['balance']
            print('company_bal', main_bal)
            print ('sid bal',sid_balance)
            if main_bal > sid_balance:
                r = requests.post(paystack_transfer, data=json.dumps(payload), headers=paystack_headers)
                answer = r.json()
                print('SIDA Cashout Response: ', answer)

                if answer['status'] == False:

                    return Response({
                        'code': 400,
                        'message': answer['message'],
                        'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                else:
                    the_status = answer['data']['status']
                    amount = answer['data']['amount'] / 100
                    recipient = answer['data']['recipient']
                    transfer_id = answer['data']['id']
                    reference_no = answer['data']['reference']
                    transfer_code = answer['data']['transfer_code']

                    ccomp = int(comp_id)

                    if the_status.lower() == 'failed':
                        end = datetime.now().time()
                        print('end cashout', end)
                        return Response({
                            'code': 400,
                            'message': 'SID ADMIN Cashout of  #' + str(amount) + ' from Bucca system failed',
                            'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

                    elif the_status.lower() == 'success':
                        # if ccomp == 0:

                        #     narration = 'SID Cashout from  Bucca Solution for all Companies'
                        #     # update balance and Debit SID for the transfer charge
                        #     user.balance = user.balance - amount - transfer_charge
                        #     user.save()

                        #     # Update each company sid balance to 0
                        #     comps_id = Company.objects.filter(status=True).values("id").distinct()

                        #     for cccomp in comps_id:
                        #         d_comp = get_object_or_404(Company, id=cccomp['id'])
                        #         d_comp.sid_balance = 0.0
                        #         d_comp.save()


                        # else:
                        the_comp = get_object_or_404(Company, id=ccomp)

                        # update balance and Debit SID for the transfer charge
                        # user.balance = user.balance - amount - transfer_charge
                        # user.save()

                        # Update  company sid balance to 0
                        comp_name = the_comp.name
                        narration = 'SID Cashout from ' + comp_name + ' Bucca Solution'
                        the_comp.sid_balance = the_comp.sid_balance - amount - sid_transfer_charge
                        the_comp.save()

                        # Update Withdrawal history
                        sid_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                                                                                    transfer_id=transfer_id,
                                                                                    user_type='SID',
                                                                                    withdrawal_charge=sid_transfer_charge,
                                                                                    status=the_status,
                                                                                    reference_no=reference_no,
                                                                                    transfer_code=transfer_code,
                                                                                    recipient=recipient,
                                                                                    updated_status=the_status,
                                                                                    user=user, reason=narration,
                                                                                    account_debted_for_charge='SIDD',
                                                                                    company=ccomp,
                                                                                    data=answer
                                                                                    )
                        sid_withdrawalhistory.save()

                        end = datetime.now().time()
                        print('end cashout', end)

                        return Response(
                            {'code': 200,
                                'message': 'SID ADMIN Cashout of #' + str(amount) + ' from Bucca system was successful'
                                }, status=status.HTTP_200_OK)

                    else:
                        # if ccomp == 0:
                        #     narration = 'SID Cashout from  Bucca Solution for all Companies'

                        #     # update balance and Debit SID for the transfer charge
                        #     user.balance = user.balance - amount - transfer_charge

                        #     # move to the pending balance
                        #     user.pending_balance = user.pending_balance + amount + transfer_charge
                        #     user.save()

                        #     # move each to company sid pending balance
                        #     comps_id = Company.objects.filter(status=True).values("id").distinct()
                        #     for ccomp in comps_id:
                                
                        #         d_comp = get_object_or_404(Company, id=ccomp)
                        #         d_comp.sid_balance = 0.0
                        #         d_comp.sid_pending_balance = d_comp.sid_pending_balance + d_comp.sid_balance
                        #         d_comp.save()
                        #         comp_name = d_comp.name
                        #         narration = 'SID Cashout from ' + comp_name + ' Bucca Solution'

                        #         # Update Withdrawal history
                        #         sid_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                        #                                                                 transfer_id=transfer_id,
                        #                                                                 user_type='SID',
                        #                                                                 withdrawal_charge=transfer_charge,
                        #                                                                 status=the_status,
                        #                                                                 reference_no=reference_no,
                        #                                                                 transfer_code=transfer_code,
                        #                                                                 recipient=recipient,
                        #                                                                 updated_status=the_status,
                        #                                                                 user=user, reason=narration,
                        #                                                                 account_debted_for_charge='SIDD',
                        #                                                                 company=ccomp,
                        #                                                                 data=answer)
                        #         sid_withdrawalhistory.save()

                        # else:
                        the_comp = get_object_or_404(Company, id=ccomp)

                        # update balance and Debit SID for the transfer charge
                            # user.balance = user.balance - amount - transfer_charge
                        
                        # move to the pending balance
                            # user.pending_balance = user.pending_balance + amount + transfer_charge
                            # user.save()


                        # move it to company sid pending balance
                        comp_name = the_comp.name
                        narration = 'SID Cashout from ' + comp_name + ' Bucca Solution'
                        # update balance and Debit SID for the transfer charge
                        the_comp.sid_balance = the_comp.sid_balance - amount - sid_transfer_charge
                        # move to the pending balance
                        the_comp.sid_pending_balance = the_comp.sid_pending_balance + the_comp.sid_balance
                        the_comp.save()

                        # Update Withdrawal history
                        sid_withdrawalhistory = WithdrawalHistory.objects.create(amount=amount,
                                                                                    transfer_id=transfer_id,
                                                                                    user_type='SID',
                                                                                    withdrawal_charge=sid_transfer_charge,
                                                                                    status=the_status,
                                                                                    reference_no=reference_no,
                                                                                    transfer_code=transfer_code,
                                                                                    recipient=recipient,
                                                                                    updated_status=the_status,
                                                                                    user=user, reason=narration,
                                                                                    account_debted_for_charge='SIDD',
                                                                                    company=ccomp,
                                                                                    data=answer)
                        sid_withdrawalhistory.save()

                        end = datetime.now().time()
                        print('end cashout', end)

                        return Response(
                            {'code': 200,
                                'message': 'SID ADMIN Cashout of #' + str(
                                    amount) + ' from Bucca system was being proccessed'
                                }, status=status.HTTP_200_OK)
            else:
                end = datetime.now().time()
                print('end cashout', end)
                return Response({
                    'code': 400,
                    'message': 'Company Need to Top-up',
                    'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            end = datetime.now().time()
            print('end cashout', end)
            return Response(
                {'code': 400,
                    'message': 'Invalid User Type ',
                    'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)

        # else:
        #     end = datetime.now().time()
        #     print('end cashout', end)
        #     return Response(
        #         {'code': 400,
        #          'message': 'Invalid User Company ',
        #          'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)


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
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                ),
            openapi.Parameter(
                'date_start', openapi.IN_QUERY, description=" date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'date_end', openapi.IN_QUERY, description=" date to end filtering", type=openapi.FORMAT_DATE
                ),
            ],
        )
    )
class VendorWithdrawalHistoryView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    schema = VendorWithdrawalHistorySchema

    def get(self, request):
        user = request.user
        user_group = request.user.groups.all()[0].name
        company = get_company(self.request)
        print('comp', company)
        date_start = self.request.query_params.get('date_start')
        date_end = self.request.query_params.get('date_end')

        queryset = WithdrawalHistory.objects.filter(user_type='VEN', date_created__gte=date_start,
                                                    date_created__lte=date_end)

        if not queryset:
            return Response(
                {'code': 400,
                 'message': 'No data',
                 'resolve': 'No data'}, status=status.HTTP_400_BAD_REQUEST)

        else:


            if ((company is not None) and ((user_group == 'ven') or (user_group == 'cmp_adm') or (user_group == 'cmp_act')) ):
                    if user_group == 'ven':
                        queryset = queryset.filter(user=user.id)
                        serializer = VendorWithdrawalHistorySerializer

                    elif user_group == 'cmp_adm' or user_group == 'cmp_act':
                        queryset = queryset.filter(company=company.id)
                        serializer = VendorWithdrawalHistorySerializer


                    else:
                        raise ValidationError({'error': 'You are not authenticated to view this page'})
                    # return Response({
                    #     'code': 200,
                    #     'vendor_withdrawal_history': serializer(queryset, many=True).data
                    # }, status=status.HTTP_200_OK)
                    # paginator = LimitOffsetPagination()
                    paginator = CustomPagination()
                    result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                    serializer = serializer(result_page, many=True)
                    return paginator.get_paginated_response(serializer.data)
            elif user_group == 'sid':
                serializer = SIDWithdrawalHistorySerializer
                # return Response({
                #     'code': 200,
                #     'vendor_withdrawal_history': serializer(queryset, many=True).data
                # }, status=status.HTTP_200_OK)
                # paginator = LimitOffsetPagination()
                paginator = CustomPagination()
                result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                serializer = serializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
            else:
                return Response(
                    {'code': 401,
                     'message': 'App Id is not provided',
                     'resolve': 'Include App Id in request header'}, status=status.HTTP_401_UNAUTHORIZED)


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
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                ),
            openapi.Parameter(
                'date_start', openapi.IN_QUERY, description=" date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'date_end', openapi.IN_QUERY, description=" date to end filtering", type=openapi.FORMAT_DATE
                ),
            ],
        )
    )
class CompanyWithdrawalHistoryView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    schema = CompanyWithdrawalHistorySchema

    def get(self, request):
        user = request.user
        user_group = request.user.groups.all()[0].name
        company = get_company(self.request)
        date_start = self.request.query_params.get('date_start')
        date_end = self.request.query_params.get('date_end')
        queryset = WithdrawalHistory.objects.filter(user_type='COMP', date_created__gte=date_start,
                                                    date_created__lte=date_end)

        if not queryset:
            return Response(
                {'code': 400,
                 'message': 'No data',
                 'resolve': 'No data'}, status=status.HTTP_400_BAD_REQUEST)

        else:

            if ((company is not None) and ( user_group == 'cmp_adm' or user_group == 'cmp_act')):


                    if user_group == 'cmp_adm' or user_group == 'cmp_act':
                        queryset = queryset.objects.filter(company=company.id)
                        serializer = CompanyWithdrawalHistorySerializer


                    else:
                        raise ValidationError({'error': 'You are not authenticated to view this page'})
                    # return Response({
                    #     'code': 200,
                    #     'company_withdrawal_history': serializer(queryset, many=True).data
                    # }, status=status.HTTP_200_OK)
                    # paginator = LimitOffsetPagination()
                    paginator = CustomPagination()
                    result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                    serializer = serializer(result_page, many=True)
                    return paginator.get_paginated_response(serializer.data)
            elif user_group == 'sid':

                serializer = SIDWithdrawalHistorySerializer
                return Response({
                    'code': 200,
                    'company_withdrawal_history': serializer(queryset, many=True).data

                }, status=status.HTTP_200_OK)
            else:
                return Response(
                    {'code': 401,
                     'message': 'App Id is not provided',
                     'resolve': 'Include App Id in request header'}, status=status.HTTP_401_UNAUTHORIZED)


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
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                ),
            openapi.Parameter(
                'date_start', openapi.IN_QUERY, description=" date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'date_end', openapi.IN_QUERY, description=" date to end filtering", type=openapi.FORMAT_DATE
                ),
            ],
        )
    )
class SIDWithdrawalHistoryView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    schema = SIDWithdrawalHistorySchema

    def get(self, request):
        user = request.user
        user_group = request.user.groups.all()[0].name
        company = get_company(self.request)

        date_start = self.request.query_params.get('date_start')
        date_end = self.request.query_params.get('date_end')

        queryset = WithdrawalHistory.objects.filter(user=user.id, user_type='SID', date_created__gte=date_start,
                                                    date_created__lte=date_end)
        if not queryset:
            return Response(
                {'code': 400,
                 'message': 'No data',
                 'resolve': 'No data'}, status=status.HTTP_400_BAD_REQUEST)

        else:

            if user_group == 'sid':
                serializer = SIDWithdrawalHistorySerializer
                # return Response({
                #     'code': 200,
                #     'sid_withdrawal_history': serializer(queryset, many=True).data

                # }, status=status.HTTP_200_OK)
                # paginator = LimitOffsetPagination()
                paginator = CustomPagination()
                result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                serializer = serializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
            else:
                # raise ValidationError({'error': 'You are not authenticated to view this page'})
                return Response({'code': 401,
                               'message': 'You are not authenticated to view this page',
                               'resolve': 'Kindly contact the admin'}, status=status.HTTP_401_UNAUTHORIZED)



@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                ),
            openapi.Parameter(
                'date_start', openapi.IN_QUERY, description=" date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'date_end', openapi.IN_QUERY, description=" date to end filtering", type=openapi.FORMAT_DATE
                ),
            ],
        )
    )
class TopUpHistoryView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    schema = TopUpHistoryViewSchema

    def get(self, request):
        user = request.user
        user_group = request.user.groups.all()[0].name
        company = get_company(self.request)
        date_start = self.request.query_params.get('date_start')
        date_end = self.request.query_params.get('date_end')
        print('company:',company)


        if ((company is not None) and  (user_group == 'emp' or user_group == 'cmp_adm' or user_group == 'cmp_act')):


            if user_group == 'cmp_adm' or user_group == 'cmp_act':
                print('Company')
                queryset = Company_TopupHistory.objects.filter(company=company, date_created__gte=date_start,
                                                        date_created__lte=date_end)
                print('comp data',queryset)

            elif user_group == 'emp':
                print('Emp')
                queryset = Staff_TopupHistory.objects.filter(company=company,user=user.id, date_created__gte=date_start,
                                                        date_created__lte=date_end)

            if not queryset :
                return Response(
                    {'code': 400,
                     'message': 'No data',
                     'resolve': 'No data'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                queryset=queryset
                print('here')

                if user_group == 'cmp_adm' or user_group == 'cmp_act':
                    serializer = CompanyTopUpHistorySerializer
                    # paginator = LimitOffsetPagination()
                    paginator = CustomPagination()
                    result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                    serializer = serializer(result_page, many=True)
                    result_data=paginator.get_paginated_response(serializer.data)
                    print ('result_data',result_data)
                    return Response({
                        'code': 200,
                        'company_topup_history': result_data.data
                    }, status=status.HTTP_200_OK)


                elif user_group == 'emp':
                    print('Emp Now:',queryset)
                    serializer = StaffTopUpHistorySerializer
                    # paginator = LimitOffsetPagination()
                    paginator = CustomPagination()
                    result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                    print(result_page)
                    the_serializer = serializer(result_page, many=True)
                    # import pdb
                    # pdb.set_trace()
                    result_data= paginator.get_paginated_response(serializer.data)
                    # print('serializer:',serializer(queryset, many=True).data)
                    return Response({
                        'code': 200,
                        'staff_topup_history': result_data.data}, status=status.HTTP_200_OK)



                else:
                    raise ValidationError({'error': 'You are not authenticated to view this page'})


        elif user_group == 'sid':
            print('SID ')
            comp_queryset = Company_TopupHistory.objects.filter( date_created__gte=date_start,
                                                           date_created__lte=date_end)
            staff_queryset = Staff_TopupHistory.objects.filter( date_created__gte=date_start,
                                                         date_created__lte=date_end)

            print('comp',comp_queryset)
            print('staff',staff_queryset)
            serializer = StaffTopUpHistorySerializer
            comp_serializer = CompanyTopUpHistorySerializer

            comp_data= comp_serializer(comp_queryset, many=True).data
            staff_data = serializer(staff_queryset, many=True).data

            if  not comp_queryset :
                comp_data = [ ]
            
            if not staff_queryset:
                staff_data = [ ]
            
                
            return Response({
                'code': 200,
                'company_topup_history': comp_data,
                'staff_topup_history': staff_data
            }, status=status.HTTP_200_OK)
        else:

            return Response(
                {'code': 401,
                 'message': 'App Id is not provided',
                 'resolve': 'Include App Id in request header'}, status=status.HTTP_401_UNAUTHORIZED)


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
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                ),
            openapi.Parameter(
                'date_start', openapi.IN_QUERY, description=" date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'date_end', openapi.IN_QUERY, description=" date to end filtering", type=openapi.FORMAT_DATE
                ),
            ],
        )
    )
class VoidTxnHistoryView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    schema = VoidTxnHistoryViewSchema

    def get(self, request):
        user = request.user
        user_group = request.user.groups.all()[0].name
        company = get_company(self.request)
        date_start = self.request.query_params.get('date_start')
        date_end = self.request.query_params.get('date_end')
        if user_group == 'sid':
            queryset = Void_transaction.objects.filter( date_created__gte=date_start,
                                                    date_created__lte=date_end)


            if not queryset :
                return Response(
                    {'code': 400,
                     'message': 'No data',
                     'resolve': 'No data'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                serializer = Void_transactionSerializer
                # return Response({
                #     'code': 200,
                #     'voidtxn_history': serializer(queryset, many=True).data
                # }, status=status.HTTP_200_OK)
                # paginator = LimitOffsetPagination()
                paginator = CustomPagination()
                result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
                serializer = serializer(result_page, many=True)
                return paginator.get_paginated_response(serializer.data)
        return Response(
            {'code': 401,
             'message': 'Unauthorized User',
             'resolve': 'Kindly contact the Admin'}, status=status.HTTP_401_UNAUTHORIZED)


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
                'comp', openapi.IN_QUERY, description="company id, (this filter only works for SID admin)", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'delivery_date_start', openapi.IN_QUERY, description="delivery date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'delivery_date_end', openapi.IN_QUERY, description="delivery date to end filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'order_date_start', openapi.IN_QUERY, description="order date to start filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'order_date_end', openapi.IN_QUERY, description="order date to end filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'status', openapi.IN_QUERY, description="filtering by ['pending','void','delivered','cancelled','failed','insufficient','not_pending']", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'search', openapi.IN_QUERY, description="Filter using the user partal data (email, first name or last name)", type=openapi.TYPE_STRING
            ),
            openapi.Parameter(
                'receipt_no', openapi.IN_QUERY, description="filtering by receipt_no", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'vendor', openapi.IN_QUERY, description="filtering by vendor user id", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'meal_type', openapi.IN_QUERY, description="filtering by meal_type id", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]
        )
    )


class MealTransactionHistory(APIView):
    # serializer_class = MealTransactionHistorySerializer
    permission_classes = [IsAuthenticated,]

    def get(self, request):
        company = get_company(self.request)
        user_group = request.user.groups.all()[0].name
        vendor = self.request.query_params.get('vendor')
        if company is None and user_group != 'sid':
            return Response({
                'code': 401,
                'message': 'App Id is not provided',
                'resolve': 'Insert the right App Id'
            },status=status.HTTP_401_UNAUTHORIZED)
        elif company is None and user_group == 'sid':
            comp = self.request.query_params.get('comp')
            queryset = MealTransaction.objects.all()
            if comp is not None:
                queryset = queryset.filter(company=comp)
            if vendor is not None:
                queryset = queryset.filter(vendor_user_id__id=vendor)
            serializer = SIDMealTransactionHistorySerializer
        elif company is not None:
            queryset = MealTransaction.objects.filter(company=company.id)
        else:
            pass
        # if not queryset:
        #     return Response(
        #         {'code': 400,
        #             'message': 'No data',
        #             'resolve': 'No data'}, status=status.HTTP_400_BAD_REQUEST)
        # else:
        if user_group == 'emp':
            serializer = StaffMealTransactionHistorySerializer
            queryset = queryset.filter(user=request.user)
            if vendor is not None:
                queryset = queryset.filter(vendor_user_id__id=vendor)
        elif user_group == 'ven':
            serializer = VendorMealTransactionHistorySerializer
            queryset = queryset.filter(vendor_user_id=request.user)
        elif user_group == 'cmp_adm' or user_group == 'cmp_act':
            serializer = CompanyMealTransactionHistorySerializer
            if vendor is not None:
                queryset = queryset.filter(vendor_user_id__id=vendor)            
        # else:
        #     # raise ValidationError({'error': 'You are not authenticated to view this page'})
        #     return Response({
        #         'code': 401,
        #         'message': 'You are not authenticated to view this page',
        #         'resolve': 'Kindly contact the admin'
        #     }, status=status.HTTP_401_UNAUTHORIZED)


        delivery_date_start = self.request.query_params.get('delivery_date_start')
        delivery_date_end = self.request.query_params.get('delivery_date_end')
        order_date_start = self.request.query_params.get('order_date_start')
        order_date_end = self.request.query_params.get('order_date_end')
        txn_status = self.request.query_params.get('status')
        meal_type = self.request.query_params.get('meal_type')
        receipt_no = self.request.query_params.get('receipt_no')
        search = request.query_params.get('search', None)

        if meal_type is not None:
            queryset = queryset.filter(meal_type_id=meal_type)
        if receipt_no is not None:
            queryset = queryset.filter(receipt_no=receipt_no)
        if delivery_date_start is not None:
            queryset = queryset.filter(delivery_date__gte=delivery_date_start)
        if delivery_date_end is not None:
            queryset = queryset.filter(delivery_date__lte=delivery_date_end)
        if order_date_start is not None:
            queryset = queryset.filter(date_created__gte=order_date_start)
        if order_date_end is not None:
            queryset = queryset.filter(date_created__lte=order_date_end)
        if txn_status is not None:
            if txn_status == 'not_pending':
                queryset = queryset.exclude(status='pending')
            else:
                queryset = queryset.filter(status=txn_status)
        if search is not None:
            queryset = queryset.filter(Q(user__first_name__contains=search)|Q(user__last_name__contains=search)|Q(user__email__contains=search)|Q(user__phone_number__contains=search))
        # paginator = LimitOffsetPagination()
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(queryset.order_by('-id'), request)
        serializer = serializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    # else:
        # raise ValidationError({'error': 'App Id is not provided'})


@method_decorator(
    name='post', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]

        )
    )
class VoidTransactionView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer =VoidTxnSerializer
    schema = VoidTxnViewSchema

    def post (self,request):
        company = get_company(self.request)
        txn_id = request.data['txn_id']
        txn = get_object_or_404(MealTransaction, id=txn_id)
        txn_status = txn.status
        user_group = request.user.groups.all()[0].name

        if (company is not None and (user_group=='cmp_act' or user_group=='cmp_adm')) or (user_group == 'sid') :

            if txn_status == 'delivered' or txn_status =='force-delivered':
                comp_amt = txn.company_amount
                stf_amt = txn.personal_amount
                service_fee = txn.service_fee
                vendor_amt = txn.sub_total
                total = txn.total
                txn_comp = txn.company
                quantity = txn.quantity
                comp_id = txn.company

                comp = get_object_or_404(Company, id=comp_id.id)
                vend_id = txn.vendor_user_id
                vend = get_object_or_404(User, id=vend_id.id)

                staff_id = txn.user_id
                staff = get_object_or_404(User, id=staff_id)

                # Credit Company & Staff  and debit SIDD
                comp.balance = comp.balance + comp_amt
                comp.sid_balance = comp.sid_balance - service_fee
                comp.save()

                staff.balance = staff.balance + stf_amt
                staff.save()

                # Debit Vendor
                vend.balance = vend.balance - vendor_amt
                vend.save()


                # Update the Meal Txn model
                txn.status = 'void'
                txn.voider = request.user
                txn.save()


                # Insert into Void Model
                void = Void_transaction.objects.create(total=total,
                                                       txn_id=txn,
                                                       quantity=quantity,
                                                       company_account_credit=comp_amt,
                                                       staff_personal_account_credit=stf_amt,
                                                       service_fee_debit=service_fee,
                                                       vendor_debit=vendor_amt,
                                                       company=txn_comp,
                                                       voider=request.user,
                                                       vendor_user=vend
                                                       )

                void.save()
                return Response({
                    'code': 200,
                    'message': 'Txn #'+ str(txn_id) + 'successfully voided'
                }, status=status.HTTP_200_OK)

            elif txn.status == 'void':
                return Response({'code': 400,
                                 'message': 'Transaction already voided',
                                 'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'code': 400,
                    'message': 'Transaction is not delivered yet, hence cannot be void.',
                    'resolve': 'Kindly contact the admin'}, status=status.HTTP_400_BAD_REQUEST)


        else:
            return Response({'code': 401,
                             'message': 'You are not authenticated to view this page',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_401_UNAUTHORIZED)



@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'delivery_date', openapi.IN_QUERY, description="delivery date to end filtering", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]
        )
    )


class GetDailyLimitLeftView(APIView):
    schema = GetDailyLimitLeftViewSchema
    def get(self, request):
        company = get_company(self.request)
        delivery_date = self.request.query_params.get('delivery_date')
        user_group = request.user.groups.all()[0].name

        if company is not None:
            if user_group == 'emp':

                queryset = MealTransaction.objects.filter(user=request.user,delivery_date=delivery_date,status = ('pending','delivered'),company=company.id)

                staff_lev_id = request.user.staff_level_id
                try:
                    staff_level = get_object_or_404(StaffLevel, id=staff_lev_id)
                except:
                    staff_level = None

                daily_limit = staff_level.daily_limit

                # Directly
                daily_limit_used = MealTransaction.objects.filter(user_id=request.user.id, company=company.id,delivery_date=delivery_date,
                                                                  status__in=('pending', 'delivered')).aggregate(
                    TOTAL=Sum('total'))['TOTAL']

                print('daily_limit_used: ', (daily_limit_used if daily_limit_used != None else 0))

                daily_limit_left_actual = (daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0

                return Response({'code': 200,
                                 'daily_limit_left': daily_limit_left
                                 }, status=status.HTTP_200_OK)
                # return Response(serializer(queryset, many=True).data, status=status.HTTP_200_OK)

            else:
                return Response({'code': 401,
                                 'message': 'You are not authenticated to view this page',
                                 'resolve': 'Kindly contact the admin'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'code': 401,
                             'message': 'App Id is not provided',
                             'resolve': 'Insert the right App Id'}, status=status.HTTP_401_UNAUTHORIZED)


class ConfirmAutoTopup(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ConfirmAutoTopupSerializer(data=request.data)
        if serializer.is_valid():
            company = serializer.validated_data.get('company')
            # company = get_company(self.request)
            # if company is not None:
            paystack_data = get_paystack_ledger(company)
            for txn in paystack_data['data']:
                if txn['model_responsible'] == 'Auto_Topup':
                    if PaystackCompanyAutoTopup.objects.filter(ledger_id=txn['id']).exists():
                        pass
                    else:
                        paystack_auto_topup = PaystackCompanyAutoTopup.objects.create(integration=txn['integration'], domain=txn['domain'], balance=txn['balance']/100, currency=txn['currency'], difference=txn['difference']/100, reason=txn['reason'], model_responsible=txn['model_responsible'], model_row=txn['model_row'], ledger_id=txn['id'], ledger_created_at=txn['createdAt'], ledger_updated_at=txn['updatedAt'])
                        # Update company balance
                        company_topup_history = Company_TopupHistory.objects.create(amount=txn['difference']/100, description=txn['reason'], top_up_payload=txn,company=company)
                        comp = Company.objects.get(id=company.id)
                        comp.balance = comp.balance + txn['difference']/100
                        comp.save()
                        # Unavailable fields - user_email, top_up_charge, reference_no, company
            return Response({
                'status':'successful',
                'message': 'Ledger updated successfully'
            }, status=status.HTTP_200_OK)
            # else:
            #     return Response({
            #         'code': 401,
            #         'message': 'App Id is not provided',
            #         'resolve': 'Insert the right App Id'
            #     }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'company', openapi.IN_QUERY, description="company id, (this filter only works for SID admin)", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'delivery_date_start', openapi.IN_QUERY, description="delivery date to start filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'delivery_date_end', openapi.IN_QUERY, description="delivery date to end filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'order_date_start', openapi.IN_QUERY, description="order date to start filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'order_date_end', openapi.IN_QUERY, description="order date to end filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
            )
            ]
        )
    )
class TransactionReport(APIView):
    permission_classes = [IsCompanyAdminOrIsSIDOrIsVendorOrIsStaff]
    def get(self, request):
        now = timezone.now()
        transactions = MealTransaction.objects.all()
        user_group = request.user.groups.first().name
        if user_group == 'sid':
            company = request.query_params.get('company', None)
            if company is not None:
                transactions = transactions.filter(company__id=company)
        elif user_group == 'cmp_adm' or user_group == 'cmp_act':
            transactions = transactions.filter(company=request.user.company)
        elif user_group == 'ven':
            transactions = transactions.filter(company=request.user.company, vendor_user_id=request.user)
        else:
            transactions = transactions.filter(company=request.user.company, user=request.user)
        delivery_start = request.query_params.get('delivery_start', None)
        if delivery_start is not None:
            transactions = transactions.filter(delivery_date__gte=delivery_start)
        delivery_end = request.query_params.get('delivery_end', None)
        if delivery_end is not None:
            transactions = transactions.filter(delivery_date__lte=delivery_end)
        order_start = request.query_params.get('order_start', None)
        if order_start is not None:
            transactions = transactions.filter(date_created__gte=order_start)
        order_end = request.query_params.get('order_end', None)
        if order_end is not None:
            transactions = transactions.filter(date_created__lte=order_end)
        if delivery_start is None and delivery_end is None and order_start is None and order_end is None:
            transactions = transactions.filter(delivery_date=now.date())
        pending_txns = transactions.filter(status='pending')
        voided_txns = transactions.filter(status='void')
        delivered_txns = transactions.filter(status='delivered')
        cancelled_txns = transactions.filter(status='cancelled')
        ticket_printed = transactions.filter(status='ticket-printed')
        # print("count", transactions.aggregate(Count('user', distinct=True))['user__count'])
        result = [
            {
                "title": "transactions",
                "count": transactions.count()
            },
            {
                "title": "pending transactions",
                "count": pending_txns.count()
            },
            {
                "title": "void transactions",
                "count": voided_txns.count()
            },
            {
                "title": "delivered transactions",
                "count": delivered_txns.count()
            },
            {
                "title": "cancelled transactions",
                "count": cancelled_txns.count()
            },
            {
                "title": "ticket printed",
                "count": ticket_printed.count()
            },
            {
                "title": "total pending",
                "count": pending_txns.aggregate(Sum('total'))['total__sum']
            },
            {
                "title": "total void",
                "count": voided_txns.aggregate(Sum('total'))['total__sum']
            },
            {
                "title": "total delivered",
                "count": delivered_txns.aggregate(Sum('total'))['total__sum']
            },
            {
                "title": "total cancelled",
                "count": cancelled_txns.aggregate(Sum('total'))['total__sum']
            },
            {
                "title": "users who transacted",
                # "count": transactions.annotate(Count('user', distinct=True))[0].user__count
                "count": transactions.aggregate(Count('user', distinct=True))['user__count']
            },
            {
                "title": "sid total",
                "count": delivered_txns.aggregate(Sum('service_fee'))['service_fee__sum'] if user_group == 'sid' else None
            }
        ]
        return Response(result, status=status.HTTP_200_OK)   


@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'company', openapi.IN_QUERY, description="company id, (this filter only works for SID admin)", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'delivery_date_start', openapi.IN_QUERY, description="delivery date to start filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'delivery_date_end', openapi.IN_QUERY, description="delivery date to end filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'order_date_start', openapi.IN_QUERY, description="order date to start filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'order_date_end', openapi.IN_QUERY, description="order date to end filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
            )
            ]
        )
    )
class VendorReport(APIView):
    permission_classes = [IsCompanyAdminOrIsSIDOrIsCompanyAct]
    def get(self, request):
        now = timezone.now()
        queryset = MealTransaction.objects.values('vendor_user_id').annotate(dcount=Count('vendor_user_id'), dtotal=Sum('total')).order_by()
        user_group = request.user.groups.first().name
        if user_group == 'sid':
            company = request.query_params.get('company', None)
            if company is not None:
                queryset = queryset.filter(company__id=company)
        else:
            queryset = queryset.filter(company=request.user.company)
        delivery_start = request.query_params.get('delivery_start', None)
        if delivery_start is not None:
            queryset = queryset.filter(delivery_date__gte=delivery_start)
        delivery_end = request.query_params.get('delivery_end', None)
        if delivery_end is not None:
            queryset = queryset.filter(delivery_date__lte=delivery_end)
        order_start = request.query_params.get('order_start', None)
        if order_start is not None:
            queryset = queryset.filter(date_created__gte=order_start)
        order_end = request.query_params.get('order_end', None)
        if order_end is not None:
            queryset = queryset.filter(date_created__lte=order_end)
        if delivery_start is None and delivery_end is None and order_start is None and order_end is None:
            queryset = queryset.filter(delivery_date=now.date())
        result = []
        for data in queryset:
            result.append({
                'vendor_name': Vendor.objects.get(user_id=data['vendor_user_id']).bussiness_name,
                'count': data['dcount'],
                'total': data['dtotal']
            })
        return Response(result, status=status.HTTP_200_OK)


@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'company', openapi.IN_QUERY, description="company id, (this filter only works for SID admin)", type=openapi.TYPE_INTEGER
            ),
            openapi.Parameter(
                'delivery_date_start', openapi.IN_QUERY, description="delivery date to start filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'delivery_date_end', openapi.IN_QUERY, description="delivery date to end filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'order_date_start', openapi.IN_QUERY, description="order date to start filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'order_date_end', openapi.IN_QUERY, description="order date to end filtering", type=openapi.FORMAT_DATE
            ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
            )
            ]
        )
    )
class FoodReport(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        now = timezone.now()
        queryset = MealTransaction.objects.all()
        user_group = request.user.groups.first().name
        if user_group == 'sid':
            company = request.query_params.get('company', None)
            if company is not None:
                queryset = queryset.filter(company__id=company)
        elif user_group == 'cmp_adm' or user_group == 'cmp__act':
            queryset = queryset.filter(company=request.user.company)
        elif user_group == 'ven':
            queryset = queryset.filter(company=request.user.company, vendor_user_id=request.user)
        else:
            queryset = queryset.filter(company=request.user.company, user=request.user)
        order_start = request.query_params.get('order_start', None)
        if order_start is not None:
            queryset = queryset.filter(date_created__gte=order_start)
        order_end = request.query_params.get('order_end', None)
        if order_end is not None:
            queryset = queryset.filter(date_created__lte=order_end)
        delivery_start = request.query_params.get('delivery_start', None)
        if delivery_start is not None:
            queryset = queryset.filter(delivery_date__gte=delivery_start)
        delivery_end = request.query_params.get('delivery_end', None)
        if delivery_end is not None:
            queryset = queryset.filter(delivery_date__lte=delivery_end)
        if delivery_start is None and delivery_end is None and order_start is None and order_end is None:
            queryset = queryset.filter(delivery_date=now.date())
        queryset = queryset.values('food__name').annotate(dcount=Count('id'), dtotal=Sum('total')).order_by()
        return Response(queryset, status=status.HTTP_200_OK)


class RatioReport(APIView):
    permission_classes = [IsCompanyAdminOrIsSIDOrIsCompanyAct]
    def get(self, request):
        user_group = request.user.groups.first().name
        users = User.objects.all()
        transactions = MealTransaction.objects.all()

        if user_group == 'sid':
            company = request.data.get('company', None)
            if company is not None:
                users = users.filter(company__id=company)
                transactions = transactions.filter(company__id=company)
        else:
            users = users.filter(company=request.user.company)
        verified_user_ratio = ceil((users.filter(is_verified=True).count() / users.count()) * 100) if users.count() != 0 else 0
        txn_ratio = ceil((transactions.filter(status='delivered').count() / transactions.count()) * 100) if transactions.count() != 0 else 0
        result = [
            {
                "title": "verified user ratio",
                "count": verified_user_ratio
            },
            {
                "title": "transaction ratio",
                "count": txn_ratio
            }
        ]
        return Response(result, status=status.HTTP_200_OK)


class TransactionSpiltReport(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsCompanyAdminOrIsSIDOrIsCompanyAct]
    pagination_class = CustomPagination
    # permission_classes = [AllowAny]
    def get_queryset(self):
        self.serializer_class = TransactionSpiltReportSerializer
        user_group = self.request.user.groups.first().name
        queryset = MealTransaction.objects.filter(Q(status='delivered')|Q(status='force-delivered'), company_amount__gt = 0)
        if user_group == 'sid':
            company = self.request.data.get('comp', None)
            if company is not None:
                queryset = queryset.filter(company=company)
        else:
            company = self.request.user.company
            queryset = queryset.filter(company=company)
        delivery_start = self.request.query_params.get('delivery_start', None)
        if delivery_start is not None:
            queryset = queryset.filter(delivery_date__gte=delivery_start)
        delivery_end = self.request.query_params.get('delivery_end', None)
        if delivery_end is not None:
            queryset = queryset.filter(delivery_date__lte=delivery_end)
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(Q(user__first_name__icontains=search) | Q(user__last_name__icontains=search) | Q(user__email__icontains=search))
        # queryset = queryset.values('user', 'user__first_name', 'user__last_name', 'user__department__name', 'user__staff_level__name', 'user__staff_level__company_paid').annotate(Sum('company_amount'), Count('delivery_date', distinct=True), comp_paid= F('delivery_date__count')* F('user__staff_level__company_paid'), staff_paid=F('company_amount__sum') - F('comp_paid'))
        queryset = queryset \
            .values('user', 'user__first_name', 'user__last_name', 'user__department__name', 'user__staff_level__name', 'user__staff_level__company_paid') \
            .annotate( \
                Sum('company_amount'), 
                Count('delivery_date', distinct=True), 
                comp_paid = Case(
                    When(user__staff_level__name='Admin(Visitor) Pilot', then=F('company_amount__sum')), # Test environment
                    When(user__staff_level__name='Admin(Visitor)', then=F('company_amount__sum')), 
                    default = F('delivery_date__count')* F('user__staff_level__company_paid')
                ), 
                staff_paid=F('company_amount__sum') - F('comp_paid')
            )
        print(queryset)
        return queryset


# def get_pending_data(): 
#     headers = {'Content-Type': 'application/json','Authorization': 'Bearer sk_live_d84659dd06f04a4f6e10d87b30cd20a158f49a62'}
#     cur=connection.cursor()
#     cur.callproc('get_pending_withdrawal')
#     rows=cur.fetchall()
#     print('testing',rows)
#     field_names = [i[0] for i in cur.description]
#     state_before = []
#     state_after = []
#     for row in rows:
#         d_old = collections.OrderedDict()
#         d_old[field_names[0]] = row[0]
#         d_old[field_names[1]] = row[1]
#         state_before.append(d_old)
#         reff = d_old['reff_no']
#         old_status = d_old['status']
#         logurl = 'https://api.paystack.co/transfer/verify/'+str(reff)
#         # logurl = 'https://api.paystack.co/transfer/verify/koc0u8z5gq'
#         rr = requests.get(logurl, headers=headers)
#         answer = rr.json()
#         new_status=answer['data']['status']
#         if new_status == 'success'or 'failed':
#             d_new = collections.OrderedDict()
#             d_new[field_names[0]] = row[0]
#             d_new[field_names[1]] = new_status
#             state_after.append(d_new)

#     print(state_after)
#     return state_after


# def check_cashout():
#     totals=get_pending_data()
#     if totals != None:

#         for total in totals :
#             reff=total['reff_no']
#             statuss=total['status']
#             cur = connection.cursor()
#             cur.callproc('send_pending_withdrawal', [reff, statuss])
#             rows = cur.fetchall()
#             print('testing', rows)
#             field_names = [i[0] for i in cur.description]

#             objects_list = []
#             for row in rows:
#                 d = collections.OrderedDict()
#                 d[field_names[0]] = row[0]

#                 objects_list.append(d)
#         print(objects_list)
#         return objects_list


class CheckCashout(views.APIView):
    permission_classes = [IsSIDPermission]

    def post(self, request):
        serializer = CheckCashoutSerializer(data=request.data)
        if serializer.is_valid():
            company = serializer.validated_data.get('company')
            # tot = check_cashout()
            pending_withdrawals = WithdrawalHistory.objects.filter(updated_status='pending', company=company.id)
            for withdrawal in pending_withdrawals:
                print(withdrawal.company)
                verify_res = verify_transaction(withdrawal.reference_no, company)
                if verify_res is None:
                    print('Verification failed')
                elif verify_res['data']['status'].lower() == 'success':
                    amount = verify_res['data']['amount'] / 100
                    transfer_charge = paystack_transfer_charge(amount)
                    company = Company.objects.get(id=withdrawal.company)
                    user = withdrawal.user
                    if withdrawal.user_type == 'COMP':
                        company.pending_balance = company.pending_balance - amount - transfer_charge
                        company.save()
                        withdrawal.updated_status = 'success'
                        withdrawal.save()
                    elif withdrawal.user_type == 'VEN':
                        user.pending_balance = user.pending_balance - amount
                        user.save()
                        company.sid_pending_balance = company.sid_pending_balance - transfer_charge
                        company.save()
                        withdrawal.updated_status = 'success'
                        withdrawal.save()
                    elif withdrawal.user_type == 'SID':
                        company.sid_pending_balance = company.sid_pending_balance - amount
                        company.save()
                        withdrawal.updated_status = 'success'
                        withdrawal.save()
                    else:
                        print('Unknown user type in cash out check')
            return Response({
                'status':'success',
                'message':'Cashout checked successfully'
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@method_decorator(
    name='create', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        ),
    )
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
    name='response_stats', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'vendor', openapi.IN_QUERY, description="Vendor Id", type=openapi.IN_QUERY
                ),
            openapi.Parameter(
                'start_date', openapi.IN_QUERY, description="start date", type=openapi.IN_QUERY
                ),
            openapi.Parameter(
                'end_date', openapi.IN_QUERY, description="end date", type=openapi.IN_QUERY
                )
            ],
        )
    )
class FoodReviewQuestionViewsets(viewsets.ModelViewSet):
    queryset = FoodReviewQuestion.objects.all().prefetch_related('question_option')
    serializer_class = FoodReviewQuestionSerializer
    http_method_names = ["get", "post", 'delete', 'patch']
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    # filterset_fields = ["type"]
    # filterset_class = PollFilter
    # search_fields = ["type", "name"]
    ordering_fields = ["created_at"]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        permission_classes = self.permission_classes
        if self.action =='create':
            return [IsCompanyAdmin()]
        else:
            return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(company=self.request.user.company, user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(company=self.request.user.company).order_by('created_at')

    def get_serializer_class(self):
        if self.action == 'create':
            return FoodReviewQuestionCreateSerializer
        elif self.action == 'partial_update':
            return FoodReviewQuestionUpdateSerializer
        return super().get_serializer_class()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({'code': 201, 'status': 'Questions created successfully', 'data': []}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response({'code': 200, 'status': 'Success', 'data': serializer.data},
                        status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False, serializer_class=FoodReviewCreateResponseSerializer,
            url_path='create-response')
    def response_create(self, request, pk=None):
        serializer = FoodReviewResponseSerializer(data=request.data['responses'], many=True)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response({'code': 201,'status': 'Response created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    @action(methods=['GET'], detail=False, serializer_class=FoodReviewResponseSerializer,
            url_path='list-response')
    def list_responses(self, request, pk=None):
        queryset = FoodReviewResponse.objects.filter(
            transaction__company=request.user.company).select_related('question').prefetch_related(
            'selected_options')
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(queryset.order_by('-created_at'), request)
        serializer = FoodReviewResponseSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    @action(methods=['GET'], detail=False, serializer_class=FoodReviewResponseSerializer,
            url_path='response-stat')
    def response_stats(self, request, pk=None):
        data = []
        vendor = self.request.query_params.get('vendor')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')
        questions = FoodReviewQuestion.objects.filter(
            company=request.user.company).prefetch_related(
            'question_option', 'response_question')
        for quest in questions:
            all_options = quest.question_option.all()
            responded_options = quest.response_question.all()
            if vendor:
                responded_options = responded_options.filter(vendor_id=vendor)
            if start_date:
                responded_options = responded_options.filter(created_at__date__gte=start_date)
            if end_date:
                responded_options = responded_options.filter(created_at__date__lte=end_date)
            recorded_responded_option_list = responded_options.values_list('selected_options', flat=True)

            aggregate = responded_options.values('question').annotate(
                    count=Count('id')).values(
                option_id=F('selected_options'),
                response_count=F('count'),
                option_value=F('selected_options__value'))

            non_recorded_options = all_options.exclude(
                id__in=recorded_responded_option_list).values(
                option_id=F('id'),
                response_count=Value('0', output_field=IntegerField()),
                option_value=F('value')
            )
            option_data = aggregate.union(non_recorded_options)
            data.append(
                {
                    'id': quest.id,
                    'title': quest.title,
                    'options': option_data

                 }

            )

        return Response({'code': 200, 'status': 'Success', 'data': data},
                        status=status.HTTP_201_CREATED)












