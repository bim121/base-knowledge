import { Figure } from "./abstract/Figure";

export class ImageFigure extends Figure {
    size: number;
    imageUrl: string;
  
    constructor(x: number, y: number, size: number, imageUrl: string) {
      super(x, y);
      this.size = size;
      this.imageUrl = imageUrl;
    }
  
    draw(ctx: CanvasRenderingContext2D): void {
      const image = new Image();
      image.src = this.imageUrl;
      image.onload = () => {
        ctx.drawImage(image, this.x, this.y, this.size, this.size);
      };
    }
  }
