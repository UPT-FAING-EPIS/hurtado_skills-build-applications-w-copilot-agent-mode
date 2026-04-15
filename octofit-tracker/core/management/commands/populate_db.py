from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import Team, Activity, Leaderboard, Workout
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        User = get_user_model()
        # Eliminar datos existentes
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Crear equipos
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Crear usuarios
        users = [
            User.objects.create_user(username='ironman', email='ironman@marvel.com', password='1234'),
            User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='1234'),
            User.objects.create_user(username='batman', email='batman@dc.com', password='1234'),
            User.objects.create_user(username='superman', email='superman@dc.com', password='1234'),
        ]

        # Crear actividades
        Activity.objects.create(name='Correr', user_email='ironman@marvel.com', team='Marvel')
        Activity.objects.create(name='Nadar', user_email='spiderman@marvel.com', team='Marvel')
        Activity.objects.create(name='Volar', user_email='superman@dc.com', team='DC')
        Activity.objects.create(name='Escalar', user_email='batman@dc.com', team='DC')

        # Crear leaderboard
        Leaderboard.objects.create(user_email='ironman@marvel.com', team='Marvel', points=100)
        Leaderboard.objects.create(user_email='spiderman@marvel.com', team='Marvel', points=80)
        Leaderboard.objects.create(user_email='batman@dc.com', team='DC', points=90)
        Leaderboard.objects.create(user_email='superman@dc.com', team='DC', points=120)

        # Crear workouts
        Workout.objects.create(name='Pushups', description='20 pushups', user_email='ironman@marvel.com')
        Workout.objects.create(name='Situps', description='30 situps', user_email='spiderman@marvel.com')
        Workout.objects.create(name='Pullups', description='10 pullups', user_email='batman@dc.com')
        Workout.objects.create(name='Squats', description='50 squats', user_email='superman@dc.com')

        with connection.cursor() as cursor:
            cursor.execute('db.users.createIndex({ "email": 1 }, { unique: true })')



        self.stdout.write(self.style.SUCCESS('La base de datos octofit_db ha sido poblada con datos de prueba.'))
