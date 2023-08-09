from django.db.models import Sum
from django.db import connection
import collections
from rest_framework import serializers
from rest_framework.generics import get_object_or_404
import  datetime
from account.helpers import get_company, get_company_id
from food.models import Inventory, Food
from account.models import Company, User, StaffLevel, Device, Vendor
from .models import (MealTransaction, Void_transaction, Receipts,
                     GlobalVariable, WithdrawalHistory,
                     Staff_TopupHistory, Company_TopupHistory,
                     FoodReviewQuestionOption, FoodReviewQuestion, FoodReviewResponse
                     )

from food.serializers import FoodSerializer
from account.helpers import get_company,get_company_id
from account.serializers import MiniCompanySerializer, MiniEmployeeSerializer,CompanySerializer, UsersSerializer, VendorSerializer, MiniVendorSerializer


class GlobalVariableSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalVariable
        fields = '__all__'
        

class CreateListMixin:
    """Allows bulk creation of a resource."""

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True

        return super().get_serializer(*args, **kwargs)


class ErrorSerializer:
    @classmethod
    @property
    # custom_full_errors
    def custom_full_errors(self):
        """
        Returns full errors formatted as per requirements
        """
        default_errors = self.errors
        field_names = []
        for field_name, field_errors in default_errors.items():
            field_names.append(field_name)
        return {
            'code': 140,
            'message': f'Invalid data in {field_names}',
            'resolve': f'Input the right value for {field_names}'
        }


# class MealTransactionSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = MealTransaction


class Void_transactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Void_transaction
        fields = '__all__'

    def validate(self, data):
        request = self.context.get("request")
        company = get_company(request)
        if company is not None:
            data['company'] = company
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class get_daily_limit(object):
    @staticmethod
    def get_data(user_id, delivery_date):
        cur = connection.cursor()
        cur.callproc('get_daily_limit_left', [user_id, delivery_date])
        rows = cur.fetchall()
        print(rows)
        field_names = [i[0] for i in cur.description]
        objects_list = []
        for row in rows:
            d = collections.OrderedDict()
            d[field_names[0]] = row[0]

            objects_list.append(d)
        print('>>>>>>>', objects_list)
        cur.close()
        return objects_list


class MealTransactionSerializer(serializers.ModelSerializer):
    """
    Single Serializer for MealTransaction
    """

    class Meta:
        model = MealTransaction
        read_only_fields = ('id', 'time_created', 'last_modified','unit_price','service_fee','total','sub_total',
                            'is_comp_allow_txn_mix','date_created','status','company_amount','personal_amount',
                            'receipt_no','verification_type','company','self_service_device','user','platform','place',
                            'vendor_user_id','delivered_time','delivered_date','last_modified','voider')
        exclude = ('')
        # # extra_kwargs = {'phone_number': {'required': True}}

class LatestMealTransactionSerializer(serializers.ModelSerializer):
    """
    Single Serializer for MealTransaction
    """

    class Meta:
        model = MealTransaction
        fields = '__all__'

    def to_representation(self, instance:MealTransaction):
        data = super().to_representation(instance)
        data['has_reviewed'] = True if instance.vendor_rating.first() else False
        data['food'] = {'id': instance.food.id, 'name': instance.food.name}
        vendor = Vendor.objects.filter(user=instance.vendor_user_id.id).first()
        data['vendor'] = {'id': vendor.id, 'bussiness_name': vendor.bussiness_name} if vendor else {}
        return data

class BulkMealTransactionSerializer(serializers.ModelSerializer):
    orders = MealTransactionSerializer(required=True, many=True, write_only=True)
    platform = serializers.CharField(required=True, write_only=True)
    place = serializers.CharField(required=True, write_only=True)  # Market place (market) or Company (company)

    class Meta:
        model = MealTransaction
        fields = ['place', 'orders', 'platform', 'status']


    def create(self, validated_data):
        orders = validated_data.pop('orders')
        request = self.context.get("request")
        platform = validated_data['platform']
        place = validated_data['place']

        company = get_company(request)
        company_id = get_company_id(request)
        comp = get_object_or_404(Company, id=company_id)
        the_comp_balance = comp.balance
        user_id = request.user.id
        userx = request.user
        print('request: ',request)
        user = get_object_or_404(User, id=user_id)
        staff_comp_id = user.company_id

        staff_personal_used = MealTransaction.objects.filter(user_id=user_id,status='pending').aggregate(TOTAL=Sum('personal_amount'))['TOTAL'] or 0

        company_bal_used = MealTransaction.objects.filter(status='pending').aggregate(TOTAL=Sum('company_amount'))['TOTAL'] or 0
        company_amt_left = the_comp_balance - company_bal_used

        staff_personal_wallet = user.balance
        print('staff_personal_wallet', staff_personal_wallet)
        print('staff_personal_used', staff_personal_used)
        staff_per_balance = staff_personal_wallet - (staff_personal_used if staff_personal_used != None else 0)

        staff_lev_id = user.staff_level_id
        print ('staff_level:',staff_lev_id)
        try:
            staff_level = get_object_or_404(StaffLevel, id=staff_lev_id)

        except:
            staff_level = None

        daily_limit = staff_level.daily_limit

        comp = get_object_or_404(Company, id=company_id)
        is_comp_allow_txn_mix = comp.is_comp_allow_txn_mix
        is_comp_allow_same_day_booking = comp.allow_same_day_delivery
        the_comp_balance = comp.balance
        comp_top_up_type = comp.top_up_type
        service_fee = comp.service_fee
        print('orders: ', orders)

        error_data = []
        # error_data.append({"error": "your error message"})

        print('company_id', staff_comp_id, company_id)
        print(place.lower())

        orders_total =0
        for order in orders:
            foodx = order['food']
            food_id = foodx.id
            quantity = order['quantity']
            food = get_object_or_404(Food, id=food_id)
            unit_price = food.unit_price
            orders_total += (quantity*unit_price)

        if ((place.lower() == 'company') and (staff_comp_id == company_id) ):
            if ((the_comp_balance > 0 and company_amt_left > orders_total ) or ( (comp_top_up_type == 'postpaid'))):

                delivery_dates = tuple(set(d['delivery_date'] for d in orders))
                print('delivery_dates: ', delivery_dates)

                daily_total = {}  # Total cost per delivery date
                delivery_date_resp = {}  # Boolean response to confirm if the user can order
                delivery_error_resp = {}  # The error message associated with the delivery_date_resp
                delivery_error_resp_ = []
                total_diff = 0
                the_qty_left = {}
                the_qty_left_resp = {}  # The error message associated with the the_qty_left
                the_qty_left_resp_ = []
                for dd in delivery_dates:
                    for order in orders:

                        if dd == order['delivery_date']:
                            print('order: ', order)

                            foodx = order['food']
                            food_id = foodx.id
                            quantity = order['quantity']
                            food = get_object_or_404(Food, id=food_id)
                            unit_price = food.unit_price
                            delivery_date = order['delivery_date']
                            inv = Inventory.objects.filter(food=foodx, delivery_date=delivery_date)
                            quantity_left = int(inv[0].quantity_left) if inv else 0
                            print('quantity:', quantity)
                            print('quantity_left', quantity_left)
                            key = foodx.name + ' for ' + str(dd)
                            print('key :', key)

                            the_qty_left[str(key)] = 'true' if quantity_left >= quantity else 'false'

                            if quantity_left < quantity:
                                keys = key + ': ' + (
                                        'Stock needs to be topped up. ' + str(quantity_left) + ' quantity left')
                                the_qty_left_resp_.append(keys)
                                the_qty_left_resp[str(key)] = (
                                        'Stock needs to be topped up. ' + str(quantity_left) + ' quantity left')

                            if str(dd) in daily_total:
                                daily_total[str(dd)] = daily_total[str(dd)] + (quantity * unit_price)
                            else:
                                daily_total[str(dd)] = (quantity * unit_price)

                print('the_qty_left', the_qty_left)
                print('the_qty_left_resp: ', the_qty_left_resp)
                print('the_qty_left_resp_: ', the_qty_left_resp_)
                print('daily_total: ', daily_total)

                if (all(x == 'true' for x in the_qty_left.values())):

                    # Get the total expenses above the staff daily limit across the delivery date
                    for del_date, tot_cost in daily_total.items():
                        print('data: ', (del_date), tot_cost)

                        # Directly
                        daily_limit_used = MealTransaction.objects.filter(user_id=user_id, delivery_date=del_date,
                                                                          status__in=('pending', 'delivered', 'ticket-printed')).aggregate(
                            TOTAL=Sum('total'))['TOTAL']

                        print('daily_limit_used: ', (daily_limit_used if daily_limit_used != None else 0))

                        daily_limit_left_actual = (daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                        daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0

                        print('daily_limit: ', daily_limit)
                        print('daily_limit_left: ', daily_limit_left)

                        if (tot_cost > daily_limit_left) and (is_comp_allow_txn_mix == True):
                            total_diff = total_diff + (tot_cost - daily_limit_left)
                    print('total_diff: ', total_diff)

                    # Verification Transaction Amount for the Meal Order
                    for del_date, tot_cost in daily_total.items():

                        # Directly
                        daily_limit_used = MealTransaction.objects.filter(user_id=user_id, delivery_date=del_date,
                                                                          status__in=('pending', 'delivered', 'ticket-printed')).aggregate(
                            TOTAL=Sum('total'))['TOTAL']

                        daily_limit_left_actual = (daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                        daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0

                        '''
                        Check 1:  if total cost for a specific delivery date  > daily limit left for that specific day 
                                    AND staff balance  greater than/ equal to the total excess  AND Company allows  mix payment
                        
                        Check 2 :  if total cost for a specific delivery date  <  daily limit left for that specific day 
                        '''
                        if (((tot_cost > daily_limit_left) and (staff_per_balance >= total_diff)) and
                            (is_comp_allow_txn_mix == True)) or (tot_cost <= daily_limit_left):

                            delivery_date_resp[del_date] = 'true'

                            '''
                            Check 3:  if total cost for a specific delivery date  > daily limit left for that specific day 
                                        AND staff balance less than the total excess  AND Company allows  mix payment
            
                            Check 4 :  if total cost for a specific delivery date  >  daily limit left for that specific day  
                                        AND Company does not allow  mix payment
                            '''

                        elif (((tot_cost > daily_limit_left) and (staff_per_balance < total_diff))
                              and (is_comp_allow_txn_mix == True)):

                            delivery_date_resp[del_date] = 'false'
                            error_msg = del_date + ': Insufficient Staff Personal Balance to accommodate the extra #' + str(
                                total_diff) + ' across the delivery dates'
                            # if error_msg not in delivery_error_resp.values():
                            delivery_error_resp[del_date] = error_msg
                            delivery_error_resp_.append(error_msg)

                        elif ((tot_cost > daily_limit_left) and (is_comp_allow_txn_mix != True)):
                            delivery_date_resp[del_date] = 'false'
                            error_msg = 'Your order on '+ del_date + ': Exceeded daily limit '
                            delivery_error_resp_.append(error_msg)
                            delivery_error_resp[del_date] = 'Exceeded daily limit '

                        else:
                            delivery_date_resp[del_date] = 'false'
                            delivery_error_resp[del_date] = 'An error occurred'
                            error_msg = del_date + ': An error occurred'
                            delivery_error_resp_.append(error_msg)

                    print('delivery_date_resp: ', delivery_date_resp)
                    print('delivery_error_resp: ', delivery_error_resp)
                    print('delivery_error_resp_: ', delivery_error_resp_)

                    # Only process orders if all delivery_dates passes the check (true) :
                    if (all(x == 'true' for x in delivery_date_resp.values())):
                        print('Transaction Amount verification passed ')

                        for the_order in orders:
                            print('the order: ', the_order)
                            foodx = the_order['food']
                            print('food', foodx)
                            food_id = foodx.id
                            quantity = the_order['quantity']
                            comment = the_order['comment']
                            delivery_date = the_order['delivery_date']
                            print('delivery_date', delivery_date)
                            print('todays date', datetime.date.today())
                            if delivery_date < datetime.date.today():
                                return {'resp': 'Your order include an invalid delivery date'}
                            elif (delivery_date == datetime.date.today()) and (not is_comp_allow_same_day_booking):
                                return {'resp': 'Your order includes delivery date for today with is not possible based on admin configuration'}

                            inv = Inventory.objects.filter(food=foodx, delivery_date=delivery_date)
                            print('inv', inv)
                            # delivery_date=delivery_date)
                            food = get_object_or_404(Food, id=food_id)
                            vendor_user = food.created_by
                            vendor_user_id = food.created_by.id
                            print('vendor', vendor_user_id)
                            food_name = food.name
                            unit_price = food.unit_price
                            total_cost = unit_price * quantity
                            service_charge = service_fee * quantity
                            sub_total = total_cost - service_charge
                            print('quantity', quantity)
                            print('total cost', total_cost)
                            print('service charge', service_charge)
                            print('sub_total', sub_total)
                            quantity_left = int(inv[0].quantity_left) if inv else 0
                            print('quantity_left', quantity_left)

                            print('order set')

                            # Directly
                            daily_limit_used = MealTransaction.objects.filter(user_id=user_id, delivery_date=delivery_date,
                                                                              status__in=('pending', 'delivered', 'ticket-printed')).aggregate(
                                TOTAL=Sum('total'))['TOTAL']

                            daily_limit_left_actual = (daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                            daily_limit_left = daily_limit_left_actual if daily_limit_left_actual > 0 else 0

                            staff_personal_used = MealTransaction.objects.filter(user_id=user_id,
                                                                                 status='pending').aggregate(
                                TOTAL=Sum('personal_amount'))['TOTAL']

                            staff_personal_wallet = user.balance
                            print('staff_personal_wallet', staff_personal_wallet)
                            print('staff_personal_used', staff_personal_used)
                            staff_personal_balance = staff_personal_wallet - (
                                staff_personal_used if staff_personal_used != None else 0)

                            comp_balance = comp.balance
                            diff = total_cost - daily_limit_left
                            print('staff_balance', staff_personal_balance)

                            print('quantity_left: ', quantity_left)

                            print('daily limit used', daily_limit_used if daily_limit_used != None else 0)
                            print('daily_limit', daily_limit)
                            print('diff', diff)
                            print('staff_personal_balance', staff_personal_balance)
                            print('total_cost', total_cost)
                            print('daily_limit_left', daily_limit_left)

                            if (total_cost > daily_limit_left) and (is_comp_allow_txn_mix == True) and (
                                    staff_personal_balance < diff):
                                error_data.append(
                                    {
                                        food_name + " for " + str(
                                            delivery_date): " Insufficient Personal Wallet Balance to cover for the extra #" + str(
                                            diff)})

                            elif (total_cost > daily_limit_left) and (is_comp_allow_txn_mix == False):
                                error_data.append(
                                    {food_name + " for " + str(delivery_date): " Exceeded daily limit for " + str(
                                        delivery_date)})

                            print('error_data: ', error_data)

                        if error_data == []:
                            # Insertion
                            for the_order in orders:
                                print('the order: ', the_order)
                                foodx = the_order['food']
                                print('food', foodx)
                                food_id = foodx.id
                                quantity = the_order['quantity']
                                comment = the_order['comment']
                                delivery_date = the_order['delivery_date']
                                print('delivery_date', delivery_date)

                                inv = Inventory.objects.filter(food=foodx, delivery_date=delivery_date)
                                print('inv', inv)
                                # delivery_date=delivery_date)
                                food = get_object_or_404(Food, id=food_id)
                                vendor_user = food.created_by
                                vendor_user_id = food.created_by.id
                                print('vendor', vendor_user_id)
                                food_name = food.name
                                unit_price = food.unit_price
                                total_cost = unit_price * quantity
                                service_charge = service_fee * quantity
                                sub_total = total_cost - service_charge
                                print('quantity', quantity)
                                print('total cost', total_cost)
                                print('service charge', service_charge)
                                print('sub_total', sub_total)
                                quantity_left = int(inv[0].quantity_left) if inv else 0
                                print('quantity_left', quantity_left)

                                print('order set')

                                # Directly
                                daily_limit_used = \
                                    MealTransaction.objects.filter(user_id=user_id, delivery_date=delivery_date,
                                                                   status__in=('pending', 'delivered', 'ticket-printed')).aggregate(
                                        TOTAL=Sum('company_amount'))['TOTAL']

                                daily_limit_left_actual = (
                                        daily_limit - (daily_limit_used if daily_limit_used != None else 0))
                                daily_limit_left = (daily_limit_left_actual if daily_limit_left_actual > 0 else 0)

                                print('daily_limit', daily_limit)
                                print('daily_limit_used', daily_limit_used)
                                print('daily_limit_left', daily_limit_left)
                                staff_personal_used = MealTransaction.objects.filter(user_id=user_id,
                                                                                     status='pending').aggregate(
                                    TOTAL=Sum('personal_amount'))['TOTAL']

                                staff_personal_wallet = user.balance
                                print('staff_personal_wallet', staff_personal_wallet)
                                print('staff_personal_used', staff_personal_used)
                                staff_personal_balance = staff_personal_wallet - (
                                    staff_personal_used if staff_personal_used != None else 0)

                                comp_balance = comp.balance
                                diff = total_cost - daily_limit_left
                                print('staff_balance', staff_personal_balance)

                                print('quantity_left: ', quantity_left)
                                print('quantity:', quantity)
                                print ('total_cost:',total_cost)
                                print('daily_limit_left:', daily_limit_left)
                                print('total_cost:', total_cost)
                                print ('diff:',diff)
                                print ('staff_personal_balance:', staff_personal_balance)
                                print ('is_comp_allow_txn_mix',is_comp_allow_txn_mix)

                                if (quantity_left >= quantity) and (total_cost <= daily_limit_left):

                                    print('Meal paid with company wallet Only')

                                    # Expenses splitting
                                    com_amount = total_cost
                                    per_amount = 0.0

                                    print('comp_amt: ', com_amount)
                                    print('per_amt: ', per_amount)

                                    meal = MealTransaction.objects.create(food_id=food_id, comment=comment,
                                                                          quantity=quantity,
                                                                          total=total_cost,
                                                                          meal_type_id=the_order['meal_type'].id,
                                                                          unit_price=unit_price,
                                                                          service_fee=service_charge, sub_total=sub_total,
                                                                          is_comp_allow_txn_mix=is_comp_allow_txn_mix,
                                                                          platform=platform, place=place, status='pending',
                                                                          company_amount=com_amount,
                                                                          personal_amount=per_amount,
                                                                          company=company, user=userx,
                                                                          vendor_user_id=vendor_user,
                                                                          delivery_date=delivery_date)
                                    meal.is_comp_allow_txn_mix = is_comp_allow_txn_mix
                                    meal.save()

                                    print('Meal order completed')

                                    # Reduce the stock by the quantity paid for
                                    quantity_left = int(inv[0].quantity_left) if inv else 0
                                    new_qty_left = quantity_left - quantity
                                    print('new qty :', new_qty_left)

                                    invv=get_object_or_404(Inventory, food_id =foodx.id, delivery_date= delivery_date)
                                    invv.quantity_left = new_qty_left
                                    invv.save()
                                    print('inventory updated successfully')


                                elif (quantity_left >= quantity) and (total_cost > daily_limit_left) and (
                                        is_comp_allow_txn_mix == True) and (
                                        staff_personal_balance >= diff):

                                    print('Meal paid with company wallet and  staff wallet')
                                    # Expenses splitting
                                    com_amount = daily_limit_left
                                    per_amount = diff

                                    print('daily_limit_left: ', daily_limit_left)
                                    print('comp_amt: ', com_amount)
                                    print('per_amt: ', per_amount)

                                    meal = MealTransaction.objects.create(food_id=food_id, comment=comment,
                                                                          quantity=quantity,
                                                                           meal_type_id=the_order['meal_type'].id,
                                                                          total=total_cost, unit_price=unit_price,
                                                                          service_fee=service_charge, sub_total=sub_total,
                                                                          is_comp_allow_txn_mix=is_comp_allow_txn_mix,
                                                                          platform=platform, place=place, status='pending',
                                                                          company_amount=com_amount,
                                                                          personal_amount=per_amount,
                                                                          company=company, user=userx,
                                                                          vendor_user_id=vendor_user,
                                                                          delivery_date=delivery_date)
                                    meal.is_comp_allow_txn_mix = is_comp_allow_txn_mix
                                    meal.save()

                                    print('Meal order completed')

                                    # Reduce the stock by the quantity paid for
                                    quantity_left = int(inv[0].quantity_left) if inv else 0
                                    inv_id = int(inv[0].id) if inv else 0
                                    new_qty_left = quantity_left - quantity
                                    print('new qty :', new_qty_left)
                                    invv = get_object_or_404(Inventory, food_id=foodx.id, delivery_date=delivery_date)
                                    invv.quantity_left = new_qty_left
                                    invv.save()

                                    print('inventory updated successfully')

                                    # if inv_id != 0:
                                    #     invv = Inventory.objects.filter(id=inv_id).update(quantity_left=new_qty_left)
                                    #     # invv.quantity_left = new_qty_left
                                    #     # inv.save()
                                else:
                                    return {'resp': ['An error occurred due to insufficient balance']}

                                print('order taken successfully')

                            return {'resp': 'created successfully',
                                    'orders': len(orders)}
                        else:
                            return {'resp': error_data}
                    # if  delivery_dates fails  the check  :
                    else:
                        error_msg = 'Insufficient Staff Personal Balance to accommodate the extra #' + str(
                            total_diff) + ' across the delivery dates'
                        # return {'resp': {'all delivery dates':list(delivery_error_resp.values())[0]} if (all(x == error_msg for x in delivery_error_resp.values())) else delivery_error_resp}
                        return {'resp': delivery_error_resp_}
                    # return {'resp': delivery_error_resp}
                else:
                    # return {'resp': the_qty_left_resp}
                    return {'resp': the_qty_left_resp_}
            else:
                return {'resp': 'Top-up needed, Kindly contact Admin'}
        else:
            return {'resp': 'Company detail does not match , Kindly contact Admin'}
            # return {'resp': 'Company Top-up is required, Kindly contact Admin'}

    def validate(self, data):
        request = self.context.get("request")
        company = get_company(request)
        if company is not None:
            data['company'] = company
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class SelfServiceUpdateMealTransactionSerializer(serializers.Serializer):
    verification_type = serializers.CharField(required=True)  # facial or fingerprint or qr  or card
    device_id = serializers.CharField(required=True)
    user_id = serializers.IntegerField(required=True)


    def validate(self, data):
        request = self.context.get("request")
        company = get_company(request)
        if company is not None:
            data['company'] = company
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


    # ErrorSerializer.custom_full_errors
    # # custom_full_errors
    @property
    def custom_full_errors(self):
        """
        Returns full errors formatted as per requirements
        """
        default_errors = self.errors
        field_names = []
        for field_name, field_errors in default_errors.items():
            field_names.append(field_name)
        return {
            'code': 140,
            'message': f'Invalid data in {field_names}',
            'resolve': f'Input the right value for {field_names}'
        }


class SelfServiceUpdateMealTransactionXSerializer(serializers.Serializer):
    verification_type = serializers.CharField(required=True)  # facial or fingerprint or qr  or card
    device_id = serializers.CharField(required=True)
    user_id = serializers.IntegerField(required=True)

    #
    # def validate(self,data):
    #     request = self.context.get("request")
    #     print('request', request)
    #     company = get_company(request)
    #
    #     if company is not None:
    #         data['company'] = company
    #         return data
    #     else:
    #         raise serializers.ValidationError("Invalid App Id")


    # ErrorSerializer.custom_full_errors
    # # custom_full_errors
    @property
    def custom_full_errors(self):
        """
        Returns full errors formatted as per requirements
        """
        default_errors = self.errors
        field_names = []
        for field_name, field_errors in default_errors.items():
            field_names.append(field_name)
        return {
            'code': 140,
            'message': f'Invalid data in {field_names}',
            'resolve': f'Input the right value for {field_names}'
        }



class SIDWithdrawalHistorySerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)

    def get_company(self, obj):

        if obj.company == 0:
            return 'ALL COMPANIES'
        else:
            comp = get_object_or_404(Company, id=obj.company)
            return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User,id = obj.user.id)
        return user.first_name + ' ' + user.last_name


    class Meta:
        model = WithdrawalHistory

        exclude = [ 'data', 'user_type',  'transfer_id']


class CompanyWithdrawalHistorySerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)


    def get_company(self, obj):

        comp = get_object_or_404(Company, id=obj.company)
        return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User,id = obj.user.id)
        return user.first_name + ' ' + user.last_name

    class Meta:
        model = WithdrawalHistory
        exclude = ['withdrawal_charge', 'account_debted_for_charge', 'data', 'user_type', 'status', 'transfer_id']


class VendorWithdrawalHistorySerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)

    def get_company(self, obj):
        comp = get_object_or_404(Company, id=obj.company)
        return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User,id = obj.user.id)
        return user.first_name + ' ' + user.last_name


    class Meta:
        model = WithdrawalHistory
        exclude = ['withdrawal_charge','account_debted_for_charge','data','user_type','status','transfer_id']


class StaffMealTransactionHistorySerializer(serializers.ModelSerializer):
    meal_type = serializers.SerializerMethodField(read_only=True)
    user_full = UsersSerializer(source='user', read_only=True)
    company_full = MiniCompanySerializer(source='company', read_only=True)
    vendor_user_id_full = MiniVendorSerializer(source='vendor_user_id', read_only=True)
    food = FoodSerializer(read_only=True)
    class Meta:
        model = MealTransaction
        exclude = ('service_fee', 'sub_total', 'is_comp_allow_txn_mix', 'verification_type', 'self_service_device', 'last_modified', 'company')

    def get_meal_type(self, obj):
        if obj.meal_type:
            return obj.meal_type.name
        else:
            return None


class VendorMealTransactionHistorySerializer(serializers.ModelSerializer):
    meal_type = serializers.SerializerMethodField(read_only=True)
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)
    food = serializers.SerializerMethodField(read_only=True)
    voider = serializers.SerializerMethodField(read_only=True)

    def get_company(self, obj):
        comp = get_object_or_404(Company, id=obj.company.id)
        return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User, id=obj.user.id)
        return user.first_name + ' ' + user.last_name


    def get_voider(self, obj):
        if obj.voider is not None:
            user_x = get_object_or_404(User,id = obj.voider.id)
            return user_x.first_name + ' ' + user_x.last_name
        else:
            return 'NaN'

    def get_food(self, obj):
        if obj.food:
            food_ = get_object_or_404(Food, id=obj.food.id)
            return food_.name
        else:
            return None

    def get_meal_type(self, obj):
        if obj.meal_type:
            return obj.meal_type.name
        else:
            return None

    class Meta:
        model = MealTransaction
        exclude = ('is_comp_allow_txn_mix', 'place', 'verification_type', 'company_amount', 'personal_amount', 'self_service_device', 'last_modified', 'vendor_user_id')


class CompanyMealTransactionHistorySerializer(serializers.ModelSerializer):
    meal_type = serializers.SerializerMethodField(read_only=True)
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)
    voider = serializers.SerializerMethodField(read_only=True)
    vendor_user_id = serializers.SerializerMethodField(read_only=True)
    self_service_device = serializers.SerializerMethodField(read_only=True)
    food = serializers.SerializerMethodField(read_only=True)

    def get_company(self, obj):
        comp = get_object_or_404(Company, id=obj.company.id)
        return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User, id=obj.user.id)
        return user.first_name + ' ' + user.last_name

    def get_vendor_user_id(self, obj):
        vend = get_object_or_404(Vendor, user=obj.vendor_user_id)
        return vend.bussiness_name

    def get_self_service_device(self, obj):
        if obj.self_service_device:
            dev = get_object_or_404(Device, id=obj.self_service_device.id)
            return dev.name
        else:
            return 'NaN'

    def get_voider(self, obj):
        if obj.voider is not None:
            user_x = get_object_or_404(User, id=obj.voider.id)
            return user_x.first_name + ' ' + user_x.last_name
        else:
            return 'NaN'

    def get_food(self, obj):
        food_ = get_object_or_404(Food, id=obj.food.id)
        return food_.name

    def get_meal_type(self, obj):
        if obj.meal_type:
            return obj.meal_type.name
        else:
            return None

    class Meta:
        model = MealTransaction
        exclude = ('is_comp_allow_txn_mix', 'personal_amount')


class SIDMealTransactionHistorySerializer(serializers.ModelSerializer):
    meal_type = serializers.SerializerMethodField(read_only=True)
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)
    voider = serializers.SerializerMethodField(read_only=True)
    vendor_user_id = serializers.SerializerMethodField(read_only=True)
    self_service_device = serializers.SerializerMethodField(read_only=True)
    food = serializers.SerializerMethodField(read_only=True)


    def get_company(self, obj):
        comp = get_object_or_404(Company, id=obj.company.id)
        return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User,id = obj.user.id)
        return user.first_name + ' ' + user.last_name

    def get_vendor_user_id(self, obj):
        vend = get_object_or_404(Vendor,user = obj.vendor_user_id)
        return vend.bussiness_name

    def get_self_service_device(self, obj):
        if obj.self_service_device:
            dev = get_object_or_404(Device,id = obj.self_service_device.id)
            return dev.name
        else:
            return 'NaN'

    def get_voider(self, obj):
        if obj.voider is not None:
            user_x = get_object_or_404(User,id = obj.voider.id)
            return user_x.first_name + ' ' + user_x.last_name
        else:
            return 'NaN'

    def get_food(self, obj):
        food_ = get_object_or_404(Food,id = obj.food.id)
        return food_.name

    def get_meal_type(self, obj):
        if obj.meal_type:
            return obj.meal_type.name
        else:
            return None

    class Meta:
        model = MealTransaction
        fields = '__all__'


class StaffTopUpHistorySerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)
    status = serializers.SerializerMethodField(read_only=True)

    def get_company(self, obj):
        comp = get_object_or_404(Company, id=obj.company.id)
        return comp.name

    def get_status(self, obj):
        return obj.top_up_payload['gateway_response']
    def get_user(self, obj):
        try:
            if obj.user_email:
                user = get_object_or_404(User,email = obj.user_email)
                return user.first_name + ' ' + user.last_name
            else:
                return None
        except:
            return None


    class Meta:
        model = Staff_TopupHistory
        fields = ('user','company','amount','date_created','time_created','user_email','reference_no','description','status')
        # fields = '__all__'


class CompanyTopUpHistorySerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)

    def get_company(self, obj):
        

        comp = get_object_or_404(Company, id=obj.company.id)
        return comp.name

    def get_user(self, obj):
        try:
            if obj.user_email:
                user = get_object_or_404(User,email = obj.user_email)
                return user.first_name + ' ' + user.last_name
            else:
                return None
        except:
            return None

    


    class Meta:
        model = Company_TopupHistory
        fields = ( 'user', 'company', 'amount', 'date_created', 'time_created', 'user_email', 'reference_no', 'description')


class VoidTxnSerializer(serializers.ModelSerializer):
    txn_id =  serializers.CharField(required=True)

    class Meta:
        model = Void_transaction
        field = ('txn_id')



class VoidTxnHistorySerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField(read_only=True)
    company = serializers.SerializerMethodField(read_only=True)
    vendor = serializers.SerializerMethodField(read_only=True)


    def get_company(self, obj):

        comp = get_object_or_404(Company, id=obj.company)
        return comp.name

    def get_user(self, obj):
        user = get_object_or_404(User,id = obj.user.id)
        return user.first_name + ' ' + user.last_name

    def get_vendor(self, obj):
        vend = get_object_or_404(Vendor,user = obj.vendor_user)
        return vend.bussiness_name


    class Meta:
        model = Void_transaction


class VendorConfirmDeliverySerializer(serializers.Serializer):
    receipt_id = serializers.CharField(required=True)


class TransactionSpiltReportSerializer(serializers.Serializer):
    user = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    department = serializers.SerializerMethodField()
    staff_level = serializers.SerializerMethodField()
    company_share_per_txn = serializers.SerializerMethodField()
    total_sum = serializers.SerializerMethodField()
    no_of_days = serializers.SerializerMethodField()
    company_share = serializers.SerializerMethodField()
    staff_share = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj['user']

    def get_first_name(self, obj):
        return obj['user__first_name']

    def get_last_name(self, obj):
        return obj['user__last_name']

    def get_department(self, obj):
        return obj['user__department__name']

    def get_staff_level(self, obj):
        return obj['user__staff_level__name']

    def get_company_share_per_txn(self, obj):
        return obj['user__staff_level__company_paid']

    def get_total_sum(self, obj):
        return obj['company_amount__sum']

    def get_no_of_days(self, obj):
        return obj['delivery_date__count']

    def get_company_share(self, obj):
        return obj['comp_paid']

    def get_staff_share(self, obj):
        return obj['staff_paid']


class CheckCashoutSerializer(serializers.Serializer):
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=True)

class ConfirmAutoTopupSerializer(serializers.Serializer):
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=True)


class FoodReviewQuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodReviewQuestionOption
        fields = '__all__'
        extra_kwargs = {
            'question': {'read_only': True}
        }

class FoodReviewQuestionOptionUpdateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    class Meta:
        model = FoodReviewQuestionOption
        fields = '__all__'
        extra_kwargs = {
            'question': {'read_only': True}
        }


class FoodReviewQuestionSerializer(serializers.ModelSerializer):
    options = FoodReviewQuestionOptionSerializer(many=True, write_only=True)

    class Meta:
        model = FoodReviewQuestion
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'read_only': True},
            'company': {'read_only': True},
        }

    def to_representation(self, instance):
        options = instance.question_option.all()
        data = super().to_representation(instance)
        data['options'] = FoodReviewQuestionOptionSerializer(
            options, many=True).data if options else {}
        return data


class FoodReviewQuestionUpdateSerializer(serializers.ModelSerializer):
    options = FoodReviewQuestionOptionUpdateSerializer(many=True, write_only=True)

    class Meta:
        model = FoodReviewQuestion
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'read_only': True},
            'company': {'read_only': True},
        }

    def update(self, instance: FoodReviewQuestion, validated_data):
        validated_options = validated_data.pop('options')
        options_obj_to_update = []
        options_obj_to_create = []
        options_ids = []
        existing_options = instance.question_option.all()
        updated_question = super().update(instance, validated_data)
        for option in validated_options:
            if option.get('id'):
                options_ids.append(option.get('id'))
                option_instance = existing_options.filter(id=option.get('id')).first()
                if option_instance:
                    option_instance.key = option['key']
                    option_instance.value = option['value']
                    options_obj_to_update.append(option_instance)
            else:
                options_obj_to_create.extend(
                    [FoodReviewQuestionOption(**option, question_id=instance.id)])
        if len(options_ids) > 0:
            FoodReviewQuestionOption.objects.filter(
                question=instance.id).exclude(id__in=options_ids).delete()
        if len(options_obj_to_update) > 0:
            FoodReviewQuestionOption.objects.bulk_update(options_obj_to_update, fields=['key', 'value'])
        if len(options_obj_to_create) > 0:
            FoodReviewQuestionOption.objects.bulk_create(options_obj_to_create)
        return updated_question


class FoodReviewQuestionCreateSerializer(serializers.Serializer):
    questions = serializers.ListSerializer(
        child=FoodReviewQuestionSerializer(), required=True)

    def create(self, validated_data):
        questions = validated_data['questions']
        user = self.context['request'].user
        for question in questions:
            options = question.pop('options')
            question_obj = FoodReviewQuestion.objects.create(**question, created_by=user, company=user.company)
            question_options = []
            for option in options:
                question_options.extend([FoodReviewQuestionOption(**option, question_id=question_obj.id)])
            FoodReviewQuestionOption.objects.bulk_create(question_options)
        return True


class FoodReviewResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodReviewResponse
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'read_only': True},
            'vendor': {'read_only': True},
        }

    def to_representation(self, instance: FoodReviewResponse):
        data = super().to_representation(instance)
        data['question'] = FoodReviewQuestionSerializer(instance.question).data
        data['selected_options'] = FoodReviewQuestionOptionSerializer(instance.selected_options).data
        return data

    def create(self, validated_data):
        transaction = validated_data['transaction']
        vendor = Vendor.objects.filter(user=transaction.vendor_user_id.id).first()
        validated_data['vendor_id'] = vendor.id if vendor else None
        return super().create(validated_data)


class FoodReviewCreateResponseSerializer(serializers.Serializer):
    responses  = serializers.ListSerializer(
        child=FoodReviewResponseSerializer(), required=True)

