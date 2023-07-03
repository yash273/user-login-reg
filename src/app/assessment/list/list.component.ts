import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentService } from '../assessment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

 
  assmList: [];

  oldAssm!: any;

  constructor(
    private assmService: AssessmentService,
    private router: Router
  ) { 
    this.assmList = [];
  }

  ngOnInit(): void {
    this.oldAssm = localStorage.getItem('AssmData');

    if (this.oldAssm !== null) {
      this.assmList = JSON.parse(this.oldAssm);
    }
  }

}
