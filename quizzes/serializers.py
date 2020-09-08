from rest_framework import serializers

from . import models

class QuizSerializer(serializers.ModelSerializer):
	questions = serializers.HyperlinkedRelatedField(
		many=True,
		read_only=True,
		view_name='apiv2:question-detail'
	)

	def getFullname(self, obj):
		return obj.author.first_name + ' ' + obj.author.last_name

	def getQuestionCount(self, obj):
		return obj.question_count

	author_fullname = serializers.SerializerMethodField("getFullname")
	question_count = serializers.SerializerMethodField("getQuestionCount")

	class Meta:
		fields = [
			'id',
			'title',
			'author',
			'author_fullname',
			'question_count',
			'created_at',
			'questions'
		]
		model = models.Quiz

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		fields = [
			'id',
			'text',
			'correct',
		]
		model = models.Answer

class QuestionSerializer(serializers.ModelSerializer):
	answers = AnswerSerializer(
		read_only=True,
		many=True
	)

	class Meta:
		fields = [
			'id',
			'quiz',
			'prompt',
			'answers'
		]
		model = models.Question

