import json

from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse, HttpResponse
from rest_framework_simplejwt.tokens import UntypedToken


class MessageAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        print('********************************************')
        print('headers')
        print(request.headers)
        print('********************************************')
        print()
        print('********************************************')
        print('data')
        print(request.body.decode('utf-8'))
        print('********************************************')


