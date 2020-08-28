from rest_framework import serializers

from . import models


class QuizSerializer(serializers.ModelSerializer):
	# questions = serializers.HyperlinkedRelatedField(
	# 	many=True,
	# 	view_name="quizzes:questions"
	# )

	class Meta:
		fields = (
			'title',
			'author',
			'total_questions',
        )
		model = models.Quiz


class QuestionSerializer(serializers.ModelSerializer):
	# answers = serializers.HyperlinkedRelatedField(
	# 	many=True,
	# )

	class Meta:
		fields = (
            'quiz',
			'prompt'
        )
		model = models.Question

class AnswerSerializer(serializers.ModelSerializer):
	class Meta:
		fields = (
			'text',
			'correct',
			'question'
		)
		model = models.Answer