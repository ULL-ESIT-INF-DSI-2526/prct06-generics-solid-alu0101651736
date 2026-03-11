import { describe, test, expect } from "vitest";

import {
  sistemaChef,
  InMemoryRepository,
  Chef,
  Receta,
  sistemaReceta,
  sistemaPasos,
  Paso,
  estimadorTiempo,
  renderizador,
  Recetario,
} from "../src/ejercicio-2";

describe("", () => {
  const chefRepo = new InMemoryRepository<Chef, string>();
  const chef1 = new Chef("1", "A", 2000);
  const chef2 = new Chef("2", "B", 3000);
  chefRepo.add(chef1);
  const chefSearch = new sistemaChef(chefRepo);
  chefSearch.agregarChef(chef2);
  test("", () => {
    expect(chefSearch.buscar("A")).toStrictEqual([chef1]);
  });

  test("", () => {
    expect(chefSearch.buscarFollower(2000)).toStrictEqual([chef1, chef2]);
  });
  test("", () => {
    expect(chefSearch.mostrarChefs()).toStrictEqual([chef1, chef2]);
  });
});

describe("", () => {
  const stepRepo = new InMemoryRepository<Paso, string>();
  const step = new Paso("1", "A", 20, ["cortar"], false);
  const step2 = new Paso("2", "B", 30, ["sazonar"], false);
  const step3 = new Paso("3", "C", 10, ["sazonar"], true);
  const step4 = new Paso("4", "D", 120, ["hervir"], false);
  stepRepo.add(step);
  stepRepo.add(step2);
  stepRepo.add(step3);
  stepRepo.add(step4);
  const stepSearch = new sistemaPasos(stepRepo);

  test("", () => {
    stepRepo.getById("1")?.completarPaso();
    expect(stepRepo.getById("1")?.vecesCompletado).toBe(1);
  });
  const receta = new Receta("1A", "AB", 1999);
  const receta2 = new Receta("1A", "AB", 1999);
  receta.agregarPaso(step);
  receta2.agregarPaso(step);
  receta.agregarPaso(step2);
  receta2.agregarPaso(step2);
  receta.agregarPaso(step3);
  receta.agregarPaso(step4);
  receta2.agregarPaso(step4);
  const recetaRepo = new InMemoryRepository<Receta, string>();
  const recetaRepo2 = new InMemoryRepository<Receta, string>();
  recetaRepo.add(receta);
  recetaRepo2.add(receta2);
  const recetaSearch = new sistemaReceta(recetaRepo);
  const estimador = new estimadorTiempo();
  const render = new renderizador<Receta>();
  const recetario = new Recetario();
  test("", () => {
    expect(stepSearch.buscar("C")).toStrictEqual([step3]);
  });
  test("", () => {
    expect(stepSearch.buscarTag("sazonar")).toStrictEqual([step2, step3]);
  });

  test("", () => {
    expect(recetaSearch.buscar("AB")).toStrictEqual([receta]);
  });
  test("", () => {
    expect(recetaSearch.buscarYear(1993, 2002)).toStrictEqual([receta]);
  });
  test("", () => {
    expect(recetaRepo.getById("1A")).toStrictEqual(receta);
  });

  test("", () => {
    let result: number | undefined = estimador.contarPasos(receta);
    expect(result).toBe(4);
  });

  test("", () => {
    expect(estimador.estimarTiempo(receta)).toStrictEqual({
      min: 170,
      max: 180,
    });
  });

  test("", () => {
    expect(estimador.estimarTiempo(receta2)).toBe(170);
  });

  recetaRepo.remove("3");
  test("", () => {
    let result: number | undefined = estimador.contarPasos(receta);
    expect(result).toBe(4);
  });

  test("Duracion invalida", () => {
    expect(() => new Paso("5", "conseguir olla", -2, [""], false)).toThrow(
      `Duracion invalida`,
    );
  });

  test("Duracion invalida", () => {
    expect(() => new Paso("5", "conseguir olla", 5, [""], false, -1)).toThrow(
      `Veces completado invalido`,
    );
  });

  test("año publicado invalido", () => {
    expect(() => new Receta("1B", "huevo frito", -1)).toThrow(`Año invalido`);
  });

  test("año publicado invalido", () => {
    expect(() => new Chef("1B", "huevo frito", -1)).toThrow(
      `Numero de seguidores invalidos`,
    );
  });

  test("", () => {
    expect(recetaRepo.getById("1A")?.getNumeroPasos()).toBe(4);
  });

  test("", () => {
    let result = recetaRepo.getById("1A");
    if (result !== undefined) {
      recetario.agregarReceta(receta);
      expect(recetario.recetas.length).toBe(1);
    }
  });

  test("", () => {
    expect(render.toTable(recetaRepo2.getAll())).toStrictEqual([receta2]);
  });
});
