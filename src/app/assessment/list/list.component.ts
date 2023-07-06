import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';
import { AssessmentData } from 'src/app/interfaces/assessment';
import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  assmList: any

  oldAssm!: any;

  constructor(
    private assmService: AssessmentService,
    private alertsService: AlertService
  ) {
    this.assmList = [];
  }

  displayedColumns: string[] = ['Id', 'description', 'category', 'Action'];


  ngOnInit(): void {
    this.oldAssm = localStorage.getItem('AssmData');

    if (this.oldAssm !== null) {

      this.assmList = JSON.parse(this.oldAssm);
    }
  }

  truncate(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

}
