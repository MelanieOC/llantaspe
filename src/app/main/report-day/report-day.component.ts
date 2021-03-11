import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-report-day',
  templateUrl: './report-day.component.html',
  styleUrls: ['./report-day.component.scss']
})
export class ReportDayComponent implements OnInit {

  dateForm = new FormControl(new Date())
  loader: boolean = true
  formSubmitAttempt: boolean = false
  data: any
  columns = [
    { name: 'IP', slug: 'ip' },
    { name: 'Fecha Registro', slug: 'date' },
    { name: 'Visitas', slug: 'view' }
  ]

  chartOption: EChartsOption

  dataGraph = []

  constructor(
    private dbs: DatabaseService
  ) { }

  ngOnInit(): void {
    this.onSubmit()
  }

  initGraph() {

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
      /*
      grid: {
          top: '1%',
          left: '1%',
          right: '10%',
          containLabel: true
      },*/
      xAxis: {
        type: 'category',
        data: this.dataGraph.map(el => el.name)
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

  getDateFormat(date) {
    let month = ('0' + (date.getMonth() + 1)).slice(-2)
    let day = ('0' + date.getDate()).slice(-2)
    return `${date.getFullYear()}-${month}-${day}`
  }

  onSubmit() {
    this.formSubmitAttempt = true
    this.loader = true

    const formData = new FormData();
    formData.append('key', 'llantas.pe');
    formData.append('fecha', this.getDateFormat(this.dateForm.value));

    this.dbs.getReportByDay(formData).subscribe(resp => {
      let resultArray = Object.keys(resp).map(dt => resp[dt]);
      this.dataGraph = resultArray.map(wd => {
        return {
          name: wd.ip,
          value: Number(wd.total)
        }
      })
      this.data = resultArray.map(wd => {
        return {
          ip: wd.ip,
          date: wd.fecha,
          view: Number(wd.total)
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

}
