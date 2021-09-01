from django.urls import path
from django.urls.conf import include
from django.urls.resolvers import URLPattern
from .views import QuesView

app_name='chatbot'

urlpatterns=[
    path('', QuesView.as_view(), name='Ques')
]