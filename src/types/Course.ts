import type { Discipline } from './Discipline';

export type CourseType = 'GRADUACAO' | 'POS_GRADUACAO' | 'EXTENSAO';

export interface Course {
  id: string;
  name: string;
  type: CourseType;
  duration: string;
  modality: string; // 'A_DISTANCIA' | 'PRESENCIAL' | 'HIBRIDO'
  totalHours: number;
  completedHours: number;
  disciplines: Discipline[];
}
