import { Figure } from "./abstract/Figure";

export class TextFigure extends Figure {
    text: string;
    fontSize: number;
  
    constructor(x: number, y: number, text: string, fontSize: number, backgroundColor: string, borderColor: string) {
      super(x, y, backgroundColor, borderColor);
      this.text = text;
      this.fontSize = fontSize;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.fillStyle = this.backgroundColor;
      ctx.strokeStyle = this.borderColor;
      ctx.font = this.fontSize + "px serif";
      ctx.fillText(this.text, this.x, this.y);
      
    }
  }
