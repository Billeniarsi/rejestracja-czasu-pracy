from django.contrib import admin
from .models import Project, Task

# Register your models here.


class ProjectAdmin(admin.ModelAdmin):
    fields = ['name', 'description']
    list_display = ('name', 'id', 'description')
    list_editable = ('description', )
    ordering = ('id', )


class TaskAdmin(admin.ModelAdmin):
    fields = ['project', 'name', 'description']
    list_display = ('name', 'id', 'description', 'project')
    list_editable = ('description', )
    ordering = ('id', )

admin.site.register(Project, ProjectAdmin)
admin.site.register(Task, TaskAdmin)
