from django.urls import path
from rest_framework.routers import DefaultRouter
from .apis import CompanyViewSet, GroupViewSet, SIDViewSet, BulkEmployeeViewSet, VendorViewSet, LoginView, CompanyStaff, \
    ResetPassword, ConfirmPasswordLink, \
    ResetPasswordEmail, UpdatePassword, ChangeCompanyId, CompanyRefCode, CompanyAdminViewSet, DepartmentViewSet, \
    TreasuryViewSet, \
    StaffLevelViewSet, DeviceViewSet, ConfirmResetToken, VendorStaffViewSet, StaffUpdateUserProfile, \
    AdminUpdateUserProfile, TestEncryption, \
    GetUserAppCode, GetUserTokenFromAppCode, ChangeUserStatusView, PaymentKeyViewSet, UserReport, UpdateDeviceView, \
    UserBalance, AdminResetPassword, \
    UserInfo, BiometricData, GetDeviceStatusView, VendorReviewRatingViewset

# , SIDAdminViewSet,GetPubKeyView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()

router.register('companys', CompanyViewSet)
router.register('groups', GroupViewSet)
router.register('departments', DepartmentViewSet, 'departments')
router.register('staff-level', StaffLevelViewSet, 'staff-level')
router.register('sid', SIDViewSet, 'sid')
# router.register('sid-adm', SIDAdminViewSet, 'sid-adm')
router.register('devices', DeviceViewSet, 'devices')
router.register('cmp-adm', CompanyAdminViewSet, 'cmp-adm')
router.register('cmp-act', TreasuryViewSet, 'cmp-act')
router.register('vendor', VendorViewSet, 'vendor')
router.register('bulk-employee', BulkEmployeeViewSet, 'bulk-employee')
router.register('vendor-staff', VendorStaffViewSet, 'vendor-staff')
router.register('payment-key',PaymentKeyViewSet,'payment-key')
router.register('vendor-rating', VendorReviewRatingViewset, 'rating')



urlpatterns = router.urls

urlpatterns += [
    path('login/', LoginView.as_view(), name='login'),
    path('staffs/', CompanyStaff.as_view(), name='staffs'),
    path('reset-password-email/', ResetPasswordEmail.as_view(), name='reset-password-email'),
    path('confirm-password-link/<str:uidb64>/<str:token>/', ConfirmPasswordLink.as_view(), name='password-link-check'),
    path('confirm-token/', ConfirmResetToken.as_view(), name='confirm-token'),
    path('reset-password/', ResetPassword.as_view(), name='reset-password'),
    path('admin-reset-password/', AdminResetPassword.as_view(), name='admin-reset-password'),
    path('update-password/', UpdatePassword.as_view(), name='update-password'),
    path('update-user/', StaffUpdateUserProfile.as_view(), name='update-user'),
    path('admin-update-user/<int:pk>/', AdminUpdateUserProfile.as_view(), name='admin-update-user'),
    path('change-key/<int:pk>/', ChangeCompanyId.as_view(), name='change-company-key'),
    path('change/ref-code/', CompanyRefCode.as_view(), name='change-company-ref-code'),
    path('test_encrypt/', TestEncryption.as_view(), name='get-encrypted-data'),
    path('get-app-code/', GetUserAppCode.as_view(), name='get-app-code'),
    path('get-auth-token/', GetUserTokenFromAppCode.as_view(), name='get-auth-token'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token-refresh'),
    path('change-user-status/', ChangeUserStatusView.as_view(), name='change-user-status'),
    path('user-report/', UserReport.as_view(), name='user-report'),
    path('update-device/', UpdateDeviceView.as_view(), name='update-device'),
    path('user-balance/', UserBalance.as_view(), name='user-balance'),
    path('user-info/', UserInfo.as_view(), name='user-info'),
    path('biometric-data/', BiometricData.as_view(), name='biometric-data'),
    path ('device-status/',GetDeviceStatusView.as_view(),name='device-status')
]

