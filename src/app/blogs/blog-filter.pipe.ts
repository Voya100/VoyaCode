import { Pipe, PipeTransform } from '@angular/core';
import { Blog } from './blog';

@Pipe({
  name: 'blogFilter',
  pure: false
})

export class BlogFilterPipe implements PipeTransform {
  transform(blogs: Blog[], years: any[]): any {
    return blogs.filter((blog: any) => !years.hasOwnProperty(blog.year) || years[blog.year]);
  }
}
