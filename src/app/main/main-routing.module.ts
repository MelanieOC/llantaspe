import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
      },
      {
        path: 'reporteIp',
        loadChildren: () => import('./report-ip/report-ip.module').then(mod => mod.ReportIpModule)
      },
      {
        path: 'reporte_dia',
        loadChildren: () => import('./report-day/report-day.module').then(mod => mod.ReportDayModule)
      },
      {
        path: 'reporte_mes',
        loadChildren: () => import('./report-month/report-month.module').then(mod => mod.ReportMonthModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
