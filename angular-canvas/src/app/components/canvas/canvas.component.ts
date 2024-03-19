import { Component, ElementRef, ViewChild } from '@angular/core';
import { SelectionService } from '../../shared/services/selection.service';
import { Figure } from '../../classes/abstract/Figure';
import { Rectangle } from '../../classes/rectangle';

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
  public figures: Figure[] = [];
  public isResizing = false;
  public startX = 0;
  public startY = 0;

  constructor(private _selectionService: SelectionService) { }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
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

  private clearAndDraw(canvas: HTMLCanvasElement){
   this.clearCanvas(canvas);
   this.drawAllFigures(canvas);
  }

  private handleMouseMove(event: MouseEvent): void {
    if(this.isResizing && this.selectedFigure !== null){
        const rect = this.canvas.getBoundingClientRect();
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;

        if (this.selectedFigure === "rectangle") {
            const squareSize = Math.abs(currentX - this.startX);
            this.clearAndDraw(this.canvas);
            const rectangle = new Rectangle(this.startX, this.startY, squareSize);
            rectangle.draw(this.ctx);
        }
    }
  }

  private handleMouseUp(event: MouseEvent) {
    if(this.isResizing && HTMLSelectElement !== null){
        this.isResizing = false;
        const rect = this.canvas.getBoundingClientRect();
        const endX = event.clientX - rect.left;
        const endY = event.clientY - rect.top;
        let newFigure: Figure;

        if (this.selectedFigure=== "rectangle") {
            const squareSize = Math.abs(endX - this.startX); 
            newFigure = new Rectangle(this.startX, this.startY, squareSize);
            this.figures.push(newFigure);
        }

        this.clearAndDraw(this.canvas);
    }
  }

  private drawAllFigures(canvas: HTMLCanvasElement) {
    this.figures.forEach(figure => {
            figure.draw(this.ctx);
    })
  }

  private clearCanvas(canvas: HTMLCanvasElement) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
