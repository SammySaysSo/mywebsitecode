import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponComponent } from './main-compon/main-compon.component';
import { ProjComponent } from './proj/proj.component';
import { ExperienceComponent } from './experience/experience.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { ContactComponent } from './contact/contact.component';
import { CurrentProjectOneComponent } from './current-project-one/current-project-one.component';
import { CopyWebComponent } from './copy-web/copy-web.component';
import { LeahComponent } from './leah/leah.component';

const routes: Routes = [
  { path: '', component: MainComponComponent},
  { path: 'proj', component: ProjComponent},
  { path: 'timeLine', component: TimeLineComponent},
  { path: 'exper', component: ExperienceComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'curProjOne', component: CurrentProjectOneComponent},
  { path: 'curProjTwo', component: CopyWebComponent},
  { path: 'leah', component: LeahComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
