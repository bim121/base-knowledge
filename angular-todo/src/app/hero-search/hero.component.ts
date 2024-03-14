import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
    debounceTime,
    distinctUntilChanged,
    switchMap,
} from 'rxjs/operators';
import { Hero } from '../shared/interface/hero.interface';
import { HeroService } from '../shared/service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService){}

  search(term: string): void{
    this.searchTerms.next(term);
  }

  ngOnInit(): void{
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap((term: string) => 
        this.heroService.searchHeroes(term)
      )
    );
  }
}
