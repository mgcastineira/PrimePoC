import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http"; 

import { PrimengModule } from '@prime/primeng.module';

import { ngfModule, ngf } from "angular-file"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from '@um/components/user-management.component';
import { RollonComponent } from '@rollon/components/rollon.component';
import { FileUploaderComponent } from '@rollon/controls/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    RollonComponent,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PrimengModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
