import { Component, ElementRef, ViewChild } from '@angular/core';
import { SelectionService } from '../../shared/services/selection.service';
import { Figure } from '../../classes/abstract/Figure';
import { Rectangle } from '../../classes/rectangle';
import { FigureService } from '../../shared/services/figure.service';
import { CoordinateService } from '../../shared/services/coordinate.service';
import { Options } from '../../shared/interface/option.interface';
import { Subscription } from 'rxjs';

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
  public options: Options = {
    width: 100,
    height: 100,
    backgroundColor: "black",
    borderColor: "black",
    src: "",
    text: "text",
    textColor: "black",
    rotation: 0,
  };
  private isDragging: boolean = false;

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
    });
    this._figureService.options$.subscribe(options => {
      this.options = options;
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
        this.isDragging = false;
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
          this._figureService.drawText(this.startX, this.startY, this.options.text, fontSize, this.ctx);
        }
        if (this.selectedFigure === "image") {
          const imageSize = Math.abs(currentX - this.startX);
          this._figureService.clearAndDraw(this.canvas, this.ctx);
          this._figureService.drawImage(this.startX, this.startY, imageSize, this.image, this.ctx);
        }
    }
  }

  private handleMouseUp(event: MouseEvent) {
    if(this.isResizing && this.selectedFigure){
        this.isResizing = false;
        const rect = this.canvas.getBoundingClientRect();
        const endX = event.clientX - rect.left;
        const endY = event.clientY - rect.top;

        if (endX !== this.startX || endY !== this.startY) {
          this.isDragging = true;
        }

        if (this.selectedFigure === "rectangle") {
          const squareSize = this.isDragging ? Math.abs(endX - this.startX) : this.options.width;
          this._figureService.addRectangle(this.startX, this.startY, squareSize);
        }
        if (this.selectedFigure === "triangle") {
          const width = this.isDragging ? endX : this.options.width;
          const height = this.isDragging ? endY : this.options.height;
          this._figureService.addTriangle(this.startX, this.startY, width, height);
        }
        if (this.selectedFigure === "horizontal") {
          this._figureService.addLine(this.startX, this.startY, endX, endY);
        }
        if (this.selectedFigure === "ellipse") {
          const radiusX = this.isDragging ? Math.abs(endX - this.startX) : Math.abs(this.options.width);
          const radiusY = this.isDragging ? Math.abs(endY - this.startY) : Math.abs(this.options.height);
          this._figureService.addEllipse(this.startX, this.startY, radiusX, radiusY);
        }
        if (this.selectedFigure === "text") {
          const fontSize = Math.abs(endX - this.startX);
          this._figureService.addText(this.startX, this.startY, this.options.text, fontSize);
        }
        if (this.selectedFigure === "image") {
          const imageSize = Math.abs(endX - this.startX);
          this._figureService.addImage(this.startX, this.startY, imageSize, this.image);
        }
        this._figureService.clearAndDraw(this.canvas, this.ctx);
    }
  }
}
