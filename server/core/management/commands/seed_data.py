from django.core.management.base import BaseCommand
from core.models import (
    User,
    PriorityCase,
    LiveAlert,
    RehabilitationPipeline,
    CompensationRecord,
    InterventionLog,
)

class Command(BaseCommand):
    help = 'Seeds initial demonstration data for Aarvya platform'

    def handle(self, *args, **options):
        self.stdout.write('Seeding initial demo data...')

        # 1. Users (Strictly 3 roles)
        users = [
            {
                'email': 'baluparasa239@gmail.com',
                'username': 'baluparasa',
                'name': 'Balu Parasa',
                'role': 'counsellor',
                'password': 'Balu@123',
                'case_id': None,
            },
            {
                'email': 'asha@aarvya.gov.in',
                'username': 'asha_aarvya',
                'name': 'Asha',
                'role': 'victim',
                'password': 'Asha@123',
                'case_id': 'VCT-UP-00124',
            },
            {
                'email': 'admin@aarvya.gov.in',
                'username': 'admin_aarvya',
                'name': 'Admin Officer',
                'role': 'admin',
                'password': 'Admin@123',
                'case_id': None,
            },
            {
                'email': 'asha@sahaaya.gov.in',
                'username': 'asha',
                'name': 'Asha',
                'role': 'victim',
                'password': 'Asha@123',
                'case_id': 'VCT-UP-00124',
            },
            {
                'email': 'admin@sahaaya.gov.in',
                'username': 'admin',
                'name': 'Admin Officer',
                'role': 'admin',
                'password': 'Admin@123',
                'case_id': None,
            },
        ]
        for u in users:
            user = User.objects.filter(email=u['email']).first()
            if not user:
                user = User.objects.create_user(
                    username=u['username'],
                    email=u['email'],
                    password=u['password'],
                    name=u['name'],
                    role=u['role'],
                    case_id=u['case_id'],
                )
                self.stdout.write(f"Created user: {u['email']} ({u['role']})")
            else:
                user.set_password(u['password'])
                user.role = u['role']
                user.name = u['name']
                user.case_id = u['case_id']
                user.save()

        # 2. Priority Cases
        PriorityCase.objects.all().delete()
        cases = [
            {
                'case_id': 'VCT-UP-00124',
                'risk': 'Critical',
                'score': 82,
                'trend': 'Rising',
                'reasons': 'unsafe language + missed check-ins',
                'last_contact': '15 min ago',
                'assigned_counsellor': 'R. Sharma',
            },
            {
                'case_id': 'VCT-UP-00387',
                'risk': 'High',
                'score': 71,
                'trend': 'Rising',
                'reasons': 'sleep burden + court tomorrow',
                'last_contact': '1 hr ago',
                'assigned_counsellor': 'R. Sharma',
            },
            {
                'case_id': 'VCT-UP-00455',
                'risk': 'High',
                'score': 68,
                'trend': 'Rising',
                'reasons': 'threat concern reported + sleep worsening',
                'last_contact': '3 hrs ago',
                'assigned_counsellor': 'P. Verma',
            },
            {
                'case_id': 'VCT-UP-00808',
                'risk': 'High',
                'score': 57,
                'trend': 'Rising',
                'reasons': 'compensation delay + missed check-ins',
                'last_contact': '2 days ago',
                'assigned_counsellor': 'R. Sharma',
            },
            {
                'case_id': 'VCT-UP-00921',
                'risk': 'Moderate',
                'score': 48,
                'trend': 'Stable',
                'reasons': 'fatigue + delayed response',
                'last_contact': 'Yesterday',
                'assigned_counsellor': 'R. Sharma',
            },
        ]
        for c in cases:
            PriorityCase.objects.create(**c)
        self.stdout.write(f"Seeded {len(cases)} priority cases")

        # 3. Live Alerts
        LiveAlert.objects.all().delete()
        alerts = [
            {
                'case_id': 'VCT-UP-00124',
                'risk': 'Critical',
                'message': 'Unsafe language detected in chat',
                'time_str': '10:28 AM',
                'acknowledged': False,
            },
            {
                'case_id': 'VCT-UP-00387',
                'risk': 'High',
                'message': 'Court appearance within 24 hours + sleep burden',
                'time_str': '09:50 AM',
                'acknowledged': False,
            },
            {
                'case_id': 'VCT-UP-00455',
                'risk': 'High',
                'message': 'Threat concern reported',
                'time_str': '08:12 AM',
                'acknowledged': False,
            },
        ]
        for a in alerts:
            LiveAlert.objects.create(**a)
        self.stdout.write(f"Seeded {len(alerts)} live alerts")

        # 4. Rehabilitation Pipelines
        RehabilitationPipeline.objects.all().delete()
        pipelines = [
            {
                'rhb_id': 'RHB-001',
                'linked_case': 'VCT-UP-00124',
                'title': 'Vocational training — Tailoring course',
                'progress': 60,
                'officer': 'R. Sharma',
                'next_action': 'Complete module 3',
                'due_days': '5 days',
                'status': 'In progress',
            },
            {
                'rhb_id': 'RHB-002',
                'linked_case': 'VCT-UP-00387',
                'title': 'Job placement — Local shop assistant',
                'progress': 85,
                'officer': 'M. Verma',
                'next_action': 'Interview scheduled',
                'due_days': '2 days',
                'status': 'Near completion',
            },
            {
                'rhb_id': 'RHB-003',
                'linked_case': 'VCT-UP-00921',
                'title': 'Compensation tracking — 2nd instalment pending',
                'progress': 30,
                'officer': 'R. Sharma',
                'next_action': 'Treasury follow-up required',
                'due_days': 'Overdue 47 days',
                'status': 'Delayed',
            },
            {
                'rhb_id': 'RHB-004',
                'linked_case': 'VCT-UP-00612',
                'title': 'Counselling — Weekly sessions',
                'progress': 45,
                'officer': 'R. Sharma',
                'next_action': 'Session 4 of 8',
                'due_days': '3 days',
                'status': 'In progress',
            },
            {
                'rhb_id': 'RHB-005',
                'linked_case': 'VCT-UP-00733',
                'title': 'Reintegration — Community support group',
                'progress': 95,
                'officer': 'M. Verma',
                'next_action': 'Final review',
                'due_days': '1 day',
                'status': 'Completing',
            },
        ]
        for p in pipelines:
            RehabilitationPipeline.objects.create(**p)
        self.stdout.write(f"Seeded {len(pipelines)} rehabilitation items")

        # 5. Compensation Records
        CompensationRecord.objects.all().delete()
        comps = [
            {
                'case_id': 'VCT-UP-00921',
                'instalment': '2nd instalment',
                'amount': '₹1,20,000',
                'status_label': 'Overdue 47 days',
                'status_type': 'overdue',
            },
            {
                'case_id': 'VCT-UP-00808',
                'instalment': '1st instalment',
                'amount': '₹85,000',
                'status_label': 'Overdue 63 days',
                'status_type': 'overdue',
            },
            {
                'case_id': 'VCT-UP-00733',
                'instalment': 'Final settlement',
                'amount': '₹2,50,000',
                'status_label': 'Received',
                'status_type': 'received',
            },
        ]
        for c in comps:
            CompensationRecord.objects.create(**c)
        self.stdout.write(f"Seeded {len(comps)} compensation records")

        # 6. Sample Intervention Logs
        InterventionLog.objects.all().delete()
        logs = [
            {
                'case_id': 'VCT-UP-00124',
                'log_type': 'Outbound Call',
                'notes': 'Spoke with victim. Addressed immediate safety concerns regarding upcoming hearing. Coordinated with DLSA advocate.',
                'date_str': 'Today, 10:45 AM',
            },
            {
                'case_id': 'VCT-UP-00387',
                'log_type': 'Check-in Review',
                'notes': 'Reviewed elevated sleep burden distress score. Suggested 2-min box breathing and scheduled follow-up call.',
                'date_str': 'Yesterday, 04:20 PM',
            },
        ]
        for l in logs:
            InterventionLog.objects.create(**l)
        self.stdout.write(f"Seeded {len(logs)} intervention logs")

        self.stdout.write(self.style.SUCCESS('Successfully seeded all demonstration data!'))
