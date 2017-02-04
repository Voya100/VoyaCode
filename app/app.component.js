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
require('rxjs/add/operator/filter');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeMap');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var platform_browser_1 = require('@angular/platform-browser');
var angular2_perfect_scrollbar_1 = require('angular2-perfect-scrollbar');
var AppComponent = (function () {
    function AppComponent(router, activatedRoute, titleService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.titleService = titleService;
        this.loadingOpen = true;
        this.loading = true;
        this.error = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Change title when navigating to new page
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
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
        if (event instanceof router_1.NavigationStart) {
            this.loading = true;
            this.error = false;
            this.showLoading();
        }
        if (event instanceof router_1.NavigationEnd) {
            this.loading = false;
            this.loadingOpen = false;
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof router_1.NavigationCancel || event instanceof router_1.NavigationError) {
            this.loading = false;
            this.loadingOpen = false;
        }
        if (event instanceof router_1.NavigationError) {
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
        core_1.ViewChild(angular2_perfect_scrollbar_1.PerfectScrollbarComponent), 
        __metadata('design:type', angular2_perfect_scrollbar_1.PerfectScrollbarComponent)
    ], AppComponent.prototype, "scrollbar", void 0);
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'voya-app',
            templateUrl: 'app.component.html',
            styleUrls: ['./app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, platform_browser_1.Title])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map