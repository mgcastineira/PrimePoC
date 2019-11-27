import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http"; 

import { PrimengModule } from '@prime/primeng.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from '@um/components/user-management.component';
import { RollonComponent } from '@rollon/components/rollon.component';
import { FileUploaderComponent } from '@rollon/controls/file-uploader/file-uploader.component';
import { RolloffComponent } from '@rolloff/components/rolloff.component';
import { WbsManagementComponent } from '@wbsmanagement/components/wbs-management.component';
import { AddWbsComponent } from '@wbsmanagement/features/add-wbs/components/add-wbs.component';
import { WbsCommentComponent } from '@wbsmanagement/features/wbs-comment/components/wbs-comment.component';
import { ImportComponent } from '@wbsmanagement/features/import/components/import.component';
import { RulesComponent } from '@wbsmanagement/features/rules/components/rules.component';
import { NewsComponent } from '@news/components/news.component';
import { MydataComponent } from './mydata/mydata.component';
import { FileUploadComponent } from './file-upload/controls/file-upload.component';
import { UploadComponent } from './file-upload/components/upload.component';
import { ngfModule } from 'angular-file';
import { MyteamComponent } from './myteam/components/myteam.component';
import { TeamEnvironmentComponent } from './myteam/features/team-environment/component/team-environment/team-environment.component';


@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    RollonComponent,
    FileUploaderComponent,
    RolloffComponent,
    WbsManagementComponent,
    AddWbsComponent,
    WbsCommentComponent,
    ImportComponent,
    RulesComponent,
    NewsComponent,
    MydataComponent,
    FileUploadComponent,
    UploadComponent,
    MyteamComponent,
    TeamEnvironmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule,
    ngfModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    
  ],
  entryComponents: [
    AddWbsComponent,
    ImportComponent,
    RulesComponent
  ]
})
export class AppModule { }
