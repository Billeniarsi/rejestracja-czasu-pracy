from django.contrib import admin
from .models import Report, Overview, Summary

# Register your models here.


class ReportAdmin(admin.ModelAdmin):
    fields = ['employee', 'task', 'date', 'time', 'overtime']
    list_display = ('employee', 'id', 'task', 'date', 'time', 'overtime', 'is_accepted')
    #list_editable = ('description', )
    ordering = ('-date', )


class SummaryAdmin(admin.ModelAdmin):
    fields = ['employee', 'start_date', 'end_date']
    list_display = ('employee', 'id', 'start_date', 'end_date')
    #list_editable = ('description', )
    ordering = ('id', )


class OverviewAdmin(admin.ModelAdmin):
    fields = ['project', 'start_date', 'end_date']
    list_display = ('project', 'id', 'start_date', 'end_date')
    #list_editable = ('description', )
    ordering = ('id', )


admin.site.register(Report, ReportAdmin)
admin.site.register(Summary, SummaryAdmin)
admin.site.register(Overview, OverviewAdmin)

