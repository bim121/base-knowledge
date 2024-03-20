import { Figure } from "./abstract/Figure";

export class Line extends Figure {
    endX: number;
    endY: number;
  
    constructor(x: number, y: number, endX: number, endY: number, backgroundColor: string, borderColor: string) {
      super(x, y, backgroundColor, borderColor);
      this.endX = endX;
      this.endY = endY;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.backgroundColor;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
        ctx.closePath();
    }
  }
