from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, PriorityCase, LiveAlert, RehabilitationPipeline, CompensationRecord

class SahaayaAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create users for all 3 roles
        self.counsellor = User.objects.create_user(
            username='baluparasa239@gmail.com',
            email='baluparasa239@gmail.com',
            password='Balu@123',
            name='Balu Parasa',
            role='counsellor'
        )
        self.victim = User.objects.create_user(
            username='asha@sahaaya.gov.in',
            email='asha@sahaaya.gov.in',
            password='Asha@123',
            name='Asha',
            role='victim',
            case_id='VCT-UP-00124'
        )
        self.admin = User.objects.create_user(
            username='admin@sahaaya.gov.in',
            email='admin@sahaaya.gov.in',
            password='Admin@123',
            name='Administrator',
            role='admin'
        )

        # Seed test data matching models.py
        self.case = PriorityCase.objects.create(
            case_id='VCT-UP-00124',
            risk='High',
            score=88,
            trend='Rising',
            reasons='Acute sleep disruption + somatic panic triggers',
            last_contact='Yesterday (19:40 IST)',
            assigned_counsellor='Balu Parasa'
        )
        self.alert = LiveAlert.objects.create(
            case_id='VCT-UP-00124',
            risk='critical',
            message='Elevated distress score (88/100) detected from somatic inputs.',
            time_str='12m ago',
            acknowledged=False
        )
        self.rehab = RehabilitationPipeline.objects.create(
            rhb_id='RHB-001',
            linked_case='VCT-UP-00124',
            title='Vocational Training — Digital Literacy & Office Management',
            progress=65,
            officer='Smt. Vandana Sharma',
            next_action='Course completion certificate dispatch',
            due_days='In 4 days',
            status='In Progress'
        )
        self.comp = CompensationRecord.objects.create(
            case_id='VCT-UP-00124',
            instalment='First Instalment (Immediate Relief)',
            amount='Rs 1,00,000',
            status_label='Sanctioned & Disbursed',
            status_type='disbursed'
        )

    def test_counsellor_login(self):
        response = self.client.post('/api/auth/login/', {
            'email': 'baluparasa239@gmail.com',
            'password': 'Balu@123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['role'], 'counsellor')
        self.assertEqual(response.data['user']['name'], 'Balu Parasa')

    def test_victim_login(self):
        response = self.client.post('/api/auth/login/', {
            'email': 'asha@sahaaya.gov.in',
            'password': 'Asha@123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['role'], 'victim')
        self.assertEqual(response.data['user']['case_id'], 'VCT-UP-00124')

    def test_admin_login(self):
        response = self.client.post('/api/auth/login/', {
            'email': 'admin@sahaaya.gov.in',
            'password': 'Admin@123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['user']['role'], 'admin')

    def test_invalid_login(self):
        response = self.client.post('/api/auth/login/', {
            'email': 'admin@sahaaya.gov.in',
            'password': 'WrongPassword'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cases_list(self):
        response = self.client.get('/api/cases/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], 'VCT-UP-00124')

    def test_alerts_and_acknowledge(self):
        response = self.client.get('/api/alerts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

        alert_id = response.data[0]['id']
        ack_response = self.client.post(f'/api/alerts/{alert_id}/acknowledge/')
        self.assertEqual(ack_response.status_code, status.HTTP_200_OK)
        self.assertEqual(ack_response.data['status'], 'acknowledged')

    def test_rehabilitation_list(self):
        response = self.client.get('/api/rehabilitation/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], 'RHB-001')

    def test_compensation_list(self):
        response = self.client.get('/api/compensation/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_submit_checkin(self):
        response = self.client.post('/api/checkin/', {
            'language': 'English',
            'name': 'Asha',
            'age_range': '18–25',
            'feeling': 'Calmer than yesterday',
            'distress_score': 45
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Asha')
