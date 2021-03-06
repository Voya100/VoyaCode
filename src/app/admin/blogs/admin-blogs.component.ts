import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { Blog } from '../../blogs/blog';
import { ConfirmationDialogComponent } from '../../shared/material/confirmation-dialog/confirmation-dialog.component';
import { BlogsService } from '../../shared/services/blogs.service';

@Component({
  selector: 'admin-blogs',
  templateUrl: 'admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.scss']
})
export class AdminBlogsComponent implements OnInit {
  public blogs: Blog[] = [];
  public loading: boolean = false;
  public errors: string[] = [];
  public success: string;

  constructor(private blogsService: BlogsService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getBlogs();
  }

  deleteBlog(id: number, name: string) {
    this.checkDialog(name).subscribe(result => {
      if (result !== true) {
        return;
      }

      this.loading = true;
      this.errors = [];
      this.success = '';

      this.blogsService.deleteBlog(id).subscribe(
        res => {
          this.success = 'Blog "' + name + '" successfully deleted.';
          this.getBlogs();
        },
        (err: string | string[]) => {
          this.errors = Array.isArray(err) ? err : [err];
          this.loading = false;
        }
      );
    });
  }

  private checkDialog(name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete',
        message: 'Are you sure you want to delete "' + name + '"?'
      }
    });
    return dialogRef.afterClosed();
  }

  private getBlogs() {
    this.loading = true;
    this.blogsService.getBlogs().subscribe(
      blogs => {
        this.blogs = blogs;
        this.loading = false;
      },
      err => {
        this.errors = ['Blog loading failed.'];
        this.loading = false;
      }
    );
  }
}
