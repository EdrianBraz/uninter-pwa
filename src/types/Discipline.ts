export type DisciplineType = 'ACOLHIMENTO' | 'INTRODUTORIO' | 'REGULAR' | 'OPTATIVA';
export type DisciplineStatus = 
  | 'CONCLUIDA' 
  | 'APR_MEDIA' 
  | 'APR_EXAME' 
  | 'CURSANDO' 
  | 'AGUARDANDO_NOTA' 
  | 'REPROVADO'
  | 'DISPENSADA';

export interface Discipline {
  id: string;
  name: string;
  type: DisciplineType;
  hours: number;
  status: DisciplineStatus;
  module: string;
  averageGrade: number | null;
  examGrade: number | null;
  attendance: number | null;
  finalResult: number | null;
}
