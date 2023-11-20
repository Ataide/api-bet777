import moment from "moment";
import { IBet, IUser } from "./types";

export const formatter = new Intl.NumberFormat("pt-br", {
  style: "currency",
  currency: "BRL",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const getPalpitesFromBet = (bets: IBet[]) => {
  const choices = bets.map((bet) => {
    switch (bet.bet_choice) {
      case 0:
        return "Empate, ";
      case 1:
        return bet.game?.home_name + ", ";
      case -1:
        return bet.game?.away_name + ", ";
      default:
        break;
    }
  });
  return choices;
};

export const checkIfUserIsActiveInactiveOrRecent = (user: IUser) => {
  // Setup dates
  const now = moment();
  const oneWeekAgo = now.subtract(7, "days");

  // Check if user is recent.
  const recent = moment(user.created_at).isSameOrAfter(oneWeekAgo, "date");

  const active = moment(user.last_login_at).isSameOrAfter(oneWeekAgo.add(4, "days"), "date");

  const inactive = moment(user.last_login_at).isSameOrBefore(oneWeekAgo, "date");

  if (recent) {
    return "Novo";
  }

  if (active) {
    return "Ativo";
  }

  if (inactive) {
    return "Inativo";
  }
};
