export enum SectionType {
  HOME = 'HOME',
  CIRCLE = 'CIRCLE',
  ELLIPSE = 'ELLIPSE',
  HYPERBOLA = 'HYPERBOLA',
  PARABOLA = 'PARABOLA',
  ADVANCED = 'ADVANCED'
}

export interface Module {
  id: number;
  title: string;
  duration?: string;
  level: '基础' | '中档' | '拔高';
  keyPoints: string[];
  description: string;
}

export interface SectionData {
  type: SectionType;
  title: string;
  color: string;
  icon: string;
  modules: Module[];
  formula: string;
  realWorld: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}