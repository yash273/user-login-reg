import { Component, OnInit } from '@angular/core';
import { FormField } from '../../model/form-field';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  form!: FormGroup;
  formFields: FormField[] = [];
  newField: FormField = {} as FormField;
  newOption: string = '';
  order: number = 1;

  constructor(
    private fb: FormBuilder,
    private formService: DynamicFormService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.newField.order = this.order;
  }

  initForm() {
    this.form = this.fb.group({
      formName: [''],
      formDetails: this.fb.array([
        this.formDetails()
      ]),
    });
  }

  formDetails() {
    return this.fb.group({
      type: ['', Validators.required],
      label: ['', Validators.required],
      required: [false],
      options: this.fb.array([this.fb.control('')]),
    })
  }

  get formDetailsControls(): FormArray {
    return this.form.get('formDetails') as FormArray;
  }

  detailIndex !: number
  get newFieldOptions(): FormArray {
    return this.form.get('formDetails.' + this.detailIndex + '.options') as FormArray;
  }

  isSpecialFieldType(index: number): boolean {
    const field = this.form.get(`formDetails.${index}.type`);
    this.detailIndex = index;
    return ['select', 'radio', 'checkbox'].includes(field?.value);
  }

  addOption() {
    this.newFieldOptions.push(this.fb.control(''))
  }

  removeOption(index: number) {
    this.newFieldOptions.removeAt(index);
  }

  addField() {
    this.formDetailsControls.push(this.formDetails());
  }

  submitForm() {
    this.formService.saveFormData(this.form)
  }

  remove(index: number) {
    this.formDetailsControls.removeAt(index)
  }
}
