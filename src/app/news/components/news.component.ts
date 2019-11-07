import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';


import { NewsService } from '@news/services/news.service';
import { Subscription, interval } from 'rxjs';
import { NewsOperations } from '../models/news-operations.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements OnInit {
  protected serviceSubscription: Subscription;

  allNewsList: any[] = [];

  selectedTab: number = 0;

  secondsCounter = interval(8000);

  constructor(private newsService: NewsService, ) {
    this.secondsCounter.subscribe(n =>
      this.showNextItem());
    this.serviceSubscription = this.newsService.message.subscribe(
      serviceResponse => {
        switch (serviceResponse.operation) {
          case NewsOperations.GetInitialData:
            if (serviceResponse.ok) {
              this.allNewsList = serviceResponse.payload.allNews;
              
            }
            break;
        }
      }
    );
  }

  ngOnInit() {
    this.newsService.getInitialData();
  }

  ngOnDestroy() {
    if (this.serviceSubscription != undefined)
      this.serviceSubscription.unsubscribe();
  }

  nextItem() {
    if (this.selectedTab + 1 < this.allNewsList.length)
      this.selectedTab = this.selectedTab + 1;
  }
  previousItem() {
    if (this.selectedTab - 1 >= 0)
      this.selectedTab = this.selectedTab - 1;
  }

  showNextItem() {
    if (this.allNewsList != undefined) {
      if (this.selectedTab + 1 < this.allNewsList.length)
        this.selectedTab = this.selectedTab + 1;
      else
        this.selectedTab = 0;
    }

  }


  

  
  
}
