import { Injectable } from '@angular/core';
import { Figure } from '../../classes/abstract/Figure';
import { Rectangle } from '../../classes/rectangle';

@Injectable({
  providedIn: 'root'
})
export class FigureService {
  public figures: Figure[] = [];

  constructor() { }

  public addRectangle(startX: number, startY: number, size: number): void {
    const newFigure = new Rectangle(startX, startY, size);
    this.figures.push(newFigure);
  }

  public drawRectangle(startX: number, startY: number, size: number, ctx: CanvasRenderingContext2D): void{
    const newRectangle = new Rectangle(startX, startY, size);
    newRectangle.draw(ctx);
  }

  public clearCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  public drawAllFigures(ctx: CanvasRenderingContext2D): void {
    this.figures.forEach(figure => {
      figure.draw(ctx);
    });
  }

  public clearAndDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    this.clearCanvas(ctx, canvas);
    this.drawAllFigures(ctx);
  }
}
