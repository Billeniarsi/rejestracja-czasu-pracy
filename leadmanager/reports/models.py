from django.db import models
from django.contrib.auth.models import User
from projects.models import Task

# Create your models here.


class Report(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    time = models.PositiveIntegerField(blank=False)
    overtime = models.PositiveIntegerField(blank=True)
    is_accepted = models.BooleanField(blank=False, default=False)


