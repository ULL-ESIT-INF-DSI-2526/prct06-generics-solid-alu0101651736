export interface IEntity<K> {
  id: K;
}

export interface IPrintable<T> {
  toTable(data: T[]): void;
}

export interface ISearcheable<T> {
  buscar(criteria: string): T[];
}

export interface ISearcheableTags<T> {
  buscarTag(criteria: string): T[];
}

export interface ISearcheableYear<T> {
  buscarYear(min: number, max: number): T[];
}

export interface ISearcheableFollower<T> {
  buscarFollower(criteria: number): T[];
}

export interface IRepository<T, K> {
  add(item: T): void;
  remove(id: K): void;
  getById(id: K): T | undefined;
  getAll(): T[];
}

export class InMemoryRepository<T extends IEntity<K>, K> implements IRepository<
  T,
  K
> {
  private items: Map<K, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  remove(id: K): void {
    this.items.delete(id);
  }

  getById(id: K): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }
}

export class Paso implements IEntity<string> {
  constructor(
    public id: string,
    public descripcion: string,
    public duracion: number,
    public etiquetas: string[],
    public opcional: boolean,
    public vecesCompletado: number = 0,
  ) {
    if (duracion <= 0) {
      throw new Error(`Duracion invalida`);
    }
    if (vecesCompletado < 0) {
      throw new Error(`Veces completado invalido`);
    }
  }

  completarPaso() {
    this.vecesCompletado++;
  }
}

export class Receta implements IEntity<string> {
  pasos: Paso[] = [];

  constructor(
    public id: string,
    public nombre: string,
    public añoPublicacion: number,
  ) {
    if (añoPublicacion <= 0) {
      throw new Error(`Año invalido`);
    }
  }

  agregarPaso(paso: Paso): void {
    this.pasos.push(paso);
  }

  getNumeroPasos(): number {
    return this.pasos.length;
  }
}

export class Recetario {
  constructor(public recetas: Receta[] = []) {}
  agregarReceta(receta: Receta): void {
    this.recetas.push(receta);
  }
}

export class Chef implements IEntity<string> {
  constructor(
    public id: string,
    public nombre: string,
    public seguidores: number,
    public recetario: Recetario = new Recetario(),
  ) {
    if (seguidores < 0) {
      throw new Error(`Numero de seguidores invalidos`);
    }
  }
}

export class sistemaChef
  implements ISearcheable<Chef>, ISearcheableFollower<Chef>
{
  constructor(private repo: InMemoryRepository<Chef, string>) {}

  agregarChef(chef: Chef): void {
    this.repo.add(chef);
  }

  buscar(criteria: string): Chef[] {
    return this.repo
      .getAll()
      .filter((c) => c.nombre.toLowerCase().includes(criteria.toLowerCase()));
  }

  buscarFollower(criteria: number): Chef[] {
    return this.repo.getAll().filter((c) => c.seguidores >= criteria);
  }

  mostrarChefs(): Chef[] {
    console.table(this.repo.getAll());
    return this.repo.getAll();
  }
}

export class sistemaPasos
  implements ISearcheable<Paso>, ISearcheableTags<Paso>
{
  constructor(private steps: InMemoryRepository<Paso, string>) {}

  buscar(criteria: string): Paso[] {
    return this.steps
      .getAll()
      .filter((c) =>
        c.descripcion.toLowerCase().includes(criteria.toLowerCase()),
      );
  }

  buscarTag(criteria: string): Paso[] {
    return this.steps
      .getAll()
      .filter((tag) =>
        tag.etiquetas.some((t) =>
          t.toLowerCase().includes(criteria.toLowerCase()),
        ),
      );
  }
}

export class sistemaReceta
  implements ISearcheable<Receta>, ISearcheableYear<Receta>
{
  constructor(private repo: InMemoryRepository<Receta, string>) {}

  buscar(criteria: string): Receta[] {
    return this.repo
      .getAll()
      .filter((r) => r.nombre.toLowerCase().includes(criteria.toLowerCase()));
  }

  buscarYear(min: number, max: number): Receta[] {
    return this.repo
      .getAll()
      .filter((c) => c.añoPublicacion >= min && c.añoPublicacion <= max);
  }
}

export class estimadorTiempo {
  contarPasos(receta: Receta): number {
    return receta.pasos.length;
  }

  estimarTiempo(receta: Receta): number | { min: number; max: number } {
    let min = 0;
    let max = 0;

    for (const step of receta.pasos) {
      if (step.opcional) {
        max += step.duracion;
      } else {
        max += step.duracion;
        min += step.duracion;
      }
    }
    return min === max ? min : { min, max };
  }
}

export class renderizador<T> implements IPrintable<T> {
  toTable(data: T[]): T[] {
    console.table(data);
    return data;
  }
}
