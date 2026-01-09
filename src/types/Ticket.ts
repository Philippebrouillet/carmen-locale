export type TicketPaymentType = "acompte_verse" | "toPayOnPlace" | "paid";
export type TicketStatus =
  | "coming"
  | "youAreNext"
  | "iminent"
  | "yourTurn"
  | "inProgress"
  | "done"
  | "cancelled"
  | "cancelledByPro"
  | "isLate"
  | "proAbsent";
