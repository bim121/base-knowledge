import { Figure } from "./abstract/Figure";

export class TextFigure extends Figure {
    text: string;
    fontSize: number;
  
    constructor(x: number, y: number, text: string, fontSize: number) {
      super(x, y);
      this.text = text;
      this.fontSize = fontSize;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.font = this.fontSize + "px serif";
      ctx.fillText(this.text, this.x, this.y);
    }
  }
