export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  dashboard: any[];
  incomes: any[];
  sports: any[];
  today: { deposit: any[]; withdraw: any[] };
  transactions: any;
  transactionDetails?: any;
  users?: any;
  events?: any;
  event?: any;
  games?: any;
};
