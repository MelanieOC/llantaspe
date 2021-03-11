import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportIpComponent } from './report-ip.component';

const routes: Routes = [
  {
    path: '',
    component: ReportIpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportIpRoutingModule { }
