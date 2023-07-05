import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentData } from 'src/app/interfaces/assessment';
import { AssessmentService } from '../assessment.service';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  aId!: number;
  data!: AssessmentData
  constructor(
    private route: ActivatedRoute,
    private assmService: AssessmentService,
  ) {
    this.route.params.subscribe((res) => {
      this.aId = parseInt(res['aId'], 10);
    });
  }

  ngOnInit(): void {
    this.data = this.assmService.getAssmData(this.aId);
  }

  displayedColumns: string[] = ['assessment'];

  show(data: any) {
    this.assmService.openChart(data)
  }
}
