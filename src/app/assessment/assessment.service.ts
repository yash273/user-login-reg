import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssessmentData } from '../interfaces/assessment';
import { Router } from '@angular/router';
import { AlertService } from '../alerts/alert.service';
import { ShowChartComponent } from './show-chart/show-chart.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(
    private router: Router,
    private alertsService: AlertService,
    private dialog: MatDialog
  ) { }

  newAssmDataId(): number {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const AssmDataId = timestamp * 1000 + randomNum;
    return AssmDataId;
  }
  saveData(data: AssessmentData) {
    const oldAssm = localStorage.getItem('AssmData');
    const latestAssmDatatId = this.newAssmDataId();
    data.aId = latestAssmDatatId;

    if (oldAssm !== null) {
      const assmList = JSON.parse(oldAssm);
      assmList.push(data);
      localStorage.setItem('AssmData', JSON.stringify(assmList));
      this.alertsService.showAlert('Assesment Added Successfully!', 'success')
    } else {
      const assmArr = [data];
      localStorage.setItem('AssmData', JSON.stringify(assmArr));
      this.alertsService.showAlert('Assesment Added Successfully!', 'success')
    }
  }

  getAssmData(id: number) {
    const oldAssmData = localStorage.getItem('AssmData');
    if (oldAssmData !== null) {
      const assmList = JSON.parse(oldAssmData);
      const aIdIndex = assmList.findIndex((p: any) => p.aId == id);
      return assmList[aIdIndex]
    }
  }

  openChart(data: any) {
    return this.dialog.open(ShowChartComponent, {
      width: '600px',
      data: {
        data
      }
    });
  }

  saveEditedAssmData(data: AssessmentData, aId: number) {
    const oldAssmData = localStorage.getItem('AssmData');
    if (oldAssmData != null) {
      const assmList = JSON.parse(oldAssmData);
      assmList.splice(assmList.findIndex((p: AssessmentData) => p.aId == aId), 1);
      data.aId = aId;
      assmList.push(data)
      localStorage.setItem('AssmData', JSON.stringify(assmList))
      this.alertsService.showAlert('Assesment Edited Successfully!', 'success')
      this.router.navigate(['/assessment/list']);
    }
  }
}
