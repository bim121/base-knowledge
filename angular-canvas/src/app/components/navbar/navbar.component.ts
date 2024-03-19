import { Component } from '@angular/core';
import { ElementNavigation } from '../../types/ElementNavigation.type';
import { SelectionService } from '../../shared/services/selection.service';
import { Figure } from '../../classes/abstract/Figure';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public elements: ElementNavigation[] = [
    { name: 'handle', src: '../../assets/image/handle.svg', isSelected: false },
    { name: 'rectangle',src: '../../assets/image/rectangle.svg', isSelected: false },
    { name: 'triangle',src: '../../assets/image/triangle.svg', isSelected: false },
    { name: 'horizontal',src: '../../assets/image/horizontal.svg', isSelected: false },
    { name: 'ellipse',src: '../../assets/image/ellipse.svg', isSelected: false },
    { name: 'text',src: '../../assets/image/text.png', isSelected: false },
    { name: 'image',src: '../../assets/image/home.svg', isSelected: false },
  ];

  constructor(private _selectionService: SelectionService){}

  public selectElement(selectedElement: ElementNavigation) {
    selectedElement.isSelected = !selectedElement.isSelected;
    if(selectedElement.isSelected){
      this.selectFigure(selectedElement.name);
      this.clearSelectedElements(selectedElement.name);
    }else{
      this.selectFigure(null);
    }
  }

  public clearSelectedElements(exceptObj: string) {
    this.elements.forEach(element => {
      if (element.name !== exceptObj) {
        element.isSelected = false;
      }
    });
  }

  public selectFigure(figure: string | null): void {
    this._selectionService.setSelectedFigure(figure);
  }
}
