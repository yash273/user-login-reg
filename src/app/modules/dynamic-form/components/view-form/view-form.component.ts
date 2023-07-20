import { Component, OnInit } from '@angular/core';
import { DynamicFormService } from '../../service/dynamic-form.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {

  constructor(
    private formService: DynamicFormService
  ) { }

  formData: any;

  ngOnInit(): void {
    this.formData = this.formService.getData();
    console.log(this.formData)
  }

}
