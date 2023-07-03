import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AssessmentData } from '../interfaces/assessment';
import { Router } from '@angular/router';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(
    private router: Router,
    private alertsService: AlertService,
  ) { }

  submit(dataForm: FormGroup) {
    console.log(dataForm.value);
    this.saveData(dataForm.value);
  }

  openGraph(dataForm: FormGroup) {
    console.log(dataForm.value, ":og")
  }
  saveData(data: AssessmentData) {
    const oldAssm = localStorage.getItem('AssmData');

    if (oldAssm !== null) {
      const assmList = JSON.parse(oldAssm);
      assmList.push(data);
      localStorage.setItem('AssmData', JSON.stringify(assmList));
      this.alertsService.showAlert('Product Added Successfully!', 'success')
    } else {
      const productArr = [data];
      localStorage.setItem('AssmData', JSON.stringify(productArr));
      this.alertsService.showAlert('Product Added Successfully!', 'success')
    }
  }
}
