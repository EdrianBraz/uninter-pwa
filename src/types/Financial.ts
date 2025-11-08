export type PaymentStatus = 'ADIMPLENTE' | 'INADIMPLENTE';
export type InvoiceStatus = 'VENCIDO' | 'EM_ABERTO' | 'PAGO';

export interface FinancialStatus {
  status: PaymentStatus;
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  type: string; // 'Mensalidade', 'Taxa', etc.
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
}
