export enum SkillLevel {
  CP = 'CP',
  CE1 = 'CE1',
  CE2 = 'CE2',
  CM1 = 'CM1',
  CM2 = 'CM2'
}

export interface Competency {
  id: string;
  label: string;
  levels: SkillLevel[];
}

export interface Theme {
  id: string;
  label: string;
  competencies: Competency[];
}

export interface Subject {
  id: string;
  label: string;
  icon: string;
  color: string;
  themes: Theme[];
}

export interface PhysicalExercise {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
}

export interface Option {
  value: string | number;
  exercise: PhysicalExercise;
}

export interface Question {
  statement: string;
  options: Option[];
  correctIndex: number;
  phonemes?: { sound: string; exercise: PhysicalExercise }[];
}

export enum GameState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  REVEALING = 'REVEALING'
}
