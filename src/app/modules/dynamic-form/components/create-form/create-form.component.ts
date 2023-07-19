import { Component, OnInit } from '@angular/core';
import { FormField } from '../../model/form-field';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {

  formFields: FormField[] = [];
  newField: FormField = {} as FormField;
  newOption: string = '';
  ngOnInit(): void {

  }

  addField() {
    this.newField.id = Date.now();
    this.formFields.push(this.newField);
    this.newField = {} as FormField;
  }

  removeField(field: FormField) {
    const index = this.formFields.indexOf(field);
    if (index !== -1) {
      this.formFields.splice(index, 1);
    }
  }

  addOption() {
    if (this.newField.options === undefined) {
      this.newField.options = [];
    }
    this.newField.options.push(this.newOption);
    this.newOption = '';
  }

  removeOption(index: number) {
    if (this.newField.options !== undefined) {
      this.newField.options.splice(index, 1);
    }
  }

  submitForm() {
    console.log(this.formFields);
  }

  drop(event: any) {
    moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
  }

}
