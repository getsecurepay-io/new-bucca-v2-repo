from django.urls import path
from django.contrib.auth.decorators import permission_required
from rest_framework.routers import DefaultRouter
import django.views.defaults

from .apis import CategoryViewSet, CategoryTypeViewSet, InventoryViewSet, FoodViewSet, FoodRatingViewSet, Inventory_top_historyViewSet, FoodRatingViewSet, \
                    RecommenededScreenAPI, UnUsedInventoryViewSet, MealTypeViewSet

router = DefaultRouter()
router.register('foods',FoodViewSet,'foods')
router.register('categorys', CategoryViewSet, 'categorys')
router.register('category-type', CategoryTypeViewSet, 'category-type')
router.register('inventory', InventoryViewSet, 'inventory')
router.register('inventory-unused', UnUsedInventoryViewSet, 'inventory-unused')
# router.register('food-rating', FoodRatingViewSet, 'food-rating')
router.register('inventory-topup', Inventory_top_historyViewSet, 'inventory-topup')
router.register('rating', FoodRatingViewSet, 'food-rating')
router.register('meal-type', MealTypeViewSet, 'meal-type')


urlpatterns = router.urls

urlpatterns += [
    # path('rating/', FoodRatingViewSet.as_view())
    path('recommended-screen/', RecommenededScreenAPI.as_view())
]

