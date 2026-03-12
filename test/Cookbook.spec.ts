import { describe, test, expect, beforeEach } from "vitest";

import { CookBook } from "../src/Cookbook";
import { Sweet } from "../src/Sweet";
import { Salty } from "../src/Salty";
import { Elaborable } from "../src/Elaborable";

describe("Cookbook test", () => {
  let cookbook: CookBook<Elaborable<any>>;
  let sweet: Sweet;
  let salty: Salty;

  beforeEach(() => {
    cookbook = new CookBook<Elaborable<any>>();
    sweet = new Sweet("Brownies", 5, 30, 80, 10);
    salty = new Salty("Tortilla", "Spain", 40, "principal");
  });

  test("add new recipe", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    expect(cookbook.size()).toBe(2);
  });

  test("get recipe", () => {
    cookbook.add(sweet);

    expect(cookbook.get(0)).toBe(sweet);
  });

  test("get recipe index error negative", () => {
    cookbook.add(sweet);

    expect(() => cookbook.get(-1)).toThrow(`Indice fuera de rango`);
  });

  test("get recipe index error positive", () => {
    cookbook.add(sweet);

    expect(() => cookbook.get(1)).toThrow(`Indice fuera de rango`);
  });

  test("remove recipe", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    expect(cookbook.get(0)).toBe(sweet);
    expect(cookbook.size()).toBe(2);

    cookbook.remove(0);

    expect(cookbook.size()).toBe(1);
    expect(cookbook.get(0)).toBe(salty);
  });

  test("remove recipe index error negative", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    expect(() => cookbook.remove(-1)).toThrow(`Indice fuera de rango`);
  });

  test("remove recipe index error positive", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    expect(() => cookbook.get(2)).toThrow(`Indice fuera de rango`);
  });

  test("size test", () => {
    expect(cookbook.size()).toBe(0);
    cookbook.add(sweet);
    expect(cookbook.size()).toBe(1);
    cookbook.add(salty);
    expect(cookbook.size()).toBe(2);
  });

  test("filter test", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    const filtered = cookbook.filter((r) => r.time() < 50);

    expect(filtered.size()).toBe(1);
    expect(filtered.get(0)).toBe(salty);
  });

  test("filter test", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    const filtered = cookbook.filter((r) => r.time() < 30);

    expect(filtered.size()).toBe(0);
  });

  test("avgTime empty cookbook test", () => {
    expect(cookbook.avgTime()).toBe(0);
  });

  test("avgTime test", () => {
    cookbook.add(sweet);
    cookbook.add(salty);

    expect(cookbook.avgTime()).toBe(80);
  });
});
