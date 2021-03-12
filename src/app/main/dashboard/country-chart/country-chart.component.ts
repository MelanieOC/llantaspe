import { Component, OnInit, Input } from '@angular/core';
import { EChartsOption } from 'echarts';
@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.scss']
})
export class CountryChartComponent implements OnInit {

  @Input() public data: any[];
  colors = ['#D7B29D', '#CB8589', '#ECBA82', '#81C14B', '#B084CC', '#D7CDCC', '#9C528B', '#E952DE', '#6369D1', '#60E1E0', '#008148', '#C6C013', '#EF8A17', '#EF2917', '#DDE8B9', '#E8D2AE']
  chartOption
  imgPath = '../../../../assets/countries/abkhazia.png'
  constructor() { }

  ngOnInit(): void {
    let list = this.data.map(el => el.name)
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
      grid: {
        top: '1%',
        left: '1%',
        right: '1%',
        containLabel: true
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
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 20
      }, {
        start: 0,
        end: 20
      }],
      xAxis: {
        type: 'category',
        data: this.data.map(el => el.name),
        axisLabel: {
          formatter: function (value) {
            let two=value.split(' ')
            if(two.length>1){
              return '{' + two.join('') + '| }\n{value|' + value + '}';
            }else{
              return '{' + value + '| }\n{value|' + value + '}';
            }
            
          },
          rich: this.getFlags(list)
        }
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

  getFlags(list) {
    let rit = {
      value: {
        lineHeight: 10,
        align: 'center'
      }
    }
    list.forEach(ct => {
      let nm = ct.toLowerCase().trim().replace(' ', '-')
      rit[ct.replace(' ', '')] = {
        height: 20,
        align: 'center',
        backgroundColor: {
          image: `../../../../assets/countries/${nm}.png`
        }
      }
    })
    return rit
  }

  onSelect(event) {
    console.log(event);
  }

}
