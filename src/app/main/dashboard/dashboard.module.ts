import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { MatDialogModule } from '@angular/material/dialog';
import { TableResponsiveModule } from '../table-responsive/table-responsive.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { CountryChartComponent } from './country-chart/country-chart.component';
import { MediaChartComponent } from './media-chart/media-chart.component';
import { WordsChartComponent } from './words-chart/words-chart.component';
import { ModalBarComponent } from './modal-bar/modal-bar.component';

import { NgxEchartsModule } from 'ngx-echarts';

import * as echarts from 'echarts';


@NgModule({
  declarations: [
    DashboardComponent,
    PieChartComponent,
    BarChartComponent,
    CountryChartComponent,
    MediaChartComponent,
    WordsChartComponent,
    ModalBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
    NgxChartsModule,
    ChartsModule,
    TagCloudModule,
    TableResponsiveModule,
    MatDialogModule,
    NgxEchartsModule.forRoot({ echarts }),
    MatProgressSpinnerModule
  ]
})
export class DashboardModule { }
