import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor() { }

  submit(dataForm: FormGroup) {
    console.log(dataForm.value);
  }

  openGraph(dataForm: FormGroup) {
    console.log(dataForm.value, ":og")
  }
}
