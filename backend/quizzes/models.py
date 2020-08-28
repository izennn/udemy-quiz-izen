from django.db import models
from django.contrib.auth.models import User

class Quiz(models.Model):
	title = models.CharField(max_length=255, default='')
	author = models.ForeignKey(User, on_delete=models.DO_NOTHING)
	total_questions = models.IntegerField(default=0)
	times_taken = models.IntegerField(default=0, editable=False)
	created_at = models.DateTimeField(auto_now_add=True)
	
	class Meta:
		verbose_name_plural = "Quizzes"

	def __str__(self):
		return self.title

class Question(models.Model):
	quiz = models.ForeignKey(Quiz, on_delete=models.DO_NOTHING)
	prompt = models.CharField(max_length=255, blank=True, default='')

	class Meta:
		ordering = ['order', ]

	def __str__(self):
		return self.prompt

class Answer(models.Model):
	text = models.CharField(max_length=255)
	question = models.ForeignKey(Question, on_delete=models.DO_NOTHING)
	correct = models.BooleanField(default=False)

	class Meta:
		ordering = ['order', ]

	def __str__(self):
		return self.text
