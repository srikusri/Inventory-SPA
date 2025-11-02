export interface GameState {
  level: number;
  score: number;
  coins: number;
  experience: number;
  experienceToNextLevel: number;
  achievements: Achievement[];
  dailyStreak: number;
  lastPlayDate: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface StoreTheme {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  cost: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerAvatar: string;
  items: OrderItem[];
  total: number;
  timeLimit: number;
  bonus: number;
  completed: boolean;
}

export interface OrderItem {
  barcode: string;
  name: string;
  quantity: number;
  price: number;
}

export interface GameSound {
  scan: string;
  success: string;
  error: string;
  levelUp: string;
  achievement: string;
  coin: string;
  customer: string;
}

export enum GameMode {
  LEARN = 'learn',
  PLAY = 'play',
  CHALLENGE = 'challenge'
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
  completed: boolean;
}

export interface TutorialStep {
  text: string;
  highlight?: string;
  action?: string;
}

