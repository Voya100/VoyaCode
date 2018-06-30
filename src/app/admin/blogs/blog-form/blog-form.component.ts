import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Response } from '@angular/http';

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
  @Input() error: string;
  @Input() success: string;

  previewBlog: Blog;
  previewLoading: boolean = false;
  previewError: string;

  @Output() submit: EventEmitter<Blog> = new EventEmitter();

  constructor(private blogsService: BlogsService) { }

  submitPress() {
    this.submit.emit(this.blog);
  }

  getPreview() {
    this.previewLoading = true;
    this.previewError = '';
    this.blogsService.getBlogPreview(this.blog.name, this.blog.text).subscribe(
      data => {
        this.previewBlog = data;
        this.previewLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.previewError = err.error.message;
        this.previewLoading = false;
      }
    );
  }
}
