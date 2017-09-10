import { Component } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs.service';

@Component({
  templateUrl: 'blog-subscribe-confirm.component.html',
  styleUrls: ['./blog-subscribe-confirm.component.scss']
})
export class BlogSubscribeConfirmComponent {

  email: string;
  requestMessage: string;
  loading: boolean;

  constructor(private blogService: BlogsService) { }

  sendConfirmation(){
    this.loading = true;
    this.blogService.sendSubscribeConfirmation(this.email).subscribe(
      (message) => {
        this.requestMessage = message;
        this.loading = false;
      },
      (err) => {
        this.requestMessage = err;
        this.loading = false;
      }
    )
  }

}
