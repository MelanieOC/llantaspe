import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportMonthComponent } from './report-month.component';

const routes: Routes = [
  {
    path: '',
    component: ReportMonthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportMonthRoutingModule { }
