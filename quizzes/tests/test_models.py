from django.test import TestCase
from django.contrib.auth.models import User
from ..models import Quiz, Question, Answer

class TestModels(TestCase):
	''' Test module for Quiz model'''
	def setUp(self):
		test_user = User.objects.create(username="Test User", email="testemail@domain.com")
		self.test_trivia_jack = Quiz.objects.create(author=test_user, title="Jack Trivia")
		self.test_trivia_beck = Quiz.objects.create(author=test_user, title="Beck Trivia")
		self.test_question_jack = Question.objects.create(
			quiz=self.test_trivia_jack,
			prompt="What is my name?"
		)
		self.test_answer_jack_1 = Answer.objects.create(question=self.test_question_jack, text="Michael", correct=False)
		self.test_answer_jack_2 = Answer.objects.create(question=self.test_question_jack, text="Jack", correct=True)

	def test_quiz_creation(self):
		self.assertIsNotNone(self.test_trivia_jack)
		self.assertIsNotNone(self.test_trivia_beck)

	def test_quiz_count(self):
		self.assertEquals(self.test_trivia_jack.question_count, 1)

	def test_question_creation(self):
		self.assertIsNotNone(self.test_question_jack)

	def test_answer_creation(self):
		self.assertIsNotNone(self.test_answer_jack_1)
		self.assertIsNotNone(self.test_answer_jack_2)

