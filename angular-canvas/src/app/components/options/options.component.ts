import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectionService } from '../../shared/services/selection.service';
import { FigureService } from '../../shared/services/figure.service';
import { Options } from '../../shared/interface/option.interface';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {
  selectedFigure: string | null = null;

  public backgroundColor: string = '';
  public borderColor: string = '';
  public width: number = 100;
  public height: number = 100;
  public src: string = "";
  public text: string = "text";
  public textColor: string = "black";
  public rotation: number = 0;

  constructor(
    private _selectionService: SelectionService,
    private _figureService: FigureService  
  ) { }

  ngOnInit(): void {
    this._selectionService.selectedFigure$.subscribe(figure => {
      this.selectedFigure = figure;
    });
  }

  onPropertiesChanged() {
    const properties: Options = {
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      width: this.width,
      height: this.height,
      src: this.src,
      text: this.text,
      textColor: this.textColor,
      rotation: this.rotation,
    };
    this._figureService.updateOptions(properties);
  }
}
