'use client';

import Card from './card';

interface ActionItem {
  icon: string;
  title: string;
  description: string;
}

export function ActionGrid() {
  const actions: ActionItem[] = [
    { icon: '💬', title: 'Talk to Aarvya chatbot', description: 'AI companion for emotional support' },
    { icon: '🎙️', title: 'AI voice assistant', description: 'Voice-based interaction with AI' },
    { icon: '🌐', title: 'AI translator', description: 'Translate in multiple languages' },
    { icon: '🎤', title: 'Start voice check-in', description: 'Quick voice check-in' },
    { icon: '📷', title: 'Face detection wellness check', description: 'Quick wellness scan' },
    { icon: '💪', title: 'Tell us about body symptoms', description: 'Describe physical symptoms' },
    { icon: '🎲', title: 'Mind games for wellbeing', description: 'Relaxing mental exercises' },
    { icon: '⏳', title: 'Start 2-minute calming exercise', description: 'Guided breathing exercise' },
    { icon: '📞', title: 'Request counsellor call', description: 'Connect with human counsellor' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:space-y-6 lg:space-y-4">
      {actions.map((action, i) => (
        <Card key={i} variant="soft" className="rounded-2xl p-4 hover:bg-[#EEF3F9] transition-colors cursor-pointer">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center mt-0.5">
              <span className="text-primary font-bold text-lg">{action.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm text-primary">{action.title}</h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
