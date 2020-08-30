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
		ordering = ['id']

	def __str__(self):
		return self.title

class Question(models.Model):
	quiz = models.ForeignKey(Quiz, on_delete=models.DO_NOTHING)
	prompt = models.CharField(max_length=255, default='')

	class Meta:
		ordering = ['id']

	def __str__(self):
		return self.prompt

class Answer(models.Model):
	text = models.CharField(max_length=255)
	question = models.ForeignKey(Question, related_name='answers', on_delete=models.DO_NOTHING)
	correct = models.BooleanField(default=False)

	def __str__(self):
		return self.text
