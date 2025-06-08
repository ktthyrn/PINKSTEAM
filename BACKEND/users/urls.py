# backend/users/urls.py
from django.urls import path
from .views import RegisterView # Importa tu vista de registro
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Vista para el login (obtener tokens de acceso y refresco)
    TokenRefreshView,     # Vista para refrescar el token de acceso
)

urlpatterns = [
    # Ruta para el registro de usuarios
    path('register/', RegisterView.as_view(), name='register'),
    # Rutas para el login (obtener tokens JWT)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Ruta para refrescar el token de acceso con el token de refresco
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]