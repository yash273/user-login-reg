import { Component, Inject, OnInit } from '@angular/core';
import { ViewComponent } from '../view/view.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-show-chart',
  templateUrl: './show-chart.component.html',
  styleUrls: ['./show-chart.component.scss']
})
export class ShowChartComponent implements OnInit {

  public chart: any;

  constructor(@Inject(MAT_DIALOG_DATA)
  public chartData: any,
    public dialogRef: MatDialogRef<ViewComponent>,
  ) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    if (this.chart) {
      this.chart.clear();
      this.chart.destroy();
    }

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: this.chartData.data.chartData,
      options: {
        aspectRatio: 2.5
      }
    });

  }

}
