# backend/users/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny # Para permitir acceso público a las vistas de registro/login

# Importaciones de Django para el modelo de usuario y serializadores
from django.contrib.auth.models import User
from rest_framework import serializers

# Importaciones para Simple JWT (si necesitaras extenderlo, aunque para login simple, TokenObtainPairView es suficiente)
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializer para el registro de usuarios
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}) # Para confirmar contraseña

    class Meta:
        model = User
        # Campos que esperamos del frontend para el registro
        fields = ('username', 'email', 'password', 'password2')
        # Asegura que la contraseña solo se use para escribir (no se muestre en respuestas GET)
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        # Validación para que las contraseñas coincidan
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        # Asegúrate de eliminar 'password2' antes de crear el usuario, ya que no es un campo del modelo User
        validated_data.pop('password2')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# Vista para el registro de usuarios
class RegisterView(APIView):
    permission_classes = [AllowAny] # Permite a cualquier usuario (incluso no autenticado) acceder a esta vista

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado exitosamente"}, status=status.HTTP_201_CREATED)
        # Si la validación falla, devuelve los errores del serializer con un estado 400
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Nota: No necesitamos una vista de Login personalizada aquí.
# Simple JWT ya provee TokenObtainPairView para manejar el login y devolver los tokens.
# Lo veremos en el archivo urls.py