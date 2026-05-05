from django.test import TestCase
from .models import Team, User, Activity, Workout, Leaderboard

class ModelSmokeTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Test Team')
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='pass', team=self.team)
        self.activity = Activity.objects.create(user=self.user, type='run', duration=10)
        self.workout = Workout.objects.create(name='Test Workout', description='desc')
        self.leaderboard = Leaderboard.objects.create(user=self.user, points=42)

    def test_team(self):
        self.assertEqual(self.team.name, 'Test Team')

    def test_user(self):
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.team, self.team)

    def test_activity(self):
        self.assertEqual(self.activity.type, 'run')
        self.assertEqual(self.activity.duration, 10)

    def test_workout(self):
        self.assertEqual(self.workout.name, 'Test Workout')

    def test_leaderboard(self):
        self.assertEqual(self.leaderboard.points, 42)
        self.assertEqual(self.leaderboard.user, self.user)
