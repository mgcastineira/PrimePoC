import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, Subject, of } from 'rxjs';
import { UserDataOperations } from '../models/user-data-operations';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _jsonURL = 'assets/mock-data.json';
  message: Subject<any> = new Subject();

  constructor(private http: HttpClient) { 
    
  }

  private getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  private getMyData():Observable<any>{
    return this.getJSON();
  }

  public getInitialData(){
    let call_1 = this.getMyData();
    return forkJoin([call_1
    ]).subscribe(
      results => {
        let userData = results[0];
        this.message.next({
          ok: true,
          operation: UserDataOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            userData:userData
          },
          error: null,
          record: null
        });
      },
      error => {
        this.message.next({
          ok: false,
          operation: UserDataOperations.GetInitialData,
          method: "getInitialData",
          payload: null,
          error: error,
          record: null
        });
      }
    );
  }
}
