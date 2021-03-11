import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { EChartsOption } from 'echarts';
import { MultiDataSet, Label } from 'ng2-charts';
import { MediaqueryService } from 'src/app/services/mediaquery.service';
@Component({
  selector: 'app-media-chart',
  templateUrl: './media-chart.component.html',
  styleUrls: ['./media-chart.component.scss']
})
export class MediaChartComponent implements OnInit {
  @Input() public data: any[];
  showLegend = true;
  gradient = true;
  colorScheme = {
    domain: ['#B0E5ED', '#02704B', '#FE6D34', '#1A1AB5', '#FFD731']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = true;

  public mediaService = new MediaqueryService('(min-width: 760px)');
  chartOption: EChartsOption
  /*
  doughnutChartLabels: Label[] = this.data.map(dt => dt.name);

  doughnutChartData: MultiDataSet = [
    this.data.map(dt => dt.value)
  ];

  doughnutChartType: ChartType = 'doughnut';*/

  constructor() { }

  ngOnInit(): void {
    this.chartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 'bottom'
      },
      series: [
        {
          name: 'Dispositivo',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          data: this.data
        }
      ]
    };
  }

  onSelect(event) {
    console.log(event);
  }
  onDeselect(event) {
    console.log(event);
  }

}
