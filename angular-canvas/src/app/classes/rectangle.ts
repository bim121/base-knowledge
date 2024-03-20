import { Figure } from "./abstract/Figure";

export class Rectangle extends Figure {
    size: number;
  
    constructor(x: number, y: number, size: number, backgroundColor: string, borderColor: string) {
      super(x, y, backgroundColor, borderColor);
      this.size = size;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.strokeStyle = this.borderColor;
      ctx.fillStyle = this.backgroundColor;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.strokeRect(this.x, this.y, this.size, this.size)
    }
}
