from django.db import models

# Create your models here.
class Todo(models.Model):
    task = models.CharField(max_length=256)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return '%s %s %s' % (self.id, self.task, self.is_completed)