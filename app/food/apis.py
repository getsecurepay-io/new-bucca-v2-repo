from django.db import connection
import collections, json, requests,logging,psycopg2,hashlib,hmac

from rest_framework import serializers
from account.helpers import get_company,get_company_id
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView,RetrieveUpdateAPIView, get_object_or_404
from django.contrib.auth import get_user_model # If used custom user model
from rest_framework import mixins, status, views, generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
from django.http import JsonResponse, HttpResponse, request
from account.permissions import IsVendor, IsVendorOrReadOnly, ReadOnly, IsCompanyAdmin

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly, IsAuthenticated
from django.template.loader import render_to_string
from django.conf import settings
from datetime import date, time, datetime, timedelta
logger = logging.getLogger(__name__)

User = get_user_model()

from .schemas import *
from .serializers import CategorySerializer, CategoryTypeSerializer, DeliveryDateSerializer, Food_ratingSerializer, FoodSerializer, InventorySerializer, Inventory_top_historySerializer, \
                        InventoryReadSerializer, FoodReadSerializer, MealTypeSerializer, MiniCompanySerializer
from .models import CategoryType,Category,Food,Food_rating,Inventory,Inventory_top_history, MealType
from account.models import Vendor
from account.serializers import VendorSerializer
from account.utils import CustomPagination, app_id_error
from django.utils.decorators import method_decorator
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class MealTypeViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = MealTypeSerializer
    permission_classes = [IsCompanyAdmin | ReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            cat_type = MealType.objects.filter(company=company.id)
            return cat_type
        raise ValidationError(app_id_error)
        

@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'vendor', openapi.IN_QUERY, description="vendor id", type=openapi.TYPE_INTEGER
                ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
# class CategoryViewSet(ModelViewSet):
class CategoryViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    queryset =Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsVendorOrReadOnly]
    pagination_class = CustomPagination

    # @swagger_auto_schema(method='get', manual_parameters=[category_param], )
    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            user_group = self.request.user.groups.first().name
            queryset = Category.objects.filter(company=company.id)
            vendor = self.request.query_params.get('vendor')
            if user_group == 'ven':
                queryset = queryset.filter(created_by=self.request.user)
            else:
                if vendor is not None:
                    queryset = queryset.filter(created_by=vendor)
            return queryset
        raise ValidationError(app_id_error)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
# class CategoryTypeViewSet(ModelViewSet):
class CategoryTypeViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = CategoryTypeSerializer
    permission_classes = [IsCompanyAdmin | ReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            cat_type = CategoryType.objects.filter(company=company.id)
            return cat_type
        raise ValidationError(app_id_error)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
openapi.Parameter(
                'food', openapi.IN_QUERY, description="food name", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'category_name', openapi.IN_QUERY, description="category name", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'vendor', openapi.IN_QUERY, description="vendor id", type=openapi.TYPE_INTEGER
                ),
            openapi.Parameter(
                'category', openapi.IN_QUERY, description="food category id"
                                                          "", type=openapi.TYPE_INTEGER
                ),
            openapi.Parameter(
                'delivery_date', openapi.IN_QUERY, description="delivery date", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'meal_type', openapi.IN_QUERY, description="meal type", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]
        )
    )
# class InventoryViewSet(ModelViewSet):
class InventoryViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    permission_classes = [IsVendor | ReadOnly]
    pagination_class = CustomPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return InventoryReadSerializer
        elif self.action == 'retrieve':
            return InventoryReadSerializer
        return InventorySerializer

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            # queryset = Inventory.objects.filter(company=company.id)
            queryset = Inventory.objects.filter(company=company.id, quantity_left__gt = 0)
            food_queryset = Food.objects.filter(company=company.id)
            vendor = self.request.query_params.get('vendor')
            food = self.request.query_params.get('food')
            category_name = self.request.query_params.get('category_name')
            meal_type = self.request.query_params.get('meal_type')
            if vendor is not None:
                queryset = queryset.filter(food__created_by=vendor)
            delivery_date = self.request.query_params.get('delivery_date')
            if delivery_date is not None:
                queryset = queryset.filter(delivery_date=delivery_date)
            if meal_type is not None:
                queryset = queryset.filter(meal_type=meal_type)
            if food is not None:
                queryset = queryset.filter(food__name=food)
            if category_name is not None:
                food_queryset = food_queryset.filter(category__name=category_name)
                print (food_queryset)
            if food_queryset is not None:
                queryset = queryset.filter(food__in=food_queryset.values_list('id', flat=True),delivery_date=delivery_date)
            # return queryset

            category_id = self.request.query_params.get('category')
            if category_id is not None:
                queryset = queryset.filter(food__category=category_id)
            return queryset.order_by('-delivery_date')
        raise ValidationError(app_id_error)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'vendor', openapi.IN_QUERY, description="vendor id", type=openapi.TYPE_INTEGER
                ),
            openapi.Parameter(
                'category', openapi.IN_QUERY, description="category", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]
        )
    )
# class FoodViewSet(ModelViewSet):
class FoodViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsVendorOrReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if self.request.method == 'GET':
            self.serializer_class = FoodReadSerializer
        if company is not None:
            user = self.request.user
            queryset = Food.objects.filter(company=company.id, created_by=user) if user.groups.filter(name='ven').exists() else Food.objects.filter(company=company.id)
            vendor = self.request.query_params.get('vendor')
            category = self.request.query_params.get('category')
            if vendor is not None:
                print("HERE", vendor)
                queryset = queryset.filter(created_by__id=vendor)
            if category is not None:
                queryset = queryset.filter(category=category)
            return queryset.order_by('-id')
        raise ValidationError(app_id_error)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
# class FoodRatingViewSet(ModelViewSet):
class FoodRatingViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = Food_ratingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            food_rate = Food_rating.objects.filter(company=company.id)
            return food_rate
        raise ValidationError(app_id_error)
    
    def retrieve(self, request, pk=None):
        food = get_object_or_404(Food, pk=pk)
        queryset = Food_rating.objects.filter(food=food)
        for data in queryset:
            print(data.rating)
        print(queryset)
        serializer = Food_ratingSerializer(queryset, many=True)
        return Response(serializer.data)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
# class Inventory_top_historyViewSet(ModelViewSet):
class Inventory_top_historyViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = Inventory_top_historySerializer
    permission_classes = (permissions.IsAuthenticated,)
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            inv_top = Inventory_top_history.objects.filter(company=company.id)
            return inv_top
        raise ValidationError(app_id_error)


@method_decorator(
    name='get', decorator=swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ],
        )
    )
class RecommenededScreenAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        company = request.user.company
        allow_same_day_delivery = company.allow_same_day_delivery
        today_date = datetime.date(datetime.today()) # Monday is 0, Sunday is 6
        comp_no_of_booking_days = company.allowed_booking_day
        current_day_monday = today_date - timedelta(days=today_date.weekday())
        start_booking_date = current_day_monday if today_date.weekday() < comp_no_of_booking_days - 1 else current_day_monday + timedelta(days=7)
        tomorrow = date.today() + timedelta(days=1)
        if allow_same_day_delivery:
            food_return_day = date.today() 
        else:
            food_return_day = start_booking_date if tomorrow < start_booking_date else tomorrow
        if request.query_params:
            serializer = DeliveryDateSerializer(data=request.query_params)
            if serializer.is_valid():
                food_return_day = serializer.validated_data.get('delivery_date')
            else:
                return Response({
                    'status': 'failed',
                    'message': 'Invalid delivery date'
                }, status=status.HTTP_400_BAD_REQUEST)
        vendors = Vendor.objects.filter(company=company.id, user__is_active=True)
        inventories = Inventory.objects.filter(delivery_date=food_return_day, company=company).order_by('?')
        print('Recommended Inventory date returned', food_return_day)
        return Response({
            'vendors': VendorSerializer(vendors, many=True).data,
            'inventory': InventoryReadSerializer(inventories, many=True).data
        }, status=status.HTTP_200_OK)


@method_decorator(
    name='list', decorator=swagger_auto_schema(
        manual_parameters=[
openapi.Parameter(
                'food', openapi.IN_QUERY, description="food name", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'category_name', openapi.IN_QUERY, description="category name", type=openapi.TYPE_STRING
                ),
            openapi.Parameter(
                'vendor', openapi.IN_QUERY, description="vendor id", type=openapi.TYPE_INTEGER
                ),
            openapi.Parameter(
                'category', openapi.IN_QUERY, description="food category id"
                                                          "", type=openapi.TYPE_INTEGER
                ),
            openapi.Parameter(
                'delivery_date', openapi.IN_QUERY, description="delivery date", type=openapi.FORMAT_DATE
                ),
            openapi.Parameter(
                'App-Id', openapi.IN_HEADER, description="App Id", type=openapi.IN_HEADER
                )
            ]
        )
    )
class UnUsedInventoryViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    permission_classes = [IsVendor | ReadOnly]
    serializer_class = FoodReadSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        company = get_company(self.request)
        if company is not None:
            delivery_date = self.request.query_params.get('delivery_date')
            print(delivery_date)
            if delivery_date is None:
                raise ValidationError({
                    'status': False,
                    'message': 'Please select a delivery date'
                })
            inv_queryset = Inventory.objects.filter(company=company.id, delivery_date=delivery_date)
            food_queryset = Food.objects.filter(company=company.id)
            vendor = self.request.query_params.get('vendor')
            food = self.request.query_params.get('food')
            category_name = self.request.query_params.get('category_name')
            category_id = self.request.query_params.get('category')
            if vendor is not None:
                inv_queryset = inv_queryset.filter(food__created_by=vendor)
                food_queryset = food_queryset.filter(created_by=vendor)
            if food is not None:
                inv_queryset = inv_queryset.filter(food__name=food)
                food_queryset = food_queryset.filter(name=food)
            if category_name is not None:
                food_queryset = food_queryset.filter(category__name=category_name)
                inv_queryset = inv_queryset.filter(food__category__name=category_name)
            if category_id is not None:
                food_queryset = food_queryset.filter(category=category_id)
                inv_queryset = inv_queryset.filter(food__category=category_id)
            if inv_queryset is not None:
                inv_queryset = inv_queryset.values_list('food_id')
                food_queryset = food_queryset.exclude(id__in=inv_queryset)
            # return inv_queryset.order_by('-delivery_date')
            return food_queryset
        raise ValidationError(app_id_error)




