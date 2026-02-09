import { Category } from "./Category";

export interface Joke {
  id?: number;
  jokeContent: string;
  jokeAnswer: string;
  category: Category;
}
