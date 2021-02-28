import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  
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
    { name: "190.117.120.249", value: 91 },
    { name: "186.188.242.43", value: 38 },
    { name: "34.95.130.28", value: 36 },
    { name: "170.231.82.34", value: 28 },
    { name: "45.5.69.234", value: 24 },
    { name: "201.240.145.41", value: 20 },
    { name: "179.43.94.94", value: 18 },
    { name: "143.255.56.90", value: 16 },
    { name: "200.62.167.162", value: 14 },
    { name: "45.5.68.12", value: 14 }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }
}
