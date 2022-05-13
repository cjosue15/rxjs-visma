import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class HttpClient {
  get(information: any, time: number) {
    return of(information).pipe(delay(time));
  }
}
