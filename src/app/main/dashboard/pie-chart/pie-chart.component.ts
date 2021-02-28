import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  showLegend = true;
  gradient = true;
  colorScheme = {
    domain: ['#B0E5ED', '#02704B', '#FE6D34', '#1A1AB5', '#FFD731']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  data = [
    { name: "185/70/14", value: 151 },
    { name: "205/55/16", value: 128 },
    { name: "225/65/17", value: 120 },
    { name: "195/65/15", value: 113 },
    { name: "185/65/15", value: 105 },
    { name: "265/65/17", value: 86 },
    { name: "225/60/17", value: 81 },
    { name: "175/70/14", value: 80 },
    { name: "185/70/13", value: 73 },
    { name: "265/70/16", value: 72 },
    { name: "205/60/15", value: 69 },
    { name: "235/65/17", value: 65 },
    { name: "215/65/16", value: 58 },
    { name: "205/60/15", value: 58 },
    { name: "215/60/17", value: 54 },
    { name: "235/55/18", value: 52 },
    { name: "265/70/17", value: 49 },
    { name: "185/65/14", value: 48 },
    { name: "215/50/17", value: 46 },
    { name: "225/45/17", value: 44 },
    { name: "Otros", value: 2574 }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
