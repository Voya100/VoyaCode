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
var comments_service_1 = require('./comments.service');
var CommentsComponent = (function () {
    function CommentsComponent(commentService) {
        this.commentService = commentService;
        this.comments = [];
        this.username = "";
        this.message = "";
        this.private = false;
        this.postError = "";
        this.previewPost = null;
        this.posting = false;
    }
    CommentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commentService.getComments().subscribe(function (data) {
            _this.comments = data;
        }, function (error) {
            _this.comments.push({
                username: 'Error',
                content: "Connection to server failed and comments couldn't be fetched. Check your internet connection and try again. If problem persists, contact the admin.",
                private: false,
                publishTime: '',
                editTime: ''
            });
        });
    };
    // Adds tags around the current selection. Selection is moved between the tags.
    CommentsComponent.prototype.addTag = function (startTag, endTag, textarea) {
        var _this = this;
        var beginning = textarea.selectionStart;
        var ending = textarea.selectionEnd;
        if (beginning !== null) {
            var start_1 = this.message.substring(0, beginning);
            var middle = beginning == ending ? '' : this.message.substring(beginning, ending);
            var end = this.message.substring(ending);
            this.message = start_1 + startTag + middle + endTag + end;
            // Small delay so that position is set after view has updated
            // Caret position is set between the tags
            setTimeout(function () {
                _this.setCaretPosition(start_1.length + startTag.length, start_1.length + startTag.length + (ending - beginning), textarea);
            }, 100);
        }
    };
    // Adds the tag to textarea
    CommentsComponent.prototype.tag = function (tag, textarea) {
        switch (tag) {
            case "b":
            case "i":
            case "u":
                this.addTag("[" + tag + "]", "[/" + tag + "]", textarea);
                break;
            case "url":
                this.addTag("[" + tag + "=]", "[/" + tag + "]", textarea);
        }
    };
    // Sets selection in textarea
    CommentsComponent.prototype.setCaretPosition = function (start, end, input) {
        input.setSelectionRange(start, end);
        input.focus();
    };
    // Posts comment if it meets the requirements determined in backend and there isn't another comment in processing.
    // If preview is true, comment won't be sent to server's comment database - instead comment is shown under "Preview" section.
    // Message field is cleared after comment is submitted.
    CommentsComponent.prototype.postComment = function (preview) {
        var _this = this;
        if (preview === void 0) { preview = false; }
        if (!this.posting) {
            // Prevent posting while comment is being posted
            this.posting = true;
            this.commentService.postComment(this.username, this.message, this.private, preview).subscribe(function (data) {
                _this.postError = data.error;
                if (data.error === "") {
                    if (preview) {
                        _this.previewPost = data.data;
                    }
                    else {
                        _this.comments.push(data.data);
                        _this.previewPost = null;
                        _this.message = "";
                    }
                }
            }, function (error) {
                _this.postError = "Connection failed. Check your internet connection and try again.";
            }, function () {
                _this.posting = false;
            });
        }
    };
    __decorate([
        core_1.ViewChild('messageBox'), 
        __metadata('design:type', core_1.ElementRef)
    ], CommentsComponent.prototype, "messageBox", void 0);
    CommentsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'comments.component.html',
            styleUrls: ['./comments.component.css']
        }), 
        __metadata('design:paramtypes', [comments_service_1.CommentsService])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
//# sourceMappingURL=comments.component.js.map