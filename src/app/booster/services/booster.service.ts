import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, Subject, of } from 'rxjs';
import { BoosterOperations } from '../models/booster-operations';

@Injectable({
  providedIn: 'root'
})
export class BoosterService {

  private _boosterDataJASONUrl = 'assets/mock-booster-data.json';

  message: Subject<any> = new Subject();

  constructor(private http: HttpClient) {

  }

  private getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  private getBoosterData(): Observable<any> {
    return this.getJSON(this._boosterDataJASONUrl);
  }

  public getInitialData() {
    let call_1 = this.getBoosterData();
    return forkJoin([call_1]).subscribe(
      results => {
        let boosterData = results[0];
        this.message.next({
          ok: true,
          operation: BoosterOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            boosterData: boosterData
          },
          error: null,
          record: null
        });
      },
      error => {
        this.message.next({
          ok: false,
          operation: BoosterOperations.GetInitialData,
          method: "getInitialData",
          payload: null,
          error: error,
          record: null
        });
      }
    );
  }
}
