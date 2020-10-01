from django.contrib import admin
from .models import Todo

class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'task', 'is_completed')

admin.site.register(Todo, TodoAdmin)

