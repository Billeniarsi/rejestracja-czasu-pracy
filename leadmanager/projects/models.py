from django.db import models

# Create your models here.


class Project(models.Model):
    class Meta:
        verbose_name = 'Projekt'
        verbose_name_plural = 'Projekty'

    name = models.CharField(max_length=50, blank=False, verbose_name='Nazwa')
    description = models.CharField(max_length=255, blank=True, verbose_name='Opis')

    def __str__(self):
        return "Projekt " + str(self.pk) + " - \"" + str(self.name) + "\""


class Task(models.Model):
    class Meta:
        verbose_name = 'Zadanie'
        verbose_name_plural = 'Zadania'

    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name='Projekt')
    name = models.CharField(max_length=50, blank=False, verbose_name='Nazwa')
    description = models.CharField(max_length=255, blank=True, verbose_name='Opis')

    def __str__(self):
        return "Task " + str(self.pk) + " - \"" + str(self.name) + "\""

