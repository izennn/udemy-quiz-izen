from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.ListCreateQuiz.as_view(), name='quiz_list'),
    url(r'(?P<pk>\d+)/$', views.RetrieveUpdateDestroyQuiz.as_view(), name='quiz_detail'),
    url(r'(?P<quiz_pk>\d+)/questions/$', views.ListCreateQuestion.as_view(), name='question_list')
]

app_name = 'quizzes'