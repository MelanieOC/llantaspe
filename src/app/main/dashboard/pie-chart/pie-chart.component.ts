import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { EChartsOption } from 'echarts';
import { Label } from 'ng2-charts';
import { take } from 'rxjs/operators';
import { MediaqueryService } from 'src/app/services/mediaquery.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() public data: any[];
  colors = ['#008148', '#C6C013', '#EF8A17', '#DDE8B9', '#E8D2AE', '#D7B29D', '#CB8589', '#ECBA82', '#81C14B', '#B084CC', '#D7CDCC', '#9C528B', '#E952DE', '#6369D1', '#60E1E0']
 
  public mediaService = new MediaqueryService('(min-width: 760px)');
  isDesktop: boolean;

  chartOption: EChartsOption 

  active = [{name: "Otros", value: 2574, label: "Otros"}]
  constructor() { }

  ngOnInit(): void {
    this.mediaService.match$.pipe(take(1)).subscribe(value => {
      this.isDesktop = value
    });

    this.chartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        top: 'bottom'
      },
      calculable: true,
      color: this.colors,
      series: [
        {
          name: 'Medidas',
          type: 'pie',
          radius: '50%',
          data: this.data,
          label: {
            show: this.isDesktop
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  onSelect(event) {
    console.log(event);
    this.active = [event]
  }

}
