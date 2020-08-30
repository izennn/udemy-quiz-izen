from rest_framework import serializers

from . import models


class QuizSerializer(serializers.ModelSerializer):
	# questions = serializers.HyperlinkedRelatedField(
	# 	many=True,
	# 	read_only=True,
	# 	view_name="apiv2:question-detail"
	# )
	questions =  serializers.HyperlinkedIdentityField(view_name='apiv2:question-list')

	class Meta:
		fields = (
			'title',
			'author',
			'total_questions',
			'questions'
        )
		model = models.Quiz

class QuestionSerializer(serializers.ModelSerializer):
	answers = serializers.HyperlinkedRelatedField(
		many=True,
		read_only=True,
		view_name="apiv2:answer-detail",
	)

	class Meta:
		fields = (
			'id',
            'quiz',
			'prompt',
			'answers'
        )
		model = models.Question

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		fields = (
			'id',
			'text',
			'correct',
			'question'
		)
		model = models.Answer