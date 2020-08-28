from django.shortcuts import get_object_or_404
from rest_framework import generics

from . import models, serializers

class ListCreateQuiz(generics.ListCreateAPIView):
    queryset = models.Quiz.objects.all()
    serializer_class = serializers.QuizSerializer

class RetrieveUpdateDestroyQuiz(generics.RetrieveUpdateDestroyAPIView):
    print("Found quiz detail!")
    queryset = models.Quiz.objects.all()
    serializer_class = serializers.QuizSerializer


class ListCreateQuestion(generics.ListCreateAPIView):
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer
    
    def get_queryset(self):
        return self.queryset.filter(quiz_id=self.kwargs.get('quiz_pk'))
    
    def perform_create(self, serializer):
        question = get_object_or_404(
            models.Quiz, 
            pk=self.kwargs.get('quiz_pk')
        )
        serializer.save(quiz=quiz)