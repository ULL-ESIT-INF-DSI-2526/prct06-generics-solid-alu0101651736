import { describe, expect, test } from "vitest";

import {
  Rectangle,
  Triangle,
  areaCalculator,
  Circle,
} from "../src/ejercicio-3";

describe("areaCalculator test", () => {
  const calculator = new areaCalculator();
  test("square", () => {
    const square = new Rectangle(2, 2);
    expect(calculator.area(square)).toBe(4);
  });

  test("circle", () => {
    const circle = new Circle(5);
    expect(calculator.area(circle)).toBe(78);
  })

  test("triangle", () => {
    const triangle = new Triangle(4, 5);
    expect(calculator.area(triangle)).toBe(10);
  });
});
