import sys
import requests
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from six import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from .manager import CustomUserManager
from .utils import validate_phone
import collections, json, requests,logging,psycopg2,hashlib,hmac
import cloudinary
from cloudinary.models import CloudinaryField
from mirage import  fields
from django.core.validators import MinValueValidator, MaxValueValidator

class Company(models.Model):
    TYPE = (
        ('prepaid', 'Prepaid'),
        ('postpaid', 'Postpsid')
    )
    BIO_TYPE = (
        ('fingerprint', 'Fingerprint'),
        ('facial', 'Facial')
    )
    name = models.CharField(max_length=100, unique=True)
    # image = cloudinary.models.CloudinaryField('image', transformation={'width': '200', 'height': '200', 'crop':'fill', 'radius':'20'}, folder='/company', null=True, blank=True)
    image = models.ImageField(upload_to='company', max_length=50, null=True, blank=True)
    sector = models.CharField(max_length=100)
    app_key = models.CharField(max_length=20, unique=True)
    ref_code = models.CharField(max_length=20, unique=True)
    contact_first_name = models.CharField(max_length=20)
    contact_last_name = models.CharField(max_length=20)
    contact_email = models.EmailField(unique=True)
    contact_phone_number = models.CharField(validators=[validate_phone], max_length=17, unique=True)
    expiry_date = models.DateField(null=True, blank=True)
    bank_code = models.CharField(max_length=10, null=True, blank=True)
    account_number = models.CharField(max_length=20, null=True, blank=True)
    authorization_code = models.TextField(null=True, blank=True)
    transfer_recipient = models.CharField(max_length=50, null=True, blank=True)
    balance = models.FloatField(default=0)
    actual_balance = models.FloatField(default=0)
    pending_balance = models.FloatField(default=0)
    top_up_type = models.CharField(max_length= 15, choices=TYPE, null=True, blank=True)
    use_card = models.BooleanField()
    biometric_type = models.CharField(max_length= 15,choices=BIO_TYPE, null=True, blank=True)
    use_biometric = models.BooleanField()
    use_transaction_code = models.BooleanField()
    allow_same_day_delivery = models.BooleanField()
    allowed_booking_day = models.IntegerField()
    notification_balance_limit = models.FloatField(blank=True, null=True)
    is_comp_allow_txn_mix = models.BooleanField(blank=True, null=True)  #If a company allows staff user personal wallet on platform for company meal
    status = models.BooleanField(default=True)
    sid_transfer_recipient = models.CharField(max_length=50, null=True, blank=True)
    description = models.TextField()
    service_fee = models.FloatField(blank=True, null=True)
    sid_balance = models.FloatField(blank=True, null=True,default=0)
    sid_pending_balance = models.FloatField(blank=True, null=True, default=0)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)
    cash_out_time = models.TimeField()
    cancelling_grace_period_in_hours = models.IntegerField()

    # def save(self, *args, **kwargs):
    #     try:
    #         # Opening the uploaded image
    #         im = Image.open(self.image)
    #         output = BytesIO()
    #         # Resize/modify the image
    #         im = im.resize((100, 100))
    #         # after modifications, save it to the output
    #         im.save(output, format='PNG', quality=95, optimize=True, dpi=(200, 200))
    #         output.seek(0)
    #         # change the imagefield value to be the newly modifed image value
    #         self.image = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.image.name.split('.')[0],
    #                                         'image/jpeg',
    #                                         sys.getsizeof(output), None)
    #         super(Company, self).save(*args, **kwargs)
    #     except:
    #         super(Company, self).save(*args, **kwargs)

    def __str__(self):
        return "{}".format(self.name)


class Department(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'company']


class StaffLevel(models.Model):
    name = models.CharField(max_length=250)
    daily_limit = models.FloatField()
    company_paid = models.FloatField()
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        self.name

    class Meta:
        unique_together = ['name', 'company']


class Card(models.Model):
    card_number = models.CharField(max_length=250)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)

    class Meta:
        unique_together = ['card_number', 'company']


class User(AbstractUser):
    SEX = (
        ('male','Male'),
        ('female','Female')
    )
    username = None
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    app_code = models.CharField(max_length=20, unique=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    authorization_code =models.TextField(null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, blank=True, null=True)
    staff_level = models.ForeignKey(StaffLevel, on_delete=models.SET_NULL, blank=True, null=True)
    staff_id = models.CharField(max_length=100, null=True, blank=True)
    card_id = models.ForeignKey(Card, on_delete=models.SET_NULL, blank=True, null=True)
    biometrics_a = models.TextField(null=True, blank=True)
    biometrics_b = models.TextField(null=True, blank=True)
    phone_number = models.CharField(validators=[validate_phone], max_length=17, unique=True)
    balance = models.FloatField(default=0)
    actual_balance = models.FloatField(default=0)
    pending_balance = models.FloatField(default=0)
    is_staff = models.BooleanField(default=False, blank=True, null=True)
    is_admin = models.BooleanField(default=False, blank=True, null=True)
    is_active = models.BooleanField(default=False, blank=True)
    is_verified = models.BooleanField(default=False)
    # image = cloudinary.models.CloudinaryField('image', transformation={'width': '200', 'height': '200', 'crop':'fill', 'radius':'20'}, folder='/user', null=True, blank=True)
    image = models.ImageField(upload_to='user', max_length=50, null=True, blank=True)
    sex = models.CharField(max_length=7, choices=SEX, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)
    created_by = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    @property
    def full_name(self):
        return self.get_full_name()

    def __str__(self):
        return self.email

    # def save(self, *args, **kwargs):
    #     if self.image:
    #         #Opening the uploaded image
    #         im = Image.open(self.image)
    #         output = BytesIO()
    #         #Resize/modify the image
    #         im = im.resize((200,200))
    #         #after modifications, save it to the output
    #         im.save(output, format='JPEG', quality=100)
    #         output.seek(0)
    #         #change the imagefield value to be the newley modifed image value
    #         self.image = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.image.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
    #         super(User,self).save()
    #     else:
    #         super().save(*args, **kwargs)

    class Meta:
        unique_together = [['email', 'company']]
        

class Device(models.Model):
    location = models.CharField(max_length=250, null=True, blank=True)
    name = models.CharField(max_length=250,unique='True')
    device_iid = models.TextField(null=True,blank=True,unique='True')
    device_code = models.IntegerField(null=True,blank=True,unique='True')
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    is_active = models.BooleanField()
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = []


class Vendor(models.Model):
    bussiness_name = models.CharField(max_length=50)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, blank=True,null=True)
    is_market_space = models.BooleanField(default =False)
    description = models.TextField(null=True, blank=True)
    is_company = models.BooleanField()
    is_allow_any_day_ticket_scan = models.BooleanField(default=False)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    bank_code = models.CharField(max_length=10, null=True, blank=True)
    account_number = models.CharField(max_length=20, null=True, blank=True)
    transfer_recipient = models.CharField(max_length=50, null=True, blank=True)
    cash_hold = models.BooleanField(null=True, blank=True, default=False)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True, related_name='vendor_creator')
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.user.first_name + self.user.last_name)

    class Meta:
        # unique_together = ['bussiness_name', 'company']
        unique_together = []


# class Vendorstaff(models.Model):
#     firstname = models.CharField(max_length=250)
#     lastname = models.CharField(max_length=250)
#     vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, blank=True,null=True)
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
#     company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
#     time_created = models.TimeField(auto_now_add=True)
#     date_created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.firstname

#     class Meta:
#         unique_together = ['firstname', 'vendor']


# class Company_admins(models.Model):
#     GROUP = (
#         ('hr','HR'),
#         ('finance','Finance')
#     )
#     firstname = models.CharField(max_length=250)
#     lastname = models.CharField(max_length=250)
#     role =  models.CharField(max_length=7, choices=GROUP, null=True, blank=True)
#     user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True,null=True)
#     company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
#     time_created = models.TimeField(auto_now_add=True)
#     date_created = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.firstname

#     class Meta:
#         unique_together = ['firstname', 'company']


class SIDAdmin(models.Model):
    name = models.CharField(max_length=250)
    company = models.OneToOneField(Company, on_delete=models.SET_NULL, blank=True,null=True)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, blank=True,null=True)
    bank_code = models.CharField(max_length=10, null=True, blank=True)
    account_number = models.CharField(max_length=20, null=True, blank=True)
    transfer_recipient = models.CharField(max_length=20, null=True, blank=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.user.first_name + self.user.last_name)



class Payment_keys(models.Model):
    id= models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.DO_NOTHING)
    public_key = fields.EncryptedTextField(null=True,blank=True)
    private_key = fields.EncryptedTextField(null=True, blank=True)
    def __str__(self):
        return "{}".format(self.id)


class VendorReviewRating(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='rating')
    review = models.TextField(null=True, blank=True)
    transaction = models.ForeignKey('transaction.MealTransaction', on_delete=models.CASCADE,
                                    related_name='vendor_rating')
    food = models.ForeignKey('food.Food',on_delete=models.CASCADE, related_name='vendor_food')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rating_creator')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at', )


