import { Injectable } from "@angular/core";
import { interval, Observable } from "rxjs";
import { endWith, map, take } from "rxjs/operators";

@Injectable()
export class LoadingService{
    load(): Observable<string | number>{
        return interval(1000).pipe(
            take(5),
            map(tick => (tick + 1) * 20),
            endWith('Congratulations, you made it!')
        );
    }
}
