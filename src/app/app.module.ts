import {BrowserModule, Title} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {PactComponent} from "./pact/pact.component";
import {Routes, RouterModule} from "@angular/router";

import {PactService} from "../assets/shared/pact.service";
import { SpinnerComponentModule } from 'ng2-component-spinner';
import {SearchPipe} from "../assets/pipes/search.pipe";
import {LoginComponent} from "./login/login.component";
import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import {PdfmakeModule, PdfmakeService} from "ng-pdf-make";
import {UniquePipe} from "../assets/pipes/unique.pipe";
import { CreateBugComponent } from './create-bug/create-bug.component';
import {IntegrateJIRAComponent} from "./integration-jira/integration.component";
import {LayoutComponent} from "./layout/layout.component";
import { SliceStringPipe} from "../assets/pipes/slice.pipe";
import {TooltipModule} from "ngx-bootstrap";



const appRoutes: Routes = [

  {path: '' , component : HomeComponent },

  {
    path: 'pact', component: PactComponent
  },
  {
    path:'layout',
    component:LayoutComponent,
    children:[
    {
      path: 'pact', component: PactComponent
    },
    {
        path: 'bug' ,component: CreateBugComponent
    },
      {
        path: 'settings' ,component: IntegrateJIRAComponent
      },
      {
        path: '' ,component: PactComponent
      },

    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PactComponent,
    SearchPipe,
    LoginComponent,
    UniquePipe,
    SliceStringPipe,
    CreateBugComponent,
    IntegrateJIRAComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    SpinnerComponentModule,
    Ng2Bs3ModalModule,
    PdfmakeModule,
    TooltipModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [PactService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
