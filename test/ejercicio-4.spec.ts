import {describe, test, expect} from "vitest"

import {BasicPrinter, sendFax, BasicFax} from "../src/ejercicio-4"

describe("printMachine test", () => {
  test("test", () => {
    const machine = new BasicPrinter
    expect(machine.print("Hello, world")).toBe("Printing: Hello, world");
  });
});

describe("sendFax test", () => {
  test("", () => {
    const machine = new BasicFax;
    expect(sendFax(machine, "Hello, world")).toBe("Sending Fax: Hello, world");
  });
});