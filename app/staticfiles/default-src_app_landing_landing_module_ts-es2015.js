"use strict";
(self["webpackChunkendless"] = self["webpackChunkendless"] || []).push([["default-src_app_landing_landing_module_ts"],{

/***/ 71245:
/*!**************************************************************!*\
  !*** ./src/app/landing/auth-navbar/auth-navbar.component.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthNavbarComponent": function() { return /* binding */ AuthNavbarComponent; }
/* harmony export */ });
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth/login/login.component */ 78146);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ 22213);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 70781);






function AuthNavbarComponent_ul_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "li", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "What we do ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "li", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Be a Food Partner");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Contact Us");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c0 = function () { return ["/"]; };
class AuthNavbarComponent {
    constructor(dialog) {
        this.dialog = dialog;
    }
    ngOnInit() {
    }
    openDialog() {
        const dialogRef = this.dialog.open(_auth_login_login_component__WEBPACK_IMPORTED_MODULE_0__.LoginComponent, {
            width: "600px",
            closeOnNavigation: true,
            // disableClose: true,
            hasBackdrop: true,
            panelClass: "login-dialog",
        });
        dialogRef.afterClosed()
            .subscribe((result) => {
            // refresh view
        });
    }
}
AuthNavbarComponent.ɵfac = function AuthNavbarComponent_Factory(t) { return new (t || AuthNavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__.MatDialog)); };
AuthNavbarComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AuthNavbarComponent, selectors: [["app-auth-navbar"]], inputs: { showNav: "showNav" }, decls: 14, vars: 3, consts: [[1, "px-5"], [1, "row"], [1, "col-12"], [1, "navbar", "fixed-top", "navbar-expand-lg", "navbar-light"], ["routerLinkActive", "router-link-active", 1, "mr-5", "navbar-brand", 3, "routerLink"], ["src", "../../assets/svg/bucca-logo-150px.svg", "alt", "Bucca Logo", 1, "bucca-logo", "img-fluid"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarNav", "aria-controls", "navbarNav", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarNav", 1, "collapse", "navbar-collapse", "d-flex"], ["class", "navbar-nav navbar-nav-scroll", 4, "ngIf"], [1, "ml-auto", "navbar-nav"], [1, "nav-item"], ["mat-button", "", 1, "nav-link", "auth-links", 3, "click"], [1, "navbar-nav", "navbar-nav-scroll"], [1, "mr-3", "nav-item"], [1, "nav-link"]], template: function AuthNavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, AuthNavbarComponent_ul_9_Template, 10, 0, "ul", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "ul", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AuthNavbarComponent_Template_a_click_12_listener() { return ctx.openDialog(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](2, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showNav);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkActive, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatAnchor], styles: [".nav-item[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  line-height: 36px;\n  text-align: center;\n  color: #707070;\n}\n\n.fixed-top[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 1;\n}\n\n.auth-links[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 24px;\n  line-height: 36px;\n  \n  display: flex;\n  align-items: center;\n  text-align: center;\n  color: #ffffff !important;\n}\n\n.bucca-logo[_ngcontent-%COMP%] {\n  max-height: 8vh;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgtbmF2YmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFFbEIsY0FBYztBQUFoQjs7QUFHQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0FBQVo7O0FBR0E7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLDRCQUFBO0VBRUEsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFFbEIseUJBQXlCO0FBRjNCOztBQUtBO0VBQ0UsZUFBZTtFQUNmLFdBQVc7QUFGYiIsImZpbGUiOiJhdXRoLW5hdmJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5uYXYtaXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBjb2xvcjogIzcwNzA3MDtcbn1cblxuLmZpeGVkLXRvcCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTtcbn1cblxuLmF1dGgtbGlua3Mge1xuICBmb250LWZhbWlseTogUG9wcGlucztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMzZweDtcbiAgLyogaWRlbnRpY2FsIHRvIGJveCBoZWlnaHQgKi9cblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbn1cblxuLmJ1Y2NhLWxvZ28ge1xuICBtYXgtaGVpZ2h0OiA4dmg7XG4gIHdpZHRoOiBhdXRvO1xufVxuIl19 */"] });


/***/ }),

/***/ 96990:
/*!***************************************************!*\
  !*** ./src/app/landing/landing-routing.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingRoutingModule": function() { return /* binding */ LandingRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _landing_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing.component */ 341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);




const routes = [
    {
        path: '',
        component: _landing_component__WEBPACK_IMPORTED_MODULE_0__.LandingComponent
    }
];
class LandingRoutingModule {
}
LandingRoutingModule.ɵfac = function LandingRoutingModule_Factory(t) { return new (t || LandingRoutingModule)(); };
LandingRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: LandingRoutingModule });
LandingRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LandingRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 341:
/*!**********************************************!*\
  !*** ./src/app/landing/landing.component.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingComponent": function() { return /* binding */ LandingComponent; }
/* harmony export */ });
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ 97175);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _auth_navbar_auth_navbar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-navbar/auth-navbar.component */ 71245);



class LandingComponent {
    // customOptions: OwlOptions = {
    //   loop: true,
    //   mouseDrag: false,
    //   touchDrag: false,
    //   pullDrag: false,
    //   dots: false,
    //   navSpeed: 700,
    //   navText: [
    //     `<img class="carousel-btn" alt="prev-btn" src='../../assets/svg/left_carousel.svg'>`,
    //     `<img class="carousel-btn" alt="next-btn" src='../../assets/svg/right_carousel.svg'>`,
    //   ],
    //   responsive: {
    //     0: {
    //       items: 1,
    //     },
    //     400: {
    //       items: 1,
    //     },
    //     740: {
    //       items: 1,
    //     },
    //     940: {
    //       items: 1,
    //     },
    //   },
    //   nav: true,
    // };
    // slidesStore = [
    //   {
    //     id: 1,
    //     src: "../../assets/images/carousel.png",
    //     alt: "Image_1",
    //     title: "Image_1",
    //   },
    //   {
    //     id: 2,
    //     // src:'../../assets/svg/carousel.svg',
    //     src: "../../assets/images/carousel.png",
    //     alt: "Image_2",
    //     title: "Image_3",
    //   },
    //   {
    //     id: 3,
    //     // src:'../../assets/svg/carousel.svg',
    //     src: "../../assets/images/carousel.png",
    //     alt: "Image_3",
    //     title: "Image_3",
    //   },
    // ];
    ngOnInit() { }
}
LandingComponent.ɵfac = function LandingComponent_Factory(t) { return new (t || LandingComponent)(); };
LandingComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LandingComponent, selectors: [["app-landing"]], decls: 281, vars: 3, consts: [[1, "px-0", "container-fluid", "bg-color1"], [3, "showNav"], [1, "row", "hero-section"], [1, "my-auto", "col-md-9"], [1, "row"], [1, "col-8"], [1, "my-5", "hero-text", "p-l-50"], [1, "p-1", "card"], [1, "d-flex"], [1, "mx-4", "hero-text-2"], [1, "p-2", "px-5", "ml-auto", "btn", "go-button"], [1, "btn-group", "btn-group-pill", "m-t-50"], ["type", "button", 1, "btn", "btn-primary"], ["width", "14", "height", "28", "viewBox", "0 0 14 28", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M13.2821 0.00575642L9.97166 0C6.2525 0 3.84902 2.67242 3.84902 6.80869V9.94796H0.520533C0.232912 9.94796 0 10.2007 0 10.5124V15.0608C0 15.3725 0.233178 15.6249 0.520533 15.6249H3.84902V27.1021C3.84902 27.4138 4.08193 27.6662 4.36956 27.6662H8.71229C8.99991 27.6662 9.23282 27.4135 9.23282 27.1021V15.6249H13.1246C13.4122 15.6249 13.6451 15.3725 13.6451 15.0608L13.6467 10.5124C13.6467 10.3627 13.5918 10.2194 13.4943 10.1135C13.3968 10.0075 13.264 9.94796 13.1259 9.94796H9.23282V7.28676C9.23282 6.00769 9.51407 5.35836 11.0515 5.35836L13.2816 5.3575C13.5689 5.3575 13.8018 5.10479 13.8018 4.79337V0.569886C13.8018 0.258751 13.5692 0.00633206 13.2821 0.00575642Z", "fill", "white"], ["width", "26", "height", "28", "viewBox", "0 0 26 28", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M6.37062 8.99609H1.23455C1.0066 8.99609 0.821899 9.19636 0.821899 9.44331V27.3254C0.821899 27.5725 1.0066 27.7726 1.23455 27.7726H6.37062C6.59857 27.7726 6.78327 27.5725 6.78327 27.3254V9.44331C6.78327 9.19636 6.59857 8.99609 6.37062 8.99609Z", "fill", "white"], ["d", "M3.80443 0.106445C1.93557 0.106445 0.415161 1.75238 0.415161 3.7755C0.415161 5.79952 1.93557 7.44608 3.80443 7.44608C5.6718 7.44608 7.19097 5.79943 7.19097 3.7755C7.19106 1.75238 5.6718 0.106445 3.80443 0.106445Z", "fill", "white"], ["d", "M19.4351 8.552C17.3722 8.552 15.8473 9.51306 14.9223 10.6051V9.44365C14.9223 9.1967 14.7376 8.99644 14.5097 8.99644H9.59088C9.36293 8.99644 9.17822 9.1967 9.17822 9.44365V27.3257C9.17822 27.5727 9.36293 27.7729 9.59088 27.7729H14.7158C14.9438 27.7729 15.1285 27.5727 15.1285 27.3257V18.4782C15.1285 15.4968 15.8757 14.3353 17.7934 14.3353C19.882 14.3353 20.0479 16.1973 20.0479 18.6316V27.3258C20.0479 27.5728 20.2326 27.773 20.4606 27.773H25.5875C25.8154 27.773 26.0001 27.5728 26.0001 27.3258V17.5172C26.0001 13.084 25.2201 8.552 19.4351 8.552Z", "fill", "white"], ["width", "32", "height", "28", "viewBox", "0 0 32 28", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M11.7621 27.7727C10.4132 27.7727 9.02489 27.6543 7.62822 27.417C5.16828 26.9987 2.67812 25.6042 1.97347 25.1867L0.125366 24.0917L2.12625 23.3786C4.31348 22.5992 5.64399 22.1156 7.29101 21.3584C5.64185 20.4929 4.37083 18.936 3.759 16.9233L3.29352 15.3919L3.67523 15.4551C3.31327 15.0597 3.02746 14.6584 2.80591 14.2935C2.01798 12.9965 1.60081 11.4117 1.68957 10.0536L1.77715 8.71693L2.51558 9.02692C2.20407 8.38939 1.97895 7.70854 1.84663 6.99493C1.52418 5.25461 1.79404 3.40573 2.60672 1.78895L3.24997 0.509247L4.11025 1.62905C6.83101 5.17105 10.2771 7.27217 14.3672 7.88726C14.2001 6.63928 14.3253 5.43489 14.7396 4.35532C15.222 3.09831 16.0801 2.03241 17.2205 1.27263C18.487 0.429041 20.0229 0.0202684 21.5452 0.121623C23.1603 0.229168 24.6267 0.885008 25.7914 2.01951C26.3601 1.85936 26.7792 1.68837 27.3456 1.45729C27.6864 1.31828 28.0728 1.16045 28.5564 0.979916L30.3383 0.314533L29.1763 3.91121C29.2529 3.90425 29.332 3.89832 29.4145 3.89445L31.3174 3.80109L30.1927 5.46687C30.1282 5.56229 30.1118 5.58937 30.089 5.62676C29.9983 5.7748 29.8855 5.95894 28.3417 8.19287C27.9553 8.75226 27.7623 9.48083 27.7982 10.2447C27.935 13.1477 27.6064 15.7741 26.8209 18.0509C26.0779 20.2048 24.9266 22.053 23.3993 23.5439C21.5093 25.3884 19.0993 26.6513 16.236 27.2971C14.8315 27.6138 13.3232 27.7727 11.7621 27.7727Z", "fill", "white"], [1, "col-md-3", "bg-burgundy"], [1, "d-none", "d-md-block", "hero-carousel", "container-fluid"], [1, "col-6"], [1, ""], [1, "carousel-bg"], ["src", "../../assets/images/carousel.svg", "alt", "slide.alt", "title", "slide.title", 1, "img-fluid", "carousel-img"], [1, "mt-5", "row"], [1, "mx-auto", "col-lg-10", "row"], [1, "my-auto", "blockquote", "col-lg"], [1, "mb-0", "text-primary", "patners-blockquote"], [1, "my-auto", "col-lg"], [1, "mb-0", "small", "text-gray"], [1, "m-t-50"], [1, "col"], ["width", "316", "height", "50", "viewBox", "0 0 316 50", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["cx", "5.89939", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "5.89939", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "157.973", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "157.973", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "310.046", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "310.046", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "81.936", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "81.936", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "234.009", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "234.009", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "43.9177", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "43.9177", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "195.991", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "195.991", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "119.954", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "119.954", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "272.027", "cy", "6.04587", "r", "5.89939", "fill", "#E6E6E6"], ["cx", "272.027", "cy", "44.0642", "r", "5.89939", "fill", "#E6E6E6"], [1, "mt-4", "row"], [1, "col-lg"], [1, "text-white", "card", "partner-card"], ["src", "../../assets/svg/partner-1.svg", "alt", "partner 1", 1, "card-img"], [1, "mt-auto", "card-img-overlay"], [1, "card-title"], [1, "card-text"], ["src", "../../assets/svg/location.svg", "alt", ""], [1, "rounded"], ["src", "../../assets/svg/resturant_logo.svg", "alt", "", 1, "bg-white", "rounded", "img-fluid"], ["src", "../../assets/svg/partner-2.svg", "alt", "partner 2", 1, "card-img"], ["src", "../../assets/svg/resturant_logo_2.svg", "alt", "", 1, "bg-white", "rounded", "img-fluid"], [1, "my-auto", "col-lg-3"], [1, "carousel-next"], [1, "badge", "badge-pill", "badge-primary"], ["width", "13", "height", "22", "viewBox", "0 0 13 22", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M12.6785 11.7851L2.78516 21.6751C2.35105 22.1082 1.64772 22.1082 1.21251 21.6751C0.778399 21.2421 0.778399 20.5388 1.21251 20.1058L10.3211 11.0005L1.21361 1.89522C0.779495 1.4622 0.779495 0.758873 1.21361 0.324761C1.64772 -0.108254 2.35214 -0.108254 2.78625 0.324761L12.6796 10.2147C13.107 10.6432 13.107 11.3576 12.6785 11.7851Z", "fill", "white"], [1, "about"], [1, "mx-auto", "col-lg-10", "about-div"], [1, "bg-white", "p-50", "m-50"], [1, "mx-auto", "col-3"], [1, "about-line"], [1, "mx-auto", "col-4"], [1, "text-center", "about-header", "m-t-20"], [1, "mx-auto", "col-4", "m-t-50"], [1, "text-center", "text-gray", "small"], [1, "mx-auto", "mt-5", "d-block", "btn", "btn-primary"], [1, "what-we-do"], [1, "container-fluid"], [1, "mx-auto", "col", "row"], [1, "mb-0", "ml-5", "small", "mt-n2", "text-gray"], [1, "col-6", "d-flex", "align-items-center"], [1, "col-auto", "text-center", "p-50", "bg-secondary-2"], ["src", "../../assets/svg/computer.svg", "alt", ""], [1, "mx-auto"], [1, "text-center"], [1, "row", "h-100"], [1, "col-7", "what_we_do_bg_1"], [1, "d-flex", "justify-content-around", "align-items-center"], [1, "text-center", "p-50", "bg-secondary-2"], ["src", "../../assets/svg/partner-management.svg", "alt", ""], [1, "col-9"], ["src", "../../assets/svg/cuttlery.svg", "alt", ""], [1, "mx-auto", "my-auto", "col-4", "what_we_do_bg_2"], [1, "bg-secondary-2"], [1, "mx-auto", "my-auto", "p-50", "col-8"], ["src", "../../assets/svg/bike.svg", "alt", "", 1, "d-block"], [1, "mt-5", "text-center"], [1, "contact-form"], [1, "container"], [1, "mx-auto", "col-lg-7"], [1, "text-center", "text-primary"], [1, "text-center", "text-gray"], [1, "text-center", "text-gray", "text-lead", "small"], [1, "form", "theme-form"], [1, "mt-3", "col-12"], [1, "form-group"], ["type", "text", "placeholder", " Name", 1, "form-control", "input-air-primary"], ["type", "email", "placeholder", " E-mail", 1, "form-control", "input-air-primary"], ["type", "text", "placeholder", " Phone Number", 1, "form-control", "input-air-primary"], ["type", "text", "placeholder", " Location", 1, "form-control", "input-air-primary"], ["type", "text", "placeholder", " Company Name", 1, "form-control", "input-air-primary"], ["placeholder", "Query", 1, "form-control", "input-air-primary", "digits"], [1, "mb-0", "form-group"], ["placeholder", " Any Other Message", "rows", "3", 1, "form-control", "input-air-primary"], [1, "mt-3", "btn", "btn-primary", "btn-block"], [1, "download"], [1, "mx-5", "row", "download-div"], [1, "px-4", "col-lg-6", "p-t-50"], [1, "mb-0", "ml-5", "small", "text-gray"], [1, "mt-5", "d-flex", "justify-content-evenly"], ["href", "https://play.google.com/store/apps/details?id=com.siddigital_.nrc", "target", "_blank", 1, ""], ["src", "../../assets/svg/google_play_btn.svg", "alt", "playstore", 1, "download-link", "img-fluid"], ["href", "https://apps.apple.com/ng/app/nigeria-railway-cooperation/id1569169799"], ["src", "../../assets/svg/apple_store.svg", "alt", "appstore", 1, "download-link", "img-fluid"], [1, "mx-auto", "text-center", "col-6"], [1, "my-3", "text-gray"], [1, "text-gray", "small"], [1, "col-lg-6", "iphone-div"], ["src", "../../assets/images/iphone.png", "alt", "", 1, "mx-auto", "my-auto", "img-fluid", "d-block", "iphone"], [1, "newsletter"], [1, "mx-auto", "col-lg-6", "m-t-50", "m-y-50"], [1, "text-center", "newsletter-text", "text-primary"], [1, "text-center", "text-gray", "m-b-50"], [1, "input-group", "pill-input-group"], ["type", "text", "placeholder", "E-mail", 1, "form-control", "newsletter-input", "form-control-lg", "btn-pill", "input-air-primary"], [1, "input-group-append"], [1, "input-group-text", "bg-primary"], ["width", "24", "height", "18", "viewBox", "0 0 24 18", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M23.6731 7.75748L16.5311 0.339444C16.0954 -0.113148 15.3887 -0.113148 14.9529 0.339444C14.5171 0.79213 14.5171 1.52596 14.9529 1.97864L20.1899 7.41801H1.11594C0.499672 7.41801 0 7.93699 0 8.57708C0 9.21707 0.499672 9.73614 1.11594 9.73614H20.1899L14.9531 15.1755C14.5173 15.6282 14.5173 16.362 14.9531 16.8147C15.1709 17.0409 15.4566 17.1542 15.7422 17.1542C16.0278 17.1542 16.3134 17.0409 16.5313 16.8147L23.6731 9.39668C24.109 8.94399 24.109 8.21016 23.6731 7.75748Z", "fill", "white"], [1, "text-center", "text-gray", "m-t-50"], [1, "footer"], [1, "d-flex", "justify-content-between"], ["src", "../../../../assets/svg/bucca_footer_logo.svg", "alt", "", 1, "img-fluid"], [1, "footer-copyright"], [1, "mb-0"], ["src", "../../../../assets/svg/sid_digital_favicon.svg", "alt", "", 1, "img-fluid"]], template: function LandingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-auth-navbar", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Cafeteria Management Solution at its best ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, " Want to Get Onboard ? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "GO");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "svg", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "svg", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](22, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "svg", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](26, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](29, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](33, "img", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "blockquote", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](38, "p", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "some of our Food partners");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "p", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, adipiscing cursus auctor eget sed phasellus senectus. Ut tellus donec vestibulum tristique leo bibendum in a, tincidunt. Volutpat metus id amet, nam hac magna accumsan. Nascetur ac tortor purus ultrices morbi tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, adipiscing cursus auctor eget sed. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](43, "div", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "svg", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](46, "circle", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](47, "circle", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](48, "circle", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](49, "circle", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](50, "circle", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](51, "circle", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](52, "circle", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](53, "circle", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](54, "circle", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](55, "circle", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](56, "circle", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](57, "circle", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](58, "circle", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](59, "circle", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](60, "circle", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](61, "circle", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](62, "circle", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](63, "circle", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "div", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](65, "div", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](67, "img", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](71, "h5", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](72, "Four Seasons");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "p", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74, "we are all about we are all about to the fullest and all content dining out or in!dining out or in!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](75, "p", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](76, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](77, "img", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](78, " Lekki ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](79, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](80, "img", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](81, "div", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](82, "div", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](83, "img", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](84, "div", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](85, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](86, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](87, "h5", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](88, "Twin Towers ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](89, "p", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](90, "we are all about we are all about to the fullest and all content dining out or in!dining out or in!");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](91, "p", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](92, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](93, "img", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](94, " Ikoyi ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](95, "div", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](96, "img", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](97, "div", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](98, "div", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](99, "span", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](100, "svg", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](101, "path", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](102, "section", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](103, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](104, "div", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](105, "div", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](106, "div", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](107, "hr", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](108, "div", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](109, "h1", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](110, " \u201CBUCCA\u201D cafeteria management solution for all individuals ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](111, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](112, "p", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](113, " Order lunch, fuel for meetings or late-night deliveries to the office, at home or anywhere. Your favorite restaurants coming to your door stepljjfbuehfjejbjehfjejqe ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](114, "p", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](115, " . Mary Jane Watson, ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](116, "button", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](117, " Get Started");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](118, "section", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](119, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](120, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](121, "div", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](122, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](123, "blockquote", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](124, "p", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](125, "What we do");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](126, "p", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](127, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, adipiscing cursus auctor eget sed phasellus senectus. Ut tellus donec vestibulum tristique leo bibendum in a, tincidunt. Volutpat metus id amet, nam hac magna accumsan. Nascetur ac tortor purus ultrices morbi tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, hbvhbvhCBasbhkbgckjsabfjchsaojhfjqehfouh ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](128, "div", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](129, "div", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](130, "img", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](131, "div", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](132, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](133, "h4", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](134, " Customizable platform with Robust Data engine and Reports ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](135, "p", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](136, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](137, "div", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](138, "div", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](139, "div", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](140, "div", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](141, "img", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](142, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](143, "div", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](144, "h4", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](145, " Strong Partner Management ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](146, "p", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](147, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](148, "div", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](149, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](150, "div", 95);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](151, "h4", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](152, " Digital Canteen Transformation ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](153, "p", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](154, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](155, "div", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](156, "img", 96);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](157, "div", 97);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](158, "div", 98);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](159, "div", 99);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](160, "img", 100);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](161, "h4", 101);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](162, " Service Delivery ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](163, "p", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](164, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](165, "section", 102);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](166, "div", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](167, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](168, "div", 104);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](169, "h1", 105);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](170, " Get in Touch ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](171, "h5", 106);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](172, " Fill in the form below ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](173, "p", 107);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](174, " Suspe ndisse suscipit sagittis leo sit met condimentum estibulum issi. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](175, "form", 108);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](176, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](177, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](178, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](179, "input", 111);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](180, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](181, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](182, "input", 112);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](183, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](184, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](185, "input", 113);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](186, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](187, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](188, "input", 114);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](189, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](190, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](191, "input", 115);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](192, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](193, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](194, "select", 116);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](195, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](196, "Query");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](197, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](198, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](199, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](200, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](201, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](202, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](203, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](204, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](205, "option");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](206, "5");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](207, "div", 109);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](208, "div", 117);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](209, "textarea", 118);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](210, "button", 119);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](211, "Submit");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](212, "section", 120);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](213, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](214, "div", 121);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](215, "div", 122);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](216, "blockquote", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](217, "p", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](218, "Download app for exciting deals");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](219, "p", 123);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](220, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, adipiscing cursus auctor eget sed phasellus senectus. Ut tellus donec vestibulum tristique leo bibendum in a, tincidunt ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](221, "div", 124);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](222, "div", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](223, "a", 125);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](224, "img", 126);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](225, "div", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](226, "a", 127);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](227, "img", 128);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](228, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](229, "div", 129);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](230, "span", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](231, "01");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](232, "h4", 130);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](233, "Fast Booking");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](234, "p", 131);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](235, " Curabitur in eleifend turpis, id vehicula odio. Donec pulvinar tellus eget magna aliquet ultricies.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](236, "div", 129);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](237, "span", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](238, "02");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](239, "h4", 130);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](240, "Ease Of USe");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](241, "p", 131);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](242, " Curabitur in eleifend turpis, id vehicula odio. Donec pulvinar tellus eget magna aliquet ultricies.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](243, "div", 129);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](244, "span", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](245, "03");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](246, "h4", 130);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](247, "Special Offers");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](248, "p", 131);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](249, " Curabitur in eleifend turpis, id vehicula odio. Donec pulvinar tellus eget magna aliquet ultricies.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](250, "div", 132);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](251, "img", 133);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](252, "section", 134);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](253, "div", 103);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](254, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](255, "div", 135);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](256, "h1", 136);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](257, "Get notified ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](258, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](259, " about new amazing products");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](260, "p", 137);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](261, " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est, adipiscing cursus auctor eget sed phasellus senectus. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](262, "div", 110);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](263, "div", 138);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](264, "input", 139);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](265, "div", 140);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](266, "span", 141);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](267, "svg", 142);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](268, "path", 143);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](269, "p", 144);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](270, " Terms and Conditions \u00B7 Privacy Policy ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](271, "section", 145);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](272, "div", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](273, "div", 146);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](274, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](275, "img", 147);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](276, "div", 148);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](277, "p", 149);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](278, "\u00A9 2021 SID Digital / V2.1.");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](279, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](280, "img", 150);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showNav", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("@flyInOut", undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](102);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("@flyInOut", undefined);
    } }, directives: [_auth_navbar_auth_navbar_component__WEBPACK_IMPORTED_MODULE_0__.AuthNavbarComponent], styles: [".nav-item[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  line-height: 36px;\n  text-align: center;\n  color: #707070;\n}\n\n.fixed-top[_ngcontent-%COMP%] {\n  position: absolute;\n}\n\n.auth-links[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 24px;\n  line-height: 36px;\n  \n  display: flex;\n  align-items: center;\n  text-align: center;\n  color: #ffffff !important;\n}\n\n.hero-text-2[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 24px;\n  \n  display: flex;\n  align-items: center;\n  text-transform: capitalize;\n  color: #000000;\n  opacity: 0.6;\n}\n\n.hero-carousel[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 50%;\n  top: 90px;\n  overflow-x: hidden;\n}\n\n.owl-theme[_ngcontent-%COMP%]   .owl-nav[_ngcontent-%COMP%] {\n  background: transparent !important;\n  float: right;\n}\n\n.carousel-bg[_ngcontent-%COMP%] {\n  background-image: url('carousel_background.svg'), url('carousel_background.svg');\n  background-position: left top, left bottom;\n  background-repeat: no-repeat;\n  background-size: 40vh;\n}\n\n.owl-theme[_ngcontent-%COMP%]   .owl-nav[_ngcontent-%COMP%]   [class*='owl-'][_ngcontent-%COMP%]:hover {\n  background: transparent;\n}\n\n.owl-theme[_ngcontent-%COMP%]   .owl-nav[_ngcontent-%COMP%]   [class*='owl-'][_ngcontent-%COMP%] {\n  background: transparent;\n}\n\n.go-button[_ngcontent-%COMP%] {\n  background: #9b3934;\n  border-radius: 60px 0px 0px 0px;\n  color: #ffffff;\n}\n\n.badge[_ngcontent-%COMP%] {\n  padding: 10px;\n}\n\n.btn-group-pill[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:first-child {\n  border-radius: 0px 0 0 0px;\n}\n\n.carousel-next[_ngcontent-%COMP%]::before {\n  content: url('button_line.svg');\n  left: 0;\n}\n\n.patners-dot[_ngcontent-%COMP%] {\n  background-image: url('patners_dot.svg');\n  background-position: left top;\n  background-repeat: no-repeat;\n}\n\n.partner-card[_ngcontent-%COMP%] {\n  border-radius: 20px !important;\n  background-image: url('partner-1.svg');\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: cover;\n  position: relative;\n}\n\n.card-img-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  height: -webkit-max-content;\n  height: -moz-max-content;\n  height: max-content;\n  min-height: 250px;\n  background: rgba(155, 57, 52, 0.7);\n  border-radius: 0px 0px 20px 20px;\n}\n\n.patners-blockquote[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: 500;\n  font-size: 48px;\n  line-height: 62px;\n  \n  display: flex;\n  align-items: center;\n  text-transform: capitalize;\n  color: #9b3934;\n}\n\nblockquote[_ngcontent-%COMP%] {\n  border-left: 25px solid #9b3934;\n  padding: 25px, 30px;\n}\n\n.about[_ngcontent-%COMP%] {\n  background-color: #ffedde;\n  padding: 200px 0;\n}\n\n.about[_ngcontent-%COMP%]   .about-div[_ngcontent-%COMP%] {\n  background-image: url('left_bottom_vertical.svg'), url('bottom_left_horizontal.svg'), url('right_top_vertical.svg'), url('right_top_horizontal.svg');\n  background-repeat: no-repeat;\n  background-position: bottom left, bottom left, top right, top right;\n}\n\n.about[_ngcontent-%COMP%]   .about-line[_ngcontent-%COMP%] {\n  width: 255.62px;\n  height: 15px;\n  background-color: #9b3934;\n}\n\n.about[_ngcontent-%COMP%]   .about-header[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: bold;\n  font-size: 36px;\n  line-height: 42px;\n  text-align: center;\n  color: rgba(0, 0, 0, 0.6);\n}\n\n.about[_ngcontent-%COMP%]   .about-text[_ngcontent-%COMP%] {\n  font-family: Roboto;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 38px;\n  line-height: 22px;\n  text-align: center;\n  color: #000000;\n}\n\n.what-we-do[_ngcontent-%COMP%] {\n  margin: 200px 0;\n}\n\n.what_we_do_bg_1[_ngcontent-%COMP%] {\n  background: url('what_we_do_col_1_bg.svg');\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: left;\n}\n\n.what_we_do_bg_2[_ngcontent-%COMP%] {\n  background: url('what_we_do_bg_2.svg');\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n.contact-form[_ngcontent-%COMP%] {\n  margin: 200px 0;\n}\n\n.download[_ngcontent-%COMP%] {\n  background-color: #ffedde;\n}\n\n.download[_ngcontent-%COMP%]   .download-div[_ngcontent-%COMP%] {\n  background: url('food.svg'), url('drinks.svg');\n  background-repeat: no-repeat;\n  background-position: center, right;\n  background-size: 15%, auto;\n}\n\n.download[_ngcontent-%COMP%]   .download-div[_ngcontent-%COMP%]   .iphone-div[_ngcontent-%COMP%] {\n  background: url('download_dot.svg');\n  background-repeat: no-repeat;\n  background-position: left;\n  background-size: 50%;\n}\n\n.download[_ngcontent-%COMP%]   .download-div[_ngcontent-%COMP%]   .iphone-div[_ngcontent-%COMP%]   .iphone[_ngcontent-%COMP%] {\n  width: auto;\n  max-height: 800px;\n}\n\n.download[_ngcontent-%COMP%]   .download-div[_ngcontent-%COMP%]   .download-link[_ngcontent-%COMP%] {\n  max-height: 5rem;\n  width: auto;\n}\n\n.newsletter[_ngcontent-%COMP%] {\n  padding: 200px 0;\n  background-image: url('newsletter_bg.svg');\n  background-repeat: no-repeat;\n  background-position: left bottom;\n}\n\n.newsletter[_ngcontent-%COMP%]   .newsletter-text[_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 36px;\n  line-height: 48px;\n  \n  display: flex;\n  align-items: center;\n  text-align: center;\n  text-transform: capitalize;\n  color: #9b3934;\n}\n\n.newsletter[_ngcontent-%COMP%]   .newsletter-input[_ngcontent-%COMP%] {\n  padding: 38px;\n}\n\n.newsletter[_ngcontent-%COMP%]   .pill-input-group[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]:last-child   span[_ngcontent-%COMP%] {\n  border-top-right-radius: 2.3rem;\n  border-bottom-right-radius: 2.3rem;\n}\n\ninput[placeholder][_ngcontent-%COMP%] {\n  font-family: Poppins;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 16px;\n  line-height: 24px;\n  \n  display: flex;\n  align-items: center;\n  text-transform: capitalize;\n  color: #2e266f;\n  opacity: 0.6;\n}\n\n.owl-theme[_ngcontent-%COMP%]   .owl-nav[_ngcontent-%COMP%] {\n  margin-top: -150px;\n}\n\n.carousel-img[_ngcontent-%COMP%] {\n  margin-top: -40px;\n  max-height: 70vh;\n  width: 100%;\n  height: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhbmRpbmcuY29tcG9uZW50LnNjc3MiLCIuLi8uLi9hc3NldHMvc2Nzcy90aGVtZS9fdmFyaWFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUVsQixjQUFjO0FBRmhCOztBQUtBO0VBQ0Usa0JBQWtCO0FBRnBCOztBQUtBO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQiw0QkFBQTtFQUVBLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBRWxCLHlCQUF5QjtBQUozQjs7QUFPQTtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGVBQWU7RUFFZixZQUFBO0VBRUEsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFFMUIsY0FBYztFQUVkLFlBQVk7QUFSZDs7QUFXQTtFQUNFLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsU0FBUztFQUVULGtCQUFrQjtBQVRwQjs7QUFZQTtFQUVFLGtDQUFrQztFQUNsQyxZQUFZO0FBVmQ7O0FBYUE7RUFDRSxnRkFBOEc7RUFDOUcsMENBQTBDO0VBQzFDLDRCQUE0QjtFQUM1QixxQkFBcUI7QUFWdkI7O0FBYUE7RUFDRSx1QkFBdUI7QUFWekI7O0FBYUE7RUFDRSx1QkFBdUI7QUFWekI7O0FBYUE7RUFDRSxtQkN6RWdCO0VEMEVoQiwrQkFBK0I7RUFDL0IsY0FBYztBQVZoQjs7QUFhQTtFQUNFLGFBQWE7QUFWZjs7QUFhQTtFQUNFLDBCQUEwQjtBQVY1Qjs7QUFhQTtFQUNFLCtCQUE4QztFQUM5QyxPQUFPO0FBVlQ7O0FBYUE7RUFDRSx3Q0FBdUQ7RUFDdkQsNkJBQTZCO0VBQzdCLDRCQUE0QjtBQVY5Qjs7QUFhQTtFQUNFLDhCQUE4QjtFQUM5QixzQ0FBcUQ7RUFDckQsNEJBQTRCO0VBQzVCLDJCQUEyQjtFQUMzQixzQkFBc0I7RUFFdEIsa0JBQWtCO0FBWHBCOztBQWNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCwyQkFBbUI7RUFBbkIsd0JBQW1CO0VBQW5CLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFHakIsa0NBQWtDO0VBQ2xDLGdDQUFnQztBQWJsQzs7QUFnQkE7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFlBQUE7RUFFQSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUUxQixjQ2xJZ0I7QURtSGxCOztBQWtCQTtFQUNFLCtCQ3RJZ0I7RUR1SWhCLG1CQUFtQjtBQWZyQjs7QUFrQkE7RUFDRSx5QkMxSW1CO0VEMkluQixnQkFBZ0I7QUFmbEI7O0FBYUE7RUFLSSxvSkFHZ0Q7RUFDaEQsNEJBQTRCO0VBQzVCLG1FQUFtRTtBQWpCdkU7O0FBT0E7RUFlSSxlQUFlO0VBQ2YsWUFBWTtFQUNaLHlCQzNKYztBRHlJbEI7O0FBQ0E7RUFzQkksa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUVsQix5QkFBeUI7QUFwQjdCOztBQVJBO0VBZ0NJLG1CQUFtQjtFQUNuQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsa0JBQWtCO0VBRWxCLGNBQWM7QUFyQmxCOztBQXlCQTtFQUNFLGVBQWU7QUF0QmpCOztBQXlCQTtFQUNFLDBDQUF5RDtFQUN6RCw0QkFBNEI7RUFDNUIsc0JBQXNCO0VBQ3RCLHlCQUF5QjtBQXRCM0I7O0FBeUJBO0VBQ0Usc0NBQXFEO0VBQ3JELDRCQUE0QjtFQUU1QixzQkFBc0I7QUF2QnhCOztBQTBCQTtFQUNFLGVBQWU7QUF2QmpCOztBQTBCQTtFQUNFLHlCQzNNbUI7QURvTHJCOztBQXNCQTtFQUtJLDhDQUE0RTtFQUM1RSw0QkFBNEI7RUFDNUIsa0NBQWtDO0VBQ2xDLDBCQUEwQjtBQXZCOUI7O0FBZUE7RUFXTSxtQ0FBa0Q7RUFDbEQsNEJBQTRCO0VBQzVCLHlCQUF5QjtFQUN6QixvQkFBb0I7QUF0QjFCOztBQVFBO0VBaUJRLFdBQVc7RUFDWCxpQkFBaUI7QUFyQnpCOztBQUdBO0VBdUJNLGdCQUFnQjtFQUNoQixXQUFXO0FBdEJqQjs7QUEyQkE7RUFDRSxnQkFBZ0I7RUFDaEIsMENBQXlEO0VBQ3pELDRCQUE0QjtFQUM1QixnQ0FBZ0M7QUF4QmxDOztBQW9CQTtFQU9JLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsWUFBQTtFQUVBLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBQ2xCLDBCQUEwQjtFQUUxQixjQzNQYztBRGtPbEI7O0FBTUE7RUF1QkksYUFBYTtBQXpCakI7O0FBRUE7RUEyQkksK0JBQStCO0VBQy9CLGtDQUFrQztBQXpCdEM7O0FBNkJBO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixZQUFBO0VBRUEsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFFMUIsY0FBYztFQUVkLFlBQVk7QUE3QmQ7O0FBZ0NBO0VBQ0Usa0JBQWtCO0FBN0JwQjs7QUFnQ0E7RUFDRSxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxZQUNGO0FBOUJBIiwiZmlsZSI6ImxhbmRpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi4vLi4vYXNzZXRzL3Njc3MvdGhlbWUvdmFyaWFibGVzXCI7XG5cbi5uYXYtaXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBjb2xvcjogIzcwNzA3MDtcbn1cblxuLmZpeGVkLXRvcCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmF1dGgtbGlua3Mge1xuICBmb250LWZhbWlseTogUG9wcGlucztcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBsaW5lLWhlaWdodDogMzZweDtcbiAgLyogaWRlbnRpY2FsIHRvIGJveCBoZWlnaHQgKi9cblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbn1cblxuLmhlcm8tdGV4dC0yIHtcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAyNHB4O1xuICAvLyBsaW5lLWhlaWdodDogOTBweDtcbiAgLyogb3IgMzc1JSAqL1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuXG4gIGNvbG9yOiAjMDAwMDAwO1xuXG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLmhlcm8tY2Fyb3VzZWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDUwJTtcbiAgdG9wOiA5MHB4O1xuICAvLyBoZWlnaHQ6IDUwJTtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xufVxuXG4ub3dsLXRoZW1lIC5vd2wtbmF2IHtcbiAgLy8gdmlzaWJpbGl0eTogaGlkZGVuICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmNhcm91c2VsLWJnIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uL2Fzc2V0cy9zdmcvY2Fyb3VzZWxfYmFja2dyb3VuZC5zdmcpLCB1cmwoLi4vLi4vYXNzZXRzL3N2Zy9jYXJvdXNlbF9iYWNrZ3JvdW5kLnN2Zyk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgdG9wLCBsZWZ0IGJvdHRvbTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiA0MHZoO1xufVxuXG4ub3dsLXRoZW1lIC5vd2wtbmF2IFtjbGFzcyo9J293bC0nXTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4ub3dsLXRoZW1lIC5vd2wtbmF2IFtjbGFzcyo9J293bC0nXSB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4uZ28tYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogJHByaW1hcnktY29sb3I7XG4gIGJvcmRlci1yYWRpdXM6IDYwcHggMHB4IDBweCAwcHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG4uYmFkZ2Uge1xuICBwYWRkaW5nOiAxMHB4O1xufVxuXG4uYnRuLWdyb3VwLXBpbGwgLmJ0bjpmaXJzdC1jaGlsZCB7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwIDAgMHB4O1xufVxuXG4uY2Fyb3VzZWwtbmV4dDo6YmVmb3JlIHtcbiAgY29udGVudDogdXJsKC4uLy4uL2Fzc2V0cy9zdmcvYnV0dG9uX2xpbmUuc3ZnKTtcbiAgbGVmdDogMDtcbn1cblxuLnBhdG5lcnMtZG90IHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uL2Fzc2V0cy9zdmcvcGF0bmVyc19kb3Quc3ZnKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdCB0b3A7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG59XG5cbi5wYXJ0bmVyLWNhcmQge1xuICBib3JkZXItcmFkaXVzOiAyMHB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi9hc3NldHMvc3ZnL3BhcnRuZXItMS5zdmcpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIC8vIGhlaWdodDogNjM2cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLmNhcmQtaW1nLW92ZXJsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgaGVpZ2h0OiBtYXgtY29udGVudDtcbiAgbWluLWhlaWdodDogMjUwcHg7XG4gIC8vIGJhY2tncm91bmQ6ICRwcmltYXJ5LWNvbG9yO1xuICAvLyBvcGFjaXR5OiAwLjc7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTU1LCA1NywgNTIsIDAuNyk7XG4gIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMjBweCAyMHB4O1xufVxuXG4ucGF0bmVycy1ibG9ja3F1b3RlIHtcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiA0OHB4O1xuICBsaW5lLWhlaWdodDogNjJweDtcbiAgLyogb3IgMTI5JSAqL1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuXG4gIGNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcbn1cblxuYmxvY2txdW90ZSB7XG4gIGJvcmRlci1sZWZ0OiAyNXB4IHNvbGlkICRwcmltYXJ5LWNvbG9yO1xuICBwYWRkaW5nOiAyNXB4LCAzMHB4O1xufVxuXG4uYWJvdXQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkc2Vjb25kYXJ5LTI7XG4gIHBhZGRpbmc6IDIwMHB4IDA7XG5cbiAgLmFib3V0LWRpdiB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uL2Fzc2V0cy9zdmcvbGVmdF9ib3R0b21fdmVydGljYWwuc3ZnKSxcbiAgICAgIHVybCguLi8uLi9hc3NldHMvc3ZnL2JvdHRvbV9sZWZ0X2hvcml6b250YWwuc3ZnKSxcbiAgICAgIHVybCguLi8uLi9hc3NldHMvc3ZnL3JpZ2h0X3RvcF92ZXJ0aWNhbC5zdmcpLFxuICAgICAgdXJsKC4uLy4uL2Fzc2V0cy9zdmcvcmlnaHRfdG9wX2hvcml6b250YWwuc3ZnKTtcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbSBsZWZ0LCBib3R0b20gbGVmdCwgdG9wIHJpZ2h0LCB0b3AgcmlnaHQ7XG4gICAgLy8gYmFja2dyb3VuZC1zaXplOiAxNSUsIGF1dG87XG4gIH1cblxuICAuYWJvdXQtbGluZSB7XG4gICAgd2lkdGg6IDI1NS42MnB4O1xuICAgIGhlaWdodDogMTVweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcbiAgfVxuXG4gIC5hYm91dC1oZWFkZXIge1xuICAgIC8vIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogMzZweDtcbiAgICBsaW5lLWhlaWdodDogNDJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICBjb2xvcjogcmdiYSgwLCAwLCAwLCAwLjYpO1xuICB9XG5cbiAgLmFib3V0LXRleHQge1xuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG87XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGZvbnQtc2l6ZTogMzhweDtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICBjb2xvcjogIzAwMDAwMDtcbiAgfVxufVxuXG4ud2hhdC13ZS1kbyB7XG4gIG1hcmdpbjogMjAwcHggMDtcbn1cblxuLndoYXRfd2VfZG9fYmdfMSB7XG4gIGJhY2tncm91bmQ6IHVybCguLi8uLi9hc3NldHMvc3ZnL3doYXRfd2VfZG9fY29sXzFfYmcuc3ZnKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdDtcbn1cblxuLndoYXRfd2VfZG9fYmdfMiB7XG4gIGJhY2tncm91bmQ6IHVybCguLi8uLi9hc3NldHMvc3ZnL3doYXRfd2VfZG9fYmdfMi5zdmcpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAvLyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG5cbi5jb250YWN0LWZvcm0ge1xuICBtYXJnaW46IDIwMHB4IDA7XG59XG5cbi5kb3dubG9hZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRzZWNvbmRhcnktMjtcbiAgLy8gcGFkZGluZzogNzBweCAwO1xuXG4gIC5kb3dubG9hZC1kaXYge1xuICAgIGJhY2tncm91bmQ6IHVybCguLi8uLi9hc3NldHMvc3ZnL2Zvb2Quc3ZnKSwgdXJsKC4uLy4uL2Fzc2V0cy9zdmcvZHJpbmtzLnN2Zyk7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIsIHJpZ2h0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogMTUlLCBhdXRvO1xuXG4gICAgLmlwaG9uZS1kaXYge1xuICAgICAgYmFja2dyb3VuZDogdXJsKC4uLy4uL2Fzc2V0cy9zdmcvZG93bmxvYWRfZG90LnN2Zyk7XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjogbGVmdDtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogNTAlO1xuXG4gICAgICAuaXBob25lIHtcbiAgICAgICAgd2lkdGg6IGF1dG87XG4gICAgICAgIG1heC1oZWlnaHQ6IDgwMHB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIC5kb3dubG9hZC1saW5rIHtcbiAgICAgIG1heC1oZWlnaHQ6IDVyZW07XG4gICAgICB3aWR0aDogYXV0bztcbiAgICB9XG4gIH1cbn1cblxuLm5ld3NsZXR0ZXIge1xuICBwYWRkaW5nOiAyMDBweCAwO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vLi4vYXNzZXRzL3N2Zy9uZXdzbGV0dGVyX2JnLnN2Zyk7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQgYm90dG9tO1xuXG4gIC5uZXdzbGV0dGVyLXRleHQge1xuICAgIGZvbnQtZmFtaWx5OiBQb3BwaW5zO1xuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGZvbnQtc2l6ZTogMzZweDtcbiAgICBsaW5lLWhlaWdodDogNDhweDtcbiAgICAvKiBvciAxMzMlICovXG5cbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuXG4gICAgY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xuICB9XG5cbiAgLm5ld3NsZXR0ZXItaW5wdXQge1xuICAgIHBhZGRpbmc6IDM4cHg7XG4gIH1cblxuICAucGlsbC1pbnB1dC1ncm91cCBkaXY6bGFzdC1jaGlsZCBzcGFuIHtcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMi4zcmVtO1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAyLjNyZW07XG4gIH1cbn1cblxuaW5wdXRbcGxhY2Vob2xkZXJdIHtcbiAgZm9udC1mYW1pbHk6IFBvcHBpbnM7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjRweDtcbiAgLyogb3IgMTUwJSAqL1xuXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuXG4gIGNvbG9yOiAjMmUyNjZmO1xuXG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLm93bC10aGVtZSAub3dsLW5hdiB7XG4gIG1hcmdpbi10b3A6IC0xNTBweDtcbn1cblxuLmNhcm91c2VsLWltZyB7XG4gIG1hcmdpbi10b3A6IC00MHB4O1xuICBtYXgtaGVpZ2h0OiA3MHZoO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBhdXRvXG59XG4iLCIvLyBHZW5lcmFsIHZhcmlhYmxlc1xyXG4kdGhlbWUtZm9udC1jb2xvcjogIzFiMjUyYTtcclxuJHRoZW1lLWJvZHktZm9udC1jb2xvcjogIzMxMzEzMTtcclxuJHRoZW1lLWJvZHktc3ViLXRpdGxlLWNvbG9yOiAjNzc3Nzc3O1xyXG5cclxuLy8gVGhlbWUgY29sb3JzIHZhcmlhYmxlc1xyXG4kYnVyZ3VuZHk6ICM5YjM5MzQ7XHJcbiRzZWNvbmRhcnktMjogI2ZmZWRkZTtcclxuXHJcbi8vICRwcmltYXJ5LWNvbG9yOiAjNDQ2NmYyO1xyXG4kcHJpbWFyeS1jb2xvcjogJGJ1cmd1bmR5O1xyXG4vLyAkc2Vjb25kYXJ5LWNvbG9yOiAjMWVhNmVjIDtcclxuJHNlY29uZGFyeS1jb2xvcjogI0ZGRjVFQyA7XHJcbiRzdWNjZXNzLWNvbG9yOiAjMjJhZjQ3IDtcclxuJGluZm8tY29sb3IgICA6ICMwMDdiZmYgIDtcclxuJHdhcm5pbmctY29sb3I6ICNmZjlmNDA7XHJcbiRkYW5nZXItY29sb3I6ICNmZjUzNzAgO1xyXG4kbGlnaHQtY29sb3IgICA6ICNmNmY3ZmIgO1xyXG4kc2VtaS1kYXJrICA6I2FhYWFhYTtcclxuJGxpZ2h0LXNlbWktZ3JheSAgIDojZWZmMGYxO1xyXG4kbGlnaHQtZ3JheSAgIDojZThlYmYyO1xyXG4kZGFyay1ncmF5IFx0OiM4OTg5ODk7XHJcbiRkYXJrLWNvbG9yICAgOiAjMmEzMTQyO1xyXG4kZ3JheS02MCAgIDojOTk5OTk5IDtcclxuJHRyYW5zcGFyZW50LWNvbG9yOiB0cmFuc3BhcmVudDtcclxuJGF1dGgtYmctY29sb3I6I2ZhZmFmYTtcclxuJGxpZ2h0IDogI2Y2ZjZmNjtcclxuJGxpZ2h0LXRleHQ6ICM5OTk7XHJcbiRncmF5OiAjNzA3MDcwO1xyXG5cclxuJGRhcmstcHJpbWFyeTogIzQ0OGFmZjtcclxuJHBpdGNoLWNvbG9yOiAjZmU4YTdkO1xyXG4kZmxvd2VyLXBpbms6ICNmYjZkOWQ7XHJcbiRkYXJrLXNreTogIzUzNmRmZTtcclxuJGNvbG9yLXNjYXJwYTogIzRjNTY2NztcclxuJGNvbG9yLWZpb3JkOiAjNDU1YTY0O1xyXG5cclxuJGJsYWNrIDogIzAwMDtcclxuJHdoaXRlOiNmZmY7XHJcbiRidG4tYmhvbWUtYmctYzojZmY2MDYwO1xyXG4kYnRuLXNlYXJjaC1iZy1jOiNmZmQwNDI7XHJcbi8vIGVycm9yIHBhZ2UgY29sb3IgZW5kXHJcblxyXG4vLyBncmFkaWVudCBjb2xvcnNcclxuJGdyYWRpZW50LXByaW1hcnk6IGxpbmVhci1ncmFkaWVudCgkc2Vjb25kYXJ5LWNvbG9yLCAkcHJpbWFyeS1jb2xvcik7XHJcblxyXG4vL3NvY2lhbCBjb2xvcnNcclxuJGZiOiAjNTA1OThlO1xyXG4kdHdpdHRlcjogIzZmYTJkODtcclxuJGdvb2dsZS1wbHVzOiAjYzY0ZTQwO1xyXG4kZ2l0aHViOiAjOGQ2ZTYzO1xyXG5cclxuLy9lcnJvciBpbnB1dCBjb2xvciBzdGFydFxyXG4kbGlnaHQtYm9keS1iZy1jb2xvcjojZjFmNGZiO1xyXG5cclxuLy9mb250c1xyXG4kZm9udC13b3JrLXNhbnM6IHdvcmstU2FucztcclxuJGZvbnQtbnVuaXRvOiBOdW5pdG87XHJcbiRmb250LW9wZW4tc2FuczogT3BlbiBTYW5zO1xyXG4kZm9udC1yYWxld2F5OiBSYWxld2F5O1xyXG4kZm9udC1zZXJpZjogc2Fucy1zZXJpZjtcclxuJGZvbnQtYXJpYWw6IGFyaWFsO1xyXG4kZm9udC10aGVtaWZ5OiB0aGVtaWZ5O1xyXG4kZm9udC1hd2Vzb21lOiBGb250QXdlc29tZTtcclxuJGZvbnQtSUNPOiBJY29Gb250O1xyXG5cclxuLy8gZGFyayBsYXlvdXQgdmFyaWFibGVzXHJcbiRkYXJrLWJvZHktYmFja2dyb3VuZDogIzI5MzI0MDtcclxuJGRhcmstY2FyZC1iYWNrZ3JvdW5kOiAjMmYzYzRlO1xyXG4kZGFyay1zbWFsbC1mb250LWNvbG9yOiAjOThhNmFkO1xyXG4kZGFyay1hbGwtZm9udC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjg1KTtcclxuJHNpZGViYXItc3VibWVudS1mb250LWNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC43KTtcclxuJGRhcmstYm9yZGVyLWNvbG9yOiAjMzc0NTU4O1xyXG4kZGFyay1lZGl0b3ItZG9jdW1lbnQ6ICMyYjJiMmI7XHJcblxyXG4vL0dlbmVyYWwgdGFnIHNldHRpbmdzXHJcbiRib2R5LWJnLWNvbG9yOiByZ2JhKDI0NiwgMjQ2LCAyNDYsIDAuNik7XHJcbiRib2R5LWZvbnQtc2l6ZTogMTRweDtcclxuJGJvZHktZm9udC1jb2xvcjogJHRoZW1lLWJvZHktZm9udC1jb2xvcjtcclxuJHVsLXBhZGRpbmctbGVmdDogMHB4O1xyXG4kdWwtcGFkZGluZy1yaWdodDogMHB4O1xyXG4kYW5jaGVyLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcclxuJGJ0bi1mb2N1cy1ib3gtc2hhZG93OiBub25lO1xyXG4kYWxsLWZvY3VzLW91dGxpbmUtY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG5cclxuJHBhcmFncmFwaC1mb250LXNpemUgOiAxM3B4O1xyXG4kcGFyYWdyYXBoLWxpbmUtaGVpZ2h0IDogMS43O1xyXG4kcGFyYWdyYXBoLWxldHRlci1zcGFjaW5nIDogMC43cHg7XHJcblxyXG4kY29kZS10YWctY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG4kY29kZS10YWctYmctY29sb3I6ICRsaWdodC1jb2xvcjtcclxuJGNvZGUtdGFnLXBhZGRpbmc6IDNweDtcclxuJGNvZGUtdGFnLW1hcmdpbjogMCAzcHg7XHJcbiRjb2RlLXRhZy1ib3JkZXItcmFkaW91czogMnB4O1xyXG5cclxuJGJsb2NrcXVvdGUtcGFkZGluZyA6IDE1cHg7XHJcbiRibG9ja3F1b3RlLWJvcmRlciA6IDRweCBzb2xpZCAkbGlnaHQtZ3JheTtcclxuXHJcbiRzbWFsbC10YWctcGFkZGluZzogMTBweDtcclxuJHNtYWxsLXRhZy1jb2xvcjogJGRhcmstY29sb3I7XHJcblxyXG4kcHJlLXRhZy1iZy1jb2xvcjogcmdiYSgkcHJpbWFyeS1jb2xvciwgMC4wNSk7XHJcbiRwcmUtdGFnLXBhZGRpbmc6IDIwcHg7XHJcblxyXG4kbGlzdC1ncm91cC1hY3RpdmUtYmctY29sb3I6ICRwcmltYXJ5LWNvbG9yO1xyXG4kbGlzdC1ncm91cC1hY3RpdmUtYm9yZGVyLWNvbG9yOiAkcHJpbWFyeS1jb2xvcjtcclxuJGxpc3QtZ3JvdXAtaW1nLXNpemU6IDQwcHg7XHJcbiRsaXN0LWdyb3VwLW1hcmdpbjogMTBweDtcclxuXHJcblxyXG4vLyBUYWJsZXMgc2V0dGluZ3NcclxuJGhvcml6b250YWwtYm9yZGVyLWNvbG9yOiAgICAjZGVlMmU2O1xyXG4kdGFibGUtYi1tYXJnaW46ICAgICAgICAgICAgIDBweDtcclxuJHRhYmxlLWhlYWRpbmctY29sb3I6ICAgICAgICAkdGhlbWUtYm9keS1mb250LWNvbG9yO1xyXG4kdGFibGUtcm93LWNvbG9yOiAgICAgICAgICAgICR0aGVtZS1ib2R5LWZvbnQtY29sb3I7XHJcbiR0YWJsZS1mb290ZXItZm9udC13ZWlnaHQ6ICAgYm9sZDtcclxuJHRhYmxlLWludmVyc2UtY29sb3I6ICAgICAgICAkd2hpdGU7XHJcbiR0YWJsZS1ob3Zlci1jb2xvcjogICAgICAgICAgJGxpZ2h0O1xyXG4kdGFibGUtcGFkZGluZzogICAgICAgICAgICAgIDAuNzVyZW07XHJcbiR0YWJsZS14bC1wYWRkaW5nOiAgICAgICAgICAgMS4yNXJlbSAycmVtO1xyXG4kdGFibGUteGwtZm9udDogICAgICAgICAgICAgIDEyMCU7XHJcbiR0YWJsZS1sZy1wYWRkaW5nOiAgICAgICAgICAgLjlyZW0gMnJlbTtcclxuJHRhYmxlLWxnLWZvbnQ6ICAgICAgICAgICAgICAxMTAlO1xyXG4kdGFibGUtZGUtcGFkZGluZzogICAgICAgICAgIC43NXJlbSAycmVtO1xyXG4kdGFibGUtZGUtZm9udDogICAgICAgICAgICAgIDEwMCU7XHJcbiR0YWJsZS1zbS1wYWRkaW5nOiAgICAgICAgICAgLjVyZW0gMnJlbTtcclxuJHRhYmxlLXNtLWZvbnQ6ICAgICAgICAgICAgICA5MCU7XHJcbiR0YWJsZS14cy1wYWRkaW5nOiAgICAgICAgICAgMC4ycmVtIDJyZW07XHJcbiR0YWJsZS14cy1mb250OiAgICAgICAgICAgICAgODAlO1xyXG4kaG9yaXpvbnRhbC1wYWRkaW5nOiAgICAgICAgIC43NXJlbSAycmVtO1xyXG4kdGFibGUtaW52ZXJzZS1iZy1jb2xvcjogICAgICMyOTJiMmM7XHJcblxyXG5cclxuLy9BY2NvcmRpbmcgc2V0dGluZ1xyXG4kYWNjb3JkaW5nLWNhcmQtdG9wLW1hcmdpbiAgICAgICAgICAgOiAxMHB4O1xyXG4kYWNjb3JkaW5nLWJ0bi13ZWlnaHQgICAgICAgICAgICAgICAgOiA2MDA7XHJcbiRhY2NvcmRpbmctYnRuLWNvbG9yICAgICAgICAgICAgICAgICA6ICR0aGVtZS1ib2R5LWZvbnQtY29sb3I7XHJcbiRhY2NvcmRpbmctY2FyZC1oZWFkZXItcGFkZGluZyAgICAgICA6IDAuNzVyZW0gMS4yNXJlbTtcclxuJGFjY29yZGluZy1jYXJkLWhlYWRlci1pY29uICAgICAgICAgIDogJGZvbnQtSUNPO1xyXG4kYWNjb3JkaW5nLW9wZW4taWNvbiAgICAgICAgICAgICAgICAgOiBcIlxcZWI3M1wiO1xyXG4kYWNjb3JkaW5nLWNsb3NlLWljb24gICAgICAgICAgICAgICAgOiBcIlxcZWI3YVwiO1xyXG5cclxuLy9BbGVydCBzZXR0aW5nc1xyXG4kYWxlcnQtaG92ZXItY29sb3IgICAgICAgIDokZGFyay1jb2xvcjtcclxuJGFsZXJ0LWJvcmRlci1yYWRpb3VzICAgICA6MC4xNXJlbTtcclxuJGFsZXJ0LXBhZGRpbmcgICAgICAgICAgICA6MTVweDtcclxuJGFsZXJ0LW1zZy1pY29uLXNpemUgICAgICA6MTZweDtcclxuXHJcbi8vYmFkZ2Ugc2V0dGluZ3NcclxuJGJhZGdlLXBhZGRpbmcgICAgICAgIDowLjQ0ZW0gMC43ZW07XHJcbiRiYWRnZS1zdmctc2l6ZSAgICAgICA6MTBweDtcclxuXHJcbi8vZm9ybSBpbnB1dCBzZXR0aW5nc1xyXG4kZm9ybS1ncm91cC1tYXJnaW4tYm90dG9tICAgICAgICA6IDEuMjVlbTtcclxuJGNvbC1mb3JtLWxhYmVsLWZvbnQtc2l6ZSAgICAgICAgOiAxNHB4O1xyXG4kZm9ybS1jb250cm9sLWZvbnQtc2l6ZSAgICAgICAgICA6IDE0cHg7XHJcbiRmb3JtLWNvbnRyb2wtYm9yZGVyLXJhZGlvdXMgICAgIDogMnB4O1xyXG4kZm9ybS1jb250cm9sLWJvcmRlci1jb2xvciAgICAgOiAkbGlnaHQtZ3JheTtcclxuXHJcbi8vYnJlYWRjcnVtYiBzZXR0aW5nXHJcbiRicmVhZGNydW1iLWFuY2hlci1jb2xvciAgICA6ICR3aGl0ZTtcclxuJGJyZWFkY3J1bWItYW5jaGVyLWRhcmstY29sb3IgICAgOiAkYmxhY2s7XHJcblxyXG4vL2J1dHRvbnMgc2V0dGluZ1xyXG4kYnRuLWZvbnQtc2l6ZSA6IDE0cHg7XHJcbiRidG4tcGFkZGluZyA6IC4zNzVyZW0gMS43NXJlbTtcclxuJGJ0bi1sZy1mb250LXNpemU6IDE4cHg7XHJcbiRidG4tc20tZm9udC1zaXplOiAxMnB4O1xyXG4kYnRuLXhzLWZvbnQtc2l6ZTogMTFweDtcclxuJGJ0bi14cy1wYWRkaW5nOiAgMC4wNXJlbSAwLjRyZW07XHJcblxyXG5cclxuLy9DYXJkIHNldHRpbmdzXHJcbiRjYXJkLXBhZGRpbmcgICAgICAgIDozMHB4O1xyXG4kY2FyZC1tYXJnaW4tYm90dG9tICA6MzBweDtcclxuJGNhcmQtYm9yZGVyLXdpZHRoICAgOjBweDtcclxuJGNhcmQtYm9yZGVyLWNvbG9yICAgOiRsaWdodC1jb2xvcjtcclxuJGNhcmQtYm9yZGVyLXJhZGlvdXMgOjhweDtcclxuJGNhcmQtYm94LXNoYWRvdyAgICAgOjFweCA1cHggMjRweCAwIHJnYmEoJHByaW1hcnktY29sb3IsIDAuMDUpO1xyXG4kY2FyZC1oZWFkZXItZm9udC13ZWlnaHQgOiA2MDA7XHJcbiRjYXJkLWhlYWRlci1iZy1jb2xvciA6ICR3aGl0ZTtcclxuJGNhcmQtaGVhZGVyLWZvbnQtc2l6ZSA6IDE4cHg7XHJcbiRjYXJkLWhlYWRlci1mb250LXRyYW5zZm9ybSA6IHVwcGVyY2FzZTtcclxuJGNhcmQtaGVhZGVyLWZvbnQtY29sb3IgOiAkdGhlbWUtYm9keS1mb250LWNvbG9yO1xyXG4kY2FyZC1oZWFkZXItc3Bhbi1zaXplIDogMTJweDtcclxuJGNhcmQtaGVhZGVyLXNwYW4tY29sb3IgOiAkdGhlbWUtYm9keS1zdWItdGl0bGUtY29sb3I7XHJcbiRjYXJkLWJvZHktYmctY29sb3IgOiAkdHJhbnNwYXJlbnQtY29sb3I7XHJcbiRjYXJkLWZvb3Rlci1iZy1jb2xvciA6ICR3aGl0ZTtcclxuXHJcbi8vZm9vdGVyIHNldHRpbmdzXHJcbiRmb290ZXJfYmdfY29sb3IgOiAkd2hpdGU7XHJcbiRmb290ZXJfdG9wX2Jncl9jb2xvciA6ICRsaWdodC1jb2xvcjtcclxuJGZvb3Rlcl9saW5rX2FsaWduIDogcmlnaHQ7XHJcbiRmb290ZXJfZGFya19jb2xvciA6ICRkYXJrLWNvbG9yO1xyXG4kZm9vdGVyX2RhcmtfX3R4dF9jb2xvciA6ICR3aGl0ZTtcclxuXHJcbi8vZm9ybSBzZXR0aW5nc1xyXG4kZm9ybS1ncm91cC1tYXJnaW4tYm90dG9tICA6MjBweDtcclxuJHNtLWZvcm0tbWFyZ2luLWJvdHRvbSA6IDE0cHg7XHJcbiRmb3JtLXBsYWNlaG9sZGVyLWNvbG9yIDogJGRhcmstZ3JheTtcclxuJGZvcm0tcGxhY2Vob2xkZXItZm9udC1zaXplIDogMTRweDtcclxuJGZvcm0tcGxhY2Vob2xkZXItbGV0dGVyLXNwYWNpbmcgOiAxcHg7XHJcbiRmb3JtLXBsYWNlaG9sZGVyLWZvbnQtd2VpZ2h0IDogMTAwO1xyXG4kZm9ybS1pbnB1dC1ib3JkZXItY29sb3IgOiAkbGlnaHQtc2VtaS1ncmF5O1xyXG4kZm9ybS1pbnB1dC1iZy1jb2xvciA6ICR3aGl0ZTtcclxuXHJcbi8vVG91ciBzZXR0aW5nc1xyXG4kdG91ci1jb2xvcjogJHByaW1hcnktY29sb3I7XHJcblxyXG4vL3NpZGFiciBtYWluIHNldHRpbmdzXHJcbiRzaWRlYmFyLXdpZHRoOiAyNTVweDtcclxuJHNpZGViYXItcG9zaXRpb246IGZpeGVkO1xyXG4kc2lkZWJhci1iYWNrZ3JvdW5kLWNvbG9yOiAkZGFyay1jYXJkLWJhY2tncm91bmQ7XHJcbiRzaWRlYmFyLXNoYWRvdzogMCAwIDExcHggcmdiYSg2OSwgMTEwLCAyNDMsIDAuMTMpO1xyXG4kc2lkZWJhci1vdmVyZmxvdzogYXV0bztcclxuJHNpZGViYXItei1pbmRleDogMTAwMDtcclxuJHNpZGViYXItdHJhbnNpdGlvbjogMC4zcztcclxuXHJcbi8vc2lkZWJhciBwcm9maWxlIHNldHRpbmdzXHJcbiRzaWRlYmFyLXVzZXItc2VjdGlvbi1wYWRkaW5nOiAyNXB4IDEwcHg7XHJcbiRzaWRlYmFyLXVzZXItc2VjdGlvbi1zaGFkb3c6IDNweCAycHggN3B4IC0xcHggcmdiYSg2OCwgMTAyLCAyNDIsIDAuMTMpO1xyXG4kc2lkZWJhci1wcm9maWxlLWVkaXQtaWNvbi1zaXplOiAxNHB4O1xyXG4kc2lkZWJhci1wcm9maWxlLW5hbWUtdHh0LWNvbG9yIDogJGxpZ2h0LWNvbG9yO1xyXG4kc2lkZWJhci1wcm9maWxlLW5hbWUtdHh0LXRyYW5zZmVyIDogdXBwZXJjYXNlO1xyXG4kc2lkZWJhci1wcm9maWxlLW5hbWUtdHh0LXdlaWdodCA6IDYwMDtcclxuJHNpZGViYXItcHJvZmlsZS1uYW1lLWxldHRlci1zcGVjaW5nIDogMS41cHg7XHJcbiRzaWRlYmFyLXByb2ZpbGUtbmFtZS1tYXJnaW5nIDogM3B4O1xyXG4kc2lkZWJhci1wcm9maWxlLXN1Yi10aXRsZS1mb250LXNpemU6IDEwcHg7XHJcbiRzaWRlYmFyLXByb2ZpbGUtc3ViLXRpdGxlLW1hcmdpbjogMHB4O1xyXG4kc2lkZWJhci1wcm9maWxlLWltZy1zaGFkb3c6IDAgMCAxNXB4IHJnYmEoNjgsIDEwMiwgMjQyLCAwLjMpO1xyXG5cclxuLy9TaWRlYmFyIG1haW4gbWVudSBzZXR0aW5nXHJcbiRzaWRlYmFyLW1lbnUtcGFkZGluZzogMjBweDtcclxuJHNpZGViYXItbWVudS1saXN0LXN0eWxlOiBub25lO1xyXG4kc2lkZWJhci1tZW51LWxpc3QtbWFyZ2luOiAwO1xyXG5cclxuJHNpZGViYXItaWNvbi1zaXplOiAxNHB4O1xyXG4kc2lkZWJhci1pY29uLW1hcmdpbjogMTRweDtcclxuJHNpZGViYXItaWNvbi1zdHJva2Utd2lkdGg6IDNweDtcclxuJHNpZGViYXItZm9udC1zaXplOiAxNHB4O1xyXG4kc2lkZWJhci1sZXR0ZXItc3BlY2luZzogMC41cHg7XHJcbiRzaWRlYmFyLXR4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XHJcbiRzaWRlYmFyLWZvbnQtd2VpZ2h0OiA2MDA7XHJcbiRzaWRlYmFyLWZvbnQtY29sb3I6IHJnYmEoJHdoaXRlLCAwLjg1KTtcclxuJHNpZGViYXItcGFkZGluZy10b3A6IDhweDtcclxuJHNpZGViYXItcGFkZGluZy1ib3R0b206IDhweDtcclxuJHNpZGViYXItc3ViLWhlYWRlci1wYWRkaW5nOiAxNXB4O1xyXG4kc2lkZWJhci1zdWItaGVhZGVyLW1hcmdpbjogMDtcclxuJHNpZGViYXItZm9udC1mYW1pbHk6ICRmb250LW51bml0bztcclxuXHJcblxyXG4kc2lkZWJhci10ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcclxuJHNpZGViYXItaGVhZGluZy1ob3Zlci1wYWRkaW5nOiAzcHg7XHJcbiRzaWRlYmFyLWhvdmVyLXR4dC1jb2xvcjogJHdoaXRlO1xyXG4kc2lkZWJhci1hcnJvdy1tYXJnaW4tdG9wOiAycHg7XHJcbiRzaWRlYmFyLWFycm93LXNpemU6IDE1cHg7XHJcbiRzaWRlYmFyLWFycm93LWNvbG9yOiAkdGhlbWUtYm9keS1mb250LWNvbG9yO1xyXG5cclxuJHNpZGViYXItb3Blbi1pY29uOiBcIlxcZjEwN1wiO1xyXG4kc2lkZWJhci1jbG9zZS1pY29uOlwiXFxmMTA1XCI7XHJcbiRzaWRlYmFyLWljb24tZm9udC1mYW1pbHk6ICRmb250LWF3ZXNvbWU7XHJcblxyXG5cclxuXHJcbi8vSGVhZGVyIHNldHRpbmdzXHJcbiRtYWluLWhlYWRlci1iZy1jb2xvcjogJHNlY29uZGFyeS1jb2xvcjtcclxuJG1haW4taGVhZGVyLXBvc2l0aW9uOiBmaXhlZDtcclxuJG1haW4taGVhZGVyLXRvcDogMDtcclxuJG1haW4taGVhZGVyLXNoYWRvdzogMCAwIDEwcHggMXB4IHJnYmEoNjgsIDEwMiwgMjQyLCAwLjA1KTtcclxuXHJcbi8vcGFnZSBzZXR0aW5nc1xyXG4kcGFnZS1ib2R5LXBhZGRpbmcgOiAwIDE1cHg7XHJcbiRwYWdlLWJvZHktYmctY29sb3I6ICRzZWNvbmRhcnktY29sb3I7XHJcbi8vICRwYWdlLWJvZHktYmctY29sb3I6IHJnYmEoMjQ2LCAyNDYsIDI0NiwgMC42KTtcclxuJHBhZ2UtYm9keS1tYXJnaW4tYm90dG9tOiAwcHg7XHJcblxyXG4kcGFnZS1oZWFkZXItcGFkZGluZyA6IDMwcHg7XHJcbiRwYWdlLXRpdGxlLWZvbnQtc2l6ZTogMjRweDtcclxuJHBhZ2UtdGl0bGUtbWFyZ2luLWJvdHRvbTogMDtcclxuJHBhZ2UtdGl0bGUtZm9udC13ZWlnaHQ6IDYwMDtcclxuJHBhZ2UtdGl0bGUtdGV4dC10cmFuZm9ybTogdXBwZXJjYXNlO1xyXG4kYnJlYWRjcnVtYi1zaXplOiAxNHB4O1xyXG4kYnJlYWRjcnVtYi1jb250ZW50OiBcIi9cIjtcclxuJGJyZWFkY3J1bWItc3ZnLWljb24tYWxpZ246IHRleHQtdG9wO1xyXG5cclxuXHJcbi8vbWFpbiBoZWFkZXIgbGVmdCBzZXR0aW5nc1xyXG4kbWFpbi1oZWFkZXItbGVmdC1iZy1jb2xvciA6ICR0cmFuc3BhcmVudC1jb2xvcjtcclxuJG1haW4taGVhZGVyLXBhZGRpbmcgOiAxMnB4O1xyXG4kbWFpbi1oZWFkZXItei1pbmRleCA6IDE1O1xyXG4kbWFpbi1oZWFkZXItcmlnaHQtcGFkZGluZzogMCA0MHB4O1xyXG4kbWFpbi1oZWFkZXItcmlnaHQtdG9nZ2xlLWNvbG9yIDogJHByaW1hcnktY29sb3I7XHJcbiRtYWluLWhlYWRlci1yaWdodC1uYXYtcmlnaHQgOiAgMHB4O1xyXG4kbWFpbi1oZWFkZXItcmlnaHQtbmF2LWljb24tc2l6ZSA6ICAxOHB4O1xyXG4kbWFpbi1oZWFkZXItcmlnaHQtbmF2LWljb24tY29sb3IgOiAgJHByaW1hcnktY29sb3I7XHJcbiRtYWluLWhlYWRlci1yaWdodC1uYXYtaWNvbi1tYXJnaW4tdG9wIDogIDEwcHg7XHJcblxyXG4iXX0= */", ".owl-theme[_ngcontent-%COMP%]   .owl-nav[_ngcontent-%COMP%] {\n  background: transparent !important;\n  float: right;\n}\n\n.owl-theme[_ngcontent-%COMP%]   .owl-nav[_ngcontent-%COMP%]   [class*='owl-'][_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n\n.owl-prev[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n\n.owl-next[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcm91c2VsLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtDQUFrQztFQUNsQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEM7O0FBRUE7RUFDRSxrQ0FBa0M7QUFDcEMiLCJmaWxlIjoiY2Fyb3VzZWwuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm93bC10aGVtZSAub3dsLW5hdiB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLm93bC10aGVtZSAub3dsLW5hdiBbY2xhc3MqPSdvd2wtJ10ge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuXG4ub3dsLXByZXYge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuXG4ub3dsLW5leHQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xufVxuIl19 */"], data: { animation: [
            (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.trigger)('flyInOut', [
                (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.style)({ transform: 'translateX(0)' })),
                (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.transition)('void => *', [
                    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.style)({ transform: 'translateX(-100%)' }),
                    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.animate)(1000)
                ]),
                (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.transition)('* => void', [
                    (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.animate)(1000, (0,_angular_animations__WEBPACK_IMPORTED_MODULE_2__.style)({ transform: 'translateX(100%)' }))
                ])
            ])
        ] } });


/***/ }),

/***/ 68721:
/*!*******************************************!*\
  !*** ./src/app/landing/landing.module.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingModule": function() { return /* binding */ LandingModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _landing_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing-routing.module */ 96990);
/* harmony import */ var _landing_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./landing.component */ 341);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ 22213);
/* harmony import */ var _auth_navbar_auth_navbar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-navbar/auth-navbar.component */ 71245);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 70781);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);







class LandingModule {
}
LandingModule.ɵfac = function LandingModule_Factory(t) { return new (t || LandingModule)(); };
LandingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: LandingModule });
LandingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _landing_routing_module__WEBPACK_IMPORTED_MODULE_0__.LandingRoutingModule,
            // SharedModule,
            // CarouselModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](LandingModule, { declarations: [_landing_component__WEBPACK_IMPORTED_MODULE_1__.LandingComponent, _auth_navbar_auth_navbar_component__WEBPACK_IMPORTED_MODULE_2__.AuthNavbarComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _landing_routing_module__WEBPACK_IMPORTED_MODULE_0__.LandingRoutingModule,
        // SharedModule,
        // CarouselModule,
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__.MatDialogModule,
        _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule], exports: [_auth_navbar_auth_navbar_component__WEBPACK_IMPORTED_MODULE_2__.AuthNavbarComponent] }); })();


/***/ })

}]);
//# sourceMappingURL=default-src_app_landing_landing_module_ts-es2015.js.map