from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=400)
    bot_response = models.CharField(max_length=400)

    def __str__(self):
        return self.question_text
