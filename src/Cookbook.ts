import { Elaborable } from "./Elaborable";
import { Sweet } from "./Sweet";
import { Salty } from "./Salty";

export class CookBook<T extends Elaborable<any>> {
  private _recetas: T[] = [];

  add(receta: T): void {
    this._recetas.push(receta);
  }

  remove(index: number): void {
    if (index < 0 || this._recetas.length <= index) {
      throw new Error(`Indice fuera de rango`);
    }
    this._recetas.splice(index, 1);
  }

  get(index: number): T {
    if (index < 0 || this._recetas.length <= index) {
      throw new Error(`Indice fuera de rango`);
    }
    return this._recetas[index];
  }

  size(): number {
    return this._recetas.length;
  }

  filter(predicate: (recipe: T) => boolean): CookBook<T> {
    const result = new CookBook<T>();
    this._recetas.forEach((recipe) => {
      if (predicate(recipe)) {
        result.add(recipe);
      }
    });
    return result;
  }

  avgTime(): number {
    if (this._recetas.length === 0) {
      return 0;
    }

    const total = this._recetas.reduce((sum, recipe) => sum + recipe.time(), 0);
    return total / this._recetas.length;
  }
}
