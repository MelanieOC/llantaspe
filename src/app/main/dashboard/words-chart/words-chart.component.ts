import { Component, Input, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-words-chart',
  templateUrl: './words-chart.component.html',
  styleUrls: ['./words-chart.component.scss']
})
export class WordsChartComponent implements OnInit {
  @Input() public data: CloudData[];
  options: CloudOptions = {
    width: 0.98,
    height: 400,
    overflow: false,
  };


  constructor() { }

  ngOnInit(): void {
  }

}
