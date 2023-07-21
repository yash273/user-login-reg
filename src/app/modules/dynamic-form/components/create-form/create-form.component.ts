import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DynamicFormService } from '../../service/dynamic-form.service';
import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formService: DynamicFormService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      formName: ['', Validators.required],
      formDetails: this.formBuilder.array([
        this.formDetails()
      ]),
    });
  }

  formDetails() {
    return this.formBuilder.group({
      type: ['', Validators.required],
      label: ['', Validators.required],
      required: [false],
      options: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
    })
  }

  get formDetailsControls(): FormArray {
    return this.form.get('formDetails') as FormArray;
  }

  detailIndex !: number

  get newFieldOptions(): FormArray {
    return this.form.get('formDetails.' + this.detailIndex + '.options') as FormArray;
  }

  get formDetailLength() {
    return this.formDetailsControls.length;
  }

  get optionsLength() {
    return this.newFieldOptions.length;
  }

  isSpecialFieldType(index: number): boolean {
    const field = this.form.get(`formDetails.${index}.type`);
    this.detailIndex = index;
    return ['select', 'radio', 'checkbox'].includes(field?.value);
  }
  isCheckbox(index: number): boolean {
    const field = this.form.get(`formDetails.${index}.type`);
    return ['checkbox'].includes(field?.value);
  }

  addOption() {
    this.newFieldOptions.push(this.formBuilder.control('', Validators.required));
  }

  removeOption(index: number) {
    this.newFieldOptions.removeAt(index);
  }

  addField() {
    this.formDetailsControls.push(this.formDetails());
  }

  submitForm() {
    if (this.form.valid) {
      this.formService.saveFormData(this.form);
      this.alertService.showAlert('saved', 'success');
    } else {
      this.alertService.showAlert('please fill required data', 'error');
    }
  }

  remove(index: number) {
    this.formDetailsControls.removeAt(index)
  }
}
