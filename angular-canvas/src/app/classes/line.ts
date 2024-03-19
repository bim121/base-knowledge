import { Figure } from "./abstract/Figure";

export class Line extends Figure {
    endX: number;
    endY: number;
  
    constructor(x: number, y: number, endX: number, endY: number) {
      super(x, y);
      this.endX = endX;
      this.endY = endY;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
        ctx.closePath();
    }
  }
