import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Blog } from '../../../blogs/blog';
import { BlogsService } from '../../../shared/services/blogs.service';

@Component({
  selector: 'blog-form',
  templateUrl: 'blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent {
  @Input() blog: Blog = new Blog();
  @Input() loading: boolean;
  @Input() errors: string[];
  @Input() success: string;

  previewBlog: Blog;
  previewLoading: boolean = false;
  previewErrors: string[] = [];

  @Output() submit: EventEmitter<Blog> = new EventEmitter();

  constructor(private blogsService: BlogsService) {}

  submitPress() {
    this.submit.emit(this.blog);
  }

  getPreview() {
    this.previewLoading = true;
    this.previewErrors = [];
    this.blogsService.getBlogPreview(this.blog.name, this.blog.text).subscribe(
      data => {
        this.previewBlog = data;
        this.previewLoading = false;
      },
      (err: string | string[]) => {
        this.previewErrors = Array.isArray(err) ? err : [err];
        this.previewLoading = false;
      }
    );
  }
}
