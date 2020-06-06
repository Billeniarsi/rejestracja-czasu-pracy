from django.db import models
from django.contrib.auth.models import User
from projects.models import Project, Task

# Create your models here.


class Report(models.Model):
    class Meta:
        verbose_name = 'Raport'
        verbose_name_plural = 'Raporty'

    employee = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Pracownik")
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name="Zadanie")
    date = models.DateField(blank=False, verbose_name="Data")
    time = models.PositiveIntegerField(blank=False, verbose_name="Czas pracy")
    overtime = models.PositiveIntegerField(blank=False, default=0, verbose_name="Nagodzinowy czas pracy")
    is_accepted = models.BooleanField(blank=False, default=False, verbose_name="Czy zaakceptowano")


class Summary(models.Model):
    class Meta:
        verbose_name = 'Podsumowanie pracownika'
        verbose_name_plural = 'Podsumowania pracowników'

    employee = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False, verbose_name="Pracownik")
    start_date = models.DateField(blank=False, verbose_name="Data początkowa")
    end_date = models.DateField(blank=False, verbose_name="Data końcowa")


class Overview(models.Model):
    class Meta:
        verbose_name = 'Przegląd projektu'
        verbose_name_plural = 'Przeglądy projektów'

    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True, verbose_name="Projekt")
    start_date = models.DateField(blank=False, verbose_name="Data początkowa")
    end_date = models.DateField(blank=False, verbose_name="Data końcowa")



