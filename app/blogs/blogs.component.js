"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var blogs_service_1 = require('../shared/services/blogs.service');
var blog_post_component_1 = require('../shared/components/blog-post/blog-post.component');
// Blogs page contains all blogs.
// User can open/close blog contents either individually or all at once with buttons.
// Blogs can be filtered by year.
var BlogsComponent = (function () {
    function BlogsComponent(blogsService, cdRef) {
        this.blogsService = blogsService;
        this.cdRef = cdRef;
        this.yearCheck = {};
        this.years = [];
        this.blogs = [];
        this.initialised = false;
    }
    // Get blogs from BlogsService
    BlogsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.blogsService.getBlogs().subscribe(function (blogs) { return _this.blogInit(blogs); });
    };
    // To prevent "expression has changed after it was checked" exception
    BlogsComponent.prototype.ngAfterViewChecked = function () {
        this.initialised = true;
        this.cdRef.detectChanges();
    };
    // Initialises filter settings
    BlogsComponent.prototype.blogInit = function (blogs) {
        if (blogs.length > 0) {
            this.blogs = blogs;
            var yearMin = 2016;
            var yearMax = blogs[0].year;
            for (var y = yearMax; y >= yearMin; y--) {
                this.years.push(y);
                this.yearCheck[y] = true;
            }
        }
    };
    // Opens all blog content
    BlogsComponent.prototype.openAll = function () {
        if (this.initialised) {
            this.blogPosts.forEach(function (blog) { return blog.toggle(true); });
        }
    };
    // Closes all blog content
    BlogsComponent.prototype.closeAll = function () {
        if (this.initialised) {
            this.blogPosts.forEach(function (blog) { return blog.toggle(false); });
        }
    };
    // Returns false if page has blog posts (that fit filters), otherwise true
    BlogsComponent.prototype.noBlogs = function () {
        return !this.initialised || this.blogPosts.length === 0;
    };
    __decorate([
        core_1.ViewChildren(blog_post_component_1.BlogPostComponent), 
        __metadata('design:type', core_1.QueryList)
    ], BlogsComponent.prototype, "blogPosts", void 0);
    BlogsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'blogs.component.html',
            styleUrls: ['./blogs.component.css']
        }), 
        __metadata('design:paramtypes', [blogs_service_1.BlogsService, core_1.ChangeDetectorRef])
    ], BlogsComponent);
    return BlogsComponent;
}());
exports.BlogsComponent = BlogsComponent;
//# sourceMappingURL=blogs.component.js.map