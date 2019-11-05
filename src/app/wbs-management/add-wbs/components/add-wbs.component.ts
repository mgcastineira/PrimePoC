import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-add-wbs',
  templateUrl: './add-wbs.component.html',
  styleUrls: ['./add-wbs.component.scss']
})
export class AddWbsComponent implements OnInit {

  newForm: FormGroup;
  sortedPeopleList: any[] = [];
  sortedProjectsList: any[] = [];

  autocompletePeopleList: string[] = [];
  autocompleteProjectList: string[] = [];

  constructor(
    private fBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.sortedPeopleList = this.config.data.sortedPeopleList;
    this.sortedProjectsList = this.config.data.allProjectsList;
    this.initilizeControls();
  }

  closeAddWBS(returnValue: any) {
    this.ref.close(returnValue);
  }

  private initilizeControls() {
    this.newForm = this.fBuilder.group({
      peopleId: new FormControl({ value: null, disabled: false }, Validators.required),
      enterpriseId: new FormControl({ value: null, disabled: false }, Validators.required),
      projectId: new FormControl({ value: null, disabled: false }, Validators.required),
      projectName: new FormControl({ value: null, disabled: false }, Validators.required),
      wbs: new FormControl({ value: null, disabled: false }, Validators.required),
      wbsComment: new FormControl({ value: null, disabled: false }),
      workLocation: new FormControl({ value: null, disabled: false })
    });
  }

  /* #region  autocomplete enterpriseId */
  // autocomplete
  filterPeopleSingle(event: any) {
    let query = event.query;
    this.autocompletePeopleList = this.filterPeopleAutocomplete(query, this.sortedPeopleList);
  }

  filterPeopleAutocomplete(query, peopleList: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < peopleList.length; i++) {
      let people = peopleList[i];
      if (people.EnterpriseId.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push({
          ID: people.ID,
          EnterpriseId: people.EnterpriseId
        });
      }
    }
    return filtered;
  }

  selectPeople(event: any) {
    this.newForm.controls["peopleId"].setValue(event.ID);
  }
  /* #endregion */
  /* #region  autocomplete project name */
  // autocomplete
  filterProjectSingle(event: any) {
    let query = event.query;
    this.autocompleteProjectList = this.filterProjectAutocomplete(query, this.sortedProjectsList);
  }

  filterProjectAutocomplete(query, projectList: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < projectList.length; i++) {
      let project = projectList[i];
      if (project.ProjectName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push({
          ID: project.ID,
          ProjectName: project.ProjectName
        });
      }
    }
    return filtered;
  }

  selectProject(event: any) {
    this.newForm.controls["projectId"].setValue(event.ID);
  }
  /* #endregion */
}
