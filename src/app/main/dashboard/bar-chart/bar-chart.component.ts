import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EChartsOption } from 'echarts';
import { take } from 'rxjs/operators';
import { MediaqueryService } from 'src/app/services/mediaquery.service';
import { ModalBarComponent } from '../modal-bar/modal-bar.component';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() public data: any[];
  @Input() init: any;
  @Input() end: any;
  colors = ['#008148', '#C6C013', '#EF8A17', '#DDE8B9', '#E8D2AE', '#D7B29D', '#CB8589', '#ECBA82', '#81C14B', '#B084CC', '#D7CDCC', '#9C528B', '#E952DE', '#6369D1', '#60E1E0']


  chartOption: EChartsOption

  public mediaService = new MediaqueryService('(min-width: 760px)');
  isDesktop: boolean;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.mediaService.match$.pipe(take(1)).subscribe(value => {
      this.isDesktop = value
    });

    this.chartOption = {
      tooltip: {
        show: this.isDesktop,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true
          }
        }
      },
      toolbox: {
        show: this.isDesktop,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      xAxis: {
        type: 'category',
        data: this.data.map(el => el.name),
        axisLabel: { interval: 0, rotate: 90 }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.data.map((el, ind) => {
          return {
            value: el.value,
            itemStyle: {
              color: ind > this.colors.length ? this.colors[ind - this.colors.length] : this.colors[ind]
            }
          }
        }),
        type: 'bar'
      }]
    };
  }

  onSelect(event) {
    this.dialog.open(ModalBarComponent, {
      data: {
        data: event,
        fechaInicio: this.init,
        fechaFin: this.end
      }
    })

  }
}
