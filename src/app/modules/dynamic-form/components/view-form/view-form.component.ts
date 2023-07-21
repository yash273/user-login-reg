import { Component, OnInit } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { FormData } from '../../model/form-field';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {

  constructor(
    private formService: DynamicFormService,
    private formBuilder: FormBuilder
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
      let control: FormControl;
      if (item.type === 'checkbox') {
        item.options?.forEach(element => {
          this.userForm.addControl(element, this.formBuilder.control(false));
        });
        control = this.formBuilder.control('');
      } else {
        control = this.formBuilder.control('', item.required ? Validators.required : []);
      }
      this.userForm.addControl(item.label, control);
    }
    console.log(this.userForm);
  }


  submit() {
    console.log(this.userForm.valid)
    console.log(this.userForm.value)
  }

}
