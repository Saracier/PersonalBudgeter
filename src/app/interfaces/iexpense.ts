export interface IExpense {
  name: string;
  value: number;
  date: Date;
  category: Category;
}

enum Category {
  Food,
  House,
  Transport,
  Telecomunication,
  HealthCare,
  Clothes,
  Hygiene,
  Kids,
  Entertiment,
  Other,
  Debts,
  Saving,
}
