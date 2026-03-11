export interface Shape {
  area(): number;
}

export class Circle implements Shape {
  constructor(private radius: number) {}

  area(): number {
    let result = (this.radius * Math.PI * this.radius)
    return result - (result % 1);
  }
}

export class Rectangle implements Shape {
  constructor(
    private height: number,
    private width: number,
  ) {}

  area(): number {
    return this.height * this.width;
  }
}

export class Triangle implements Shape {
  constructor(
    private base: number,
    private height: number,
  ) {}

  area(): number {
    return (this.base * this.height) / 2;
  }
}

export class areaCalculator {
  area(shape: Shape): number {
    return shape.area();
  }
}
