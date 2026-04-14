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
    base_url = getattr(settings, 'BASE_API_URL', request.build_absolute_uri('/'))
    return Response({
        'base_api_url': base_url,
        'users': base_url.rstrip('/') + reverse('user-list', request=request, format=format),
        'teams': base_url.rstrip('/') + reverse('team-list', request=request, format=format),
        'activities': base_url.rstrip('/') + reverse('activity-list', request=request, format=format),
        'leaderboard': base_url.rstrip('/') + reverse('leaderboard-list', request=request, format=format),
        'workouts': base_url.rstrip('/') + reverse('workout-list', request=request, format=format),
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('', include(router.urls)),
]
