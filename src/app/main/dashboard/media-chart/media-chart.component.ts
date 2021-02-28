import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-chart',
  templateUrl: './media-chart.component.html',
  styleUrls: ['./media-chart.component.scss']
})
export class MediaChartComponent implements OnInit {
  showLegend = true;
  gradient = true;
  colorScheme = {
    domain: ['#B0E5ED', '#02704B', '#FE6D34', '#1A1AB5', '#FFD731']
  };
  showLabels = false;
  explodeSlices = false;
  doughnut = true;

  data = [
    { name: "Celular", value: 3003 },
    { name: "PC", value: 1314 },
    { name: "Tablet", value: 32 }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event) {
    console.log(event);
  }

}
