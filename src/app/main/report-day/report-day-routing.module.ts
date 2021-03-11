import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportDayComponent } from './report-day.component';

const routes: Routes = [
  {
    path: '',
    component: ReportDayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportDayRoutingModule { }
