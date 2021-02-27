import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      let chart = am4core.create("barchartdiv", am4charts.XYChart);
      am4core.useTheme(am4themes_animated);
      chart.data = [{
        "country": "Lithuania",
        "litres": 501.9,
        "units": 250
      }, {
        "country": "Czech Republic",
        "litres": 301.9,
        "units": 222
      }, {
        "country": "Ireland",
        "litres": 201.1,
        "units": 170
      }, {
        "country": "Germany",
        "litres": 165.8,
        "units": 122
      }, {
        "country": "Australia",
        "litres": 139.9,
        "units": 99
      }, {
        "country": "Austria",
        "litres": 128.3,
        "units": 85
      }, {
        "country": "UK",
        "litres": 99,
        "units": 93
      }, {
        "country": "Belgium",
        "litres": 60,
        "units": 50
      }, {
        "country": "The Netherlands",
        "litres": 50,
        "units": 42
      }];

      // Create axes
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.title.text = "Countries";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Litres sold (M)";

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "litres";
      series.dataFields.categoryX = "country";
      series.name = "Sales";
      series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
      series.columns.template.fill = am4core.color("#104547"); // fill

      var series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Units";
      series2.stroke = am4core.color("#CDA2AB");
      series2.strokeWidth = 3;
      series2.dataFields.valueY = "units";
      series2.dataFields.categoryX = "country";
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
