"use strict";
var router_1 = require('@angular/router');
var routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule', pathMatch: 'full', data: { title: '' } },
    { path: 'home', loadChildren: 'app/home/home.module#HomeModule', data: { title: 'Home' } },
    { path: 'blogs', loadChildren: 'app/blogs/blogs.module#BlogsModule', data: { title: 'Blogs' } },
    { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule', data: { title: 'Projects' } },
    { path: 'comments', loadChildren: 'app/comments/comments.module#CommentsModule', data: { title: 'Comments' } },
    { path: '404', loadChildren: 'app/not-found/not-found.module#NotFoundModule', data: { title: 'Page not found' } },
    { path: '**', redirectTo: '/404' }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map