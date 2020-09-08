"""quiz_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers

from quizzes import views

router = routers.SimpleRouter()
router.register(r'quizzes', views.QuizViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'answers', views.AnswerViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/quizzes/', include('quizzes.urls', namespace='quizzes')),
    url(r'^api/v2/', include((router.urls, 'quizzes'), namespace='apiv2'))
]
