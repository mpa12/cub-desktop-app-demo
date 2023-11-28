from django.urls import path


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import UserView, AllUserView, UserPassportUpdateView, UserUpdateView
urlpatterns = [
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/user/profile/', UserView.as_view(), name='user_view'),
    path('api/v1/users/all', AllUserView.as_view(), name='all_users'),
    path('api/v1/user/update-passport/', UserPassportUpdateView.as_view(), name='user_update_passport'),
    path('api/v1/user/update/', UserUpdateView.as_view(), name='user_update'),
]
