import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportMonthRoutingModule } from './report-month-routing.module';
import { ReportMonthComponent } from './report-month.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableResponsiveModule } from '../table-responsive/table-responsive.module';
import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';

@NgModule({
  declarations: [ReportMonthComponent],
  imports: [
    CommonModule,
    ReportMonthRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbarModule,
    TableResponsiveModule,
    NgxEchartsModule.forRoot({ echarts })
  ]
})
export class ReportMonthModule { }
