import requests
import json
from rest_framework import status
from django.http import JsonResponse
from .models import Company, Payment_keys, User

paystack_transfer_receipient_url = 'https://api.paystack.co/transferrecipient'

def get_company(request):
    if 'App-Id' in request.headers:
        key = request.headers['App-Id']
        print("APP-ID", key)
        try:
            company = Company.objects.get(app_key=key)
            return company
        except Company.DoesNotExist:
            return None
    else:
        return None
    # if 'App-Id' in request.headers:
    #     key = requests.headers['App-Id']
    #     company = Company.objects.get(app_key=key)
    #     if company:
    #         return company
    #     else:
    #         return JsonResponse({
    #             "code":120,
    #             "message":"App Id is not valid"
    #         },status=status.HTTP_404_NOT_FOUND)
    # else:
    #     return JsonResponse({
    #         "code": 140,
    #         "message": "App Id not included in the header"
    #     },status=status.HTTP_404_NOT_FOUND)


def get_company_id(request) :
    app_key = request.headers['App-Id']
    try:
        company = Company.objects.get(app_key=app_key)
        company_id = company.id
        return company_id
    except:
        None


def get_company_paystack(company):
    paystack_key = Payment_keys.objects.get(company=company)
    return paystack_key


def create_transfer_recipient(account_number, bank_code, user_name, company):
    payload = {
        "type": "nuban", 
        "name": user_name, 
        "account_number": account_number, 
        "bank_code": bank_code, 
        "currency": "NGN"
    }

    paystack_test_key = get_company_paystack(company).private_key
    print("Print", paystack_test_key)
    paystack_test_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {paystack_test_key}'}
    # r = requests.post(paystack_transfer_receipient_url, json=payload, headers=paystack_test_headers)

    r = requests.post(paystack_transfer_receipient_url, json=payload, headers=paystack_test_headers)
    # print(r.json())
    if r.status_code == 201:
        print(r.json())
        response = r.json()
        return response['data']['recipient_code']
    else:
        print(r)
        return None


def create_transfer_recipient_with_paystack_key(account_number, bank_code, user_name, paystack_test_key):
    payload = {
        "type": "nuban", 
        "name": user_name, 
        "account_number": account_number, 
        "bank_code": bank_code, 
        "currency": "NGN"
    }
    paystack_test_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {paystack_test_key}'}
    # r = requests.post(paystack_transfer_receipient_url, json=payload, headers=paystack_test_headers)

    r = requests.post(paystack_transfer_receipient_url, json=payload, headers=paystack_test_headers)
    # print(r.json())
    if r.status_code == 201:
        print(r.json())
        response = r.json()
        return response['data']['recipient_code']
    else:
        print(r)
        return None