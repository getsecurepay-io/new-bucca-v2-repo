from django.http import HttpResponse, response, JsonResponse


def error_404(request,exception):
    message = ('The endpoint is not found')

    response = JsonResponse(data={'message':message, 'status_code': 404})
    response.status_code =404



def error_500(request):
    message = ('An error occured')

    response = JsonResponse(data ={'message': message,'status_code': 500})
    response.status_code=500

    return  response