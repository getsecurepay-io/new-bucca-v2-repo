# from email.message import EmailMessage
from django.conf import settings
from rest_framework import serializers
from django.contrib.auth.models import Group
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail, EmailMessage
from rest_framework.exceptions import ValidationError
from decouple import config


from .models import Company, User, Department, StaffLevel, Device, Vendor, SIDAdmin, Payment_keys, VendorReviewRating
from .helpers import create_transfer_recipient_with_paystack_key, get_company, create_transfer_recipient
from .utils import Base64ImageField, EmailThread, get_random_string, custom_normalize_email, app_id_error
from transaction.models import GlobalVariable, MealTransaction
from rest_framework.generics import get_object_or_404
domain = config('domain')

class CreateListMixin:
    """Allows bulk creation of a resource."""
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True

        return super().get_serializer(*args, **kwargs)


class LoginSerializer(serializers.Serializer):
    # email = serializers.EmailField(required=True)
    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class MiniCompanySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    class Meta:
        model = Company
        fields = ['id', 'name', 'image']

    def get_image(self, obj):
        return obj.image.url if obj.image else None


class CompanySerializer(serializers.ModelSerializer):
    password = serializers.RegexField(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$', error_messages={'invalid': 'Password must be alphanumeric, and minimum of 8 characters'}, max_length=None, min_length=None, allow_blank=False, required=True, write_only=True)
    private_key = serializers.CharField(required=True, write_only=True)
    public_key = serializers.CharField(required=True, write_only=True)
    transfer_charge =serializers.SerializerMethodField(read_only=True)


    def get_transfer_charge (self,obj):
        try:
            vend_count = Vendor.objects.filter(company_id=obj.id).count()
            the_transfer_charge = get_object_or_404(GlobalVariable, variable_name='transfer_charge')
            transfer_charge = float(the_transfer_charge.variable_text)

            return float(vend_count)  * float(transfer_charge)
        except:
            return 0.0
    class Meta:
        model = Company
        read_only_fields = ('transfer_charge','app_key','status','ref_code','transfer_recipient','authorization_code','time_created','date_created','last_modified','balance','actual_balance','pending_balance', 'sid_balance', 'sid_pending_balance')
        extra_kwargs = {'bank_code': {'required':True}, 'account_number': {'required':True}}
        exclude = ('sid_transfer_recipient',)

    def create(self, validated_data):
        password = validated_data.pop('password')
        private_key = validated_data.pop('private_key')
        public_key = validated_data.pop('public_key')
        name='bucca'
        key = f'{name}_{get_random_string(10)}'
        ref_code = get_random_string(7)
        validated_data['contact_email'] = custom_normalize_email(validated_data['contact_email'])
        account_number = validated_data['account_number']
        bank_code = validated_data['bank_code']
        user_name = validated_data['name']
        # Company paystack is not created yet
        result = create_transfer_recipient_with_paystack_key(account_number, bank_code, user_name, private_key)
        if result is not None:
            validated_data['transfer_recipient'] = result
        else:
            raise serializers.ValidationError({'error':'Unable to create transfer recipient for user'})
        sid, _ = SIDAdmin.objects.get_or_create(name='sid', account_number='2034571705', bank_code='011')
        sid_account_number = sid.account_number
        sid_bank_code = sid.bank_code
        user_name = f'sid_{user_name}'
        sid_result = create_transfer_recipient_with_paystack_key(sid_account_number, sid_bank_code, user_name, private_key)
        if sid_result is not None:
            validated_data['sid_transfer_recipient'] = sid_result
        else:
            raise serializers.ValidationError({'error':'Unable to create transfer recipient for sid'})
        company = Company.objects.create(app_key=key, ref_code=ref_code, **validated_data)
        Payment_keys.objects.create(company=company, public_key=public_key, private_key=private_key)
        rand_code = get_random_string(10)
        while User.objects.filter(app_code=rand_code).exists():
            rand_code = get_random_string(10)
        app_code = rand_code
        user = User.objects.create(first_name=validated_data['contact_first_name'], last_name=validated_data['contact_last_name'], email=validated_data['contact_email'], phone_number=validated_data['contact_phone_number'], app_code=app_code, company=company)
        user.is_verified = True
        user.set_password(password)
        user.is_active = True
        group, _ = Group.objects.get_or_create(name='cmp_adm')
        user.save()
        user.groups.add(group)
        subject = 'SecureID Bucca'
        message = f'Dear {user.first_name} {user.last_name}, \n{company.name} has onboarded you as their admin on Bucca. Your temporary login detail is\
        \nemail={user.email}\npassword={password}\nKindly visit {domain} to reset your password or download our mobile app using the link below {domain}.'
        # from_email = settings.EMAIL_HOST_USER
        to_list = [user.email]
        # print(message)
        # send_mail(subject, message, from_email, to_list, fail_silently=True)
        sender = 'noreply@tpssupport.ng'
        email = EmailMessage(subject, message, sender, to_list)
        EmailThread(email).start()
        return company

    def validate_contact_email(self, contact_email):
        if User.objects.filter(email=contact_email).exists():
            raise ValidationError(detail="User with this email already exist", code="unique")    
        return contact_email

    def validate_contact_phone_number(self, contact_phone_number):
        if User.objects.filter(phone_number=contact_phone_number).exists():
            raise ValidationError(detail="User with this phone number already exist", code="unique")    
        return contact_phone_number
        

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class SIDSerializer(serializers.ModelSerializer):
    """
    Serializer for SID Staffs  ( Q.A, Q.C,etc) Registration.
    """
    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active', 'company', 'app_code')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['email'] = custom_normalize_email(validated_data['email'])
        rand_code = get_random_string(10)
        while User.objects.filter(app_code=rand_code).exists():
            rand_code = get_random_string(10)
        app_code = rand_code
        user = User.objects.create(app_code=app_code, **validated_data)
        user.set_password(password)
        user.is_active = True
        group, _ = Group.objects.get_or_create(name='sid')
        user.save()
        user.groups.add(group)
        return user


class CompanyAdminSerializer(serializers.ModelSerializer):
    """
    Serializer for SID Staffs  ( Q.A, Q.C,etc) Registration.
    """
    company_full = MiniCompanySerializer(source='company',read_only=True)
    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created', 'company', 'created_by')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active', 'password', 'app_code')

    def create(self, validated_data):
        validated_data['email'] = custom_normalize_email(validated_data['email'])
        password = get_random_string(8)
        rand_code = get_random_string(10)
        while User.objects.filter(app_code=rand_code).exists():
            rand_code = get_random_string(10)
        app_code = rand_code
        user = User.objects.create(app_code=app_code, **validated_data)
        user.set_password(password)
        user.is_verified = False
        user.is_active = True
        group, _ = Group.objects.get_or_create(name='cmp_adm')
        staff_level, _ = StaffLevel.objects.get_or_create(name='Special', company=validated_data['company'], defaults={'daily_limit': 500000})
        department, _ = Department.objects.get_or_create(name='Admin', company=validated_data['company'])
        user.staff_level = staff_level
        user.department = department
        user.save()
        user.groups.add(group)
        # Send Email to set password and activate user
        subject = 'SecureID Bucca'
        message = f'Dear {user.first_name} {user.last_name}, \n{user.company.name} has onboarded you as their admin on Bucca. Your tempoerary login detail is\
        \nemail={user.email}\npassword={password}\nKindly visit {domain} to reset your password or download our mobile app using the link below {domain}.'
        # from_email = settings.EMAIL_HOST_USER
        to_list = [user.email]
        # print(message)
        # send_mail(subject, message, from_email, to_list, fail_silently=True)
        sender = 'noreply@tpssupport.ng'
        email = EmailMessage(subject, message, sender, to_list)
        EmailThread(email).start()
        return user

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = request.user.company
                data['created_by'] = request.user
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                data['created_by'] = request.user
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise ValidationError(detail="User with this email already exist", code="unique")    
        return email

    def validate_phone_number(self, phone_number):
        if User.objects.filter(phone_number=phone_number).exists():
            raise ValidationError(detail="User with this phone number already exist", code="unique")
        return phone_number


class TreasurySerializer(serializers.ModelSerializer):
    """
    Serializer for SID Staffs  ( Q.A, Q.C,etc) Registration.
    """
    company_full = MiniCompanySerializer(source='company',read_only=True)
    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created', 'company', 'created_by')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active', 'password', 'app_code')

    def create(self, validated_data):
        validated_data['email'] = custom_normalize_email(validated_data['email'])
        password = get_random_string(8)
        rand_code = get_random_string(10)
        while User.objects.filter(app_code=rand_code).exists():
            rand_code = get_random_string(10)
        app_code = rand_code
        user = User.objects.create(app_code=app_code, **validated_data)
        user.set_password(password)
        user.is_active = True
        user.is_verified = False
        group, _ = Group.objects.get_or_create(name='cmp_act')
        department, _ = Department.objects.get_or_create(name='Finance', company=validated_data['company'])
        user.department = department
        user.save()
        user.groups.add(group)
        # Send Email to set password and activate user
        subject = 'SecureID Bucca'
        message = f'Dear {user.first_name} {user.last_name}, \n{user.company.name} has onboarded you as their admin on Bucca. Your tempoerary login detail is\
        \nemail={user.email}\npassword={password}\nKindly visit {domain} to reset your password or download our mobile app using the link below {domain}.'
        # from_email = settings.EMAIL_HOST_USER
        to_list = [user.email]
        # print(message)
        # send_mail(subject, message, from_email, to_list, fail_silently=True)
        sender = 'noreply@tpssupport.ng'
        email = EmailMessage(subject, message, sender, to_list)
        EmailThread(email).start()
        return user

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = request.user.company
                data['created_by'] = request.user
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                data['created_by'] = request.user
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")

    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise ValidationError(detail="User with this email already exist", code="unique")    
        return email

    def validate_phone_number(self, phone_number):
        if User.objects.filter(phone_number=phone_number).exists():
            raise ValidationError(detail="User with this phone number already exist", code="unique")
        return phone_number


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'
        # extra_kwargs = {'company': {'required':False}}
        read_only_fields = ['company']

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = company
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")

    def validate_name(self, name):
        request = self.context.get("request")
        company = request.user.company
        if Department.objects.filter(company=company, name=name).exists():
            raise ValidationError(detail="Department already exist", code="unique")    
        return name


class StaffLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffLevel
        fields = '__all__'
        # extra_kwargs = {'company': {'required': False}}
        read_only_fields = ['company']

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = company
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")


class EmployeeSerializer(serializers.ModelSerializer):
    """
    Serializer for SID Staffs  ( Q.A, Q.C,etc) Registration.
    """
    # ref_code = serializers.CharField(required=True)
    image = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    staff_level = serializers.SerializerMethodField()
    department_full = DepartmentSerializer(source='department', read_only=True)
    staff_level_full = StaffLevelSerializer(source='staff_level', read_only=True)

    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created', 'is_active', 'is_verified')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'company', 'app_code')
        extra_kwargs = {'password': {'write_only': True}}
        # extra_kwargs = {'password': {'write_only': True}, 'ref_code': {'write_only': True}}

    # def create(self, validated_data):
    #     ref_code = validated_data.pop('ref_code')
    #     password = validated_data.pop('password')
    #     try:
    #         company = Company.objects.get(ref_code=ref_code)
    #     except Company.DoesNotExist:
    #         raise serializers.ValidationError('Invalid refernce code, Please contact your admin')
    #     validated_data['email'] = custom_normalize_email(validated_data['email'])
    #     rand_code = get_random_string(10)
    #     while User.objects.filter(app_code=rand_code).exists():
    #         rand_code = get_random_string(10)
    #     app_code = rand_code
    #     user = User.objects.create(app_code=app_code, company=company, **validated_data)
    #     user.set_password(password)
    #     user.is_active = True
    #     group, _ = Group.objects.get_or_create(name='emp')
    #     user.save()
    #     user.groups.add(group)
    #     return user

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")

    def get_image(self, obj):
        return obj.image.url if obj.image else None

    def get_department(self, obj):
        return obj.department.name if obj.department else None

    def get_staff_level(self, obj):
        return obj.staff_level.name if obj.staff_level else None


class MiniEmployeeSerializer(serializers.ModelSerializer):
    """
    Mini Serializer for Employee
    """
    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created', 'created_by')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active', 'company', 'password', 'app_code', 'image')
        # extra_kwargs = {'phone_number': {'required': True}}

    # def validate_email(self, data):
    #     if User.objects.filter(email=custom_normalize_email(data)).exists():
    #         raise ValidationError(detail="User already exist", code="unique")
    #     return data

    def validate_phone_number(self, data):
        if User.objects.filter(phone_number=data).exists():
            raise ValidationError(detail="User with phone number already exist", code="unique")
        return data

    def validate_email(self, data):
        if User.objects.filter(email=data).exists():
            raise ValidationError(detail="User with email already exist", code="unique")
        return data


class UsersSerializer(serializers.ModelSerializer):
    """
    Mini Serializer for USers - to  get their fullnames
    """
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'is_active', 'is_verified']

    def get_fullname(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name


class BulkEmployeeSerializer(serializers.Serializer):
    employees = MiniEmployeeSerializer(required=True, many=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required = False)

    def create(self, validated_data):
        employees = validated_data['employees']
        company = validated_data['company']
        created_by = validated_data['created_by']
        for employee in employees:
            # firstname = employee['firstname']
            # lastname = employee['lastname']
            employee['email'] = custom_normalize_email(employee['email'])
            # department = employee['department']
            # staff_level = employee['staff_level']
            # phone_number = employee['phone_number']
            # emp = User.objects.create(firstname=firstname, lastname=lastname, email=email, department=department, phone_number=phone_number, staff_level=staff_level, company=company, created_by=created_by)
            rand_code = get_random_string(10)
            password = get_random_string(8)
            while User.objects.filter(app_code=rand_code).exists():
                rand_code = get_random_string(10)
            app_code = rand_code
            emp = User.objects.create(app_code=app_code, company=company, created_by=created_by, **employee)
            emp.is_active = True
            emp.set_password(password)
            group, _ = Group.objects.get_or_create(name='emp')
            emp.save()
            emp.groups.add(group)
            # SEND MAIL TO USER
            subject = 'SecureID Bucca'
            message = f'Dear {emp.first_name} {emp.last_name}, \n{company.name} has onboarded you as their staff on Bucca. Your temporary login detial is\
            \nemail={emp.email}\npassword={password}\nKindly visit {domain} to reset your password or download our mobile app using the link below {domain}.'
            # USING GMAIL
            # from_email = settings.EMAIL_HOST_USER
            to_list = [emp.email]
            # print(message)
            # send_mail(subject, message, from_email, to_list, fail_silently=True)
            # USING NRC
            # sender = 'noreply@tpssupport.ng'
            sender = settings.EMAIL_HOST_USER
            email = EmailMessage(subject, message, sender, to_list)
            EmailThread(email).start()
        return validated_data

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = request.user.company
                data['created_by'] = request.user
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                data['created_by'] = request.user
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")


# class VendorSerializer(serializers.ModelSerializer):
#     """
#     Serializer for SID Staffs  ( Q.A, Q.C,etc) Registration.
#     """
#     class Meta:
#         model = User
#         read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created')
#         exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active', 'company', 'transfer_receipt')
#         extra_kwargs = {'password': {'write_only': True}, 'is_market_space': {'required': True}, 'is_company': {'required':True}, 'bank_code': {'required':True}, 'account_number': {'required':True}}
#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         validated_data['email'] = custom_normalize_email(validated_data['email'])
#         user = User.objects.create(**validated_data)
#         user.set_password(password)
#         user.is_active = True
#         group, _ = Group.objects.get_or_create(name='ven')
#         user.save()
#         user.groups.add(group)
#         return user

#     def validate(self, data):
#         request = self.context.get("request")
#         company=get_company(request)
#         if company is not None:
#             data['company'] = company
#             return data
#         else:
#             raise serializers.ValidationError("Invalid App Id")


class MiniEmployeeWithPasswordSerializer(serializers.ModelSerializer):
    """
    Mini Serializer for Employee
    """
    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created', 'created_by')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active', 'company', 'app_code', 'department', 'staff_level', 'card_id')
        extra_kwargs = {'password': {'write_only': True}}


class VendorSerializer(serializers.ModelSerializer):
    """
    Serializer for Vendor Registration
    """
    # company = MiniCompanySerializer(read_only=True)
    company_full = MiniCompanySerializer(source='company',read_only=True)
    user = UsersSerializer(read_only=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required = False)
    user = MiniEmployeeWithPasswordSerializer(required=True)

    class Meta:
        model = Vendor
        # exclude = ('id',)
        read_only_fields = ('company',)
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}, 'is_market_space': {'required': True}, 'is_company': {'required':True}, 'bank_code': {'required':True}, 'account_number': {'required':True}}
    
    def create(self, validated_data):
        user = self.context['user']
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        user_data['email'] = custom_normalize_email(user_data['email'])
        # company = validated_data.pop('company')
        # created_by = validated_data.pop('created_by')
        company = user.company
        created_by = user

        account_number = validated_data['account_number']
        bank_code = validated_data['bank_code']
        user_name = validated_data['bussiness_name']
        result = create_transfer_recipient(account_number, bank_code, user_name, company)
        if result is not None:
            rand_code = get_random_string(10)
            while User.objects.filter(app_code=rand_code).exists():
                rand_code = get_random_string(10)
            app_code = rand_code
            user = User.objects.create(app_code=app_code, company=company, created_by=created_by, **user_data)
            user.set_password(password)
            user.is_active = True
            group, _ = Group.objects.get_or_create(name='ven')
            user.save()
            user.groups.add(group)
            validated_data['transfer_recipient'] = result
            vendor = Vendor.objects.create(user=user, company=company, **validated_data)
            # SEND MAIL TO USER
            subject = 'SecureID Bucca'
            message = f'Dear {user.first_name} {user.last_name}, \n{company.name} has onboarded you as their vendor on Bucca. \nKindly visit {domain} to reset your password or download our mobile app using \
            the link below {domain}.'
            # from_email = settings.EMAIL_HOST_USER
            to_list = [user.email]
            print(message)
            # send_mail(subject, message, from_email, to_list, fail_silently=True)
            sender = 'noreply@tpssupport.ng'
            email = EmailMessage(subject, message, sender, to_list)
            EmailThread(email).start()
            return vendor
        else:
            raise serializers.ValidationError({'error':'Unable to create transfer recipient for user'})

    def update(self, instance, validated_data):
        account_number = validated_data.get('account_number', instance.account_number)
        bank_code = validated_data.get('bank_code', instance.bank_code)
        user_name = validated_data.get('bussiness_name', instance.bussiness_name)
        company = instance.company
        if account_number is not None or bank_code is not None:
            print('Account details changed')
            if instance.account_number != account_number or instance.bank_code != bank_code:
                result = create_transfer_recipient(account_number, bank_code, user_name, company)
                if result is not None:
                    validated_data['transfer_recipient'] = result
                else:
                    raise serializers.ValidationError({'error':'Unable to create transfer recipient for user'})
        is_allow_any_day_ticket_scan = validated_data.get('is_allow_any_day_ticket_scan', None)
        if is_allow_any_day_ticket_scan:
            request = self.context.get("request")
            if request.user.groups.first().name not in ['sid', 'cmp_adm']:
                raise serializers.ValidationError({'error':'You are not authorized to perform this action'})
        instance = super().update(instance, validated_data) 
        return instance

    # def validate(self, data):
    #     request = self.context.get("request")
    #     if request.user.groups.first().name == 'cmp_adm':
    #         company=get_company(request)
    #         if company is not None:
    #             data['company'] = request.user.company
    #             data['created_by'] = request.user
    #             return data
    #         else:
    #             raise serializers.ValidationError(app_id_error)
    #     else:
    #         if 'company' in data:
    #             data['created_by'] = request.user
    #             return data
    #         else:
    #             raise serializers.ValidationError(detail="Company is not provided", code="required")

    def validate_user(self, user):
        if User.objects.filter(phone_number=user['phone_number']).exists():
            raise ValidationError(detail="User with phone number already exist", code="unique")
        if User.objects.filter(email=user['email']).exists():
            raise ValidationError(detail="User with email already exist", code="unique")
        return user


class VendorStaffSerializer(serializers.ModelSerializer):
    """
    Serializer for SID Staffs  ( Q.A, Q.C,etc) Registration.
    """
    company = MiniCompanySerializer(read_only=True)
    class Meta:
        model = User
        read_only_fields = ('id', 'is_admin', 'time_created', 'last_login', 'date_created')
        exclude = ('groups', 'is_superuser', 'is_staff', 'is_admin', 'user_permissions', 'date_joined', 'is_active')
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['email'] = custom_normalize_email(validated_data['email'])
        rand_code = get_random_string(10)
        while User.objects.filter(app_code=rand_code).exists():
            rand_code = get_random_string(10)
        app_code = rand_code
        user = User.objects.create(app_code=app_code, **validated_data)
        user.set_password(password)
        user.is_active = True
        group, _ = Group.objects.get_or_create(name='ven_staff')
        user.save()
        user.groups.add(group)
        return user

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            data['created_by'] = request.user
            return data
        else:
            raise serializers.ValidationError(app_id_error)


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value


class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)

class ConfirmResetTokenSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

class ChangeCompanyIdSerializer(serializers.Serializer):
    app_key = serializers.CharField(required=True)


class ChangeCompanyRefSerializer(serializers.Serializer):
    ref_code = serializers.CharField(required=True)


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'
        extra_kwargs = {'company': {'required':False}}

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = company
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")

class MiniVendorSerializer(serializers.ModelSerializer):
    bussiness_name = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'bussiness_name']

    def get_bussiness_name(self, obj):
        return obj.vendor.bussiness_name


class StaffUpdateUserSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'image']


class AdminUpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'department', 'staff_id', 'card_id', 'phone_number', 'image', 'email', 'staff_level', 'biometrics_a']
        extra_kwargs = {'company': {'required':False}}

    def validate(self, data):
        request = self.context.get("request")
        if request.user.groups.first().name == 'cmp_adm':
            company=get_company(request)
            if company is not None:
                data['company'] = company
                return data
            else:
                raise serializers.ValidationError(app_id_error)
        else:
            if 'company' in data:
                return data
            else:
                raise serializers.ValidationError(detail="Company is not provided", code="required")


class SIDAdminSerializer(serializers.ModelSerializer):
    """
    Serializer for SIDAdmin Registration
    """
    user = MiniEmployeeWithPasswordSerializer(required=True)

    class Meta:
        model = SIDAdmin
        exclude = ('id',)
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        request = self.context.get("request")
        user_data = validated_data.pop('user')
        password = user_data.pop('password')
        user_data['email'] = custom_normalize_email(user_data['email'])
        # company = validated_data['company']
        # company = validated_data.pop('company')
        created_by = request.user if request.user.is_authenticated else None
        print(created_by)

        # account_number = validated_data['account_number']
        # bank_code = validated_data['bank_code']
        # user_name = validated_data['name']
        # result = create_transfer_recipient(account_number, bank_code, user_name, company)
        # if result is not None:
        rand_code = get_random_string(10)
        while User.objects.filter(app_code=rand_code).exists():
            rand_code = get_random_string(10)
        app_code = rand_code
        user = User.objects.create(app_code=app_code, created_by=created_by, **user_data)
        user.set_password(password)
        user.is_active = True
        user.is_verified = True
        group, created = Group.objects.get_or_create(name='sid')
        user.save()
        user.groups.add(group)
        # validated_data['transfer_recipient'] = result
        sid_admin = SIDAdmin.objects.create(user=user, **validated_data)
        return sid_admin
        # else:
        #     raise serializers.ValidationError({'error':'Unable to create transfer recipient for user'})


class GetUserAppCodeSerializer(serializers.Serializer):
    # email = serializers.EmailField(required=True)
    email = serializers.CharField(required=True)


class GetUserTokenFromAppCodeSerializer(serializers.Serializer):
    user_app_code = serializers.CharField(required=True)


class ChangeUserStatusSerializer(serializers.Serializer):
    # user_email = serializers.EmailField(required=True)
    user_email = serializers.CharField(required=True)
    status = serializers.BooleanField(required=True)


class PaymentKeySerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment_keys
        fields = '__all__'


class UpdateDeviceSerializer(serializers.Serializer):
    device_id = serializers.CharField(required=True)
    device_code = serializers.IntegerField(required=True)
    status= serializers.BooleanField(required=True)
    

class GetDeviceStatusSerializer(serializers.Serializer):
    device_id = serializers.CharField(required=True)

   
class UserBalanceSerializer(serializers.Serializer):
    order_date = serializers.DateField()


class AdminResetPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required = False)
    password = serializers.RegexField(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$', error_messages={'invalid': 'Password must be alphanumeric, and minimum of 8 characters'}, max_length=None, min_length=None, allow_blank=False, required=True)


class VendorReviewRatingSerializer(serializers.ModelSerializer):
    """
    Serializer for Vendor  review
    """
    class Meta:
        model = VendorReviewRating
        fields = '__all__'
        read_only_fields = ['company', 'created_by', 'created_at', 'updated_at', 'food', 'vendor']
    def validate(self, attrs):
        company = get_company(self.context['request'])
        if not company:
            raise serializers.ValidationError(app_id_error)

        transaction = attrs.get('transaction', self.instance.transaction) if \
            self.instance else attrs['transaction']
        print(transaction.user_id)
        print(self.context['request'].user)
        if transaction.user_id != self.context['request'].user.id:
            raise serializers.ValidationError(
                {'transaction': 'Invalid action'})
        existing_reviews = VendorReviewRating.objects.filter(company=company)
        if self.instance:
            existing_reviews = existing_reviews.exclude(transaction=transaction)

        if existing_reviews.filter(transaction=transaction).first():
            raise serializers.ValidationError(
                {'transaction': 'You have submitted a review for this food already'})
        attrs['company'] = company
        return attrs

    def create(self, validated_data):
        transaction: MealTransaction = validated_data['transaction']
        validated_data['food_id']  = transaction.food.id
        validated_data['vendor_id'] = Vendor.objects.filter(user=transaction.vendor_user_id.id).first().id
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['vendor'] = {'id': instance.vendor.id, 'name':instance.vendor.bussiness_name}
        data['food'] = {'id': instance.food.id, 'name': instance.food.name}
        return data


