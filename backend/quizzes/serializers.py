from rest_framework import serializers

from . import models

class QuizSerializer(serializers.ModelSerializer):
	questions = serializers.HyperlinkedRelatedField(
		many=True,
		read_only=True,
		view_name='apiv2:question-detail'
	)

	class Meta:
		fields = [
			'title',
			'author',
			'total_questions',
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
	# answers = serializers.HyperlinkedRelatedField(
	# 	many=True,
	# 	read_only=True,
	# 	view_name="apiv2:answer-detail",
	# )
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

