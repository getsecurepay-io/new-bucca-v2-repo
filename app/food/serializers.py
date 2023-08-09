from rest_framework import serializers
from account.models import Company
from account.utils import Base64ImageField
from .models import CategoryType, Category, Food, Inventory, Inventory_top_history, Food_rating, MealType
from account.helpers import get_company,get_company_id
from account.serializers import CompanySerializer, MiniCompanySerializer, MiniEmployeeSerializer, MiniVendorSerializer, UsersSerializer
# , UserSerializer

class MealTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealType
        fields = ('__all__')
        extra_kwargs = {'created_by':{'read_only': True}, 'company':{'read_only':True}}

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            data['created_by'] = request.user
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class CategoryTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryType
        fields = ('__all__')
        extra_kwargs = {'created_by':{'read_only': True}, 'company':{'read_only':True}}

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            data['created_by'] = request.user
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class CategorySerializer(serializers.ModelSerializer):
    category_type_full = CategoryTypeSerializer(source='category_type',read_only=True)
    class Meta:
        model = Category
        fields = ('__all__')
        extra_kwargs = {'category_type': {'required': True}, 'created_by':{'read_only': True}, 'company':{'read_only':True}}

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            data['created_by'] = request.user
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class FoodSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    class Meta:
        model = Food
        fields = ('__all__')
        extra_kwargs = {'company':{'read_only':True}, 'created_by':{'read_only': True}, 'category': {'required': True}}

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        # image = data["image"]
        # print("Image")
        # if image is False:
        #     image = None
        if company is not None:
            data['company'] = company
            data['created_by'] = request.user
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")

    def validate_name(self, name):
        if self.context.get('is_create'):
            request = self.context.get("request")
            vendor = request.user
            company = request.user.company
            if Food.objects.filter(company=company, name=name, created_by=vendor).exists():
                raise serializers.ValidationError(detail="Food already exist", code="unique")    
            return name
        else:
            return name


class FoodReadSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    category_full= CategorySerializer(source='category',read_only=True)
    # category = CategorySerializer(read_only=True)
    company_full = MiniCompanySerializer(source='company',read_only=True)
    # company = MiniCompanySerializer(read_only=True)
    created_by_full = MiniVendorSerializer(source='created_by',read_only=True)
    # created_by = MiniVendorSerializer(read_only=True)

    class Meta:
        model = Food
        fields = ('__all__')
        extra_kwargs = {'company':{'read_only':True}, 'created_by':{'read_only': True}, 'category': {'required': True}, 'category_full': {'required': True}}

    def get_image(self, obj):
        return obj.image.url if obj.image else None

    def get_average_rating(self, obj):
        total_rating = 0
        food_ratings = obj.food_rating_food.all()
        for item in food_ratings:
            total_rating += item.rating
        return total_rating if len(food_ratings) == 0 else total_rating / len(food_ratings)

    def get_comments(self, obj):
        comments = []
        food_ratings = obj.food_rating_food.all().order_by('-id')[:5]
        for item in food_ratings:
            comment = {}
            comment['rating'] = item.rating
            comment['by'] = f'{item.created_by.first_name} {item.created_by.last_name}'
            comment['comment'] = item.comment
            comment['date'] = item.date
            comment['time'] = item.time
            comments.append(comment)
        return comments

# class InventorySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Inventory
#         fields = ('__all__')
#         extra_kwargs = {'company':{'read_only':True}, 'created_by':{'read_only': True}}

#     def validate(self, data):
#         request = self.context.get("request")
#         company=get_company(request)
#         if company is not None:
#             data['company'] = company
#             data['created_by'] = request.user
#             return data
#         else:
#             raise serializers.ValidationError("Invalid App Id")


class InventoryReadSerializer(serializers.ModelSerializer):
    food = FoodReadSerializer(read_only=True)
    created_by = MiniVendorSerializer(read_only=True)
    meal_type_full = MealTypeSerializer(source='meal_type', read_only=True)
    class Meta:
        model = Inventory
        read_only_fields = ('quantity_left','company')
        fields = ['food', 'delivery_date', 'top_up_quantity', 'quantity_left', 'created_by', 'meal_type', 'meal_type_full']


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        read_only_fields = ('quantity_left','company')
        fields = ['food', 'delivery_date', 'top_up_quantity', 'quantity_left', 'meal_type']
        extra_kwargs = {'company':{'read_only':True}, 'created_by':{'read_only': True}, 'food': {'required': True}, 'delivery_date': {'required': True}, 'top_up_quantity':{'required': True}, 'meal_type': {'required': True}}

    def create(self, validated_data):
        company = validated_data.pop('company')
        created_by = validated_data.pop('created_by')
        food = validated_data['food']
        delivery_date = validated_data['delivery_date']
        quantity_added = validated_data['top_up_quantity']
        meal_type = validated_data['meal_type']
        try:
            old_stock = Inventory.objects.get(food=food, delivery_date=delivery_date, company=company)
            old_stock.top_up_quantity += quantity_added
            old_stock.quantity_left += quantity_added
            old_stock.save()
            # Add to Inventory trail
            Inventory_top_history.objects.create(inventory=old_stock, top_up_quantity=quantity_added, company=company, created_by=created_by)
            return old_stock
        except Inventory.DoesNotExist:
            stock = Inventory.objects.create(
                food=food, 
                meal_type=meal_type, 
                delivery_date=delivery_date, 
                quantity_left=quantity_added, 
                top_up_quantity=quantity_added, 
                company=company, 
                created_by=created_by
            )
            # Add to inventory trail
            Inventory_top_history.objects.create(inventory=stock, top_up_quantity=quantity_added, company=company, created_by=created_by)
            return stock

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            data['created_by'] = request.user
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class Inventory_top_historySerializer(serializers.ModelSerializer):

    inventory = InventoryReadSerializer(read_only=True)
    created_by = MiniVendorSerializer(read_only=True)

    class Meta:
        model = Inventory_top_history
        fields = ('__all__')

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        if company is not None:
            data['company'] = company
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class Food_ratingSerializer(serializers.ModelSerializer):
    rating = serializers.IntegerField(max_value=5, min_value=1, required=True)

    class Meta:
        model = Food_rating
        fields = ('__all__')
        extra_kwargs = {'created_by':{'read_only': True}, 'food':{'required':True}}

    def validate(self, data):
        request = self.context.get("request")
        company=get_company(request)
        created_by=request.user
        if company is not None:
            data['company'] = company
            data['created_by'] = created_by
            return data
        else:
            raise serializers.ValidationError("Invalid App Id")


class DeliveryDateSerializer(serializers.Serializer):
    delivery_date = serializers.DateField(format='YYYY-MM-DD')