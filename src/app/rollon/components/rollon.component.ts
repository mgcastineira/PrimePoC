import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rollon',
  templateUrl: './rollon.component.html',
  styleUrls: ['./rollon.component.scss']
})
export class RollonComponent implements OnInit {
  appliedRole:number = 2;
  currentStep:number = 1;
  downloadedFiles:any[]=[];
  filesRepository:any[]= [
    {
      ServerRelativeUrl:"google.com",
      Description:"Client data security behavior",
      downloaded:true
    },
    {
      ServerRelativeUrl: "google.com",
      Description: "Information security required behavior",
      downloaded: false
    },
    {
      ServerRelativeUrl: "google.com",
      Description: "Trade control laws compliance form",
      downloaded: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  nextStep(){
    this.currentStep++;
  }

  setStep(value:number){
    this.currentStep = value;
  }



}
