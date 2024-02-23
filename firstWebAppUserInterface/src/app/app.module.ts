import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponComponent } from './main-compon/main-compon.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ProjComponent } from './proj/proj.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CurrentProjectOneComponent } from './current-project-one/current-project-one.component';
import { CopyWebComponent } from './copy-web/copy-web.component';
import {MatIconModule} from '@angular/material/icon';
import { LeahComponent } from './leah/leah.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponComponent,
    ProjComponent,
    TimeLineComponent,
    ExperienceComponent,
    ContactComponent,
    CurrentProjectOneComponent,
    CopyWebComponent,
    LeahComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, 
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
