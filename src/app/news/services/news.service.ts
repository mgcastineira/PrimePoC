import { Injectable } from '@angular/core';
import { Observable, forkJoin, Subject, of } from 'rxjs';

import { newsListData } from '../models/news-mock-data';
import { NewsOperations } from '../models/news-operations.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  message: Subject<any> = new Subject();

  constructor() { }

  private getAllNews(): Observable<any> {
    return new Observable(observer => {
      observer.next(newsListData);
      observer.complete();
    });
  }

  public getInitialData() {
    console.log("loadInitialCredentialsNew");
    let call_1 = this.getAllNews();
    return forkJoin([call_1
    ]).subscribe(
      results => {        
        this.message.next({
          ok: true,
          operation: NewsOperations.GetInitialData,
          method: "getInitialData",
          payload: {
            response: results,
            allNews: results[0]
          },
          error: null,
          record: null
        });
      }
    );
  }
}
