import { describe, test, expect } from "vitest";

import { Salty } from "../src/Salty";

describe("Salty class error test", () => {
  test("Salty name error test", () => {
    expect(() => new Salty("", "Spain", 0, "principal")).toThrow(
      `Nombre, pais y tipo no puede ser vacios`,
    );
  });
  test("Salty country of origin error test", () => {
    expect(() => new Salty("Tortilla", "", 0, "principal")).toThrow(
      `Nombre, pais y tipo no puede ser vacios`,
    );
  });
  test("Salty prep time error test", () => {
    expect(() => new Salty("Tortilla", "Spain", -1, "principal")).toThrow(
      `Tiempo de preparado no puede ser negativo`,
    );
  });
  test("Salty type error test", () => {
    expect(() => new Salty("Tortilla", "Spain", 0, "")).toThrow(
      `Nombre, pais y tipo no puede ser vacios`,
    );
  });
});

describe("Salty class test", () => {
  const salty = new Salty("Tortilla", "Spain", 40, "principal");
  test("nombre getter", () => {
    expect(salty.Nombre).toBe("Tortilla");
  });
  test("paisOrigen getter", () => {
    expect(salty.PaisOrigen).toBe("Spain");
  });
  test("tiempoPrep getter", () => {
    expect(salty.TiempoPrep).toBe(40);
  });
  test("tipo getter", () => {
    expect(salty.Tipo).toBe("principal");
  });
  test("desc test", () => {
    expect(salty.desc()).toBe("Tortilla de Spain");
  });
  test("time test", () => {
    expect(salty.time()).toBe(40);
  });
});
