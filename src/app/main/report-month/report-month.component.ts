import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { DatabaseService } from 'src/app/services/database.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-report-month',
  templateUrl: './report-month.component.html',
  styleUrls: ['./report-month.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class ReportMonthComponent implements OnInit {
  dateForm = new FormControl(moment())
  loader: boolean = true
  formSubmitAttempt: boolean = false
  data: any = []
  columns = [
    { name: "IP", slug: 'ip' },
    { name: "País", slug: 'country' },
    { name: 'Visitas', slug: 'view' },
    { name: 'Porcentaje', slug: 'percent' }
  ]

  chartOption

  dataGraph = []

  constructor(
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.onSubmit()
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateForm.value;
    ctrlValue.year(normalizedYear.year());
    this.dateForm.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateForm.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateForm.setValue(ctrlValue);
    datepicker.close();
  }

  initGraph() {
    let list = this.dataGraph.map(el => el.name)
    this.chartOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      calculable: true,
      grid: {
        top: '1%',
        left: '1%',
        right: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: this.dataGraph.map(el => el.name),
        axisLabel: {
          formatter: function (value) {
            return '{' + value + '| }\n{value|' + value + '}';
          },
          rich: this.getFlags(list)
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.dataGraph.map(el => {
          return {
            value: el.value,
            itemStyle: {
              color: '#a90000'
            }
          }
        }),
        type: 'bar'
      }],
      dataZoom: [{
        type: 'inside'
      }, {
        type: 'slider'
      }],
    };
  }

  getFlags(list) {
    let rit = {
      value: {
        lineHeight: 10,
        align: 'center'
      }
    }
    list.forEach(ct => {
      let nm = ct.toLowerCase().trim().replace(' ', '-')
      rit[ct] = {
        height: 20,
        align: 'center',
        backgroundColor: {
          image: `../../../assets/countries/${nm}.png`
        }
      }
    })
    return rit
  }

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    return `${date.getFullYear()}-${month}`
  }

  onSubmit() {
    this.formSubmitAttempt = true
    this.loader = true
    const formData = new FormData();
    formData.append('key', 'llantas.pe');
    formData.append('fecha', this.getDateFormat(this.dateForm.value['_d']));

    this.dbs.getReportByMonth(formData).subscribe(resp => {

      let resultArray = Object.keys(resp['data_grafica']).map(dt => resp['data_grafica'][dt]);
      this.dataGraph = resultArray.map(wd => {
        return {
          name: wd.pais,
          value: Number(wd.total)
        }
      })
      let resultArray2 = Object.keys(resp['data_tabla']).map(dt => resp['data_tabla'][dt]);
      let total = resultArray2.reduce((a, b) => a + Number(b.total), 0)
      this.data = resultArray2.map(wd => {
        return {
          ip: wd.ip,
          country: wd.pais,
          view: Number(wd.total),
          percent: this.calculatePercent(Number(wd.total), total)
        }
      })
      this.loader = false
      this.formSubmitAttempt = false
      this.initGraph()
    }, error => {
      console.log(error)
      this.loader = false
      this.formSubmitAttempt = false
    })
  }

  calculatePercent(number, total) {
    return ((number / total) * 100).toFixed(3);
  }
}
