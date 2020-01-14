import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input() projectData: any;
  @Input() tabId: number;

  constructor() { }

  ngOnInit() {
  }

}
