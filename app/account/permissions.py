from rest_framework import permissions
from datetime import datetime, time

class IsSIDPermission(permissions.BasePermission):
    """
    Checks if the user is sid admin
    """
    def has_permission(self, request, view):
        group_status = request.user.groups.filter(name='sid').exists()
        return group_status

class IsCompanyAdmin(permissions.BasePermission):
    """
    Checks if the user is comp admin
    """
    def has_permission(self, request, view):
        group_status = request.user.groups.filter(name='cmp_adm').exists()
        return group_status

class IsSIDorCompAdm(permissions.BasePermission):
    """
    Checks if ther user is comp admin or sid admin
    """
    def has_permission(self, request, view):
        is_comp = request.user.groups.filter(name='cmp_adm').exists()
        is_sid = request.user.groups.filter(name='sid').exists()
        return is_comp or is_sid


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class IsVendor(permissions.BasePermission):
    """
    Checks if the user is vendor
    """
    def has_permission(self, request, view):
        is_vendor = request.user.groups.filter(name='ven').exists()
        return is_vendor


class IsCompanyAdminOrIsSIDOrIsVendorOrIsStaff(permissions.BasePermission):
    """
    Checks if the user is admin, vendor or staff
    """
    def has_permission(self, request, view):
        is_vendor = request.user.groups.filter(name='ven').exists()
        is_adm = request.user.groups.filter(name='cmp_adm').exists()
        is_act = request.user.groups.filter(name='cmp_act').exists()
        is_sid = request.user.groups.filter(name='sid').exists()
        is_staff = request.user.groups.filter(name='emp').exists()
        return is_vendor or is_adm or is_act or is_sid or is_staff


class IsCompanyAdminOrIsCompanyActOrIsVendorOrIsStaff(permissions.BasePermission):
    """
    Checks if the user is admin, vendor or staff
    """
    def has_permission(self, request, view):
        is_vendor = request.user.groups.filter(name='ven').exists()
        is_adm = request.user.groups.filter(name='cmp_adm').exists()
        is_act = request.user.groups.filter(name='cmp_act').exists()
        is_staff = request.user.groups.filter(name='emp').exists()
        return is_vendor or is_adm or is_act or is_staff


class IsVendorOrReadOnly(permissions.BasePermission):
    """
    Checks if user is a vendor or perfoem only raed only
    """
    def has_permission(self, request, view):
        group_status = request.user.groups.filter(name='ven').exists()
        if group_status:
            if view.action in ['create', 'list', 'retrieve', 'update', 'partial_update']:
                return True
            else:
                return False
        elif request.user.is_authenticated:
            if view.action in ['list', 'retrieve']:
                return True
            else:
                return False
        else:
            return False


class IsEmployee(permissions.BasePermission):
    """
    Checks if a user is an employee
    """
    def has_permission(self, request, view):
        group_status = request.user.groups.filter(name='emp').exists()
        if group_status:
            return True
        else:
            return False


class IsCompanyAdminOrIsSIDOrIsCompanyAct(permissions.BasePermission):
    """
    Checks if the user is admin, accountant or sid
    """
    def has_permission(self, request, view):
        is_adm = request.user.groups.filter(name='cmp_adm').exists()
        is_act = request.user.groups.filter(name='cmp_act').exists()
        is_sid = request.user.groups.filter(name='sid').exists()
        return is_adm or is_act or is_sid


def check_booking_time():
    booking_end = time(16, 00)
    current_time = datetime.now().time()
    if current_time < booking_end:
        return True
    else:
        return False


class AllowBooking(permissions.BasePermission):
    """
    Check if the booking time has not elasped
    """
    def has_permission(self, request, view):
        check_booking_time()