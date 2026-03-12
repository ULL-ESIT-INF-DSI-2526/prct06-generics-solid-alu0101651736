import { Elaborable } from "./Elaborable";

/**
 * Clase que representa un plato salado, incluye el nombre del plato, su pais
 * de origen, el tiempo de preparado y el tipo de plato
 */
export class Salty implements Elaborable<string> {
  private readonly _nombre: string = "";
  private readonly _paisOrigen: string = "";
  private readonly _tiempoPrep: number = 0;
  private readonly _tipo: string = "";

  constructor(
    nombre: string,
    paisOrigen: string,
    tiempoPrep: number,
    tipo: string,
  ) {
    if (!nombre || !paisOrigen || !tipo) {
      throw new Error(`Nombre, pais y tipo no puede ser vacios`);
    }
    if (tiempoPrep < 0) {
      throw new Error(`Tiempo de preparado no puede ser negativo`);
    }
    this._nombre = nombre;
    this._paisOrigen = paisOrigen;
    this._tiempoPrep = tiempoPrep;
    this._tipo = tipo;
  }

  get Nombre(): string {
    return this._nombre;
  }

  get PaisOrigen(): string {
    return this._paisOrigen;
  }

  get TiempoPrep(): number {
    return this._tiempoPrep;
  }

  get Tipo(): string {
    return this._tipo;
  }

  /**
   * funcion que devuelve la descripcion del plato
   * @returns el nombre del plato y su pais de origen
   */
  desc(): string {
    return `${this._nombre} de ${this._paisOrigen}`;
  }

  /**
   * funcion que permite acceder al tiempo de preparacion
   * @returns el tiempo de preparacion
   */
  time(): number {
    return this._tiempoPrep;
  }
}
