import { Component, OnInit } from '@angular/core';
import { FormField } from '../../model/form-field';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

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

  get newFieldOptions(): FormArray {
    return this.form.get('formDetails.' + this.xxx + '.options') as FormArray;
  }

  index = 1;
  xxx = 0;

  setIndex(index: number) {
    this.xxx = index;
    console.log(this.xxx)
  }
  addOption() {
    const x = this.index;
    if (this.form.get(`newField.options.${x}`)?.value.trim() !== '') {
      const newOption = this.form.get(`newField.options.${x}`)?.value.trim();
      this.newFieldOptions.push(this.fb.control(newOption));
      this.form.get(`newField.options.${x}`)?.reset();
      this.index = x + 1;
    }
  }

  removeOption(index: number) {
    this.newFieldOptions.removeAt(index);
  }

  newId: number = 1;

  addField() {
    const formDetailsArray = this.form.get('formDetails') as FormArray;

    formDetailsArray.controls.forEach((formDetailsGroup: AbstractControl, index: number) => {
      if (formDetailsGroup instanceof FormGroup) {
        if (!formDetailsGroup.get('id')) {
          formDetailsGroup.addControl('id', this.fb.control(''));
          formDetailsGroup.get('id')?.setValue(this.newId);
          this.newId = formDetailsGroup.get('id')?.value + 1;
        }
      }
    });
    console.log(this.form.value);
    formDetailsArray.push(this.formDetails());
  }

  removeField(field: FormField) {
    const index = this.formFields.indexOf(field);
    if (index !== -1) {
      this.formFields.splice(index, 1);
      this.formFields.forEach((item) => {
        item.order = this.formFields.indexOf(item) + 1;
      });
    }
  }

  submitForm() {
    console.log(this.form.value);
  }

  drop(event: CdkDragDrop<FormField[]>) {
    moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    this.formFields.forEach((item) => {
      item.order = this.formFields.indexOf(item) + 1;
    });
  }

}
