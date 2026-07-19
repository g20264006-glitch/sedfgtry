export interface CanvasData {
  agentName: string;
  problem: string;
  goal: string;
  inputInfo: string;
  forbiddenActions: string;
  humanConfirmation: string;
  privacyRules: string;
  fairnessRules: string;
}

export interface LogData {
  foundProblems: string;
  addedRules: string;
  finalImprovements: string;
  reflections: string;
}

export interface Reservation {
  id: string;
  teamNumber: string;
  nickname: string;
  boothId: string;
  timeSlot: string;
  status: 'confirmed' | 'waitlist';
}

export type TabType = 'home' | 'canvas' | 'agent' | 'redteam' | 'log' | 'presentation';

export const BOOTHS = [
  { id: 'sneakers', name: '운동화 부스' },
  { id: 'shoes', name: '구두 부스' },
  { id: 'hat', name: '모자 부스' },
  { id: 'tshirt', name: '티셔츠 부스' },
];

export const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00'];
export const MAX_CAPACITY_PER_SLOT = 10;
