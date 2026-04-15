from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from django.conf import settings

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'teams', views.TeamViewSet)
router.register(r'activities', views.ActivityViewSet)
router.register(r'leaderboard', views.LeaderboardViewSet)
router.register(r'workouts', views.WorkoutViewSet)

@api_view(['GET'])
def api_root(request, format=None):
    base_url = "https://miniature-cod-9gg94j9w4wj2xx6v-8000.app.github.dev"
    return Response({
        'users': f"{base_url}/users/",
        'teams': f"{base_url}/teams/",
        'activities': f"{base_url}/activities/",
        'leaderboard': f"{base_url}/leaderboard/",
        'workouts': f"{base_url}/workouts/",
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
