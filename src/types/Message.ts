export type MessageCategory = 
  | 'ATENDIMENTO_ONLINE' 
  | 'TUTORIA' 
  | 'MENSAGENS' 
  | 'AVISOS';

export interface Message {
  id: string;
  category: MessageCategory;
  unreadCount: number;
}
