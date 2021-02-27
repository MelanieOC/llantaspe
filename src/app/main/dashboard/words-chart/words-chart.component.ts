import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-words-chart',
  templateUrl: './words-chart.component.html',
  styleUrls: ['./words-chart.component.scss']
})
export class WordsChartComponent {

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
      am4core.useTheme(am4themes_animated);

      am4core.useTheme(am4themes_animated);
      var chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
      var series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());

      series.data = [{
        "tag": "Breaking News",
        "weight": 60
      }, {
        "tag": "Environment",
        "weight": 80
      }, {
        "tag": "Politics",
        "weight": 90
      }, {
        "tag": "Business",
        "weight": 25
      }, {
        "tag": "Lifestyle",
        "weight": 30
      }, {
        "tag": "World",
        "weight": 45
      }, {
        "tag": "Sports",
        "weight": 160
      }, {
        "tag": "Fashion",
        "weight": 20
      }, {
        "tag": "Education",
        "weight": 78
      }];

      series.dataFields.word = "tag";
      series.dataFields.value = "weight";

      series.colors = new am4core.ColorSet();
      series.colors.passOptions = {};
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
