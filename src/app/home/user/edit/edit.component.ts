import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { nameRegx, emailRegx, passRegx, mobRegx } from 'src/app/regex-rules/regex';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  prevdata: any;
  editForm!: FormGroup;

  hide = true;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe((res) => {
      this.id = parseInt(res['id'], 10);
    });
  }

  ngOnInit(): void {
    this.prevdata = this.userService.getdata(this.id)
    this.editForm = this.formBuilder.group({
      name: [this.prevdata.name, [Validators.required, Validators.pattern(nameRegx)]],
      email: [this.prevdata.email, [Validators.required, Validators.pattern(emailRegx)]],
      type: [this.prevdata.type, [Validators.required]],
      pass: [this.prevdata.pass, [Validators.required, Validators.pattern(passRegx)]],
      mob: [this.prevdata.mob, [Validators.pattern(mobRegx)]]
    })
  }

  onSubmitEdit() {
    this.userService.update(this.editForm.value, this.id);
  }

  get editform() {
    return this.editForm.controls;
  }

}
