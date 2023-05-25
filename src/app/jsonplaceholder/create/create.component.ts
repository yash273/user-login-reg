import { Component, OnInit } from '@angular/core';
import { JSONplaceholderserviceService } from '../jsonplaceholderservice.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  data = {
    title: '',
    body: '',
    userId: null
  };

  constructor(private JSONplaceholder: JSONplaceholderserviceService,
    private router: Router, private alertsService: AlertService,) { }

  ngOnInit(): void {
  }

  isFormValid(): boolean {
    return this.data.userId !== null && this.data.title !== '' && this.data.body !== '';
  }

  createData(): void {
    if (this.data.userId) {
      this.JSONplaceholder.createData(this.data).subscribe(() => {
        this.alertsService.showAlert('Data created successfully!', 'success')
        console.log(this.data)
        this.router.navigateByUrl('/postlist');
      });
    } else {
      this.alertsService.showAlert('Please provide a userId!', 'error')
    }
  }

}
