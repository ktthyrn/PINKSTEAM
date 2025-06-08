# backend/myproject/urls.py
from django.contrib import admin
from django.urls import path, include # Asegúrate de que 'include' esté importado

urlpatterns = [
    path('admin/', admin.site.urls),
    # Incluye las URLs de tu aplicación 'users' bajo el prefijo 'api/'
    path('api/', include('users.urls')),
]