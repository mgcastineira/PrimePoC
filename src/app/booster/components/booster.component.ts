import {
  Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver,
  ComponentFactory, ComponentRef, ViewChildren, TemplateRef, QueryList, OnDestroy
} from '@angular/core';
import { BoosterService } from '../services/booster.service';
import { Subscription } from 'rxjs';
import { BoosterOperations } from '../models/booster-operations';
import { NewsComponent } from '@root/news/components/news.component';
import { Type } from '@angular/core';


@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styleUrls: ['./booster.component.scss']
})
export class BoosterComponent implements OnInit, OnDestroy {
  @ViewChild("actions", { read: ViewContainerRef }) container;
  @ViewChildren('comp', { read: ViewContainerRef }) public dynComponents: QueryList<ViewContainerRef>;
  protected serviceSubscription: Subscription;
  componentRef: any;
  whiteList: any[] = []
  components: any[] = [{ name: "a1" }, { name: "a2" }];

  days: number=0;
  hours: number;
  minutes: number;
  seconds: number;
  expired:string="";

  constructor(private boosterService: BoosterService,
    private resolver: ComponentFactoryResolver) {
    this.serviceSubscription = this.boosterService.message.subscribe(
      serviceResponse => {
        switch (serviceResponse.operation) {
          case BoosterOperations.GetInitialData:
            if (serviceResponse.ok) { }
            this.whiteList = serviceResponse.payload.boosterData;
            break;
        }
      });
  }

  ngOnInit() {
    this.boosterService.getInitialData();
    this.container.clear();
    this.countdown();
  }

  ngOnDestroy() {
    if(this.componentRef!=undefined)
      this.componentRef.destroy();
  }

  countDownFinished(evento: any) {

  }

  addAction() {
    // const factory = this.resolver.resolveComponentFactory(NewsComponent);
    // this.componentRef = this.container.createComponent(factory);

    const factories = Array.from(this.resolver['_factories'].keys());
    const factoryClass = <Type<any>>factories.find((x: any) => x.name === 'NewsComponent');

    this.dynComponents.forEach(dynComp => {
      const factory2 = this.resolver.resolveComponentFactory(
        factoryClass);
      dynComp.createComponent(factory2);
    });

  }

  countdown() {
    let countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    // Update the count down every 1 second
    let x = setInterval(function () {

      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').innerHTML=this.days;
      document.getElementById('hours').innerHTML = this.hours;
      document.getElementById('minutes').innerHTML = this.minutes;
      document.getElementById('seconds').innerHTML = this.seconds;


      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        this.expired = "EXPIRED";
        document.getElementById('expired').innerHTML = this.expired;

      }
    }, 1000);
  }

}
