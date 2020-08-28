from django.contrib import admin
from django.db.models import Q


from . import models

@admin.register(models.Quiz)
class QuizAdmin(admin.ModelAdmin):
	search_fields = ['author', 'title']
	list_display=['id', 'title', 'author', 'created_at']
	list_filter = ['author']

class AnswerInline(admin.TabularInline):
	model = models.Answer

class QuizQuestionFilter(admin.SimpleListFilter):
	title = 'quiz'
	parameter_name = 'quiz'

	def lookups(self, request, model_admin): # create clickable links on right hand side 
		quizzes = models.Quiz.objects.all()
		lookups = ()
		for quiz in quizzes:
			lookups += ((quiz.title, quiz.title),)
		return lookups

	def queryset(self, request, queryset): # return all the ojbects that fit parameter that we set
		if self.value(): # why is self.value() containing the year?
			quiz_title = self.value()
			return queryset.filter(Q(quiz__title=quiz_title))

@admin.register(models.Question)
class QuestionAdmin(admin.ModelAdmin):
	fields = [
		'prompt',
		'quiz',
	]
	list_display=['id', 'prompt', 'quiz']
	list_filter=[QuizQuestionFilter, ]
	search_fields=['quiz', 'title']
	inlines = [AnswerInline, ]

class AnswerQuestionFilter(admin.SimpleListFilter):
	title = 'quiz'
	parameter_name = 'quiz'

	def lookups(self, request, model_admin): # create clickable links on right hand side 
		quizzes = models.Quiz.objects.all()
		lookups = ()
		for quiz in quizzes:
			lookups += ((quiz.title, quiz.title),)
		return lookups

	def queryset(self, request, queryset): # return all the ojbects that fit parameter that we set
		if self.value(): # why is self.value() containing the year?
			quiz_title = self.value()
			return queryset.filter(Q(question__quiz__title=quiz_title))

@admin.register(models.Answer)
class AnswerAdmin(admin.ModelAdmin):
	list_display=['text', 'correct', 'question']
	list_filter=[AnswerQuestionFilter, ]