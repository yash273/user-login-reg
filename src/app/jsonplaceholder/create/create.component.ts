import { Component, OnInit } from '@angular/core';
import { JSONplaceholderserviceService } from '../jsonplaceholderservice.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';
import { FormBuilder, Validators } from '@angular/forms';
import { bodyRegx, titleRegx, userIdRegx } from 'src/app/regex-rules/regex';

@Component({
  selector: 'app-create-list',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createForm: any;

  constructor(
    private JSONplaceholder: JSONplaceholderserviceService,
    private router: Router,
    private alertsService: AlertService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.pattern(userIdRegx)]],
      title: ['', [Validators.required, Validators.pattern(titleRegx)]],
      body: ['', [Validators.required, Validators.pattern(bodyRegx)]],
    })
  }

  get createform() {
    return this.createForm.controls;
  }

  createData(): void {
    if (this.createForm.controls.userId) {
      this.JSONplaceholder.createData(this.createForm.value).subscribe(() => {
        this.alertsService.showAlert('Data created successfully!', 'success')
        this.router.navigateByUrl('/postlist');
        this.alertsService.showAlert(JSON.stringify(this.createForm.value), 'success')
      });
    } else {
      this.alertsService.showAlert('Please provide a userId!', 'error')
    }
  }

}
