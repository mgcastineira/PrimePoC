import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

@Component({
  selector: 'app-team-add-user',
  templateUrl: './team-add-user.component.html',
  styleUrls: ['./team-add-user.component.scss']
})
export class TeamAddUserComponent implements OnInit {

  newForm: FormGroup;
  sortedPeopleList: any[] = [];
  sortedProjectList: any[] = [];

  selectedProject:any;

  constructor(
    private fBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.sortedPeopleList = this.config.data.sortedPeopleList;
    this.sortedProjectList = this.config.data.sortedProjectList;
  }

  closeAddUserToTeam(returnValue: any) {
    this.ref.close(returnValue);
  }

  
}
