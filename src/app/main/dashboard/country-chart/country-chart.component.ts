import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.scss']
})
export class CountryChartComponent implements OnInit {

  xAxisLabel: string;
  yAxisLabel: string;

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = false;
  showYAxisLabel = false;
  colorScheme = {
    domain: ['#B0E5ED', '#02704B', '#FE6D34', '#1A1AB5', '#FFD731']
  }

  data = [
    { name: "Perú", value: 961 },
    { name: "Panama", value: 87 },
    { name: "Brasil", value: 83 },
    { name: "Ecuador", value: 74 },
    { name: "Mexico", value: 37 },
    { name: "Chile", value: 23 },
    { name: "Estadors Unidos", value: 23 },
    { name: "Italia", value: 11 },
    { name: "India", value: 11 },
    { name: "Colombia", value: 11 },
    { name: "Bolivia", value: 9 },
    { name: "Francia", value: 7 },
    { name: "Alemania", value: 5 },
    { name: "Argentina", value: 2 },
    { name: "Costa Rica", value: 2 }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
