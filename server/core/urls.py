from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/login/', views.api_login, name='api_login'),
    path('auth/register/', views.api_register, name='api_register'),
    path('auth/google/', views.api_google_auth, name='api_google_auth'),

    # Cases & Alerts
    path('cases/', views.api_cases, name='api_cases'),
    path('alerts/', views.api_alerts, name='api_alerts'),
    path('alerts/create/', views.api_create_alert, name='api_create_alert'),
    path('alerts/<int:alert_id>/acknowledge/', views.api_acknowledge_alert, name='api_acknowledge_alert'),

    # Rehabilitation & Compensation
    path('rehabilitation/', views.api_rehabilitation, name='api_rehabilitation'),
    path('compensation/', views.api_compensation, name='api_compensation'),

    # Checkin & Interventions
    path('checkin/', views.api_submit_checkin, name='api_submit_checkin_alt'),
    path('checkins/', views.api_submit_checkin, name='api_submit_checkin'),
    path('user/update-checkin/', views.api_update_user_checkin, name='api_update_user_checkin'),
    path('interventions/', views.api_interventions, name='api_interventions'),
    path('translate/', views.api_translate, name='api_translate'),
    path('chat/', views.api_chat, name='api_chat'),
]
