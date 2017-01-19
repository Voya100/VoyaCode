import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blogFilter',
  pure: false
})

export class BlogFilterPipe implements PipeTransform {
  transform(blogs: any, years: any[]): any {
    return blogs.filter((blog:any) => !years.hasOwnProperty(blog.year) || years[blog.year]);
  }
}