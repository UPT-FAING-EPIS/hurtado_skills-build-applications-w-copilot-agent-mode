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
    base_url = settings.BASE_API_URL.rstrip('/')
    return Response({
        'users': base_url + reverse('user-list', format=format),
        'teams': base_url + reverse('team-list', format=format),
        'activities': base_url + reverse('activity-list', format=format),
        'leaderboard': base_url + reverse('leaderboard-list', format=format),
        'workouts': base_url + reverse('workout-list', format=format),
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
