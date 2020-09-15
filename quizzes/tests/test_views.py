import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse 
from django.contrib.auth.models import User

from ..models import Quiz, Question, Answer
from ..serializers import QuizSerializer, QuestionSerializer, AnswerSerializer

# Initialize API client app
client = Client()

class QuizAPITest(TestCase):
	'''Test module for GET quizzes API'''
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
		self.test_user = User.objects.create(username="Test User", email="testemail@domain.com")
		self.test_quiz = Quiz.objects.create(author=self.test_user, title="Test Quiz")
		self.test_quiz_2 = Quiz.objects.create(author=self.test_user, title="Test Quiz 2")
		self.test_question_1 = Question.objects.create(quiz=self.test_quiz, prompt="Prompt 1")
		self.test_question_2 = Question.objects.create(quiz=self.test_quiz, prompt="Prompt 2")
		self.test_question_3 = Question.objects.create(quiz=self.test_quiz_2, prompt="Prompt 3")

	def test_get_quiz_all_questions(self):
		'''Get all the questions under a specific quiz'''
		response = client.get(reverse("apiv2:quiz-all-questions", kwargs={"pk": 1}))
		all_questions = Question.objects.filter(quiz_id=1)
		serializer = QuestionSerializer(all_questions, many=True)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(json.dumps(response.data), json.dumps(serializer.data))

	def test_question_instance(self):
		'''Get detail on specific question instance'''
		response = client.get(reverse("apiv2:question-detail", kwargs={"pk": 1}))
		first_question = Question.objects.filter(pk=1)
		serializer = QuestionSerializer(first_question, many=True)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(json.dumps(response.data), json.dumps(serializer.data[0]))

	def test_question_answers(self):
		'''Return answers to a question'''
		response = client.get(reverse("apiv2:question-answers", kwargs={"pk": 1}))
		answers_for_question = Answer.objects.filter(question_id=1)
		serializer = AnswerSerializer(answers_for_question, many=True)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, serializer.data)

class AnswerAPITest(TestCase):
	def setUp(self):
		test_user = User.objects.create(username="Test User", email="testemail@domain.com")
		self.test_trivia_jack = Quiz.objects.create(author=test_user, title="Jack Trivia")
		self.test_trivia_beck = Quiz.objects.create(author=test_user, title="Beck Trivia")
		self.test_question_1 = Question.objects.create(quiz=self.test_trivia_jack, prompt="Prompt 1")
		self.test_question_3 = Question.objects.create(quiz=self.test_trivia_beck, prompt="Prompt 3")
		self.test_answer_1 = Answer.objects.create(question=self.test_question_1, text="Answer 1", correct=False)
		self.test_answer_2 = Answer.objects.create(question=self.test_question_1, text="Answer 2", correct=False)
		self.test_answer_3 = Answer.objects.create(question=self.test_question_1, text="Answer 3", correct=True)
		self.test_answer_4 = Answer.objects.create(question=self.test_question_3, text="Answer 1", correct=False)
		self.test_answer_5 = Answer.objects.create(question=self.test_question_3, text="Answer 2", correct=True)

	def test_get_answer_list(self):
		'''Get all the answers in DB'''
		response = client.get(reverse("apiv2:answer-list"))
		answers = Answer.objects.all()
		serializer = AnswerSerializer(answers, many=True)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(json.dumps(response.data), json.dumps(serializer.data))

	def test_get_answer_detail(self):
		'''Get a specific answer'''
		response = client.get(reverse("apiv2:answer-detail", kwargs={"pk":1}))
		first_answer = Answer.objects.filter(id=1)
		serializer = AnswerSerializer(first_answer, many=True)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(json.dumps(response.data), json.dumps(serializer.data[0]))

	def test_get_invalid_answer(self):
		'''Get non existent answer'''
		response = client.get(reverse("apiv2:answer-detail", kwargs={"pk": 100}))
		self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
