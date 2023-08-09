import csv
import time
import threading
from django.core.mail import EmailMessage
from django.db.models import Q, Sum
from account.models import Company, User
from transaction.models import MealTransaction
from datetime import date, datetime, timedelta
import pandas as pd

months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
csv_path = '/home/adedeji/Documents/SID/buccav21/csv'

def send_mail(subject, body, sender, to_list, cc_list, attachment=None):
    email = EmailMessage(
        subject=subject,
        body=body,
        sender=sender,
        to=to_list,
        cc=cc_list
    )
    if attachment is not None:
        email.attach_file(attachment)
    # result = email.send(fail_silently=False)
    # print("Email Result", result)


# def transaction_csv():
#     start = time.time()
#     companies = Company.objects.all()
#     current_mon = datetime.now().strftime("%m")
#     print("current_mon", current_mon)
#     last_month = months[int(current_mon) - 2]
#     print("last_month",last_month)
#     last_day_of_prev_month = date.today().replace(day=1) - timedelta(days=1)
#     start_day_of_prev_month = date.today().replace(day=1) - timedelta(days=last_day_of_prev_month.day)
#     print("start_day_of_prev_month", start_day_of_prev_month, "last_day_of_prev_month", last_day_of_prev_month)
#     for company in companies:
#         company_hrs_and_admin = User.objects.filter(Q(groups__name='cmp_act')|Q(groups__name='cmp_adm'), company=company)
#         queryset = MealTransaction.objects.filter(company=company, delivery_date__gte = start_day_of_prev_month, delivery_date__lte = last_day_of_prev_month)
#         if len(queryset) > 0:
#             fields = ['FOOD', 'STAFF', 'COMMENT', 'QUANTITY', 'UNIT PRICE', 'TOTAL', 'PLATFORM', 'PLACE', 'STATUS', 'COMPANY AMOUNT', 'PERSONAL AMOUNT', 'DATE CREATED', 'TIME CREATED', 'VENDOR', 'DELIVERY DATE', 'DELIVERED DATE', 'DELIVERED TIME']
#             csv_name = f'{company.name}_txn_history_for_{last_month}.csv'
#             with open(csv_name, 'w', newline='') as csvfile:
#                 spamwriter = csv.writer(csvfile, delimiter='\t',
#                                         quotechar='|', quoting=csv.QUOTE_MINIMAL)
#                 spamwriter.writerow(fields)
#                 for data in queryset:
#                     spamwriter.writerow([data.food, data.user.first_name + ' ' + data.user.last_name, data.comment, data.quantity, data.unit_price, data.total, data.platform, data.place, data.status, data.company_amount, data.personal_amount, data.date_created, data.time_created, data.vendor_user_id.vendor.bussiness_name, data.delivery_date, data.delivered_date, data.delivered_time])
#         end = time.time()
#         message = f'Greetings {company.name},\nAttached is your transaction report for last month dated ({start_day_of_prev_month} to {last_day_of_prev_month}).\nRegards,\nThe Bucca Team'
#         send_mail('Bucca Transaction Report', message, 'sender@test.com', [company.contact_email], [company_hrs_and_admin])
#         print(f"Runtime of the program is {end - start}")


def create_csv():
    print('start_time: ',datetime.now())
    companies = Company.objects.all()
    current_mon = datetime.now().strftime("%m")
    print("current_mon", current_mon)
    last_month = months[int(current_mon) - 2]
    print("last_month", last_month)
    last_day_of_prev_month = date.today().replace(day=1) - timedelta(days=1)
    start_day_of_prev_month = date.today().replace(day=1) - timedelta(days=last_day_of_prev_month.day)
    year = start_day_of_prev_month.strftime("%Y")
    for company in companies:
        queryset = MealTransaction.objects.filter(company=company, delivery_date__gte=start_day_of_prev_month,
                                               delivery_date__lte=last_day_of_prev_month)\
                .values('food__name','user__first_name','user__last_name','platform','comment','quantity','unit_price','total','company_amount','personal_amount','status','date_created','delivery_date','delivered_date','delivered_time',
                        'self_service_device__name','vendor_user_id__first_name','vendor_user_id__last_name','receipt_no')
        df = pd.DataFrame(list(queryset))
        print(df.empty)
        if not df.empty:
            company_hrs_and_admin = User.objects.filter(Q(groups__name='cmp_act')|Q(groups__name='cmp_adm'), company=company)
            df['Staff']= df['user__first_name'] +' ' + df['user__last_name']
            df['Vendor'] = df['vendor_user_id__first_name'] + ' ' + df['vendor_user_id__last_name']
            df.drop(['user__first_name','user__last_name','vendor_user_id__last_name','vendor_user_id__first_name'],axis=1)
            df = df.rename({'food__name':'Food Item','platform':'Platform','comment':'Comment','quantity':'Quantity','unit_price':'Unit Price','total':'Total','company_amount':'Company Amount','personal_amount':'Personal Amount','status':'Status','date_created':'Date Created','delivery_date': 'Delivery Date','delivered_date':'Delivered Date','delivered_time':'Delivered Time',
                                'self_service_device__name':'Self Service Device','receipt_no':'Receipt No.'}, axis=1)
            df.drop(['user__first_name', 'user__last_name', 'vendor_user_id__last_name', 'vendor_user_id__first_name'], axis=1,inplace=True)
            columns = ['Staff','Food Item','Quantity','Unit Price','Total','Company Amount','Personal Amount','Comment','Platform','Vendor','Receipt No.','Status','Date Created','Delivery Date','Delivered Date','Delivered Time','Self Service Device']
            df = df.reindex(columns=columns)
            csv_name = f'{company.name}_txn_history_for_{last_month},{year}.csv'
            print(">>>>>>>csv", csv_name)
            print(">>>>>>>dir", csv_path)
            df.to_csv(f'{csv_path}/{csv_name}')
            message = f'Greetings {company.name},\nAttached is your transaction report for last month dated ({start_day_of_prev_month} to {last_day_of_prev_month}).\nRegards,\nThe Bucca Team'
            # send_mail('Bucca Transaction Report', message, 'sender@test.com', [company.contact_email], [company_hrs_and_admin], csv_name)
            print (df.head())
            print(message)
    print('end_time: ', datetime.now())


def balance_check():
    companies = Company.objects.exclude(notification_balance_limit = None)
    print("Companies", companies)
    # companies_with_low_balance = [company for company in companies if pending_balance < company.notification_balance_limit]
    for company in companies:
        pending_txns = MealTransaction.objects.filter(status='pending', company = company).aggregate(Sum('total'))
        pending_total = pending_txns['total__sum'] if pending_txns['total__sum'] is not None else 0
        print('pending_total',pending_total)
        pending_balance = company.actual_balance - pending_total
        print('pending_balance',pending_balance)
        if pending_balance <= company.notification_balance_limit:
            print("Comp with Low bal", company)
            company_hrs_and_admin = User.objects.filter(Q(groups__name='cmp_act')|Q(groups__name='cmp_adm'), company=company)
            message = f'Greetings {company.name},\nThis is to inform you that your current balance N{pending_balance} (Inclusive of the pending transactions: N{pending_total}) is less than the limit set. Kindly topup your account\
                to avoid disruption of service.\nRegards,\nThe Bucca Team'
            print(message)
            send_mail('Bucca Balance Notification', message, 'sender@test.com', [company.contact_email], [company_hrs_and_admin])
                    
