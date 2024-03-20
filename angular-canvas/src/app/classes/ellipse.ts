import { Figure } from "./abstract/Figure";

export class Ellipse extends Figure {
  radiusX: number;
  radiusY: number;

  constructor(x: number, y: number, radiusX: number, radiusY: number, backgroundColor: string, borderColor: string) {
    super(x, y, backgroundColor, borderColor);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = this.borderColor;
    ctx.fillStyle = this.backgroundColor;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
