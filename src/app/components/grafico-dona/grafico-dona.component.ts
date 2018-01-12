import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() doughnutChartData: Array<number> = [];
  @Input() doughnutChartLabels: Array<string> = [];
  @Input() doughnutChartType: string;


  constructor() { }

  ngOnInit() {
  }

}
