import { BetResult } from "@/enums";

export interface User extends IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
    roles: string[];
  };
  data_donut: any[];
  flash: Flash;
  superuser: IAdmin;
  dashboard: any[];
  incomes: any[];
  sports: any[];
  pendings: any[];
  today: { deposit: any[]; withdraw: any[] };
  transactions: any;
  transactionDetails?: any;
  users: IUserResource;
  admins: IAdminResource;
  bets: IBetResource;
  userPapers: IPaperResource;
  events?: any;
  event?: any;
  games?: any;
};

export interface Flash {
  message: string;
  file: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  profile: IProfile;
  roles: string[];
  status: string;
  type: string;
  last_login_at: string;
  email_verified_at: string;
  created_at: string;
  wallet: IWallet;
}

export interface IProfile {}

export interface IAdmin extends IUser {}
export interface IEvent {
  id?: number;
  title: string;
  sport: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  games: IGame[];
}
export interface IGame {
  id?: number;
  event_id: number;
  home_name: string;
  home_image: string;
  away_name: string;
  away_image: string;
  home_rate: string;
  draw_rate: string;
  away_rate: string;
  home_score?: number;
  away_score?: number;
  time_close_bet: string;
  time_game?: string;
  time_start?: string;
  time_end?: string;
  done?: boolean;
  result?: number;
}

export interface IPaper {
  user_id: number;
  quantity?: number;
  rate: number;
  profit: number;
  amount: number;
  user: User;
  bets: IBet[];
  created_at?: string;
  status: number;
  result?: BetResult;
}

export interface IWallet {
  id?: number;
  amount: number;
  bet_total: number;
  draw_total: number;
}

export interface ITransaction {
  id: number;
  user_id: number;
  type: string;
  withdraw: number;
  deposit: number;
  created_at: string;
}

export interface IBet {
  user_id: number;
  quantity: number;
  game?: IGame;
  profit: number;
  game_id: number;
  players: string;
  bet_choice: number;
  bet_choice_name: string;
  rate: number;
}

export interface IBetResource extends IBet, IPaginatorResource {
  data: IBet[];
}
export interface IPaperResource extends IPaginatorResource {
  data: IPaper[];
  total_open: number;
  total_close: number;
  userDetails: IUser;
}
export interface IUserResource extends IPaginatorResource {
  total_users: number;
  total_actives: number;
  total_recents: number;
  total_inactives: number;
  data: IUser[];
}
export interface IAdminResource extends IPaginatorResource {
  total_users: number;
  total_actives: number;
  total_recents: number;
  total_inactives: number;
  data: IAdmin[];
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface IApiErrorResponse {
  status: number;
  errors: string[];
}

export type OptionType = {
  value: string;
  label: string;
};

export type IProfitRequest = {
  profit: number;
};

export type IBetRequest = {
  quantity?: number;
  amount: number;
  profit?: number;
};

export type IPaginatorResource = {
  current_page: number;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
};
