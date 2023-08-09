from rest_framework import status, views
from decouple import config
from datetime import  datetime
from rest_framework.permissions import AllowAny
from .models import Paystack_Webhook,Company_TopupHistory,Staff_TopupHistory,WithdrawalHistory,GlobalVariable
from account.models import Company, User, Payment_keys
import json,hmac,hashlib
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from .utils import paystack_transfer_charge

# paystack_headers = {'Content-Type': 'application/json', 'Authorization':f'Bearer {PAYSTACK_APP_SHARED_SECRET}'}

paystack_bal_url = 'https://api.paystack.co/balance'
paystack_transfer = 'https://api.paystack.co/transfer'


class SecureIDPayStackWebhook(views.APIView):

    permission_classes = (AllowAny,)

    def post(self, request):
        start = datetime.now().time()
        print('start webhook', start)
        print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>WEBHOOK CALLED<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
        # ali = request.META.get('HTTP_X_PAYSTACK_SIGNATURE')

        secure_id = Payment_keys.objects.filter(company=4).first()
        PAYSTACK_APP_SHARED_SECRET = secure_id.private_key
        # PAYSTACK_APP_SHARED_SECRET='sk_test_e09447efa9212de14ce59949c86aadafe1b54e0d'
        # Byte_PAYSTACK_APP_SHARED_SECRET = bytes(PAYSTACK_APP_SHARED_SECRET, 'utf-8')
        # print (type(Byte_PAYSTACK_APP_SHARED_SECRET))

        # paystack_sk = PAYSTACK_APP_SHARED_SECRET
        result = json.loads(request.body)
        computed_hmac = hmac.new(
            bytes(PAYSTACK_APP_SHARED_SECRET, 'utf-8'),
            str.encode(request.body.decode('utf-8')),
            digestmod=hashlib.sha512
        ).hexdigest()
        # if 'HTTP_X_PAYSTACK_SIGNATURE' in request.META:
        #     if request.META['HTTP_X_PAYSTACK_SIGNATURE'] == computed_hmac:
        #         print(result)
        #         print(type(result))
        #         if result['event'] == "transfer.success":

        abi = request.stream.read()
        # print(abi)
        # print(type(abi))
        abii = abi.decode("utf-8")
        # print(abii)
        # print(type(abii))
        request_data = json.loads(abii)
        event = request_data['event']
        data = request_data['data']
        # the_header = ali
        # raw_bytes = abi
        # hash = hmac.new(Byte_PAYSTACK_APP_SHARED_SECRET, raw_bytes, hashlib.sha512).hexdigest()
        # print(hash, type(hash))
        # print (the_header,type(the_header))
        events = json.dumps(event)
        print('dump_events:',events)


        # datap = json.dumps(data)
        # # print(the_header)
        # if hmac.compare_digest(hmac.new(Byte_PAYSTACK_APP_SHARED_SECRET, raw_bytes, hashlib.sha512).hexdigest(), the_header):
        # if hmac.compare_digest(hmac.new(Byte_PAYSTACK_APP_SHARED_SECRET, raw_bytes, hashlib.sha512).hexdigest(), the_header):
        if 'HTTP_X_PAYSTACK_SIGNATURE' in request.META:
            if request.META['HTTP_X_PAYSTACK_SIGNATURE'] == computed_hmac:
                print(result)
                print(type(result))
                # if result['event'] == "transfer.success":
                print('data:', data['reference'])
                
                # d_comp = get_object_or_404(Company, name=comp)
                
                print('event:',events)
                d_event= result['event']
                if d_event == "charge.success":
                    hook = Paystack_Webhook.objects.create(event=event, data=data)
                    hook.save()

                    # FOR TOP _UP ACTION
                    print('SECUREID PAYSTACK WEBHOOK TOP -UP')
                    try:
                        comp, user_type, rand_ref, comp_iid = data['reference'].split('-')
                        d_comp = get_object_or_404(Company, app_key=comp)
                    except:
                        return Response(
                            {'code': 200,
                            'message': 'Invalid Reference used',
                            'resolve': 'Kindly contact the admin'}, status=status.HTTP_200_OK)

                    the_status = data['status']
                    ref = data['reference']

                    amount = data['amount'] / 100
                    email = data['customer']['email']
                    user = get_object_or_404(User,email=email)
                    user_type = user.groups.all()[0].name
                    comp = user.company.id
                    the_comp = get_object_or_404(Company, id=comp)

                    if user_type == 'cmp_act':
                        name = the_comp.name
                        narration = name + ' Topped up  today using Card on ' + data['paid_at']

                        # Update Company Top up history
                        comp_history = Company_TopupHistory.objects.create(amount=amount, user_email=email,
                                                                           top_up_charge=data['fees'], reference_no=ref,
                                                                           description=narration, top_up_payload=data,
                                                                           company=the_comp)
                        comp_history.save()

                        # Update Company Top up History
                        the_comp.balance = the_comp.balance + amount
                        the_comp.authorization_code = data['authorization']['authorization_code']
                        the_comp.save()

                        end = datetime.now().time()
                        print('end webhook', end)
                        return Response(
                            {'code': 200,
                             'message': 'Comp Top up successful'
                             }, status=status.HTTP_200_OK)

                    elif user_type == 'emp':
                        name = user.first_name + ' ' + user.last_name
                        narration = name + ' Topped up  today using Card on ' + data['paid_at']
                        user_id = user.id

                        # Update the Top history
                        emp_history = Staff_TopupHistory.objects.create(amount=amount, user=user, user_email=email,
                                                                        top_up_charge=data['fees'], reference_no=ref,
                                                                        description=narration, top_up_payload=data,
                                                                        company=the_comp)
                        emp_history.save()
                        old_balance =user.balance
                        # Update User Balance
                        user.balance = user.balance + amount
                        user.authorization_code = data['authorization']['authorization_code']
                        user.save()
                        print('old balance:', old_balance)
                        print('user:',user.balance)


                        end = datetime.now().time()
                        print('end webhook', end)
                        return Response(
                            {'code': 200,
                             'message': 'Emp Top up successful'
                             }, status=status.HTTP_200_OK)

                    else:
                        end = datetime.now().time()
                        print('end webhook', end)
                        return Response(
                            {'code': 200,
                             'message': 'Invalid  User',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_200_OK)

                # TRANSFER (CASH OUT) ACTION
                elif (d_event == 'transfer.success') or (d_event == 'transfer.failed'):
                    print('PAYSTACK WEBHOOK TRANSFER')
                    new_status = data['status']
                    ref = data['reference']
                    amount = data['amount'] / 100

                    try:
                        withdraw_history = WithdrawalHistory.objects.get(reference_no=ref)
                    except:
                        return Response(
                            {'code': 200,
                             'message': 'Invalid  ref',
                             'resolve': 'Kindly contact the admin'}, status=status.HTTP_200_OK)

                    user_id = withdraw_history.user_id
                    user_type = withdraw_history.user_type
                    the_user = get_object_or_404(User, id=user_id)
                    compp_iid = withdraw_history.company
                    old_status = withdraw_history.updated_status
                    # the_sid_user = get_object_or_404(GlobalVariable, variable_name='sid')
                    # sid_user_id = int(the_sid_user.variable_text)
                    # sida = get_object_or_404(User, id=sid_user_id)
                    # the_transfer_charge = get_object_or_404(GlobalVariable, variable_name='transfer_charge')
                    # transfer_charge = float(the_transfer_charge.variable_text)
                    transfer_charge = paystack_transfer_charge(amount)
                    if (old_status.lower() not in ('success', 'failed')):
                        
                        comp = Company.objects.get(id=compp_iid)
                        if user_type == 'COMP':
                            print('COMPANY CASHOUT WEBHOOK: company_id-', compp_iid)
                            

                            if new_status == 'success':
                                print('COMPANY  Successful from webhook, status :', new_status)

                                # debit the pending balance
                                comp.pending_balance = comp.pending_balance - amount - transfer_charge
                                comp.save()

                                withdraw_history.updated_status = new_status
                                withdraw_history.save()

                                end = datetime.now().time()
                                print('end webhook', end)

                                return Response(
                                    {'code': 200,
                                     'message': 'Comp Cashout successful'
                                     }, status=status.HTTP_200_OK)


                            else:
                                print('COMPANY  Not Successful from webhook, status :', new_status)
                                # update balance back
                                comp.balance = comp.balance + amount + transfer_charge

                                # debit the  pending balance to reverse back to balance
                                comp.pending_balance = comp.pending_balance - amount - transfer_charge
                                comp.save()

                                withdraw_history.updated_status = new_status
                                withdraw_history.save()

                                end = datetime.now().time()
                                print('end webhook', end)

                                return Response(
                                    {'code': 200,
                                     'message': 'Comp Cashout failed'
                                     }, status=status.HTTP_200_OK)

                        elif user_type == 'VEN':
                            print('VENDOR CASHOUT WEBHOOK: user-', the_user)
                            vend = the_user

                            if new_status == 'success':
                                print('VENDOR  Successful from webhook, status :', new_status)

                                # debit the  pending balance for vendor
                                print ('vendor bal:',amount,vend.pending_balance)
                                vend.pending_balance = vend.pending_balance - amount 
                                vend.save()

                                # debit the  transfer charge from sid pending balance
                                comp.sid_pending_balance = comp.sid_pending_balance - transfer_charge
                                comp.save()

                                withdraw_history.updated_status = new_status
                                withdraw_history.save()

                                end = datetime.now().time()
                                print('end webhook', end)

                                return Response(
                                    {'code': 200,
                                     'message': 'Vend Cashout successful'
                                     }, status=status.HTTP_200_OK)



                            else:
                                print('VENDOR Not Successful from webhook, status :', new_status)
                                # update balance
                                vend.balance = vend.balance + amount 
                                vend.save()

                                # Debit SID for the transfer charge
                                comp.sid_balance = comp.sid_balance + transfer_charge

                                # move to pending balance for vendor
                                vend.pending_balance = vend.pending_balance - amount
                                vend.save()

                                # move transfer charge to sid pending balance
                                comp.sid_pending_balance = comp.sid_pending_balance - transfer_charge
                                comp.save()

                                withdraw_history.updated_status = new_status
                                withdraw_history.save()

                                end = datetime.now().time()
                                print('end webhook', end)

                                return Response(
                                    {'code': 200,
                                     'message': 'Vend Cashout failed'
                                     }, status=status.HTTP_200_OK)

                        elif user_type == 'SID':
                            print('SID CASHOUT WEBHOOK: user -', the_user)
                            vend = the_user

                            if new_status == 'success':
                                print('SID  Successful from webhook, status :', new_status)

                                # debit the  transfer charge from sid pending balance
                                comp.sid_pending_balance = comp.sid_pending_balance - transfer_charge -amount
                                comp.save()

                                withdraw_history.updated_status = new_status
                                withdraw_history.save()

                                end = datetime.now().time()
                                print('end webhook', end)

                                return Response(
                                    {'code': 200,
                                     'message': 'SID Cashout successful'
                                     }, status=status.HTTP_200_OK)



                            else:
                                print('SID Not Successful from webhook, status :', new_status)
                                ccomp = int(comp_iid)
                                user = the_user
                                if ccomp == 0:

                                    # update balance and Credit SID for the transfer charge
                                    user.balance = user.balance + amount + transfer_charge

                                    # debit  the pending balance for reversal
                                    user.pending_balance = user.pending_balance - amount - transfer_charge
                                    user.save()

                                    # reverse  each into company sid  balance
                                    comps_id = Company.objects.filter(status=True).values("id").distinct()
                                    for ccomp in comps_id:
                                        dd_comp = get_object_or_404(Company, id=ccomp)
                                        dd_comp.sid_balance = dd_comp.sid_balance + dd_comp.sid_pending_balance
                                        dd_comp.sid_pending_balance = 0
                                        dd_comp.save()


                                else:

                                    the_comp = Company.objects.get(id=ccomp)

                                    # update balance and Credit SID for the transfer charge
                                    user.balance = user.balance + amount + transfer_charge

                                    # reverse pending balance to balance
                                    user.pending_balance = user.pending_balance - amount - transfer_charge
                                    user.save()

                                    # reverse company sid pending balance  to company sid balance
                                    the_comp.sid_balance = the_comp.sid_pending_balance + the_comp.sid_balance
                                    the_comp.sid_pending_balance = 0.0
                                    the_comp.save()

                            withdraw_history.updated_status = new_status
                            withdraw_history.save()

                            end = datetime.now().time()
                            print('end webhook', end, ' duration: ', end - start)

                            return Response(
                                {'code': 200,
                                 'message': 'SID Cashout failed'
                                 }, status=status.HTTP_200_OK)

                    end = datetime.now().time()
                    print('end webhook', end)

            else:
                end = datetime.now().time()
                print('end webhook', end)
                return Response(
                    {'code': 200,
                     'message': 'Invalid Key used',
                     'resolve': 'Kindly contact the admin'}, status=status.HTTP_200_OK)
