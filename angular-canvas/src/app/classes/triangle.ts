import { Figure } from "./abstract/Figure";

export class Triangle extends Figure {
    endX: number;
    endY: number;
  
    constructor(x: number, y: number, endX: number, endY: number, backgroundColor: string, borderColor: string) {
      super(x, y, backgroundColor, borderColor);
      this.endX = endX;
      this.endY = endY;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.fillStyle = this.backgroundColor;
      ctx.strokeStyle = this.borderColor;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.endX, this.endY);
      ctx.lineTo(this.x + (this.endX - this.x) / 2, this.y - (this.endY - this.y));
      ctx.lineTo(this.x, this.y);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }
