import json
from rest_framework import status
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from django.test import TestCase, Client
from django.urls import reverse 
from django.contrib.auth.models import User

from ..models import Quiz, Question, Answer
from ..serializers import QuizSerializer, QuestionSerializer

# Initialize API client app
client = Client()

# API Request Factory 
factory = APIRequestFactory()
request = factory.get(reverse("apiv2:quiz-list"))

class QuizAPITest(TestCase):
	'''Test module for GET all quizzes API'''
	def setUp(self):
		test_user = User.objects.create(username="Test User", email="testemail@domain.com")
		self.test_trivia_jack = Quiz.objects.create(author=test_user, title="Jack Trivia")
		self.test_trivia_beck = Quiz.objects.create(author=test_user, title="Beck Trivia")


	def test_get_all_quizzes(self):
		# get API response
		response = client.get(reverse("apiv2:quiz-list"))

		# get data from DB and serialize it
		quizzes = Quiz.objects.all()
		serializer = QuizSerializer(quizzes, many=True)

		# assertion tests
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, serializer.data)

	def test_first_quiz(self):
		# get quiz with id=1 from client
		response = client.get(reverse("apiv2:quiz-detail", kwargs={"pk": 1}))

		# get data from DB and serialize it
		first_quiz = Quiz.objects.get(id=1)
		serializer = QuizSerializer(first_quiz)

		# assertion test
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, serializer.data)

class QuestionAPITest(TestCase):
	def setUp(self):
		test_user = User.objects.create(username="Test User", email="testemail@domain.com")
		test_quiz = Quiz.objects.create(author=test_user, title="Test Quiz")
		test_quiz_2 = Quiz.objects.create(author=test_user, title="Test Quiz 2")
		test_question_1 = Question.objects.create(quiz=test_quiz, prompt="Prompt 1")
		test_question_2 = Question.objects.create(quiz=test_quiz, prompt="Prompt 2")
		test_question_3 = Question.objects.create(quiz=test_quiz_2, prompt="Prompt 3")

	def test_get_questions_list(self):
		response = client.get(reverse("apiv2:question-list"))
		all_questions = Quiz.objects.all()
		serializer = QuestionSerializer(all_questions, many=True)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		# self.assertEqual(response.data, json.dumps(serializer.data))
