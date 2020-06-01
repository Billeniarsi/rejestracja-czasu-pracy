from django.db import models
from django.contrib.auth.models import User
from projects.models import Project, Task

# Create your models here.


class Report(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    date = models.DateField(blank=False)
    time = models.PositiveIntegerField(blank=False)
    overtime = models.PositiveIntegerField(blank=False, default=0)
    is_accepted = models.BooleanField(blank=False, default=False)


class Overview(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True)
    employee = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    start_date = models.DateField(blank=False)
    end_date = models.DateField(blank=False)

