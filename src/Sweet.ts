import { Elaborable } from "./Elaborable";

export type sweetDescriptor = {
  descripcion: string;
  dificulty: number;
};

/**
 * Clase que representa un plato dulce, incluye el nombre del plato, su
 * dificultad, el tiempo de preparado, horneado y refrigerado
 */
export class Sweet implements Elaborable<sweetDescriptor> {
  private readonly _descripcion: string;
  private readonly _dificultad: number;
  private readonly _tiempoPrep: number;
  private readonly _tiempoHorno: number;
  private readonly _tiempoRefri: number;

  constructor(
    descripcion: string,
    dificultad: number,
    tiempoPrep: number,
    tiempoHorno: number,
    tiempoRefri: number,
  ) {
    if (!descripcion) {
      throw new Error(`Nombre no puede ser vacio`);
    }

    if (dificultad < 1 || 10 < dificultad) {
      throw new Error(`Dificultad debe de estar entre 1 y 10`);
    }

    if (tiempoPrep < 0 || tiempoHorno < 0 || tiempoRefri < 0) {
      throw new Error(`Los tiempos no pueden ser negativos`);
    }

    this._descripcion = descripcion;
    this._dificultad = dificultad;
    this._tiempoPrep = tiempoPrep;
    this._tiempoHorno = tiempoHorno;
    this._tiempoRefri = tiempoRefri;
  }

  get Descripcion(): string {
    return this._descripcion;
  }

  get Dificultad(): number {
    return this._dificultad;
  }

  get TiempoPrep(): number {
    return this._tiempoPrep;
  }

  get TiempoHorno(): number {
    return this._tiempoHorno;
  }

  get TiempoRefri(): number {
    return this._tiempoRefri;
  }

  /**
   * funcion que regresa un sweetDescriptor con la descripcion y la dificultad
   * @returns sweetDescriptor
   */
  desc(): sweetDescriptor {
    return { descripcion: this._descripcion, dificulty: this._dificultad };
  }

  /**
   * funcion que regresa la suma de los tiempos de la receta
   * @returns tiempo total de la receta
   */
  time(): number {
    return this._tiempoHorno + this._tiempoPrep + this._tiempoRefri;
  }
}
