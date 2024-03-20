import { Figure } from "./abstract/Figure";

export class ImageFigure extends Figure {
    size: number;
    image: HTMLImageElement;
  
    constructor(x: number, y: number, size: number, image: HTMLImageElement) {
      super(x, y);
      this.size = size;
      this.image = image;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
  }
