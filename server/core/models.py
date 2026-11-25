from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = [
        ('victim', 'Victim'),
        ('counsellor', 'Counsellor'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='victim')
    name = models.CharField(max_length=150, blank=True)
    case_id = models.CharField(max_length=50, blank=True, null=True)
    has_completed_checkin = models.BooleanField(default=False)
    distress_score = models.IntegerField(default=52)
    next_checkin_time = models.CharField(max_length=100, default='Tomorrow, 10:30 AM')
    symptoms = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class PriorityCase(models.Model):
    case_id = models.CharField(max_length=50, unique=True)
    risk = models.CharField(max_length=20)
    score = models.IntegerField()
    trend = models.CharField(max_length=20, default='Rising')
    reasons = models.TextField()
    last_contact = models.CharField(max_length=50)
    assigned_counsellor = models.CharField(max_length=100)

    class Meta:
        ordering = ['-score']

    def __str__(self):
        return f"{self.case_id} - {self.risk} ({self.score})"


class LiveAlert(models.Model):
    case_id = models.CharField(max_length=50)
    risk = models.CharField(max_length=20)
    message = models.TextField()
    time_str = models.CharField(max_length=50)
    acknowledged = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.case_id}: {self.message}"


class RehabilitationPipeline(models.Model):
    rhb_id = models.CharField(max_length=50, unique=True)
    linked_case = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    progress = models.IntegerField(default=0)
    officer = models.CharField(max_length=100)
    next_action = models.CharField(max_length=255)
    due_days = models.CharField(max_length=50)
    status = models.CharField(max_length=50)

    class Meta:
        ordering = ['rhb_id']

    def __str__(self):
        return f"{self.rhb_id}: {self.title}"


class CompensationRecord(models.Model):
    case_id = models.CharField(max_length=50)
    instalment = models.CharField(max_length=50)
    amount = models.CharField(max_length=50)
    status_label = models.CharField(max_length=50)
    status_type = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.case_id} - {self.instalment} ({self.amount})"


class CheckinSubmission(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    language = models.CharField(max_length=50, default='English')
    text_consent = models.BooleanField(default=True)
    voice_consent = models.BooleanField(default=False)
    camera_consent = models.BooleanField(default=False)
    medication_consent = models.BooleanField(default=False)
    sms_consent = models.BooleanField(default=True)
    name = models.CharField(max_length=100, blank=True)
    age_range = models.CharField(max_length=50, blank=True)
    reach_method = models.CharField(max_length=50, blank=True)
    checkin_time = models.CharField(max_length=50, blank=True)
    feeling = models.CharField(max_length=50, blank=True)
    distress_score = models.IntegerField(default=52)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Checkin by {self.name or 'Anonymous'} at {self.created_at}"


class InterventionLog(models.Model):
    case_id = models.CharField(max_length=50)
    log_type = models.CharField(max_length=100)
    notes = models.TextField()
    date_str = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.case_id} - {self.log_type}"
