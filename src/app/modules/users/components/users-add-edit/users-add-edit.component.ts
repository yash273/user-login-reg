import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from '../../model/users';
import { UsersService } from '../../service/users.service';
import { AlertService } from 'src/app/alerts/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-add-edit',
  templateUrl: './users-add-edit.component.html',
  styleUrls: ['./users-add-edit.component.scss']
})
export class UsersAddEditComponent implements OnInit {

  userForm !: NgForm;
  user = new Users;
  userId: number | undefined;

  constructor(
    private usersService: UsersService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.getUser();
    }
  }

  submit(userForm: NgForm) {
    if (userForm.valid) {
      this.usersService.addUser(userForm.value).subscribe(
        (res) => {
          if (res) {
            this.alertService.showAlert('User Added Successfully!', 'success');
            this.router.navigate(['/users']);
          } else {
            this.alertService.showAlert('Something Went Wrong!', 'error');
          }
        });
    }
  }

  getUser() {
    this.usersService.getUser(this.userId).subscribe(
      (res) => {
        if (res) {
          this.user = res;
        } else {
          this.alertService.showAlert('Something Went Wrong!', 'error');
        }
      });
  }

  update(userForm: NgForm) {
    if (userForm.valid) {
      this.usersService.updateUser(userForm.value, this.userId).subscribe(
        (res) => {
          if (res) {
            this.alertService.showAlert('User Updated Successfully!', 'success');
            this.router.navigate(['/users']);
          } else {
            this.alertService.showAlert('Something Went Wrong!', 'error');
          }
        });
    }
  }

}
