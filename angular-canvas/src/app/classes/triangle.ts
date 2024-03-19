import { Figure } from "./abstract/Figure";

export class Triangle extends Figure {
    endX: number;
    endY: number;
  
    constructor(x: number, y: number, endX: number, endY: number) {
      super(x, y);
      this.endX = endX;
      this.endY = endY;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.strokeStyle = "green";
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.endX, this.endY);
      ctx.lineTo(this.x + (this.endX - this.x) / 2, this.y - (this.endY - this.y));
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.closePath();
    }
  }
