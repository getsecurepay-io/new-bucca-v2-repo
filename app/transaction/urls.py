from django.urls import path
from django.contrib.auth.decorators import permission_required
from rest_framework.routers import DefaultRouter
import django.views.defaults



from .apis import Void_transactionViewSet,BulkTransactionViewSet,MealDeliveryBySelfServiceXView,GetTopUpCodeView,\
    CashoutView, MealTransactionHistory,VendorWithdrawalHistoryView,CompanyWithdrawalHistoryView,\
    SIDWithdrawalHistoryView,TopUpHistoryView,VoidTransactionView,GetDailyLimitLeftView, ConfirmAutoTopup,\
    VendorConfirmOrderView,MealDeliveryBySelfServiceWithoutDeliveryView, TransactionReport, VendorReport, FoodReport, RatioReport, TransactionSpiltReport, \
        CheckCashout, FoodReviewQuestionViewsets, CheckPaystacWalletBalance

from .webhook import  SecureIDPayStackWebhook
router = DefaultRouter()
router.register('void',Void_transactionViewSet, 'void-txn')
router.register('bulk-order', BulkTransactionViewSet, 'bulk-order')
router.register('split-report', TransactionSpiltReport, 'split-report')
router.register('review-questions', FoodReviewQuestionViewsets, 'questions')

urlpatterns = router.urls

urlpatterns += [

    path('self-service/delivery/', MealDeliveryBySelfServiceXView.as_view(), name='self_service_delivery'),
    path('self-service/print-ticket/', MealDeliveryBySelfServiceWithoutDeliveryView.as_view(), name='self_service_delivery'),
    path('generate/topup_code/', GetTopUpCodeView.as_view(), name='generate_topup_code'),
    path('secure_id/paystack/webhook/',SecureIDPayStackWebhook.as_view(), name='secureid_paystack_webhook'),

    path('cashout/', CashoutView.as_view(), name='generate_topup_code'),
    path('order-history/', MealTransactionHistory.as_view(), name='order_history'),
    path('vendor/withdrawal_history/',VendorWithdrawalHistoryView.as_view(), name='vendor_withdrawal_history'),
    path('company/withdrawal_history/',CompanyWithdrawalHistoryView.as_view(), name='company_withdrawal_history'),
    path('sid/withdrawal_history/',SIDWithdrawalHistoryView.as_view(), name='sid_withdrawal_history'),
    path('topup-history/',TopUpHistoryView.as_view(), name='top_history'),
    path('void_txn/',VoidTransactionView.as_view(), name='void'),
    path('get/daily_limit/',GetDailyLimitLeftView.as_view(),name='daily_limit'),
    path('auto-topup/',ConfirmAutoTopup.as_view(),name='auto_topup'),
    path('vendor/confirm_order/',VendorConfirmOrderView.as_view(),name='vendor_confirm_order'),
    path('transaction-report/', TransactionReport.as_view(), name='transaction-report'),
    path('vendor-report/', VendorReport.as_view(), name='vendor-report'),
    path('food-report/', FoodReport.as_view(), name='food-report'),
    path('ratio-report/', RatioReport.as_view(), name='ratio-report'),
    path('check-cashout/', CheckCashout.as_view(), name='check-cashout'),
    path('paystack-wallet-balance/', CheckPaystacWalletBalance.as_view(), name='check-cashout')
]