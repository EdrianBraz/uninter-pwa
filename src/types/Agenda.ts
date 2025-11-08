export type EventType = 'ENTREGA' | 'PROVA' | 'AULA_AO_VIVO' | 'EVENTO';

export interface AgendaEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  date: string;
  time?: string;
}
