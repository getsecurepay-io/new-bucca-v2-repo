import requests
from io import StringIO
import csv

from account.helpers import get_company_paystack
from django.db.models.functions import Concat
from django.core.files.base import ContentFile
from .models import MealTransaction
from account.models import Vendor

from django.db.models import (
    Value
)
main_bal_url = 'https://api.paystack.co/balance'
balance_ledger = 'https://api.paystack.co/balance/ledger'

# headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer sk_test_3c1ad8807f89cb1ace70a9e46ce5ee80052c3422'}
# headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer sk_test_e09447efa9212de14ce59949c86aadafe1b54e0d'} # REAL
headers = {'Content-Type': 'application/json'
           ,'Authorization': 'Bearer sk_live_d84659dd06f04a4f6e10d87b30cd20a158f49a62'}





# @periodic_task(run_every=(crontab(minute='*', hour='*', day_of_month='*')), name="check-wallet-balance")
# # class send_pending_withdrawal(object):
# def get_dataaa():
#     try:
#         rr = requests.get(main_bal_url, headers=headers)
#         bal_details = rr.json()
#         main_bal = bal_details['data'][0]['balance']/100

#         cur = connection.cursor()
#         cur.callproc('check_paystack_balance', [main_bal])
#         rows = cur.fetchall()
#         print('testing', rows)
#         field_names = [i[0] for i in cur.description]

#         objects_list = []
#         for row in rows:
#             d = collections.OrderedDict()
#             d[field_names[0]] = row[0]

#             objects_list.append(d)
#         print(objects_list)
#         return objects_list
#     except:
#         return None


def get_paystack_ledger(company):
    paystack_test_key = get_company_paystack(company).private_key
    headers = {'Content-Type': 'application/json','Authorization': f'Bearer {paystack_test_key}'}
    rr = requests.get(balance_ledger, headers=headers)
    if rr.status_code == 200:
        result = rr.json()
        return result
        # total = result['meta']['total']
        # print(result['meta'])
        # if total == 0:
        #     pass
        # else:
        #     rr = requests.get(f'{balance_ledger}?perPage={total}', headers=headers)
        #     result = rr.json()
        #     total = result['meta']['total']
        #     print(result['meta'])
    else:
        return None


def paystack_transfer_charge(amount):
    if amount <= 5000:
        return 10
    elif (amount >= 5001) and (amount <= 50000) :
        return 25
    else:
        return 50


def verify_transaction(reference, company=None):
    url = f'https://api.paystack.co/transfer/verify/{reference}'
    paystack_test_key = get_company_paystack(company).private_key
    print('Paystack Private Key', paystack_test_key)
    headers = {'Content-Type': 'application/json','Authorization': f'Bearer {paystack_test_key}'}
    r = requests.get(url, headers=headers)
    print(r.json())
    if r.status_code == 200:
        res = r.json()
        return res
    else:
        return None




