var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PerfectScrollbarComponent } from 'angular2-perfect-scrollbar';
export var AppComponent = (function () {
    function AppComponent(router, activatedRoute, titleService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.loadingOpen = true;
        this.error = true;
        this.loading = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Change title when navigating to new page
        this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .map(function () { return _this.activatedRoute; })
            .map(function (route) {
            while (route.firstChild)
                route = route.firstChild;
            return route;
        })
            .filter(function (route) { return route.outlet === 'primary'; })
            .mergeMap(function (route) { return route.data; })
            .subscribe(function (event) {
            _this.titleService.setTitle('Voya Code' + (event['title'] == '' ? '' : ' - ' + event['title']));
            _this.scrollbar.update();
        });
        // There may be a way to combine these subscribes, but I'm not sure what's the best way to do it.
        this.router.events.subscribe(function (event) { return _this.loadHandler(event); });
    };
    AppComponent.prototype.loadHandler = function (event) {
        if (event instanceof NavigationStart) {
            this.loading = true;
            this.error = false;
            this.showLoading();
        }
        if (event instanceof NavigationEnd) {
            this.loading = false;
            this.loadingOpen = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel || event instanceof NavigationError) {
            this.loading = false;
            this.loadingOpen = false;
        }
        if (event instanceof NavigationError) {
            this.error = true;
        }
    };
    // Show loading screen after small delay, if page hasn't loaded yet
    AppComponent.prototype.showLoading = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.loading) {
                _this.loadingOpen = true;
            }
        }, 100);
    };
    __decorate([
        ViewChild(PerfectScrollbarComponent), 
        __metadata('design:type', PerfectScrollbarComponent)
    ], AppComponent.prototype, "scrollbar", void 0);
    AppComponent = __decorate([
        Component({
            moduleId: module.id,
            selector: 'voya-app',
            templateUrl: 'app.component.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [Router, ActivatedRoute, Title])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map