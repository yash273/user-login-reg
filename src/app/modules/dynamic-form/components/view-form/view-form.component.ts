import { Component, OnInit } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { FormData } from '../../model/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {

  constructor(
    private formService: DynamicFormService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  formData!: FormData;
  userForm!: FormGroup

  ngOnInit(): void {
    this.formData = this.formService.getData();
    console.log(this.formData);
    this.userForm = this.formBuilder.group({});
    this.setFormControls();
  }

  setFormControls() {
    for (const item of this.formData.formDetails) {
      debugger
      const control = this.formBuilder.control('', []);
      if (item.required && item.type !== 'checkbox') {
        this.userForm.get(item.label)?.setValidators(Validators.required);
        this.userForm.get(item.label)?.updateValueAndValidity();
      }
      if (item.type === 'checkbox') {
        item.options?.forEach(element => {
          this.userForm.addControl(element, this.formBuilder.control(false, []));
        });
      }
      else {
        this.userForm.addControl(item.label, control);
      }
    }
    console.log(this.userForm.controls)
  }



  submit() {
    if (this.userForm.valid) {
      this.alertService.showAlert('valid', 'success')

    } else {
      this.alertService.showAlert('invalid', 'error')

    }
    console.log(this.userForm)

    console.log(this.userForm.value)
  }

}
