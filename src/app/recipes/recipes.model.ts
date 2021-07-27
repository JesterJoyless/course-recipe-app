import { Ingredients } from '../shared/ingredients.model';

export class Recipe {
  public name: string;
  public description: string;
  public imgPath: string;
  public ingredients: Ingredients[] = [];

  constructor(name: string, desc: string, img: string, ingredients: Ingredients[]) {
    this.name = name;
    this.description = desc;
    this.imgPath = img;
    this.ingredients = ingredients;

  }
}
