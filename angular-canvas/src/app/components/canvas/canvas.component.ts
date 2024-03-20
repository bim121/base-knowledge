import { Component, ElementRef, ViewChild } from '@angular/core';
import { SelectionService } from '../../shared/services/selection.service';
import { Figure } from '../../classes/abstract/Figure';
import { Rectangle } from '../../classes/rectangle';
import { FigureService } from '../../shared/services/figure.service';
import { CoordinateService } from '../../shared/services/coordinate.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {
  public selectedFigure: string | null = null;
  @ViewChild('canvas') public canvasRef!: ElementRef<HTMLCanvasElement>;
  public canvas!: HTMLCanvasElement;
  public ctx!: CanvasRenderingContext2D;
  private image: HTMLImageElement = new Image();
  public isResizing = false;
  public startX = 0;
  public startY = 0;

  constructor(
    private _selectionService: SelectionService,
    private _figureService: FigureService,
    private _coordinateService: CoordinateService,
  ) { }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.image.src = "../../../assets/image/home.svg";
    this.image.onload = () => {
        this._figureService.clearAndDraw(this.canvas, this.ctx);
    };
    this.initCanvas();
  }

  ngOnInit(): void {
    this._selectionService.selectedFigure$.subscribe(figure => {
      this.selectedFigure = figure;
      console.log(this.selectedFigure);
    });
  }

  private initCanvas(): void {
    this.canvas.addEventListener('mousedown', (event) => this.handleMouseDown(event));
    this.canvas.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    this.canvas.addEventListener('mouseup', (event) => this.handleMouseUp(event));
  }

  private handleMouseDown(event: MouseEvent): void {
    if(this.selectedFigure !== null){
        const rect = this.canvas.getBoundingClientRect();
        this.startX = event.clientX - rect.left;
        this.startY = event.clientY - rect.top;
        this.isResizing = true;
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    this._coordinateService.updateCoordinates({ x: Math.floor(currentX), y: Math.floor(currentY) });

    if(this.isResizing && this.selectedFigure !== null){
        if (this.selectedFigure === "rectangle") {
          const squareSize = Math.abs(currentX - this.startX);
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawRectangle(this.startX, this.startY, squareSize, this.ctx);
        }
        if (this.selectedFigure === "triangle") {
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawTriangle(this.startX, this.startY, currentX, currentY, this.ctx);
        }
        if (this.selectedFigure === "horizontal") {
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawLine(this.startX, this.startY, currentX, currentY, this.ctx);
        }
        if (this.selectedFigure === "ellipse") {
          const radiusX = Math.abs(currentX - this.startX);
          const radiusY = Math.abs(currentY - this.startY);
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawEllipse(this.startX, this.startY, radiusX, radiusY, this.ctx);
        }
        if(this.selectedFigure === "text") {
          const fontSize = Math.abs(currentX - this.startX); 
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawText(this.startX, this.startY,"text", fontSize, this.ctx);
        }
        if (this.selectedFigure === "image") {
          const imageSize = Math.abs(currentX - this.startX);
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawImage(this.startX, this.startY, imageSize, this.image, this.ctx);
        }
    }
  }

  private handleMouseUp(event: MouseEvent) {
    if(this.isResizing && HTMLSelectElement !== null){
        this.isResizing = false;
        const rect = this.canvas.getBoundingClientRect();
        const endX = event.clientX - rect.left;
        const endY = event.clientY - rect.top;

        if (this.selectedFigure === "rectangle") {
          const squareSize = Math.abs(endX - this.startX); 
          this._figureService.addRectangle(this.startX, this.startY, squareSize);
        }
        if (this.selectedFigure === "triangle") {
          this._figureService.addTriangle(this.startX, this.startY, endX, endY);
        }
        if (this.selectedFigure === "horizontal") {
          this._figureService.addLine(this.startX, this.startY, endX, endY);
        }
        if (this.selectedFigure === "ellipse") {
          const radiusX = Math.abs(endX - this.startX);
          const radiusY = Math.abs(endY - this.startY);
          this._figureService.addEllipse(this.startX, this.startY, radiusX, radiusY);
        }
        if (this.selectedFigure === "text") {
          const fontSize = Math.abs(endX - this.startX);
          this._figureService.addText(this.startX, this.startY, "text", fontSize);
        }
        if (this.selectedFigure === "image") {
          const imageSize = Math.abs(endX - this.startX);
          this._figureService.addImage(this.startX, this.startY, imageSize, this.image);
        }
        this._figureService.clearAndDraw(this.canvas, this.ctx);
    }
  }
}
