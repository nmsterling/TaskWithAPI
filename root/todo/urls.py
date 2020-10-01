from django.views.generic.base import TemplateView
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from todo import views

urlpatterns = [
    path('', TemplateView.as_view(template_name='todo/index.html'), name='index'),
    path('todo/', views.TodoList.as_view(), name='todo'),
    path('todo/<int:pk>/', views.TodoDetail.as_view(), name='update-todo')
]

urlpatterns = format_suffix_patterns(urlpatterns)