import { Component, OnInit } from '@angular/core';
import { JSONplaceholderserviceService } from '../jsonplaceholderservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  postId!: number;
  post: any = {};
  constructor(
    private JSONplaceholder: JSONplaceholderserviceService,
    private route: ActivatedRoute,
    private alertsService: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const postId = params.get('id');
      if (postId) {
        this.postId = +postId;
        this.getDataId();
      }
    });
  }

  getDataId(): void {
    this.JSONplaceholder.getDataId(this.postId).subscribe((post) => {
      this.post = post;
    });
  }
  updatePost(): void {
    this.JSONplaceholder.updateData(this.postId, this.post).subscribe(() => {
      this.alertsService.showAlert('Post updated successfully!', 'success')
      this.router.navigateByUrl('/postlist');
    });
  }
}
