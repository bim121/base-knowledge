import { Injectable } from '@angular/core';
import { Figure } from '../../classes/abstract/Figure';
import { Rectangle } from '../../classes/rectangle';
import { Triangle } from '../../classes/triangle';
import { Ellipse } from '../../classes/ellipse';
import { ImageFigure } from '../../classes/image';
import { TextFigure } from '../../classes/text';
import { Line } from '../../classes/line';

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

  public addTriangle(x: number, y: number, endX: number, endY: number): void {
    const newFigure = new Triangle(x, y, endX, endY);
    this.figures.push(newFigure);
  }

  public addEllipse(x: number, y:number, radiusX: number, radiusY: number){
    const newFigure = new Ellipse(x, y, radiusX, radiusY);
    this.figures.push(newFigure);
  }

  public addImage(x: number, y: number, size: number, image: HTMLImageElement){
    const newFigure = new ImageFigure(x, y, size, image);
    this.figures.push(newFigure);
  }

  public addText(x: number, y: number, text: string, fontSize: number){
    const newFigure = new TextFigure(x, y, text, fontSize);
    this.figures.push(newFigure);
  }

  public addLine(x: number, y: number, endX: number, endY: number){
    const newFigure = new Line(x, y, endX, endY);
    this.figures.push(newFigure);
  }

  public drawRectangle(startX: number, startY: number, size: number, ctx: CanvasRenderingContext2D): void{
    const newRectangle = new Rectangle(startX, startY, size);
    newRectangle.draw(ctx);
  }

  public drawTriangle(x: number, y: number, endX: number, endY: number, ctx: CanvasRenderingContext2D): void {
    const newTriangle = new Triangle(x, y, endX, endY);
    newTriangle.draw(ctx);
  }

  public drawEllipse(x: number, y:number, radiusX: number, radiusY: number, ctx: CanvasRenderingContext2D){
    const newEllipse = new Ellipse(x, y, radiusX, radiusY);
    newEllipse.draw(ctx);
  }

  public drawImage(x: number, y: number, size: number, image: HTMLImageElement, ctx: CanvasRenderingContext2D){
    const newImageFigure = new ImageFigure(x, y, size, image);
    newImageFigure.draw(ctx);
  }

  public drawText(x: number, y: number, text: string, fontSize: number, ctx: CanvasRenderingContext2D){
    const newTextFigure = new TextFigure(x, y, text, fontSize);
    newTextFigure.draw(ctx);
  }

  public drawLine(x: number, y: number, endX: number, endY: number, ctx: CanvasRenderingContext2D){
    const newLine = new Line(x, y, endX, endY);
    newLine.draw(ctx);
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
