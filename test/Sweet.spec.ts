import { describe, test, expect } from "vitest";

import { Sweet } from "../src/Sweet";

describe("Sweet class error tests", () => {
  test("Sweet name error tests", () => {
    expect(() => new Sweet("", 2, 30, 40, 10)).toThrow(
      `Nombre no puede ser vacio`,
    );
  });
  test("Sweet low dificulty error tests", () => {
    expect(() => new Sweet("Candy apple", -1, 30, 40, 10)).toThrow(
      `Dificultad debe de estar entre 1 y 10`,
    );
  });
  test("Sweet high dificulty error tests", () => {
    expect(() => new Sweet("Creme brule", 11, 30, 40, 10)).toThrow(
      `Dificultad debe de estar entre 1 y 10`,
    );
  });
  test("Sweet prep time error tests", () => {
    expect(() => new Sweet("Cake", 2, -1, 40, 10)).toThrow(
      `Los tiempos no pueden ser negativos`,
    );
  });
  test("Sweet cook time error tests", () => {
    expect(() => new Sweet("Ice cream", 2, 30, -1, 10)).toThrow(
      `Los tiempos no pueden ser negativos`,
    );
  });
  test("Sweet cool time error tests", () => {
    expect(() => new Sweet("Brownies", 2, 30, 40, -1)).toThrow(
      `Los tiempos no pueden ser negativos`,
    );
  });
});

describe("Sweet class tests", () => {
  const sweet = new Sweet("Brownies", 5, 30, 80, 10);
  test("descripcion getter", () => {
    expect(sweet.Descripcion).toBe("Brownies");
  });
  test("dificultad getter", () => {
    expect(sweet.Dificultad).toBe(5);
  });
  test("tiempoPrep getter", () => {
    expect(sweet.TiempoPrep).toBe(30);
  });
  test("tiempoHorno getter", () => {
    expect(sweet.TiempoHorno).toBe(80);
  });
  test("tiempoRefri getter", () => {
    expect(sweet.TiempoRefri).toBe(10);
  });
  test("desc test", () => {
    expect(sweet.desc()).toStrictEqual({
      descripcion: "Brownies",
      dificulty: 5,
    });
  });
  test("time test", () => {
    expect(sweet.time()).toBe(120);
  });
});
