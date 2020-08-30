from django.conf.urls import url, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('questions', views.ListCreateQuestion)

urlpatterns = [
    url(
        r'^$', 
        views.ListCreateQuiz.as_view(), 
        name='quiz_list'
    ),
    url(
        r'^(?P<pk>\d+)/$', 
        views.RetrieveUpdateDestroyQuiz.as_view(), 
        name='quiz_detail'
    ),
    url(
        r'^(?P<quiz_pk>\d+)/questions/$', 
        views.ListCreateQuestion.as_view(),
        name='question_list'
    ),
    url(
        r'^(?P<quiz_pk>\d+)/questions/(?P<pk>\d+)/$', 
        views.RetrieveUpdateDestroyQuestion.as_view(), 
        name='question_detail'
    ),
    url(
        r'^(?P<quiz_pk>\d+)/questions/(?P<question_pk>\d+)/answers/$',
        views.ListCreateAnswer.as_view(),
        name='answer_list'
    ),
    url(
        r'^(?P<quiz_pk>\d+)/questions/(?P<questoin_pk>\d+)/answers/(?P<pk>\d+)/$',
        views.RetrieveUpdateDestroyAnswer.as_view(),
        name='answer_detail'
    )
]

# urlpatterns = [

# ]

app_name = 'quizzes'