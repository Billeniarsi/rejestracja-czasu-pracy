from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Project(models.Model):
    name = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=255, blank=True)


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, blank=False)
    description = models.CharField(max_length=255, blank=True)

