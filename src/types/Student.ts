import type { AgendaEvent } from './Agenda';
import type { Course } from './Course';
import type { FinancialStatus } from './Financial';
import type { LiveClass } from './LiveClass';
import type { Message } from './Message';

export interface Student {
  ru: string;
  name: string;
  password?: string;
  cpf: string;
  course: Course;
  financialStatus: FinancialStatus;
  campus: string;
  enrollmentDate: string;
  cardValidity: string;
  
  // Dados adicionais (todos em um único JSON)
  liveClasses?: LiveClass[];
  messages?: Message[];
  agendaEvents?: AgendaEvent[];
}
