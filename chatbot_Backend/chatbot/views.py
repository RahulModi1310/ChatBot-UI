from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import QuestionSerializer
from .models import Question


class QuesView(APIView):
    def get(self, request, *args, **kwargs):
        data={
            'user':'hello'
        }
        return Response(data)

    def post(self, request, *args, **kwargs):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)