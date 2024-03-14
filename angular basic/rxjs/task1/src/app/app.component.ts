import { Component, Inject } from "@angular/core";
import { Observable, of, Subject, timer } from "rxjs";
import {
  catchError,
  ignoreElements,
  mapTo,
  repeat,
  retry,
  share,
  startWith,
  switchMap,
  switchMapTo
} from "rxjs/operators";
import { COLLAPSE } from "./animation";
import { LoginService } from "./login.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [COLLAPSE]
})
export class AppComponent {
  readonly submit$ = new Subject<void>();

  readonly request$ = this.submit$.pipe(
    switchMapTo(this.service.pipe(startWith("")))
  )

  readonly user$ = this.request$.pipe(retry());

  readonly error$ = this.request$.pipe(
    ignoreElements(),
    catchError(e => of(e)),
    repeat(),
    switchMap(e => timer(5000).pipe(startWith(e)))
  );

  readonly disabled$ = this.request$.pipe(
    mapTo(true),
    catchError(() => of(false)),
    repeat()
  )

  constructor(@Inject(LoginService) private readonly service: Observable<string>){}
}
