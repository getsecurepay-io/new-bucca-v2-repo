from django.db import models
from account.models import User, Company, Device
from food.models import Food, MealType


# Create your models here.

class Receipts(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)


class MealTransaction(models.Model):
    STATUS = (
        ('pending', 'Pending'),
        ('void', 'Void'),
        ('delivered', 'Delivered'),
        ('force-delivered', 'Force Delivered'),
        ('cancelled', 'Cancelled'),
        ('failed', 'Failed'),
        ('insufficient', 'Insufficient'),
        ('ticket-printed', 'Ticket-printed')
    )
    TYPE = (
        ('market', 'Market Place'),
        ('company', 'Company Place'),
    )
    PLATFORM = (
        ('AND', 'ANDROID'),
        ('IOS', 'IOS'),
        ('SEF', 'SELF-SERVICE'),
        ('WEB', 'WEB')
    )
    id = models.AutoField(primary_key=True)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True, blank=True, related_name='txn_food')
    meal_type = models.ForeignKey(MealType, on_delete=models.SET_NULL, null=True, blank=True,
                                  related_name='txn_mealtype')
    comment = models.TextField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    unit_price = models.FloatField(blank=True, null=True)
    total = models.FloatField(blank=True, null=True)
    service_fee = models.FloatField(blank=True, null=True)
    sub_total = models.FloatField(blank=True, null=True)
    is_comp_allow_txn_mix = models.BooleanField(blank=True, null=True)
    platform = models.CharField(max_length=15, choices=PLATFORM, blank=True, null=True)
    place = models.CharField(max_length=8, choices=TYPE, null=True, blank=True)
    status = models.CharField(max_length=15, choices=STATUS, null=True, blank=True, default='pending')
    company_amount = models.FloatField(blank=True, null=True, default=0.0)
    personal_amount = models.FloatField(blank=True, null=True, default=0.0)
    receipt_no = models.ForeignKey(Receipts, on_delete=models.SET_NULL, null=True, blank=True)
    verification_type = models.CharField(max_length=50, blank=True, null=True)
    date_created = models.DateField(auto_now_add=True, null=True, blank=True)
    time_created = models.TimeField(auto_now_add=True, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="txn_company")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="txn_user")
    self_service_device = models.ForeignKey(Device, on_delete=models.SET_NULL, null=True, blank=True,
                                            related_name="txn_self_service")
    vendor_user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="ven_user")
    delivery_date = models.DateField(null=True, blank=True)
    delivered_time = models.TimeField(null=True, blank=True)
    delivered_date = models.DateField(null=True, blank=True)
    voider = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="txn_voider")
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.sub_total = round(self.sub_total, 2)
        super(MealTransaction, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.id)


class Void_transaction(models.Model):
    id = models.AutoField(primary_key=True)
    txn_id = models.ForeignKey(MealTransaction, on_delete=models.SET_NULL, null=True, blank=True,
                               related_name='txn_void')
    quantity = models.IntegerField(blank=True, null=True)
    total = models.FloatField(blank=True, null=True)
    company_account_credit = models.FloatField(blank=True, null=True)
    staff_personal_account_credit = models.FloatField(blank=True, null=True)
    service_fee_debit = models.FloatField(blank=True, null=True)
    vendor_debit = models.FloatField(blank=True, null=True)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="void_company")
    voider = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="void_user")
    vendor_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name="void_ven_user")

    def __str__(self):
        return str(self.id)


class Staff_TopupHistory(models.Model):
    amount = models.FloatField()
    date_created = models.DateField(auto_now=True, null=True, blank=True)
    time_created = models.TimeField(auto_now=True, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="staff_topup_user")
    user_email = models.EmailField(null=True, blank=True)
    top_up_charge = models.FloatField(null=True, blank=True, default=0)
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    top_up_payload = models.JSONField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True,
                                related_name="staff_topup_company")

    def __str__(self):
        return "Staff History {}".format(self.user_email)


class Company_TopupHistory(models.Model):
    amount = models.FloatField()
    user_email = models.EmailField(null=True, blank=True)
    top_up_charge = models.FloatField(null=True, blank=True, default=0)
    date_created = models.DateField(auto_now=True, null=True, blank=True)
    time_created = models.TimeField(auto_now=True, null=True, blank=True)
    reference_no = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    top_up_payload = models.JSONField(null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True,
                                related_name="comp_topup_company")

    def __str__(self):
        return "Company History {}".format(self.user_email)


class WithdrawalHistory(models.Model):
    STATUS = (
        ('success', 'success'),
        ('pending', 'pending'),
        ('failed', 'failed'),
    )
    id = models.AutoField(primary_key=True)
    amount = models.FloatField()
    date_created = models.DateField(auto_now=True, null=True, blank=True)
    time_created = models.TimeField(auto_now=True, null=True, blank=True)
    recipient = models.IntegerField()
    transfer_id = models.IntegerField()
    status = models.TextField(null=True, blank=True)
    updated_status = models.TextField(choices=STATUS, null=True, blank=True)
    transfer_code = models.TextField(null=True, blank=True)
    reference_no = models.TextField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="withdrawal_user")
    user_type = models.TextField(null=True, blank=True)
    withdrawal_charge = models.FloatField(null=True, blank=True, default=0)
    account_debted_for_charge = models.CharField(max_length=20, null=True, blank=True)
    reason = models.TextField(null=True, blank=True)
    data = models.JSONField(null=True, blank=True)
    company = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return "{}".format(self.recipient)


class GlobalVariable(models.Model):
    id = models.AutoField(primary_key=True)
    variable_name = models.CharField(max_length=250, null=True, blank=True)
    variable_text = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)


class Paystack_Webhook(models.Model):
    id = models.AutoField(primary_key=True)
    data = models.JSONField(null=True, blank=True)
    event = models.TextField(null=True, blank=True)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    company = models.IntegerField(null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)


class PaystackCompanyAutoTopup(models.Model):
    integration = models.IntegerField(null=True, blank=True)
    domain = models.CharField(max_length=250, null=True, blank=True)
    balance = models.FloatField(null=True, blank=True)
    currency = models.CharField(max_length=5, null=True, blank=True)
    difference = models.FloatField(null=True, blank=True)
    reason = models.TextField(null=-True, blank=True)
    model_responsible = models.CharField(max_length=250, null=True, blank=True)
    model_row = models.IntegerField(null=True, blank=True)
    ledger_id = models.IntegerField(null=True, blank=True)
    ledger_created_at = models.DateTimeField(null=True, blank=True)
    ledger_updated_at = models.DateTimeField(null=True, blank=True)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.model_responsible


class FoodReviewQuestion(models.Model):
    QUESTION_TYPE = (
        ('SINGLE_ANSWER', 'SINGLE_ANSWER'),
    )

    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True,
                                related_name="food_question")
    title = models.CharField(max_length=200)
    position = models.IntegerField(default=0)
    required = models.BooleanField(default=False)
    type = models.CharField(max_length=20, choices=QUESTION_TYPE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='question_creator')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class FoodReviewQuestionOption(models.Model):
    id = models.AutoField(primary_key=True)
    question = models.ForeignKey(
        FoodReviewQuestion, on_delete=models.CASCADE, related_name='question_option')
    value = models.CharField(max_length=100)
    key = models.CharField(max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class FoodReviewResponse(models.Model):
    id = models.AutoField(primary_key=True)
    transaction = models.ForeignKey('transaction.MealTransaction', on_delete=models.CASCADE,
                                    related_name='response_rating')
    question = models.ForeignKey(FoodReviewQuestion, on_delete=models.CASCADE, null=True,
                                 related_name='response_question')
    selected_options = models.ForeignKey('transaction.FoodReviewQuestionOption', on_delete=models.CASCADE,
                                         related_name='response_options', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='food_respsonse')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    vendor = models.ForeignKey('account.Vendor', on_delete=models.CASCADE,
                               null=True, blank=True, related_name='response_vendor')


