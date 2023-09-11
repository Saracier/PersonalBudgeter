import { Category } from '../enums/category';
export interface IExpense {
  name: string;
  value: number;
  date: Date;
  category: Category;
  id: string;
}
