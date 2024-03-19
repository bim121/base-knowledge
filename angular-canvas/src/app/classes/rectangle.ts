import { Figure } from "./abstract/Figure";

export class Rectangle extends Figure {
    size: number;
  
    constructor(x: number, y: number, size: number) {
      super(x, y);
      this.size = size;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.strokeStyle = "blue";
      ctx.strokeRect(this.x, this.y, this.size, this.size);
    }
}
