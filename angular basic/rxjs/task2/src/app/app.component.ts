import { Component, Inject } from "@angular/core";
import { Subject } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  share,
  switchMap
} from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent {
  private readonly load$ = new Subject<void>();

  private readonly response$ = this.load$.pipe(
    switchMap(() => this.loadingService.load()),
    share()
  );

  readonly result$ = this.response$.pipe(
    map(response => (typeof response === 'string' ?
    response: null)),
    distinctUntilChanged()
  );

  readonly loadingProgress$ = this.response$.pipe(filter(Number.isFinite));

  constructor(@Inject(LoadingService) private readonly loadingService: LoadingService){}

  onButtonClick() {
    this.load$.next();
  }
}
