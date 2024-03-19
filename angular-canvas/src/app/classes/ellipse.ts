import { Figure } from "./abstract/Figure";

export class Ellipse extends Figure {
  radiusX: number;
  radiusY: number;

  constructor(x: number, y: number, radiusX: number, radiusY: number) {
    super(x, y);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  }
}
