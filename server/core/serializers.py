from rest_framework import serializers
from .models import (
    User,
    PriorityCase,
    LiveAlert,
    RehabilitationPipeline,
    CompensationRecord,
    CheckinSubmission,
    InterventionLog,
)

class UserSerializer(serializers.ModelSerializer):
    hasCompletedCheckin = serializers.BooleanField(source='has_completed_checkin', read_only=True)
    distressScore = serializers.IntegerField(source='distress_score', read_only=True)
    nextCheckinTime = serializers.CharField(source='next_checkin_time', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'role', 'case_id', 'hasCompletedCheckin', 'distressScore', 'nextCheckinTime', 'symptoms']


class PriorityCaseSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='case_id')
    lastContact = serializers.CharField(source='last_contact')
    assignedCounsellor = serializers.CharField(source='assigned_counsellor')

    class Meta:
        model = PriorityCase
        fields = ['id', 'risk', 'score', 'trend', 'reasons', 'lastContact', 'assignedCounsellor']


class LiveAlertSerializer(serializers.ModelSerializer):
    caseId = serializers.CharField(source='case_id')
    time = serializers.CharField(source='time_str')

    class Meta:
        model = LiveAlert
        fields = ['id', 'caseId', 'risk', 'message', 'time', 'acknowledged']


class RehabilitationPipelineSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='rhb_id')
    linked = serializers.CharField(source='linked_case')
    nextAction = serializers.CharField(source='next_action')
    dueDays = serializers.CharField(source='due_days')

    class Meta:
        model = RehabilitationPipeline
        fields = ['id', 'linked', 'title', 'progress', 'officer', 'nextAction', 'dueDays', 'status']


class CompensationRecordSerializer(serializers.ModelSerializer):
    caseId = serializers.CharField(source='case_id')
    statusLabel = serializers.CharField(source='status_label')
    statusType = serializers.CharField(source='status_type')

    class Meta:
        model = CompensationRecord
        fields = ['id', 'caseId', 'instalment', 'amount', 'statusLabel', 'statusType']


class CheckinSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckinSubmission
        fields = '__all__'


class InterventionLogSerializer(serializers.ModelSerializer):
    caseId = serializers.CharField(source='case_id')
    type = serializers.CharField(source='log_type')
    date = serializers.CharField(source='date_str')

    class Meta:
        model = InterventionLog
        fields = ['id', 'caseId', 'type', 'notes', 'date']
