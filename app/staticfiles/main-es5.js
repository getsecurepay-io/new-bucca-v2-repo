(function () {
  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (self["webpackChunkendless"] = self["webpackChunkendless"] || []).push([["main"], {
    /***/
    98255: function _(module) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = 98255;
      module.exports = webpackEmptyAsyncContext;
      /***/
    },

    /***/
    3239: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppIdInterceptor": function AppIdInterceptor() {
          return (
            /* binding */
            _AppIdInterceptor
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var ngx_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ngx-cookie */
      16621);

      var _AppIdInterceptor = /*#__PURE__*/function () {
        function _AppIdInterceptor(cookieService) {
          _classCallCheck(this, _AppIdInterceptor);

          this.cookieService = cookieService;
        }

        _createClass(_AppIdInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var appId = this.cookieService.get("appId");
            var httpReq = request;

            if (appId) {
              httpReq = request.clone({
                setHeaders: {
                  "Content-Type": "application/json; charset=utf-8",
                  Accept: "application/json",
                  "App-id": appId
                }
              });
            }

            return next.handle(httpReq);
          }
        }]);

        return _AppIdInterceptor;
      }();

      _AppIdInterceptor.ɵfac = function AppIdInterceptor_Factory(t) {
        return new (t || _AppIdInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_cookie__WEBPACK_IMPORTED_MODULE_1__.CookieService));
      };

      _AppIdInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _AppIdInterceptor,
        factory: _AppIdInterceptor.ɵfac
      });
      /***/
    },

    /***/
    90158: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppRoutingModule": function AppRoutingModule() {
          return (
            /* binding */
            _AppRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _shared_components_layout_content_layout_content_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./shared/components/layout/content-layout/content-layout.component */
      36144);
      /* harmony import */


      var _shared_routes_content_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./shared/routes/content-routes */
      54989);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var routes = [{
        path: "",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-src_app_landing_landing_module_ts"), __webpack_require__.e("common")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ./landing/landing.module */
          68721)).then(function (m) {
            return m.LandingModule;
          });
        }
      }, {
        path: "auth",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("common"), __webpack_require__.e("src_app_auth_auth_module_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ./auth/auth.module */
          71674)).then(function (m) {
            return m.AuthModule;
          });
        }
      }, {
        path: "",
        component: _shared_components_layout_content_layout_content_layout_component__WEBPACK_IMPORTED_MODULE_0__.ContentLayoutComponent,
        children: _shared_routes_content_routes__WEBPACK_IMPORTED_MODULE_1__.content
      }, {
        path: "**",
        redirectTo: "/404"
      }];

      var _AppRoutingModule = function _AppRoutingModule() {
        _classCallCheck(this, _AppRoutingModule);
      };

      _AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || _AppRoutingModule)();
      };

      _AppRoutingModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: _AppRoutingModule
      });
      _AppRoutingModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes, {
          useHash: true,
          relativeLinkResolution: "legacy"
        })], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
        });
      })();
      /***/

    },

    /***/
    55041: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppComponent": function AppComponent() {
          return (
            /* binding */
            _AppComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _AppComponent = function _AppComponent() {
        _classCallCheck(this, _AppComponent);

        this.title = 'endless-starterkit';
      };

      _AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || _AppComponent)();
      };

      _AppComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _AppComponent,
        selectors: [["app-root"]],
        decls: 1,
        vars: 0,
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    36747: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AppModule": function AppModule() {
          return (
            /* binding */
            _AppModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      20718);
      /* harmony import */


      var ngx_cookie__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ngx-cookie */
      16621);
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      90158);
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app.component */
      55041);
      /* harmony import */


      var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./shared/shared.module */
      44466);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/core */
      32220);
      /* harmony import */


      var _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./auth/auth.interceptor */
      68000);
      /* harmony import */


      var _app_id_interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./app-id.interceptor */
      3239);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ngx-toastr */
      83315);
      /* harmony import */


      var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/cdk/stepper */
      43285);
      /* harmony import */


      var angular4_paystack__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! angular4-paystack */
      43754);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _AppModule = function _AppModule() {
        _classCallCheck(this, _AppModule);
      };

      _AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || _AppModule)();
      };

      _AppModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
        type: _AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent]
      });
      _AppModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
        providers: [{
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HTTP_INTERCEPTORS,
          useClass: _auth_auth_interceptor__WEBPACK_IMPORTED_MODULE_3__.AuthInterceptor,
          multi: true
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HTTP_INTERCEPTORS,
          useClass: _app_id_interceptor__WEBPACK_IMPORTED_MODULE_4__.AppIdInterceptor,
          multi: true
        }, {
          provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_7__.STEPPER_GLOBAL_OPTIONS,
          useValue: {
            showError: true,
            displayDefaultIndicatorType: false
          }
        }],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatNativeDateModule, ngx_cookie__WEBPACK_IMPORTED_MODULE_11__.CookieModule.forRoot(), ngx_toastr__WEBPACK_IMPORTED_MODULE_12__.ToastrModule.forRoot(), angular4_paystack__WEBPACK_IMPORTED_MODULE_13__.Angular4PaystackModule.forRoot('pk_test_1')]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](_AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_1__.AppComponent],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__.BrowserAnimationsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_0__.AppRoutingModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClientModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatNativeDateModule, ngx_cookie__WEBPACK_IMPORTED_MODULE_11__.CookieModule, ngx_toastr__WEBPACK_IMPORTED_MODULE_12__.ToastrModule, angular4_paystack__WEBPACK_IMPORTED_MODULE_13__.Angular4PaystackModule]
        });
      })();
      /***/

    },

    /***/
    68000: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthInterceptor": function AuthInterceptor() {
          return (
            /* binding */
            _AuthInterceptor
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var ngx_cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ngx-cookie */
      16621);

      var _AuthInterceptor = /*#__PURE__*/function () {
        function _AuthInterceptor(cookieService) {
          _classCallCheck(this, _AuthInterceptor);

          this.cookieService = cookieService;
        }

        _createClass(_AuthInterceptor, [{
          key: "intercept",
          value: function intercept(request, next) {
            var token = this.cookieService.get("token");
            var httpReq = request;

            if (token) {
              httpReq = request.clone({
                setHeaders: {
                  Authorization: "Bearer ".concat(token)
                }
              });
            }

            return next.handle(httpReq);
          }
        }]);

        return _AuthInterceptor;
      }();

      _AuthInterceptor.ɵfac = function AuthInterceptor_Factory(t) {
        return new (t || _AuthInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_cookie__WEBPACK_IMPORTED_MODULE_1__.CookieService));
      };

      _AuthInterceptor.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _AuthInterceptor,
        factory: _AuthInterceptor.ɵfac
      });
      /***/
    },

    /***/
    50384: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "AuthService": function AuthService() {
          return (
            /* binding */
            _AuthService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../environments/environment */
      92340);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! rxjs */
      79441);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs/operators */
      92597);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _shared_services_helper_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../shared/services/helper.service */
      21785);
      /* harmony import */


      var _shared_services_error_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../shared/services/error.service */
      44578);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var ngx_cookie__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ngx-cookie */
      16621);
      /* harmony import */


      var _shared_services_cart_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../shared/services/cart.service */
      5237);
      /* harmony import */


      var _shared_services_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../shared/services/notification.service */
      97161);

      var _AuthService = /*#__PURE__*/function () {
        function _AuthService(http, helperService, errorService, router, cookieService, cartService, notificationService) {
          _classCallCheck(this, _AuthService);

          this.http = http;
          this.helperService = helperService;
          this.errorService = errorService;
          this.router = router;
          this.cookieService = cookieService;
          this.cartService = cartService;
          this.notificationService = notificationService;
          this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
          this.isLoadingListener = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
          this.profileListener = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
          this.isAuthListener = new rxjs__WEBPACK_IMPORTED_MODULE_5__.Subject();
        }

        _createClass(_AuthService, [{
          key: "getIsLoadingListener",
          value: function getIsLoadingListener() {
            return this.isLoadingListener.asObservable();
          }
        }, {
          key: "getProfileListener",
          value: function getProfileListener() {
            return this.profileListener.asObservable();
          }
        }, {
          key: "login",
          value: function login(loginInfo, loginDialogRef) {
            var _this = this;

            this.isLoadingListener.next(true);
            var loginData = {
              password: loginInfo.password,
              email: this.helperService.lowerCase(loginInfo.email)
            };
            this.http.post("".concat(this.url, "auth/login/"), loginData).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.shareReplay)()).subscribe(function (response) {
              // handle successful login.
              var token = response.access;

              if (token) {
                _this.isAuth = true;

                _this.isAuthListener.next(_this.isAuth);

                _this.accessToken = response.access;
                _this.refreshToken = response.refresh;
                _this.appId = response.app_id;
                var expiresIn = response.access_duration;
                _this.userInfo = response.user;
                _this.userGroup = response.user.role;
                var now = new Date();
                var expirationDate = new Date(now.getTime() + expiresIn * 1000);

                _this.saveAuthData(_this.accessToken, _this.refreshToken, _this.userInfo, expirationDate, _this.appId, _this.userGroup);

                _this.isLoadingListener.next(false);

                loginDialogRef.close();

                _this.router.navigate(["/dashboard"]);
              }
            }, function (err) {
              // return error and resolve to user.
              _this.isLoadingListener.next(false);

              if (err.error.code == 406) {
                _this.forgotPassword(loginInfo);

                loginDialogRef.close();
                return;
              }

              var errorMessage;
              err.error.message ? errorMessage = err.error.message : "An error message occured";

              _this.errorService.handleError(errorMessage);
            });
          }
        }, {
          key: "saveAuthData",
          value: function saveAuthData(token, refresh, userInfo, expiryDate, appId, userGroup) {
            this.cookieService.put("token", token);
            this.cookieService.put("refresh", refresh);
            this.cookieService.put("appId", appId);
            this.cookieService.put("userInfo", JSON.stringify(userInfo));
            this.cookieService.put("expiryDate", JSON.stringify(expiryDate));
            this.cookieService.put("userGroup", JSON.stringify(userGroup));
          }
        }, {
          key: "clearAuthData",
          value: function clearAuthData() {
            this.cookieService.remove("token");
            this.cookieService.remove("refresh");
            this.cookieService.remove("appId");
            this.cookieService.remove("userInfo");
            this.cookieService.remove("expiryDate");
            this.cookieService.remove("userGroup");
            this.cookieService.removeAll();
            this.cartService.clearCart();
          }
        }, {
          key: "autoAuthUser",
          value: function autoAuthUser() {
            var authData = this.getAuthData();

            if (!authData) {
              return;
            }

            var now = new Date();
            var expirationDate = new Date(authData.expirationDate);
            var expiresIn = expirationDate.getTime() - now.getTime();

            if (expiresIn > 0) {
              this.accessToken = authData.token;
              this.refreshToken = authData.refresh;
              this.appId = authData.appID;
              this.userInfo = authData.userInfo;
              this.userGroup = authData.userGroup;
              this.isAuth = true;
              this.isAuthListener.next(this.isAuth);
            }
          }
        }, {
          key: "getAuthData",
          value: function getAuthData() {
            return {
              token: this.cookieService.get("token"),
              refresh: this.cookieService.get("refresh"),
              appID: this.cookieService.get("appID"),
              expirationDate: this.cookieService.get("expiration"),
              userInfo: JSON.parse(this.cookieService.get("userInfo")),
              userGroup: JSON.parse(this.cookieService.get("userGroup"))
            };
          }
        }, {
          key: "logout",
          value: function logout() {
            this.clearAuthData();
            this.router.navigate(["/"]);
          }
        }, {
          key: "updateUser",
          value: function updateUser(userInfo) {
            var _this2 = this;

            this.profileListener.next(true);
            this.http.patch("".concat(this.url, "auth/update-user/"), userInfo).subscribe(function (response) {
              console.log(response);
              _this2.userInfo = _this2.helperService.getUserInfo();
              _this2.userInfo.first_name = response.first_name;
              _this2.userInfo.image = response.image;
              _this2.userInfo.last_name = response.last_name;

              _this2.cookieService.put("userInfo", JSON.stringify(_this2.userInfo));

              console.log(_this2.userInfo);

              _this2.profileListener.next(false);

              _this2.notificationService.success("Profile update", "success");
            }, function (err) {
              _this2.profileListener.next(false);
            });
          }
        }, {
          key: "changePassword",
          value: function changePassword(passwordData) {
            var _this3 = this;

            this.profileListener.next(true);
            this.http.put("".concat(this.url, "auth/update-password/"), passwordData).subscribe(function (response) {
              _this3.profileListener.next(false);

              _this3.logout();

              _this3.notificationService.success("Password change", "success");
            }, function (err) {
              var errorMessage = err.error.message || err.error.details || err.error.error || err.error;

              _this3.notificationService.danger("Password change", errorMessage);

              _this3.profileListener.next(false);

              _this3.errorService.handleError(errorMessage);
            });
          }
        }, {
          key: "forgotPassword",
          value: function forgotPassword(emailPayload) {
            var _this4 = this;

            this.isLoadingListener.next(true);
            localStorage.setItem("emailPayload", JSON.stringify(emailPayload));
            this.http.post("".concat(this.url, "auth/reset-password-email/"), emailPayload).subscribe(function (response) {
              _this4.isLoadingListener.next(false);

              console.log(response);

              _this4.notificationService.success("Successful", "OTP Sent successfully");

              _this4.router.navigate(["/auth/email-sent"]);
            }, function (err) {
              _this4.isLoadingListener.next(false);

              var erroMessage = err.error.detail || err.error.message;

              _this4.notificationService.danger("Error", erroMessage);
            }); //
          }
        }, {
          key: "verifyOTP",
          value: function verifyOTP(otpPayload) {
            var _this5 = this;

            this.isLoadingListener.next(true);
            this.http.post("".concat(this.url, "auth/confirm-token/"), otpPayload).subscribe(function (response) {
              _this5.accessToken = response.access;
              _this5.refreshToken = response.refresh;

              _this5.cookieService.put("token", _this5.accessToken);

              _this5.cookieService.put("refresh", _this5.refreshToken);

              _this5.notificationService.success("Successful", response.message);

              _this5.isLoadingListener.next(false);

              _this5.router.navigate(["/auth/reset-password"]);
            }, function (err) {
              _this5.isLoadingListener.next(false);

              var erroMessage = err.error.detail || err.error.message;

              _this5.notificationService.danger("Error", erroMessage);
            });
          }
        }, {
          key: "passwordReset",
          value: function passwordReset(passwordPayload) {
            var _this6 = this;

            this.isLoadingListener.next(true);
            this.http.post("".concat(this.url, "auth/reset-password/"), passwordPayload).subscribe(function (response) {
              _this6.isLoadingListener.next(false);

              if (response.code == 200) {
                _this6.accessToken = response.access;
                _this6.refreshToken = response.refresh;

                _this6.cookieService.put("token", _this6.accessToken);

                _this6.cookieService.put("refresh", _this6.refreshToken);

                _this6.notificationService.success("Successful", response.message);

                _this6.router.navigate(["/"]);
              }
            }, function (err) {
              _this6.isLoadingListener.next(false);

              _this6.notificationService.success("Error", err.error.detail);
            });
          }
        }]);

        return _AuthService;
      }();

      _AuthService.ɵfac = function AuthService_Factory(t) {
        return new (t || _AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_helper_service__WEBPACK_IMPORTED_MODULE_1__.HelperService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_error_service__WEBPACK_IMPORTED_MODULE_2__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](ngx_cookie__WEBPACK_IMPORTED_MODULE_10__.CookieService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_cart_service__WEBPACK_IMPORTED_MODULE_3__.CartService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_shared_services_notification_service__WEBPACK_IMPORTED_MODULE_4__.NotificationService));
      };

      _AuthService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
        token: _AuthService,
        factory: _AuthService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    97457: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CalendarDialogComponent": function CalendarDialogComponent() {
          return (
            /* binding */
            _CalendarDialogComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/card */
      42118);
      /* harmony import */


      var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/datepicker */
      42937);

      var _CalendarDialogComponent = /*#__PURE__*/function () {
        function _CalendarDialogComponent() {
          _classCallCheck(this, _CalendarDialogComponent);
        }

        _createClass(_CalendarDialogComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _CalendarDialogComponent;
      }();

      _CalendarDialogComponent.ɵfac = function CalendarDialogComponent_Factory(t) {
        return new (t || _CalendarDialogComponent)();
      };

      _CalendarDialogComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _CalendarDialogComponent,
        selectors: [["app-calendar-dialog"]],
        decls: 2,
        vars: 0,
        consts: [[1, "demo-inline-calendar-card"], [3, "selectedChange"]],
        template: function CalendarDialogComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-calendar", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedChange", function CalendarDialogComponent_Template_mat_calendar_selectedChange_1_listener($event) {
              return ctx.selected = $event;
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        directives: [_angular_material_card__WEBPACK_IMPORTED_MODULE_1__.MatCard, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_2__.MatCalendar],
        styles: [".demo-inline-calendar-card[_ngcontent-%COMP%] {\n  width: 300px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbGVuZGFyLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7QUFDZCIsImZpbGUiOiJjYWxlbmRhci1kaWFsb2cuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGVtby1pbmxpbmUtY2FsZW5kYXItY2FyZCB7XG4gIHdpZHRoOiAzMDBweDtcbn1cbiJdfQ== */"]
      });
      /***/
    },

    /***/
    41299: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "BreadcrumbComponent": function BreadcrumbComponent() {
          return (
            /* binding */
            _BreadcrumbComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../feather-icons/feather-icons.component */
      61676);

      var _BreadcrumbComponent = /*#__PURE__*/function () {
        function _BreadcrumbComponent() {
          _classCallCheck(this, _BreadcrumbComponent);
        }

        _createClass(_BreadcrumbComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {}
        }]);

        return _BreadcrumbComponent;
      }();

      _BreadcrumbComponent.ɵfac = function BreadcrumbComponent_Factory(t) {
        return new (t || _BreadcrumbComponent)();
      };

      _BreadcrumbComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _BreadcrumbComponent,
        selectors: [["app-breadcrumb"]],
        decls: 15,
        vars: 2,
        consts: [[1, "container-fluid"], [1, "page-header"], [1, "row"], [1, "col-lg-6"], [1, "page-header-left"], [1, "breadcrumb"], [1, "breadcrumb-item"], [3, "routerLink"], [3, "icon"], [1, "breadcrumb-item", "active"]],
        template: function BreadcrumbComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h3");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Sample");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "ol", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "li", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "app-feather-icons", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "li", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Sample");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "li", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "SampleComponent ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", "/sample/sample-component");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("icon", "home");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLinkWithHref, _feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_0__.FeatherIconsComponent],
        styles: [".ProfileCard-realName[_ngcontent-%COMP%]   .realname[_ngcontent-%COMP%] {\n  color: #949598 !important;\n}\n\n.offcanvas-bookmark.page-wrapper[_ngcontent-%COMP%]   .page-body-wrapper[_ngcontent-%COMP%]   .page-body[_ngcontent-%COMP%]   .bookmark[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n\n.bookmark[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #313131;\n}\n\ni.fa.fa-star-o.f-18.mt-1.starred[_ngcontent-%COMP%] {\n  color: orange;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJyZWFkY3J1bWIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBeUI7QUFDN0I7O0FBRUE7RUFDSSxxQkFBcUI7QUFDekI7O0FBRUE7RUFDSSxjQUFlO0FBQ25COztBQUVBO0VBQ0ksYUFBYTtBQUNqQiIsImZpbGUiOiJicmVhZGNydW1iLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLlByb2ZpbGVDYXJkLXJlYWxOYW1lIC5yZWFsbmFtZSB7XHJcbiAgICBjb2xvcjogIzk0OTU5OCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ub2ZmY2FudmFzLWJvb2ttYXJrLnBhZ2Utd3JhcHBlciAucGFnZS1ib2R5LXdyYXBwZXIgLnBhZ2UtYm9keSAuYm9va21hcmsgdWwgbGkgYSB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5ib29rbWFyayB1bCBsaSBhIHtcclxuICAgIGNvbG9yOiAjMzEzMTMxIDtcclxufVxyXG5cclxuaS5mYS5mYS1zdGFyLW8uZi0xOC5tdC0xLnN0YXJyZWQge1xyXG4gICAgY29sb3I6IG9yYW5nZTtcclxufVxyXG4iXX0= */"]
      });
      /***/
    },

    /***/
    59077: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ConfirmDialogComponent": function ConfirmDialogComponent() {
          return (
            /* binding */
            _ConfirmDialogComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/dialog */
      22213);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/material/button */
      70781);

      var _ConfirmDialogComponent = /*#__PURE__*/function () {
        function _ConfirmDialogComponent(dialogRef, data) {
          _classCallCheck(this, _ConfirmDialogComponent);

          this.dialogRef = dialogRef;
          this.data = data;
        }

        _createClass(_ConfirmDialogComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "closeDialog",
          value: function closeDialog(value) {
            this.dialogRef.close(value);
          }
        }]);

        return _ConfirmDialogComponent;
      }();

      _ConfirmDialogComponent.ɵfac = function ConfirmDialogComponent_Factory(t) {
        return new (t || _ConfirmDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA));
      };

      _ConfirmDialogComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _ConfirmDialogComponent,
        selectors: [["app-confirm-dialog"]],
        decls: 10,
        vars: 3,
        consts: [["mat-dialog-title", "", 1, "text-primary", "text-center"], ["mat-dialog-content", ""], [1, "text-center"], ["mat-dialog-actions", "", 1, "d-flex", "justify-content-between"], ["mat-button", "", 1, "btn", "btn-outline-primary", 3, "click"], ["mat-button", "", "cdkFocusInitial", "", 1, "btn", 3, "mat-dialog-close"]],
        template: function ConfirmDialogComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_Template_button_click_6_listener() {
              return ctx.closeDialog(true);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Yes, delete it");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Cancel");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.title);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.message);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-dialog-close", false);
          }
        },
        directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatButton, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogClose],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb25maXJtLWRpYWxvZy5jb21wb25lbnQuc2NzcyJ9 */"]
      });
      /***/
    },

    /***/
    61676: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FeatherIconsComponent": function FeatherIconsComponent() {
          return (
            /* binding */
            _FeatherIconsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var feather_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! feather-icons */
      38789);
      /* harmony import */


      var feather_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(feather_icons__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _FeatherIconsComponent = /*#__PURE__*/function () {
        function _FeatherIconsComponent() {
          _classCallCheck(this, _FeatherIconsComponent);
        }

        _createClass(_FeatherIconsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            setTimeout(function () {
              feather_icons__WEBPACK_IMPORTED_MODULE_0__.replace();
            });
          }
        }]);

        return _FeatherIconsComponent;
      }();

      _FeatherIconsComponent.ɵfac = function FeatherIconsComponent_Factory(t) {
        return new (t || _FeatherIconsComponent)();
      };

      _FeatherIconsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: _FeatherIconsComponent,
        selectors: [["app-feather-icons"]],
        inputs: {
          icon: "icon"
        },
        decls: 1,
        vars: 1,
        template: function FeatherIconsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "i");
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("data-feather", ctx.icon);
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmZWF0aGVyLWljb25zLmNvbXBvbmVudC5zY3NzIn0= */"]
      });
      /***/
    },

    /***/
    66526: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "FooterComponent": function FooterComponent() {
          return (
            /* binding */
            _FooterComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _FooterComponent = /*#__PURE__*/function () {
        function _FooterComponent() {
          _classCallCheck(this, _FooterComponent);
        }

        _createClass(_FooterComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _FooterComponent;
      }();

      _FooterComponent.ɵfac = function FooterComponent_Factory(t) {
        return new (t || _FooterComponent)();
      };

      _FooterComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _FooterComponent,
        selectors: [["app-footer"]],
        decls: 9,
        vars: 0,
        consts: [[1, "container-fluid"], [1, "d-flex", "justify-content-between"], [1, ""], ["src", "../../../../assets/svg/bucca_footer_logo.svg", "alt", "", 1, "img-fluid"], [1, "footer-copyright"], [1, "mb-0"], ["src", "../../../../assets/svg/sid_digital_favicon.svg", "alt", "", 1, "img-fluid"]],
        template: function FooterComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\xA9 2021 SID Digital / V2.1.");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    36290: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HeaderComponent": function HeaderComponent() {
          return (
            /* binding */
            _HeaderComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _services_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/nav.service */
      5897);
      /* harmony import */


      var src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! src/app/auth/auth.service */
      50384);
      /* harmony import */


      var _services_helper_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../services/helper.service */
      21785);
      /* harmony import */


      var _feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../feather-icons/feather-icons.component */
      61676);
      /* harmony import */


      var _directives_fullscreen_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../directives/fullscreen.directive */
      61301);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _c0 = function _c0(a0) {
        return {
          "open": a0
        };
      };

      var _c1 = function _c1() {
        return ["/profile/edit"];
      };

      var body = document.getElementsByTagName("body")[0];

      var _HeaderComponent = /*#__PURE__*/function () {
        function _HeaderComponent(document, navServices, authService, helperService) {
          _classCallCheck(this, _HeaderComponent);

          this.document = document;
          this.navServices = navServices;
          this.authService = authService;
          this.helperService = helperService;
          this.openNav = false;
          this.right_sidebar = false;
          this.rightSidebarEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        }

        _createClass(_HeaderComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this7 = this;

            this.getUSer();
            this.elem = document.documentElement;
            this.navServices.items.subscribe(function (menuItems) {
              _this7.items = menuItems;
            });
          }
        }, {
          key: "collapseSidebar",
          value: function collapseSidebar() {
            this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
          }
        }, {
          key: "onLogout",
          value: function onLogout() {
            this.authService.logout();
          }
        }, {
          key: "getUSer",
          value: function getUSer() {
            this.userInfo = this.helperService.getUserInfo();
          }
        }, {
          key: "toggleFullScreen",
          value: function toggleFullScreen() {
            this.navServices.fullScreen = !this.navServices.fullScreen;

            if (this.navServices.fullScreen) {
              if (this.elem.requestFullscreen) {
                this.elem.requestFullscreen();
              } else if (this.elem.mozRequestFullScreen) {
                /* Firefox */
                this.elem.mozRequestFullScreen();
              } else if (this.elem.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                this.elem.webkitRequestFullscreen();
              } else if (this.elem.msRequestFullscreen) {
                /* IE/Edge */
                this.elem.msRequestFullscreen();
              }
            } else {
              if (!this.document.exitFullscreen) {
                this.document.exitFullscreen();
              } else if (this.document.mozCancelFullScreen) {
                /* Firefox */
                this.document.mozCancelFullScreen();
              } else if (this.document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                this.document.webkitExitFullscreen();
              } else if (this.document.msExitFullscreen) {
                /* IE/Edge */
                this.document.msExitFullscreen();
              }
            }
          }
        }]);

        return _HeaderComponent;
      }();

      _HeaderComponent.ɵfac = function HeaderComponent_Factory(t) {
        return new (t || _HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_6__.DOCUMENT), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_nav_service__WEBPACK_IMPORTED_MODULE_0__.NavService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_helper_service__WEBPACK_IMPORTED_MODULE_2__.HelperService));
      };

      _HeaderComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
        type: _HeaderComponent,
        selectors: [["app-header"]],
        outputs: {
          rightSidebarEvent: "rightSidebarEvent"
        },
        decls: 33,
        vars: 14,
        consts: [["id", "page-main-header", 1, "page-main-header", 3, "ngClass"], [1, "main-header-right", "row"], [1, "main-header-left", "d-lg-none"], [1, "logo-wrapper"], ["href", "javascript::void(0)"], ["src", "assets/svg/bucca-logo-150px.svg", "alt", ""], [1, "mobile-sidebar"], [1, "text-right", "media-body", "switch-sm"], [1, "switch"], ["href", "javascript:void(0)", 3, "click"], ["id", "sidebar-toggle", 3, "icon"], [1, "nav-right", "col"], [1, "nav-menus", "pull-right", 3, "ngClass"], ["toggleFullscreen", "", 1, "text-dark", 3, "click"], [3, "icon"], [1, "onhover-dropdown"], [1, "media", "align-items-center"], ["alt", "header-user", 1, "align-self-center", "pull-right", "profile-picture", "img-50", "rounded-circle", 3, "src"], [1, "dotted-animation"], [1, "animate-circle"], [1, "main-circle"], [1, "p-20", "profile-dropdown", "onhover-show-div"], ["routerLinkActive", "router-link-active", 3, "routerLink"], [3, "click"], [1, "d-lg-none", "mobile-toggle", "pull-right"]],
        template: function HeaderComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "a", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "img", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "label", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "a", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_9_listener() {
              return ctx.collapseSidebar();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "app-feather-icons", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ul", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "a", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_14_listener() {
              return ctx.toggleFullScreen();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "app-feather-icons", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "li", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 16);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](18, "img", 17);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 18);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](20, "span", 19);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "span", 20);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "ul", 21);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "a", 22);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](25, "app-feather-icons", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, "Profile ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](27, "li");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "a", 23);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function HeaderComponent_Template_a_click_28_listener() {
              return ctx.onLogout();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](29, "app-feather-icons", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, "Logout ");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](31, "div", 24);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](32, "app-feather-icons", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](9, _c0, ctx.navServices.collapseSidebar));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](10);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", "align-left");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](11, _c0, ctx.openNav));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", "maximize");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("src", ctx.userInfo.image || "assets/images/dashboard/user.png", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsanitizeUrl"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](13, _c1));

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", "user");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", "log-out");

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("icon", "more-horizontal");
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_3__.FeatherIconsComponent, _directives_fullscreen_directive__WEBPACK_IMPORTED_MODULE_4__.ToggleFullscreenDirective, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLinkActive],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoZWFkZXIuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    36144: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ContentLayoutComponent": function ContentLayoutComponent() {
          return (
            /* binding */
            _ContentLayoutComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var feather_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! feather-icons */
      38789);
      /* harmony import */


      var feather_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(feather_icons__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs */
      94283);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _services_nav_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../../services/nav.service */
      5897);
      /* harmony import */


      var _services_customizer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../../../services/customizer.service */
      60360);
      /* harmony import */


      var src_app_shared_services_error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! src/app/shared/services/error.service */
      44578);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../../header/header.component */
      36290);
      /* harmony import */


      var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../sidebar/sidebar.component */
      6664);
      /* harmony import */


      var _footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ../../footer/footer.component */
      66526);

      var _ContentLayoutComponent = /*#__PURE__*/function () {
        function _ContentLayoutComponent(navServices, customizer, errorService, router) {
          _classCallCheck(this, _ContentLayoutComponent);

          this.navServices = navServices;
          this.customizer = customizer;
          this.errorService = errorService;
          this.router = router;
          this.errSub = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subscription();
        }

        _createClass(_ContentLayoutComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this8 = this;

            this.errSub = this.errorService.createOnline$().subscribe(function (isOnline) {
              isOnline ? null : _this8.router.navigate(["/no-internet"]);
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            //Called once, before the instance is destroyed.
            //Add 'implements OnDestroy' to the class.
            this.errSub.unsubscribe();
          }
        }, {
          key: "ngAfterViewInit",
          value: function ngAfterViewInit() {
            setTimeout(function () {
              feather_icons__WEBPACK_IMPORTED_MODULE_0__.replace();
            });
          }
        }]);

        return _ContentLayoutComponent;
      }();

      _ContentLayoutComponent.ɵfac = function ContentLayoutComponent_Factory(t) {
        return new (t || _ContentLayoutComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_nav_service__WEBPACK_IMPORTED_MODULE_1__.NavService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_customizer_service__WEBPACK_IMPORTED_MODULE_2__.CustomizerService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_shared_services_error_service__WEBPACK_IMPORTED_MODULE_3__.ErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router));
      };

      _ContentLayoutComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
        type: _ContentLayoutComponent,
        selectors: [["app-content-layout"]],
        decls: 11,
        vars: 6,
        consts: [[1, "dark-body-only"], ["id", "canvas-bookmark", 1, "page-wrapper", 3, "ngClass"], [1, "page-body-wrapper", "bg-color1", 3, "ngClass"], ["id", "pages-sidebar", 1, "page-sidebar", 3, "ngClass"], [1, "pt-2", "page-body"], [1, "mt-3"], [1, "footer", "mt-5"]],
        template: function ContentLayoutComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "app-header");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "app-sidebar");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "main", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "router-outlet");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "footer", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "app-footer");

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", ctx.customizer.data.settings.sidebar.type);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", ctx.customizer.data.settings.sidebar.body_type);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("open", ctx.navServices.collapseSidebar);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngClass", ctx.customizer.data.settings.sidebar_backround);

            _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("sidebar-layout", ctx.customizer.data.settings.sidebar_setting);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgClass, _header_header_component__WEBPACK_IMPORTED_MODULE_4__.HeaderComponent, _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__.SidebarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterOutlet, _footer_footer_component__WEBPACK_IMPORTED_MODULE_6__.FooterComponent],
        styles: [".page-body[_ngcontent-%COMP%] {\n  margin-bottom: 4rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRlbnQtbGF5b3V0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CO0FBQ3JCIiwiZmlsZSI6ImNvbnRlbnQtbGF5b3V0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBhZ2UtYm9keSB7XG4gIG1hcmdpbi1ib3R0b206IDRyZW07XG59XG4iXX0= */"]
      });
      /***/
    },

    /***/
    34545: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NoInternetComponent": function NoInternetComponent() {
          return (
            /* binding */
            _NoInternetComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _NoInternetComponent = /*#__PURE__*/function () {
        function _NoInternetComponent() {
          _classCallCheck(this, _NoInternetComponent);
        }

        _createClass(_NoInternetComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return _NoInternetComponent;
      }();

      _NoInternetComponent.ɵfac = function NoInternetComponent_Factory(t) {
        return new (t || _NoInternetComponent)();
      };

      _NoInternetComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _NoInternetComponent,
        selectors: [["app-no-internet"]],
        decls: 14,
        vars: 1,
        consts: [[1, "error-wrapper"], [1, "container"], ["src", "assets/images/other-images/sad.png", "alt", "", 1, "img-100"], [1, "error-heading"], ["src", "assets/images/cloud-bg-1.png", "alt", "", 1, "cloud-first"], [1, "headline", "font-primary"], ["src", "assets/images/cloud-bg-2.png", "alt", "", 1, "cloud-second"], [1, "col-md-8", "offset-md-2"], [1, "sub-content"], [1, ""], [1, "btn", "btn-primary-gradien", "btn-lg", 3, "routerLink"]],
        template: function NoInternetComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h2", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Pardon the interruption");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Sorry, there is no internet connection. Please connect and try again. ");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "BACK TO DASHBOARD");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", "/");
          }
        },
        directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterLinkWithHref],
        styles: [".headline[_ngcontent-%COMP%] {\n  font-size: 5em !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vLWludGVybmV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQXlCO0FBQzNCIiwiZmlsZSI6Im5vLWludGVybmV0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRsaW5lIHtcbiAgZm9udC1zaXplOiA1ZW0gIWltcG9ydGFudDtcbn1cbiJdfQ== */"]
      });
      /***/
    },

    /***/
    92274: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "PaginatorComponent": function PaginatorComponent() {
          return (
            /* binding */
            _PaginatorComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/material/paginator */
      38021);

      var _PaginatorComponent = /*#__PURE__*/function () {
        function _PaginatorComponent() {
          _classCallCheck(this, _PaginatorComponent);

          this.pageEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.pageSize = 10;
          this.pageSizeOptions = [1, 5, 10, 25, 100];
        }

        _createClass(_PaginatorComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "onPageChange",
          value: function onPageChange(value) {
            this.pageEvent.emit({
              pageIndex: value.pageIndex + 1,
              pageSize: value.pageSize
            });
          }
        }]);

        return _PaginatorComponent;
      }();

      _PaginatorComponent.ɵfac = function PaginatorComponent_Factory(t) {
        return new (t || _PaginatorComponent)();
      };

      _PaginatorComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _PaginatorComponent,
        selectors: [["app-paginator"]],
        inputs: {
          length: "length",
          pageSize: "pageSize",
          pageSizeOptions: "pageSizeOptions"
        },
        outputs: {
          pageEvent: "pageEvent"
        },
        decls: 1,
        vars: 3,
        consts: [["showFirstLastButtons", "", 3, "length", "pageSize", "pageSizeOptions", "page"]],
        template: function PaginatorComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-paginator", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("page", function PaginatorComponent_Template_mat_paginator_page_0_listener($event) {
              return ctx.onPageChange($event);
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("length", ctx.length)("pageSize", ctx.pageSize)("pageSizeOptions", ctx.pageSizeOptions);
          }
        },
        directives: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__.MatPaginator],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYWdpbmF0b3IuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    6664: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SidebarComponent": function SidebarComponent() {
          return (
            /* binding */
            _SidebarComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _services_nav_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../services/nav.service */
      5897);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../feather-icons/feather-icons.component */
      61676);

      function SidebarComponent_li_6_a_1_span_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", menuItem_r1.badgeType, " ml-3");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.badgeValue);
        }
      }

      function SidebarComponent_li_6_a_1_i_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 17);
        }
      }

      function SidebarComponent_li_6_a_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SidebarComponent_li_6_a_1_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r12);

            var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

            var ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r10.toggletNavActive(menuItem_r1);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-feather-icons", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_a_1_span_4_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidebarComponent_li_6_a_1_i_5_Template, 1, 0, "i", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", menuItem_r1.icon);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.children);
        }
      }

      function SidebarComponent_li_6_a_2_span_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", menuItem_r1.badgeType, " ml-3");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.badgeValue);
        }
      }

      function SidebarComponent_li_6_a_2_i_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 17);
        }
      }

      var _c0 = function _c0(a0) {
        return [a0];
      };

      function SidebarComponent_li_6_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-feather-icons", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_a_2_span_4_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidebarComponent_li_6_a_2_i_5_Template, 1, 0, "i", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", !menuItem_r1.type ? null : _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, menuItem_r1.path));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", menuItem_r1.icon);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.children);
        }
      }

      function SidebarComponent_li_6_a_3_span_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", menuItem_r1.badgeType, " ml-3");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.badgeValue);
        }
      }

      function SidebarComponent_li_6_a_3_i_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 17);
        }
      }

      function SidebarComponent_li_6_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-feather-icons", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_a_3_span_4_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidebarComponent_li_6_a_3_i_5_Template, 1, 0, "i", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", !menuItem_r1.type ? null : menuItem_r1.path, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", menuItem_r1.icon);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.children);
        }
      }

      function SidebarComponent_li_6_a_4_span_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", menuItem_r1.badgeType, " ml-3");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.badgeValue);
        }
      }

      function SidebarComponent_li_6_a_4_i_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 17);
        }
      }

      function SidebarComponent_li_6_a_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-feather-icons", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_a_4_span_4_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidebarComponent_li_6_a_4_i_5_Template, 1, 0, "i", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", !menuItem_r1.type ? null : menuItem_r1.path, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", menuItem_r1.icon);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](menuItem_r1.title);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.children);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenItem_r27.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenItem_r27.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_1_i_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 30);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SidebarComponent_li_6_ul_5_li_1_a_1_Template_a_click_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r38);

            var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

            var ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);

            return ctx_r36.toggletNavActive(childrenItem_r27);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_a_1_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_ul_5_li_1_a_1_i_4_Template, 1, 0, "i", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenItem_r27.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.children);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_2_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenItem_r27.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenItem_r27.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_2_i_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 30);
        }
      }

      var _c1 = function _c1() {
        return {
          exact: true
        };
      };

      function SidebarComponent_li_6_ul_5_li_1_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_a_2_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_ul_5_li_1_a_2_i_4_Template, 1, 0, "i", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", !childrenItem_r27.type ? null : _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](5, _c0, childrenItem_r27.path))("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](7, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenItem_r27.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.children);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_3_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenItem_r27.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenItem_r27.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_3_i_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 30);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_a_3_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_ul_5_li_1_a_3_i_4_Template, 1, 0, "i", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", !childrenItem_r27.type ? null : childrenItem_r27.path, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](5, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenItem_r27.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.children);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_4_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenItem_r27.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenItem_r27.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_4_i_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "i", 30);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_a_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_a_4_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_ul_5_li_1_a_4_i_4_Template, 1, 0, "i", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", !childrenItem_r27.type ? null : childrenItem_r27.path, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenItem_r27.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.badgeType);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.children);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_1_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenSubItem_r53.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenSubItem_r53.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_1_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", !childrenSubItem_r53.type ? null : _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](4, _c0, childrenSubItem_r53.path))("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](6, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenSubItem_r53.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenSubItem_r53.badgeType);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_2_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenSubItem_r53.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenSubItem_r53.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_2_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", !childrenSubItem_r53.type ? null : childrenSubItem_r53.path, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLinkActiveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](4, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenSubItem_r53.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenSubItem_r53.badgeType);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_3_span_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassMapInterpolate1"]("badge badge-", childrenSubItem_r53.badgeType, " pull-right");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](childrenSubItem_r53.badgeValue);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "a", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "i", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_3_span_3_Template, 2, 4, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpropertyInterpolate"]("href", !childrenSubItem_r53.type ? null : childrenSubItem_r53.path, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", childrenSubItem_r53.title, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenSubItem_r53.badgeType);
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_1_Template, 4, 7, "a", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_2_Template, 4, 5, "a", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_a_3_Template, 4, 3, "a", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenSubItem_r53 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenSubItem_r53.type === "link");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenSubItem_r53.type === "extLink");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenSubItem_r53.type === "extTabLink");
        }
      }

      function SidebarComponent_li_6_ul_5_li_1_ul_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidebarComponent_li_6_ul_5_li_1_ul_5_li_1_Template, 4, 3, "li", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", childrenItem_r27.children);
        }
      }

      var _c2 = function _c2(a0) {
        return {
          active: a0
        };
      };

      function SidebarComponent_li_6_ul_5_li_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidebarComponent_li_6_ul_5_li_1_a_1_Template, 5, 3, "a", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SidebarComponent_li_6_ul_5_li_1_a_2_Template, 5, 8, "a", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_ul_5_li_1_a_3_Template, 5, 6, "a", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_ul_5_li_1_a_4_Template, 5, 4, "a", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidebarComponent_li_6_ul_5_li_1_ul_5_Template, 2, 1, "ul", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var childrenItem_r27 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c2, childrenItem_r27.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.type === "sub");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.type === "link");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.type === "extLink");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.type === "extTabLink");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", childrenItem_r27.children);
        }
      }

      var _c3 = function _c3(a0, a1) {
        return {
          "menu-open": a0,
          "menu-close": a1
        };
      };

      function SidebarComponent_li_6_ul_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidebarComponent_li_6_ul_5_li_1_Template, 6, 8, "li", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction2"](2, _c3, menuItem_r1.active, !menuItem_r1.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", menuItem_r1.children);
        }
      }

      function SidebarComponent_li_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, SidebarComponent_li_6_a_1_Template, 6, 4, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, SidebarComponent_li_6_a_2_Template, 6, 7, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, SidebarComponent_li_6_a_3_Template, 6, 5, "a", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, SidebarComponent_li_6_a_4_Template, 6, 5, "a", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, SidebarComponent_li_6_ul_5_Template, 2, 5, "ul", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var menuItem_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](6, _c2, menuItem_r1.active));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.type === "sub");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.type === "link");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.type === "extLink");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.type === "extTabLink");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", menuItem_r1.children);
        }
      }

      var _SidebarComponent = /*#__PURE__*/function () {
        function _SidebarComponent(router, navServices) {
          var _this9 = this;

          _classCallCheck(this, _SidebarComponent);

          this.router = router;
          this.navServices = navServices;
          this.navServices.getUserGroup();
          this.navServices.items.subscribe(function (menuItems) {
            _this9.menuItems = menuItems;

            _this9.router.events.subscribe(function (event) {
              if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__.NavigationEnd) {
                menuItems.filter(function (items) {
                  if (items.path === event.url) _this9.setNavActive(items);
                  if (!items.children) return false;
                  items.children.filter(function (subItems) {
                    if (subItems.path === event.url) _this9.setNavActive(subItems);
                    if (!subItems.children) return false;
                    subItems.children.filter(function (subSubItems) {
                      if (subSubItems.path === event.url) _this9.setNavActive(subSubItems);
                    });
                  });
                });
              }
            });
          });
        } // Active Nave state


        _createClass(_SidebarComponent, [{
          key: "setNavActive",
          value: function setNavActive(item) {
            this.menuItems.filter(function (menuItem) {
              if (menuItem != item) menuItem.active = false;
              if (menuItem.children && menuItem.children.includes(item)) menuItem.active = true;

              if (menuItem.children) {
                menuItem.children.filter(function (submenuItems) {
                  if (submenuItems.children && submenuItems.children.includes(item)) {
                    menuItem.active = true;
                    submenuItems.active = true;
                  }
                });
              }
            });
          } // Click Toggle menu

        }, {
          key: "toggletNavActive",
          value: function toggletNavActive(item) {
            var _this10 = this;

            if (!item.active) {
              this.menuItems.forEach(function (a) {
                if (_this10.menuItems.includes(item)) a.active = false;
                if (!a.children) return false;
                a.children.forEach(function (b) {
                  if (a.children.includes(item)) {
                    b.active = false;
                  }
                });
              });
            }

            item.active = !item.active;
          } //Fileupload

        }, {
          key: "readUrl",
          value: function readUrl(event) {
            var _this11 = this;

            if (event.target.files.length === 0) return; //Image upload validation

            var mimeType = event.target.files[0].type;

            if (mimeType.match(/image\/*/) == null) {
              return;
            } // Image upload


            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);

            reader.onload = function (_event) {
              _this11.url = reader.result;
            };
          }
        }]);

        return _SidebarComponent;
      }();

      _SidebarComponent.ɵfac = function SidebarComponent_Factory(t) {
        return new (t || _SidebarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_nav_service__WEBPACK_IMPORTED_MODULE_0__.NavService));
      };

      _SidebarComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: _SidebarComponent,
        selectors: [["app-sidebar"]],
        decls: 7,
        vars: 1,
        consts: [[1, "main-header-left", "d-none", "d-lg-block"], [1, "logo-wrapper"], ["href", "javascript:void(0)"], ["src", "assets/svg/bucca-logo-150px.svg", "alt", "", 1, "mx-auto", "sidebar-logo"], [1, "sidebar", "custom-scrollbar"], [1, "sidebar-menu"], [3, "ngClass", 4, "ngFor", "ngForOf"], [3, "ngClass"], ["href", "javascript:void(0)", "class", "sidebar-header", 3, "click", 4, "ngIf"], ["routerLinkActive", "active", "class", "sidebar-header", 3, "routerLink", 4, "ngIf"], ["class", "sidebar-header", 3, "href", 4, "ngIf"], ["target", "_blank", "class", "sidebar-header", 3, "href", 4, "ngIf"], ["class", "sidebar-submenu", 3, "ngClass", 4, "ngIf"], ["href", "javascript:void(0)", 1, "sidebar-header", 3, "click"], [3, "icon"], [3, "class", 4, "ngIf"], ["class", "fa fa-angle-right pull-right", 4, "ngIf"], [1, "fa", "fa-angle-right", "pull-right"], ["routerLinkActive", "active", 1, "sidebar-header", 3, "routerLink"], [1, "sidebar-header", 3, "href"], ["target", "_blank", 1, "sidebar-header", 3, "href"], [1, "sidebar-submenu", 3, "ngClass"], ["href", "javascript:void(0)", 3, "click", 4, "ngIf"], ["routerLinkActive", "active", 3, "routerLink", "routerLinkActiveOptions", 4, "ngIf"], ["routerLinkActive", "active", 3, "href", "routerLinkActiveOptions", 4, "ngIf"], ["target", "_blank", 3, "href", 4, "ngIf"], ["class", "sidebar-submenu", 4, "ngIf"], ["href", "javascript:void(0)", 3, "click"], [1, "fa", "fa-circle"], ["class", "fa fa-angle-down pull-right", 4, "ngIf"], [1, "fa", "fa-angle-down", "pull-right"], ["routerLinkActive", "active", 3, "routerLink", "routerLinkActiveOptions"], ["routerLinkActive", "active", 3, "href", "routerLinkActiveOptions"], ["target", "_blank", 3, "href"], [1, "sidebar-submenu"], [4, "ngFor", "ngForOf"]],
        template: function SidebarComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "ul", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, SidebarComponent_li_6_Template, 6, 8, "li", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.menuItems);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_1__.FeatherIconsComponent, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHref, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLinkActive],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaWRlYmFyLmNvbXBvbmVudC5zY3NzIn0= */"],
        encapsulation: 2
      });
      /***/
    },

    /***/
    48898: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TableFunctionsComponent": function TableFunctionsComponent() {
          return (
            /* binding */
            _TableFunctionsComponent
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/material/button */
      70781);
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/icon */
      52529);
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/form-field */
      65788);
      /* harmony import */


      var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/material/select */
      37007);
      /* harmony import */


      var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/core */
      32220);
      /* harmony import */


      var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/datepicker */
      42937);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/input */
      64742);

      function TableFunctionsComponent_div_1_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "download");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        }
      }

      function TableFunctionsComponent_div_1_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "downloading");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TableFunctionsComponent_div_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TableFunctionsComponent_div_1_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);

            var ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r9.onExportExcel();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TableFunctionsComponent_div_1_ng_container_2_Template, 3, 0, "ng-container", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TableFunctionsComponent_div_1_ng_template_3_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Download xls ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);

          var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r0.downloading)("ngIfElse", _r7);
        }
      }

      function TableFunctionsComponent_mat_form_field_2_mat_option_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var company_r12 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", company_r12.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", company_r12.name, " ");
        }
      }

      function TableFunctionsComponent_mat_form_field_2_Template(rf, ctx) {
        if (rf & 1) {
          var _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Company");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function TableFunctionsComponent_mat_form_field_2_Template_mat_select_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14);

            var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r13.onCompanyChange($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TableFunctionsComponent_mat_form_field_2_mat_option_4_Template, 2, 2, "mat-option", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.companyArray);
        }
      }

      function TableFunctionsComponent_mat_form_field_3_mat_option_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var vendor_r16 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", vendor_r16.id);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", vendor_r16.name, " ");
        }
      }

      function TableFunctionsComponent_mat_form_field_3_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Vendor");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function TableFunctionsComponent_mat_form_field_3_Template_mat_select_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18);

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r17.onVendorChange($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TableFunctionsComponent_mat_form_field_3_mat_option_4_Template, 2, 2, "mat-option", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r2.vendorArray);
        }
      }

      function TableFunctionsComponent_mat_form_field_4_mat_option_4_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var status_r20 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r20.code);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r20.name, " ");
        }
      }

      function TableFunctionsComponent_mat_form_field_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-select", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function TableFunctionsComponent_mat_form_field_4_Template_mat_select_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22);

            var ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r21.onStatusChange($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TableFunctionsComponent_mat_form_field_4_mat_option_4_Template, 2, 2, "mat-option", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.statusArray);
        }
      }

      function TableFunctionsComponent_mat_form_field_5_mat_error_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Invalid start date");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TableFunctionsComponent_mat_form_field_5_mat_error_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-error");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Invalid end date");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function TableFunctionsComponent_mat_form_field_5_Template(rf, ctx) {
        if (rf & 1) {
          var _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Enter a date range");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-date-range-input", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TableFunctionsComponent_mat_form_field_5_Template_mat_date_range_input_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27);

            var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

            return _r23.open();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dateInput", function TableFunctionsComponent_mat_form_field_5_Template_input_dateInput_4_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27);

            var ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r28.onSetStartDate($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "input", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dateInput", function TableFunctionsComponent_mat_form_field_5_Template_input_dateInput_5_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r27);

            var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r29.onSetEndDate($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "mat-datepicker-toggle", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-date-range-picker", 16, 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-hint");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Pick start and end dates");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, TableFunctionsComponent_mat_form_field_5_mat_error_11_Template, 2, 0, "mat-error", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, TableFunctionsComponent_mat_form_field_5_mat_error_12_Template, 2, 0, "mat-error", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](8);

          var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r4.range)("rangePicker", _r23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("for", _r23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.range.controls.start.hasError("matStartDateInvalid"));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r4.range.controls.end.hasError("matEndDateInvalid"));
        }
      }

      function TableFunctionsComponent_mat_form_field_6_Template(rf, ctx) {
        if (rf & 1) {
          var _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-form-field", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Choose a date");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "input", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TableFunctionsComponent_mat_form_field_6_Template_input_click_3_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r32);

            var _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

            return _r30.open();
          })("dateInput", function TableFunctionsComponent_mat_form_field_6_Template_input_dateInput_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r32);

            var ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

            return ctx_r33.onSetDate($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-datepicker-toggle", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "mat-datepicker", 16, 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matDatepicker", _r30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("for", _r30);
        }
      }

      var _TableFunctionsComponent = /*#__PURE__*/function () {
        function _TableFunctionsComponent() {
          _classCallCheck(this, _TableFunctionsComponent);

          this.downloading = false;
          this.hideDownload = false;
          this.rangePicker = false;
          this.datePicker = false;
          this.exportExcel = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.companyChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.vendorChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.statusChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.setStartDate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.setEndDate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.setDate = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
          this.range = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroup({
            start: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl(),
            end: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl()
          });
        }

        _createClass(_TableFunctionsComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "onCompanyChange",
          value: function onCompanyChange(value) {
            this.companyChange.emit(value);
          }
        }, {
          key: "onVendorChange",
          value: function onVendorChange(value) {
            this.vendorChange.emit(value);
          }
        }, {
          key: "onStatusChange",
          value: function onStatusChange(value) {
            this.statusChange.emit(value);
          }
        }, {
          key: "onSetStartDate",
          value: function onSetStartDate(value) {
            this.setStartDate.emit(value);
          }
        }, {
          key: "onSetEndDate",
          value: function onSetEndDate(value) {
            this.setEndDate.emit(value);
          }
        }, {
          key: "onSetDate",
          value: function onSetDate(value) {
            this.setDate.emit(value);
          }
        }, {
          key: "onExportExcel",
          value: function onExportExcel() {
            this.exportExcel.emit(this.downloading);
          }
        }]);

        return _TableFunctionsComponent;
      }();

      _TableFunctionsComponent.ɵfac = function TableFunctionsComponent_Factory(t) {
        return new (t || _TableFunctionsComponent)();
      };

      _TableFunctionsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: _TableFunctionsComponent,
        selectors: [["app-table-functions"]],
        inputs: {
          downloading: "downloading",
          hideDownload: "hideDownload",
          companyArray: "companyArray",
          rangePicker: "rangePicker",
          datePicker: "datePicker",
          vendorArray: "vendorArray",
          statusArray: "statusArray"
        },
        outputs: {
          exportExcel: "exportExcel",
          companyChange: "companyChange",
          vendorChange: "vendorChange",
          statusChange: "statusChange",
          setStartDate: "setStartDate",
          setEndDate: "setEndDate",
          setDate: "setDate"
        },
        decls: 7,
        vars: 6,
        consts: [[1, "mb-2", "d-flex", "align-items-center"], ["class", "mr-auto", 4, "ngIf"], ["class", "mr-2", "appearance", "outline", 4, "ngIf"], [1, "mr-auto"], ["mat-raised-button", "", 1, "mr-2", 3, "click"], [4, "ngIf", "ngIfElse"], ["downloadingTemplate", ""], ["ngif", "", 1, "mr-2"], ["appearance", "outline", 1, "mr-2"], [3, "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [3, "formGroup", "rangePicker", "click"], ["readonly", "", "formControlName", "start", "matStartDate", "", "placeholder", "Start date", 3, "dateInput"], ["readonly", "", "formControlName", "end", "matEndDate", "", "placeholder", "End date", 3, "dateInput"], ["matSuffix", "", 3, "for"], ["disabled", "false"], ["picker", ""], [4, "ngIf"], ["matInput", "", "readonly", "", 3, "matDatepicker", "click", "dateInput"]],
        template: function TableFunctionsComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, TableFunctionsComponent_div_1_Template, 6, 2, "div", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TableFunctionsComponent_mat_form_field_2_Template, 5, 1, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TableFunctionsComponent_mat_form_field_3_Template, 5, 1, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, TableFunctionsComponent_mat_form_field_4_Template, 5, 1, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TableFunctionsComponent_mat_form_field_5_Template, 13, 5, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TableFunctionsComponent_mat_form_field_6_Template, 7, 2, "mat-form-field", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.hideDownload);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.companyArray);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.vendorArray);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.statusArray);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.rangePicker == true);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.datePicker == true);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelect, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_7__.MatOption, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDateRangeInput, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatStartDate, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatEndDate, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepickerToggle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatSuffix, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDateRangePicker, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatHint, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepickerInput, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_8__.MatDatepicker],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWJsZS1mdW5jdGlvbnMuY29tcG9uZW50LnNjc3MifQ== */"]
      });
      /***/
    },

    /***/
    50129: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ConfigDB": function ConfigDB() {
          return (
            /* binding */
            _ConfigDB
          );
        }
        /* harmony export */

      }); // export class ConfigDB {
      //   static data = {
      //     settings: {
      //       layout_type: "ltr",
      //       sidebar: { type: "default", body_type: "default" },
      //       sidebar_setting: "default-sidebar",
      //       sidebar_backround: "dark-sidebar",
      //     },
      //     color: {
      //       layout_version: "light",
      //       color: "color-1",
      //       primary_color: "#4466f2",
      //       secondary_color: "#1ea6ec",
      //       mix_layout: "default",
      //     },
      //     router_animation: "fadeIn",
      //   };
      // }
      // export class ConfigDB {
      //   static data = {
      //     settings: {
      //       layout_type: "ltr",
      //       sidebar: {
      //         type: "compact-wrapper",
      //         body_type: "sidebar-icon",
      //       },
      //       sidebar_setting: "iconcolor-sidebar",
      //       sidebar_backround: "dark-sidebar",
      //     },
      //     color: {
      //       layout_version: "",
      //       color: "",
      //       primary_color: "",
      //       secondary_color: "",
      //       mix_layout: "default",
      //     },
      //     router_animation: "fadeIn",
      //   };
      // }
      // export class ConfigDB {
      //   static data = {
      //   settings: {
      //   layout_type: 'ltr',
      //   sidebar: {
      //      type: 'compact-wrapper',
      //      body_type: 'sidebar-icon'
      //   },
      //   sidebar_setting: 'iconcolor-sidebar',
      //   sidebar_backround: 'color4-sidebar'
      // },
      // color: {
      //   layout_version: 'light',
      //   color: 'color-1',
      //   primary_color: '#9b3934',
      //   secondary_color: '#FFF5EC',
      //   mix_layout: 'light-only'
      // },
      // router_animation: 'fadeIn'
      // }
      // }


      var _ConfigDB = function _ConfigDB() {
        _classCallCheck(this, _ConfigDB);
      };

      _ConfigDB.data = {
        settings: {
          layout_type: "ltr",
          sidebar: {
            type: "compact-wrapper",
            body_type: "sidebar-icon"
          },
          sidebar_setting: "iconcolor-sidebar",
          sidebar_backround: "light-sidebar"
        },
        color: {
          layout_version: "light",
          color: "color-1",
          primary_color: "#9b3934",
          secondary_color: "#FFF5EC",
          mix_layout: "light-only"
        },
        router_animation: "fadeIn"
      };
      /***/
    },

    /***/
    61301: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ToggleFullscreenDirective": function ToggleFullscreenDirective() {
          return (
            /* binding */
            _ToggleFullscreenDirective
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var screenfull = __webpack_require__(
      /*! screenfull */
      15950);

      var _ToggleFullscreenDirective = /*#__PURE__*/function () {
        function _ToggleFullscreenDirective() {
          _classCallCheck(this, _ToggleFullscreenDirective);
        }

        _createClass(_ToggleFullscreenDirective, [{
          key: "onClick",
          value: function onClick() {
            if (screenfull.enabled) {
              screenfull.toggle();
            }
          }
        }]);

        return _ToggleFullscreenDirective;
      }();

      _ToggleFullscreenDirective.ɵfac = function ToggleFullscreenDirective_Factory(t) {
        return new (t || _ToggleFullscreenDirective)();
      };

      _ToggleFullscreenDirective.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
        type: _ToggleFullscreenDirective,
        selectors: [["", "toggleFullscreen", ""]],
        hostBindings: function ToggleFullscreenDirective_HostBindings(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ToggleFullscreenDirective_click_HostBindingHandler() {
              return ctx.onClick();
            });
          }
        }
      });
      /***/
    },

    /***/
    86225: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "DateTimePipe": function DateTimePipe() {
          return (
            /* binding */
            _DateTimePipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _services_helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../services/helper.service */
      21785);

      var _DateTimePipe = /*#__PURE__*/function () {
        function _DateTimePipe(helperService) {
          _classCallCheck(this, _DateTimePipe);

          this.helperService = helperService;
        }

        _createClass(_DateTimePipe, [{
          key: "transform",
          value: function transform(value) {
            var date = this.helperService.formatDateFromNow(arguments.length <= 1 ? undefined : arguments[1], arguments.length <= 2 ? undefined : arguments[2]);
            return date;
          }
        }]);

        return _DateTimePipe;
      }();

      _DateTimePipe.ɵfac = function DateTimePipe_Factory(t) {
        return new (t || _DateTimePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_helper_service__WEBPACK_IMPORTED_MODULE_0__.HelperService, 16));
      };

      _DateTimePipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
        name: "dateTime",
        type: _DateTimePipe,
        pure: true
      });
      /***/
    },

    /***/
    11413: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ImagePipe": function ImagePipe() {
          return (
            /* binding */
            _ImagePipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../../environments/environment */
      92340);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _ImagePipe = /*#__PURE__*/function () {
        function _ImagePipe() {
          _classCallCheck(this, _ImagePipe);

          this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
        }

        _createClass(_ImagePipe, [{
          key: "transform",
          value: function transform(value) {
            return "".concat(this.apiUrl).concat(value);
          }
        }]);

        return _ImagePipe;
      }();

      _ImagePipe.ɵfac = function ImagePipe_Factory(t) {
        return new (t || _ImagePipe)();
      };

      _ImagePipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
        name: "image",
        type: _ImagePipe,
        pure: true
      });
      /***/
    },

    /***/
    33694: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "PlatformPipe": function PlatformPipe() {
          return (
            /* binding */
            _PlatformPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _PlatformPipe = /*#__PURE__*/function () {
        function _PlatformPipe() {
          _classCallCheck(this, _PlatformPipe);
        }

        _createClass(_PlatformPipe, [{
          key: "transform",
          value: function transform(value) {
            var platform = value.toLowerCase();

            switch (platform) {
              case "and":
                return "Android";
                break;

              case "web":
                return "WEB";
                break;

              case "ios":
                return "iOS";
                break;

              case "sef":
                return "Self Service";
                break;

              default:
                break;
            } // return null;

          }
        }]);

        return _PlatformPipe;
      }();

      _PlatformPipe.ɵfac = function PlatformPipe_Factory(t) {
        return new (t || _PlatformPipe)();
      };

      _PlatformPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
        name: "platform",
        type: _PlatformPipe,
        pure: true
      });
      /***/
    },

    /***/
    25860: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TransactionStatusPipe": function TransactionStatusPipe() {
          return (
            /* binding */
            _TransactionStatusPipe
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _TransactionStatusPipe = /*#__PURE__*/function () {
        function _TransactionStatusPipe() {
          _classCallCheck(this, _TransactionStatusPipe);
        }

        _createClass(_TransactionStatusPipe, [{
          key: "transform",
          value: function transform(value) {
            var status = value.toLowerCase();

            switch (status) {
              case 'pend':
                return 'pending';
                break;

              case 'void':
                return 'voided';
                break;

              case 'del':
                return 'deleted';
                break;

              case 'cnl':
                return 'cancelled';
                break;

              case 'failed':
                return 'failed';
                break;

              case 'ins':
                return 'insuffivient fund';
                break;

              case 'not_pend':
                return 'Not Pending';
                break;

              default:
                break;
            }

            return null;
          }
        }]);

        return _TransactionStatusPipe;
      }();

      _TransactionStatusPipe.ɵfac = function TransactionStatusPipe_Factory(t) {
        return new (t || _TransactionStatusPipe)();
      };

      _TransactionStatusPipe.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
        name: "transactionStatus",
        type: _TransactionStatusPipe,
        pure: true
      });
      /***/
    },

    /***/
    54989: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "content": function content() {
          return (
            /* binding */
            _content
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _components_no_internet_no_internet_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../components/no-internet/no-internet.component */
      34545);

      var _content = [{
        path: "dashboard",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-src_app_transactions_transaction_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_progress-spinner_js"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_button-toggle_js-node_modules_rxj-8459d0"), __webpack_require__.e("src_app_dashboard_dashboard_module_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ../../dashboard/dashboard.module */
          34814)).then(function (m) {
            return m.DashboardModule;
          });
        }
      }, {
        path: "profile",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-src_app_transactions_transaction_service_ts"), __webpack_require__.e("src_app_profile_profile_module_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ../../profile/profile.module */
          84523)).then(function (m) {
            return m.ProfileModule;
          });
        }
      }, {
        path: "food",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-src_app_transactions_transaction_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_table_js-src_app_user_user_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_progress-spinner_js"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_sort_js"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_button-toggle_js-node_modules_rxj-8459d0"), __webpack_require__.e("src_app_food_food_module_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ../../food/food.module */
          55717)).then(function (m) {
            return m.FoodModule;
          });
        }
      }, {
        path: "user",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-src_app_transactions_transaction_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_table_js-src_app_user_user_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_progress-spinner_js"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_sort_js"), __webpack_require__.e("src_app_user_user_module_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ../../user/user.module */
          88524)).then(function (m) {
            return m.UserModule;
          });
        }
      }, {
        path: "transactions",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-src_app_transactions_transaction_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_table_js-src_app_user_user_service_ts"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_progress-spinner_js"), __webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_sort_js"), __webpack_require__.e("src_app_transactions_transactions_module_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ../../transactions/transactions.module */
          65528)).then(function (m) {
            return m.TransactionsModule;
          });
        }
      }, {
        path: "devices",
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() */
          [__webpack_require__.e("default-node_modules_angular_material___ivy_ngcc___fesm2015_table_js-src_app_user_user_service_ts"), __webpack_require__.e("src_app_device_device_module_ts-src_app_shared_models_response_model_ts")]).then(__webpack_require__.bind(__webpack_require__,
          /*! ../../device/device.module */
          3620)).then(function (m) {
            return m.DeviceModule;
          });
        }
      }, {
        path: "no-internet",
        component: _components_no_internet_no_internet_component__WEBPACK_IMPORTED_MODULE_0__.NoInternetComponent
      }];
      /***/
    },

    /***/
    5237: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CartService": function CartService() {
          return (
            /* binding */
            _CartService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      76491);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _CartService = /*#__PURE__*/function () {
        function _CartService() {
          _classCallCheck(this, _CartService);

          this.cart = [];
          this.cartTotal = 0;
          this.cartListener = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject({
            cart: this.cart,
            total: this.cartTotal
          });
          this.dailyLimit = 200;
          this.personalBalance = 200;
          this.allow_mix = true;
          this.cartTotalListener = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.cartTotal);
        } // addToCart(food: Food) {
        //   const subPrice = food.quantity * food.unit_price;
        //   if (this.dailyLimit >= subPrice) {
        //     this.inAddToCart(food);
        //   } else if (this.allow_mix) {
        //     const allowance = this.personalBalance + this.dailyLimit;
        //     if (allowance >= subPrice) {
        //       const allow = confirm(
        //         `Amount exceed company wallet, would you like to use your personal wallet?`
        //       );
        //       if (allow) {
        //         this.inAddToCart(food);
        //       }
        //     } else {
        //       alert(
        //         `Amount exceeds company wallet, Please topup your personal wallet to continue with this transaction`
        //       );
        //     }
        //   }
        //   this.cartListener.next([...this.cart]);
        // }


        _createClass(_CartService, [{
          key: "inAddToCart",
          value: function inAddToCart(food) {
            // check if food is already in cart
            // const add = this.cart.some((element: Food) => {})
            var dontAdd = this.cart.some(function (element) {
              return element.id == food.id ? true : false;
            });
            dontAdd ? null : this.cart.push(food);
            this.cartTotal = this.calcCartTotal();
            this.cartListener.next({
              cart: this.cart,
              total: this.cartTotal
            });
          } // updateCart(food: Food) {
          //   let subPrice = food.quantity * food.unit_price;
          //   if (this.dailyLimit >= subPrice) {
          //     this.onUpdateCart(food);
          //   } else if (this.allow_mix) {
          //     const allowance = this.personalBalance + this.dailyLimit;
          //     if (allowance >= subPrice) {
          //       const allow = confirm(
          //         `Amount exceed company wallet, would you like to use your personal wallet?`
          //       );
          //       if (allow) {
          //         this.onUpdateCart(food);
          //       }
          //     } else {
          //       alert(
          //         `Amount exceeds company wallet, Please topup your personal wallet to continue with this transaction`
          //       );
          //       food.quantity = 1;
          //       this.cart.push(food);
          //     }
          //   }
          //   this.cartListener.next([...this.cart]);
          // }

        }, {
          key: "onUpdateCart",
          value: function onUpdateCart(food) {
            var updatedCart = _toConsumableArray(this.cart);

            var oldFoodIndex = updatedCart.findIndex(function (element) {
              return element.id === food.id;
            });
            updatedCart[oldFoodIndex] = food;
            this.cart = updatedCart;
            this.cartTotal = this.calcCartTotal();
            this.cartListener.next({
              cart: this.cart,
              total: this.cartTotal
            });
          }
        }, {
          key: "removeFromCart",
          value: function removeFromCart(food) {
            // const item = this.cart.find((element) => element.id === food.id)
            var newCart = this.cart.filter(function (element) {
              if (element.id !== food.id) {
                return element;
              }
            });
            this.cart = newCart;
            this.cartTotal = this.calcCartTotal();
            this.cartListener.next({
              cart: this.cart,
              total: this.cartTotal
            });
          }
        }, {
          key: "clearCart",
          value: function clearCart() {
            this.cart = [];
            this.cartTotal = 0;
            this.cartListener.next({
              cart: this.cart,
              total: this.cartTotal
            });
          }
        }, {
          key: "getCart",
          value: function getCart() {
            return this.cartListener.asObservable();
          }
        }, {
          key: "calcCartTotal",
          value: function calcCartTotal() {
            var totalArray = this.cart.length ? this.cart.map(function (element) {
              return element.unit_price * element.quantity;
            }) : [];

            var reducer = function reducer(a, b) {
              return a + b;
            };

            return this.cart.length ? totalArray.reduce(reducer) : null;
          }
        }]);

        return _CartService;
      }();

      _CartService.ɵfac = function CartService_Factory(t) {
        return new (t || _CartService)();
      };

      _CartService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _CartService,
        factory: _CartService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    60360: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "CustomizerService": function CustomizerService() {
          return (
            /* binding */
            _CustomizerService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _shared_config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../../shared/config/config */
      50129);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _CustomizerService = /*#__PURE__*/function () {
        function _CustomizerService() {
          _classCallCheck(this, _CustomizerService);

          // Configration Layout
          this.data = _shared_config_config__WEBPACK_IMPORTED_MODULE_0__.ConfigDB.data;
          document.body.className = this.data.color.mix_layout;
          document.body.setAttribute("main-theme-layout", this.data.settings.layout_type);
          document.getElementsByTagName('html')[0].setAttribute('dir', this.data.settings.layout_type);
          var color = this.data.color.color;
          var layoutVersion = this.data.color.layout_version;

          if (color) {
            this.createStyle(color);
            if (layoutVersion) document.body.className = layoutVersion;
          }
        } // Create style sheet append in head


        _createClass(_CustomizerService, [{
          key: "createStyle",
          value: function createStyle(color) {
            var head = document.head;
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = window.location.origin + "assets/css/" + color + ".css";
            head.appendChild(link);
          }
        }]);

        return _CustomizerService;
      }();

      _CustomizerService.ɵfac = function CustomizerService_Factory(t) {
        return new (t || _CustomizerService)();
      };

      _CustomizerService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: _CustomizerService,
        factory: _CustomizerService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    44578: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ErrorService": function ErrorService() {
          return (
            /* binding */
            _ErrorService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      79441);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      89919);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      82516);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      25160);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      33927);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/core */
      2316);

      var _ErrorService = /*#__PURE__*/function () {
        function _ErrorService() {
          _classCallCheck(this, _ErrorService);

          this.errorListener = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject();
        } // get listeener


        _createClass(_ErrorService, [{
          key: "getErrorListener",
          value: function getErrorListener() {
            return this.errorListener.asObservable();
          }
        }, {
          key: "throwError",
          value: function throwError(message) {
            this.errorListener.next(message);
          } // handleError() {
          //   this.errorListener.next(null);
          // }

        }, {
          key: "handleError",
          value: function handleError(message) {
            if (message || message !== "") {
              this.throwError(message);
            } else {
              this.throwError("An Unknown Error occurred");
            }
          }
        }, {
          key: "createOnline$",
          value: function createOnline$() {
            return (0, rxjs__WEBPACK_IMPORTED_MODULE_1__.merge)((0, rxjs__WEBPACK_IMPORTED_MODULE_2__.fromEvent)(window, "offline").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(function () {
              return false;
            })), (0, rxjs__WEBPACK_IMPORTED_MODULE_2__.fromEvent)(window, "online").pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(function () {
              return true;
            })), new rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable(function (sub) {
              sub.next(navigator.onLine);
              sub.complete();
            }));
          }
        }]);

        return _ErrorService;
      }();

      _ErrorService.ɵfac = function ErrorService_Factory(t) {
        return new (t || _ErrorService)();
      };

      _ErrorService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
        token: _ErrorService,
        factory: _ErrorService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    21785: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HelperService": function HelperService() {
          return (
            /* binding */
            _HelperService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! moment */
      2281);
      /* harmony import */


      var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var angular_csv_ext_dist_Angular_csv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! angular-csv-ext/dist/Angular-csv */
      6717);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var ngx_cookie__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ngx-cookie */
      16621);

      var _HelperService = /*#__PURE__*/function () {
        function _HelperService(cookieService) {
          _classCallCheck(this, _HelperService);

          this.cookieService = cookieService;
        }

        _createClass(_HelperService, [{
          key: "formatDate",
          value: function formatDate(value) {
            var date = new Date(value);
            var startDate = "".concat(date.getFullYear(), "-").concat(date.getMonth() + 1, "-").concat(date.getDate());
            return startDate;
          }
        }, {
          key: "formatDateFromNow",
          value: function formatDateFromNow(date, time) {
            return moment__WEBPACK_IMPORTED_MODULE_0__("".concat(date, " ").concat(time)).fromNow();
          }
        }, {
          key: "exportExcel",
          value: function exportExcel(data, filename, tableHeaders) {
            var options = {
              fieldSeparator: ",",
              quoteStrings: '"',
              decimalseparator: ".",
              showLabels: true,
              showTitle: true,
              useBom: true,
              noDownload: false,
              headers: tableHeaders,
              title: filename,
              useHeader: false,
              nullToEmptyString: true
            };
            new angular_csv_ext_dist_Angular_csv__WEBPACK_IMPORTED_MODULE_1__.AngularCsv(data, filename, options);
          } // exportPDF(data, title, tableHeaders) {
          //   let doc = new jsPDF();
          //   doc.setFontSize(18);
          //   doc.text(title, 11, 8);
          //   doc.setFontSize(11);
          //   doc.setTextColor(100);
          //   (doc as any).autoTable({
          //     head: tableHeaders,
          //     body: data,
          //     theme: "plain",
          //     didDrawCell: (data) => {
          //     },
          //   });
          //   // below line for Open PDF document in new tab
          //   doc.output("dataurlnewwindow");
          //   // below line for Download PDF document
          //   doc.save(`${title}.pdf`);
          // }

        }, {
          key: "lowerCase",
          value: function lowerCase(string) {
            return string.toLowerCase().trim();
          }
        }, {
          key: "firstUpper",
          value: function firstUpper(string) {
            var username = string.toLowerCase();
            return "".concat(username.charAt(0).toUpperCase()).concat(username.slice(1));
          }
        }, {
          key: "upperCase",
          value: function upperCase(string) {
            return string.toUpperCase();
          }
        }, {
          key: "validateAllFormFields",
          value: function validateAllFormFields(formGroup) {
            var _this12 = this;

            //{1}
            Object.keys(formGroup.controls).forEach(function (field) {
              //{2}
              var control = formGroup.get(field); //{3}

              if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControl) {
                //{4}
                control.markAsTouched({
                  onlySelf: true
                });
              } else if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroup) {
                //{5}
                _this12.validateAllFormFields(control); //{6}

              }
            });
          }
        }, {
          key: "getUserGroup",
          value: function getUserGroup() {
            return JSON.parse(this.cookieService.get("userGroup"));
          }
        }, {
          key: "getUserInfo",
          value: function getUserInfo() {
            return JSON.parse(this.cookieService.get("userInfo"));
          }
        }]);

        return _HelperService;
      }();

      _HelperService.ɵfac = function HelperService_Factory(t) {
        return new (t || _HelperService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](ngx_cookie__WEBPACK_IMPORTED_MODULE_4__.CookieService));
      };

      _HelperService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
        token: _HelperService,
        factory: _HelperService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    5897: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NavService": function NavService() {
          return (
            /* binding */
            _NavService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs */
      76491);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _helper_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./helper.service */
      21785);

      var _NavService = /*#__PURE__*/function () {
        function _NavService(helperService) {
          _classCallCheck(this, _NavService);

          this.helperService = helperService;
          this.collapseSidebar = false;
          this.MENUITEMS = [];
          this.fullScreen = false;
          this.items = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(this.MENUITEMS); // this.getUserGroup();

          this.onResize();

          if (this.screenWidth < 991) {
            this.collapseSidebar = true;
          }
        } // Windows width


        _createClass(_NavService, [{
          key: "onResize",
          value: function onResize(event) {
            this.screenWidth = window.innerWidth;
          } // get navigation

        }, {
          key: "getUserGroup",
          value: function getUserGroup() {
            var userGroup = this.helperService.getUserGroup();

            switch (userGroup) {
              case "emp":
                this.MENUITEMS = [{
                  title: "Dashboard",
                  icon: "activity",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/dashboard"
                }, {
                  title: "Food",
                  icon: "coffee",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/food"
                }, {
                  title: "Transactions",
                  icon: "file-text",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    path: "/transactions/order-history",
                    title: "Order History",
                    type: "link"
                  }, {
                    path: "/transactions/topup-history",
                    title: "Top Up History",
                    type: "link"
                  }, {
                    path: "/transactions/topup-personal",
                    title: "Top Up",
                    type: "link"
                  }]
                }];
                this.items.next(this.MENUITEMS);
                break;

              case "ven":
                this.MENUITEMS = [{
                  title: "Dashboard",
                  icon: "activity",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/dashboard"
                }, {
                  title: "Food",
                  icon: "coffee",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    title: "Food",
                    type: "link",
                    path: "/food/food-table"
                  }, {
                    title: "Inventory",
                    icon: "anchor",
                    badgeType: "primary",
                    active: false,
                    path: "/food/inventory",
                    type: "link"
                  }, {
                    title: "Category",
                    icon: "anchor",
                    badgeType: "primary",
                    active: false,
                    path: "/food/category",
                    type: "link"
                  }]
                }, {
                  title: "Transactions",
                  icon: "file-text",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    path: "/transactions/order-history",
                    title: "Order History",
                    type: "link"
                  }, {
                    path: "/transactions/vendor-withdrawal-history",
                    title: "Withdrawal History",
                    type: "link"
                  }]
                }];
                this.items.next(this.MENUITEMS);
                break;

              case "cmp_adm":
                this.MENUITEMS = [{
                  title: "Dashboard",
                  icon: "activity",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/dashboard"
                }, {
                  title: "Device Management",
                  icon: "coffee",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/devices"
                }, {
                  title: "Auth",
                  icon: "users",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    title: "Company Admin",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [// {
                    //   path: "/user/company-admin-create",
                    //   title: "Add Admin",
                    //   type: "link",
                    // },
                    {
                      path: "/user/company-admin-list",
                      title: "All Admin",
                      type: "link"
                    }]
                  }, {
                    title: "Company Accountant",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [{
                      path: "/user/accountant-create",
                      title: "Add Accountant",
                      type: "link"
                    }, {
                      path: "/user/accountant-list",
                      title: "All Accountants",
                      type: "link"
                    }]
                  }, {
                    title: "Staff",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [// {
                    //   path: "/user/staff-create",
                    //   title: "Add Staff",
                    //   type: "link",
                    // },
                    {
                      path: "/user/staff-list",
                      title: "All Staff",
                      type: "link"
                    }, {
                      path: "/user/staff-level-list",
                      title: "All Staff Levels",
                      type: "link"
                    }]
                  }, {
                    title: "Department",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [{
                      path: "/user/department-create",
                      title: "Add Department",
                      type: "link"
                    }, {
                      path: "/user/department-list",
                      title: "All Departments",
                      type: "link"
                    }]
                  }, {
                    title: "Vendor",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [{
                      path: "/user/vendor-create",
                      title: "Add Vendor",
                      type: "link"
                    }, {
                      path: "/user/vendor-list",
                      title: "All Vendors",
                      type: "link"
                    }]
                  }]
                }, {
                  title: "Food",
                  icon: "coffee",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    title: "Food",
                    icon: "coffee",
                    type: "link",
                    badgeType: "primary",
                    active: true,
                    path: "/food"
                  }, {
                    title: "Inventory",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [{
                      path: "/food/inventory",
                      title: "Inventory List",
                      type: "link"
                    } // {
                    //   path: "/food/inventory-topup",
                    //   title: "Inventory Topup",
                    //   type: "link",
                    // },
                    ]
                  }, {
                    title: "Category",
                    icon: "anchor",
                    type: "sub",
                    badgeType: "primary",
                    active: false,
                    children: [{
                      path: "/food/category-type",
                      title: "Category Type",
                      type: "link"
                    }]
                  }]
                }, {
                  title: "Transactions",
                  icon: "file-text",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    path: "/transactions/order-history",
                    title: "Order History",
                    type: "link"
                  }, {
                    path: "/transactions/total-cost",
                    title: "Total Cost",
                    type: "link"
                  }, {
                    path: "/transactions/topup-history",
                    title: "Top Up History",
                    type: "link"
                  }, {
                    path: "/transactions/company-withdrawal-history",
                    title: "Company Withdrawal",
                    type: "link"
                  }, {
                    path: "/transactions/vendor-withdrawal-history",
                    title: "Vendor Withdrawal",
                    type: "link"
                  } // {
                  //   path: "/transactions/voided-transactions",
                  //   title: "Voided Transactions",
                  //   type: "link",
                  // },
                  ]
                }];
                this.items.next(this.MENUITEMS);
                break;

              case "cmp_act":
                this.MENUITEMS = [{
                  title: "Dashboard",
                  icon: "activity",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/dashboard"
                }, {
                  title: "Transactions",
                  icon: "file-text",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    path: "/transactions/order-history",
                    title: "Order History",
                    type: "link"
                  }, {
                    path: "/transactions/total-cost",
                    title: "Total Cost",
                    type: "link"
                  }, {
                    path: "/transactions/topup-personal",
                    title: "Top Up",
                    type: "link"
                  }, {
                    path: "/transactions/topup-history",
                    title: "Top Up History",
                    type: "link"
                  }, {
                    path: "/transactions/company-withdrawal-history",
                    title: "Company Withdrawal",
                    type: "link"
                  }, {
                    path: "/transactions/vendor-withdrawal-history",
                    title: "Vendor Withdrawal",
                    type: "link"
                  } // {
                  //   path: "/transactions/voided-transactions",
                  //   title: "Voided Transactions",
                  //   type: "link",
                  // },
                  ]
                }];
                this.items.next(this.MENUITEMS);
                break;

              case "sid":
                this.MENUITEMS = [{
                  title: "Dashboard",
                  icon: "activity",
                  type: "link",
                  badgeType: "primary",
                  active: true,
                  path: "/dashboard"
                }, {
                  title: "Auth",
                  icon: "users",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    path: "/user/company-list",
                    title: "All Company",
                    type: "link",
                    icon: "anchor",
                    badgeType: "primary",
                    active: false // children: [
                    //   {
                    //     path: "/user/company-create",
                    //     title: "Add Company",
                    //     type: "link",
                    //   },
                    //   {
                    //     path: "/user/company-list",
                    //     title: "All Company",
                    //     type: "link",
                    //   },
                    // ],

                  }, {
                    path: "/user/company-admin-list",
                    title: "All Admin",
                    type: "link",
                    icon: "anchor",
                    badgeType: "primary",
                    active: false
                  }, {
                    icon: "anchor",
                    badgeType: "primary",
                    active: false,
                    path: "/user/accountant-list",
                    title: "All Accountants",
                    type: "link"
                  }, {
                    icon: "anchor",
                    badgeType: "primary",
                    active: false,
                    path: "/user/staff-list",
                    title: "All Staff",
                    type: "link"
                  }, {
                    icon: "anchor",
                    badgeType: "primary",
                    active: false,
                    path: "/user/department-list",
                    title: "Departments",
                    type: "link"
                  }, {
                    icon: "anchor",
                    badgeType: "primary",
                    active: false,
                    path: "/user/vendor-list",
                    title: "All Vendors",
                    type: "link"
                  }]
                }, {
                  title: "Transactions",
                  icon: "file-text",
                  type: "sub",
                  badgeType: "primary",
                  active: true,
                  children: [{
                    path: "/transactions/order-history",
                    title: "Order History",
                    type: "link"
                  }, {
                    path: "/transactions/total-cost",
                    title: "Total Cost",
                    type: "link"
                  }, {
                    path: "/transactions/topup-history",
                    title: "Top Up History",
                    type: "link"
                  }, {
                    path: "/transactions/company-withdrawal-history",
                    title: "Company Withdrawal",
                    type: "link"
                  }, {
                    path: "/transactions/vendor-withdrawal-history",
                    title: "Vendor Withdrawal",
                    type: "link"
                  }, {
                    path: "/transactions/sid-withdrawal-history",
                    title: "SID Withdrawal",
                    type: "link"
                  } // {
                  //   path: "/transactions/voided-transactions",
                  //   title: "Voided Transactions",
                  //   type: "link",
                  // },
                  ]
                }];
                this.items.next(this.MENUITEMS);
                break;

              default:
                break;
            }
          }
        }]);

        return _NavService;
      }();

      _NavService.ɵfac = function NavService_Factory(t) {
        return new (t || _NavService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_helper_service__WEBPACK_IMPORTED_MODULE_0__.HelperService));
      };

      _NavService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
        token: _NavService,
        factory: _NavService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    97161: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "NotificationService": function NotificationService() {
          return (
            /* binding */
            _NotificationService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ngx-toastr */
      83315);

      var _NotificationService = /*#__PURE__*/function () {
        function _NotificationService(toastrService) {
          _classCallCheck(this, _NotificationService);

          this.toastrService = toastrService;
        } // Success Type


        _createClass(_NotificationService, [{
          key: "success",
          value: function success() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Success!";
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "successful";
            this.toastrService.success(message, title, {
              positionClass: "toast-top-center"
            });
          } // info Type

        }, {
          key: "info",
          value: function info() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Info";
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            this.toastrService.info(message, title, {
              positionClass: "toast-top-center"
            });
          } // warning Type

        }, {
          key: "warning",
          value: function warning() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Warning!";
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "please try again";
            this.toastrService.warning(message, title, {
              positionClass: "toast-top-center"
            });
          } // danger Type

        }, {
          key: "danger",
          value: function danger() {
            var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Error!";
            var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "An unknown error occured";
            this.toastrService.error(message, title, {
              positionClass: "toast-top-center"
            });
          }
        }]);

        return _NotificationService;
      }();

      _NotificationService.ɵfac = function NotificationService_Factory(t) {
        return new (t || _NotificationService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ngx_toastr__WEBPACK_IMPORTED_MODULE_1__.ToastrService));
      };

      _NotificationService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: _NotificationService,
        factory: _NotificationService.ɵfac,
        providedIn: "root"
      });
      /***/
    },

    /***/
    44466: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "SharedModule": function SharedModule() {
          return (
            /* binding */
            _SharedModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/common */
      54364);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/router */
      71258);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/forms */
      1707);
      /* harmony import */


      var _components_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./components/header/header.component */
      36290);
      /* harmony import */


      var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./components/footer/footer.component */
      66526);
      /* harmony import */


      var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./components/sidebar/sidebar.component */
      6664);
      /* harmony import */


      var _components_layout_content_layout_content_layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./components/layout/content-layout/content-layout.component */
      36144);
      /* harmony import */


      var _components_feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./components/feather-icons/feather-icons.component */
      61676);
      /* harmony import */


      var _components_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./components/breadcrumb/breadcrumb.component */
      41299);
      /* harmony import */


      var _services_nav_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./services/nav.service */
      5897);
      /* harmony import */


      var _directives_fullscreen_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./directives/fullscreen.directive */
      61301);
      /* harmony import */


      var _calendar_dialog_calendar_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! ./calendar-dialog/calendar-dialog.component */
      97457);
      /* harmony import */


      var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @angular/material/datepicker */
      42937);
      /* harmony import */


      var _angular_material_card__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @angular/material/card */
      42118);
      /* harmony import */


      var _pipes_image_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./pipes/image.pipe */
      11413);
      /* harmony import */


      var _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./components/paginator/paginator.component */
      92274);
      /* harmony import */


      var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/material/paginator */
      38021);
      /* harmony import */


      var _components_table_functions_table_functions_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./components/table-functions/table-functions.component */
      48898);
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @angular/material/form-field */
      65788);
      /* harmony import */


      var _angular_material_select__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/material/select */
      37007);
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @angular/material/button */
      70781);
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @angular/material/icon */
      52529);
      /* harmony import */


      var _pipes_platform_pipe__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./pipes/platform.pipe */
      33694);
      /* harmony import */


      var _pipes_transaction_status_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ./pipes/transaction-status.pipe */
      25860);
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
      /*! @angular/material/input */
      64742);
      /* harmony import */


      var _pipes_date_time_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./pipes/date-time.pipe */
      86225);
      /* harmony import */


      var _components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./components/confirm-dialog/confirm-dialog.component */
      59077);
      /* harmony import */


      var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
      /*! @angular/material/dialog */
      22213);
      /* harmony import */


      var _components_no_internet_no_internet_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./components/no-internet/no-internet.component */
      34545);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! @angular/core */
      2316); // services
      // Directives
      // Modules


      var _SharedModule = function _SharedModule() {
        _classCallCheck(this, _SharedModule);
      };

      _SharedModule.ɵfac = function SharedModule_Factory(t) {
        return new (t || _SharedModule)();
      };

      _SharedModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({
        type: _SharedModule
      });
      _SharedModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({
        providers: [_services_nav_service__WEBPACK_IMPORTED_MODULE_6__.NavService],
        imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_18__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.FormsModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__.MatDatepickerModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_22__.MatCardModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_23__.MatPaginatorModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_25__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.ReactiveFormsModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_28__.MatInputModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_29__.MatDialogModule], _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__.MatDatepickerModule]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](_SharedModule, {
          declarations: [_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent, _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_2__.SidebarComponent, _components_layout_content_layout_content_layout_component__WEBPACK_IMPORTED_MODULE_3__.ContentLayoutComponent, _components_feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_4__.FeatherIconsComponent, _components_breadcrumb_breadcrumb_component__WEBPACK_IMPORTED_MODULE_5__.BreadcrumbComponent, _directives_fullscreen_directive__WEBPACK_IMPORTED_MODULE_7__.ToggleFullscreenDirective, _calendar_dialog_calendar_dialog_component__WEBPACK_IMPORTED_MODULE_8__.CalendarDialogComponent, _pipes_image_pipe__WEBPACK_IMPORTED_MODULE_9__.ImagePipe, _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_10__.PaginatorComponent, _components_table_functions_table_functions_component__WEBPACK_IMPORTED_MODULE_11__.TableFunctionsComponent, _pipes_platform_pipe__WEBPACK_IMPORTED_MODULE_12__.PlatformPipe, _pipes_transaction_status_pipe__WEBPACK_IMPORTED_MODULE_13__.TransactionStatusPipe, _pipes_date_time_pipe__WEBPACK_IMPORTED_MODULE_14__.DateTimePipe, _components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_15__.ConfirmDialogComponent, _components_no_internet_no_internet_component__WEBPACK_IMPORTED_MODULE_16__.NoInternetComponent],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_19__.RouterModule, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.FormsModule, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__.MatDatepickerModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_22__.MatCardModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_23__.MatPaginatorModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__.MatFormFieldModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_25__.MatSelectModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_26__.MatButtonModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_27__.MatIconModule, _angular_forms__WEBPACK_IMPORTED_MODULE_20__.ReactiveFormsModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_28__.MatInputModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_29__.MatDialogModule],
          exports: [_components_feather_icons_feather_icons_component__WEBPACK_IMPORTED_MODULE_4__.FeatherIconsComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_1__.FooterComponent, _calendar_dialog_calendar_dialog_component__WEBPACK_IMPORTED_MODULE_8__.CalendarDialogComponent, _components_paginator_paginator_component__WEBPACK_IMPORTED_MODULE_10__.PaginatorComponent, _pipes_image_pipe__WEBPACK_IMPORTED_MODULE_9__.ImagePipe, _pipes_platform_pipe__WEBPACK_IMPORTED_MODULE_12__.PlatformPipe, _pipes_transaction_status_pipe__WEBPACK_IMPORTED_MODULE_13__.TransactionStatusPipe, _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_21__.MatDatepickerModule, _components_table_functions_table_functions_component__WEBPACK_IMPORTED_MODULE_11__.TableFunctionsComponent, _pipes_date_time_pipe__WEBPACK_IMPORTED_MODULE_14__.DateTimePipe]
        });
      })();
      /***/

    },

    /***/
    92340: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "environment": function environment() {
          return (
            /* binding */
            _environment
          );
        }
        /* harmony export */

      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var _environment = {
        production: false,
        url: 'https://bucca-v2.herokuapp.com/'
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    14431: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      71570);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app/app.module */
      36747);
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      92340);

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
        (0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    46700: function _(module, __unused_webpack_exports, __webpack_require__) {
      var map = {
        "./af": 62275,
        "./af.js": 62275,
        "./ar": 90857,
        "./ar-dz": 11218,
        "./ar-dz.js": 11218,
        "./ar-kw": 14754,
        "./ar-kw.js": 14754,
        "./ar-ly": 66680,
        "./ar-ly.js": 66680,
        "./ar-ma": 92178,
        "./ar-ma.js": 92178,
        "./ar-sa": 56522,
        "./ar-sa.js": 56522,
        "./ar-tn": 95682,
        "./ar-tn.js": 95682,
        "./ar.js": 90857,
        "./az": 70164,
        "./az.js": 70164,
        "./be": 79774,
        "./be.js": 79774,
        "./bg": 60947,
        "./bg.js": 60947,
        "./bm": 21832,
        "./bm.js": 21832,
        "./bn": 89650,
        "./bn-bd": 74477,
        "./bn-bd.js": 74477,
        "./bn.js": 89650,
        "./bo": 66005,
        "./bo.js": 66005,
        "./br": 98492,
        "./br.js": 98492,
        "./bs": 70534,
        "./bs.js": 70534,
        "./ca": 52061,
        "./ca.js": 52061,
        "./cs": 84737,
        "./cs.js": 84737,
        "./cv": 61167,
        "./cv.js": 61167,
        "./cy": 77996,
        "./cy.js": 77996,
        "./da": 9528,
        "./da.js": 9528,
        "./de": 14540,
        "./de-at": 49430,
        "./de-at.js": 49430,
        "./de-ch": 67978,
        "./de-ch.js": 67978,
        "./de.js": 14540,
        "./dv": 83426,
        "./dv.js": 83426,
        "./el": 6616,
        "./el.js": 6616,
        "./en-au": 63816,
        "./en-au.js": 63816,
        "./en-ca": 32162,
        "./en-ca.js": 32162,
        "./en-gb": 83305,
        "./en-gb.js": 83305,
        "./en-ie": 61954,
        "./en-ie.js": 61954,
        "./en-il": 43060,
        "./en-il.js": 43060,
        "./en-in": 59923,
        "./en-in.js": 59923,
        "./en-nz": 13540,
        "./en-nz.js": 13540,
        "./en-sg": 16505,
        "./en-sg.js": 16505,
        "./eo": 41907,
        "./eo.js": 41907,
        "./es": 86640,
        "./es-do": 41246,
        "./es-do.js": 41246,
        "./es-mx": 56131,
        "./es-mx.js": 56131,
        "./es-us": 36430,
        "./es-us.js": 36430,
        "./es.js": 86640,
        "./et": 62551,
        "./et.js": 62551,
        "./eu": 32711,
        "./eu.js": 32711,
        "./fa": 54572,
        "./fa.js": 54572,
        "./fi": 33390,
        "./fi.js": 33390,
        "./fil": 87860,
        "./fil.js": 87860,
        "./fo": 48216,
        "./fo.js": 48216,
        "./fr": 99291,
        "./fr-ca": 98527,
        "./fr-ca.js": 98527,
        "./fr-ch": 58407,
        "./fr-ch.js": 58407,
        "./fr.js": 99291,
        "./fy": 47054,
        "./fy.js": 47054,
        "./ga": 49540,
        "./ga.js": 49540,
        "./gd": 73917,
        "./gd.js": 73917,
        "./gl": 51486,
        "./gl.js": 51486,
        "./gom-deva": 56245,
        "./gom-deva.js": 56245,
        "./gom-latn": 48868,
        "./gom-latn.js": 48868,
        "./gu": 59652,
        "./gu.js": 59652,
        "./he": 89019,
        "./he.js": 89019,
        "./hi": 42040,
        "./hi.js": 42040,
        "./hr": 63402,
        "./hr.js": 63402,
        "./hu": 79322,
        "./hu.js": 79322,
        "./hy-am": 27609,
        "./hy-am.js": 27609,
        "./id": 57942,
        "./id.js": 57942,
        "./is": 98275,
        "./is.js": 98275,
        "./it": 73053,
        "./it-ch": 4378,
        "./it-ch.js": 4378,
        "./it.js": 73053,
        "./ja": 46176,
        "./ja.js": 46176,
        "./jv": 679,
        "./jv.js": 679,
        "./ka": 92726,
        "./ka.js": 92726,
        "./kk": 72953,
        "./kk.js": 72953,
        "./km": 86957,
        "./km.js": 86957,
        "./kn": 59181,
        "./kn.js": 59181,
        "./ko": 47148,
        "./ko.js": 47148,
        "./ku": 27752,
        "./ku.js": 27752,
        "./ky": 65675,
        "./ky.js": 65675,
        "./lb": 41263,
        "./lb.js": 41263,
        "./lo": 65746,
        "./lo.js": 65746,
        "./lt": 11143,
        "./lt.js": 11143,
        "./lv": 38753,
        "./lv.js": 38753,
        "./me": 44054,
        "./me.js": 44054,
        "./mi": 31573,
        "./mi.js": 31573,
        "./mk": 30202,
        "./mk.js": 30202,
        "./ml": 68523,
        "./ml.js": 68523,
        "./mn": 79794,
        "./mn.js": 79794,
        "./mr": 56681,
        "./mr.js": 56681,
        "./ms": 56975,
        "./ms-my": 39859,
        "./ms-my.js": 39859,
        "./ms.js": 56975,
        "./mt": 3691,
        "./mt.js": 3691,
        "./my": 5152,
        "./my.js": 5152,
        "./nb": 7607,
        "./nb.js": 7607,
        "./ne": 21526,
        "./ne.js": 21526,
        "./nl": 86368,
        "./nl-be": 40076,
        "./nl-be.js": 40076,
        "./nl.js": 86368,
        "./nn": 68420,
        "./nn.js": 68420,
        "./oc-lnc": 51906,
        "./oc-lnc.js": 51906,
        "./pa-in": 94504,
        "./pa-in.js": 94504,
        "./pl": 54721,
        "./pl.js": 54721,
        "./pt": 74645,
        "./pt-br": 54548,
        "./pt-br.js": 54548,
        "./pt.js": 74645,
        "./ro": 71977,
        "./ro.js": 71977,
        "./ru": 26042,
        "./ru.js": 26042,
        "./sd": 78849,
        "./sd.js": 78849,
        "./se": 27739,
        "./se.js": 27739,
        "./si": 50084,
        "./si.js": 50084,
        "./sk": 92449,
        "./sk.js": 92449,
        "./sl": 23086,
        "./sl.js": 23086,
        "./sq": 33139,
        "./sq.js": 33139,
        "./sr": 30607,
        "./sr-cyrl": 30063,
        "./sr-cyrl.js": 30063,
        "./sr.js": 30607,
        "./ss": 40131,
        "./ss.js": 40131,
        "./sv": 21665,
        "./sv.js": 21665,
        "./sw": 5642,
        "./sw.js": 5642,
        "./ta": 33622,
        "./ta.js": 33622,
        "./te": 74825,
        "./te.js": 74825,
        "./tet": 48336,
        "./tet.js": 48336,
        "./tg": 39238,
        "./tg.js": 39238,
        "./th": 99463,
        "./th.js": 99463,
        "./tk": 39986,
        "./tk.js": 39986,
        "./tl-ph": 29672,
        "./tl-ph.js": 29672,
        "./tlh": 40043,
        "./tlh.js": 40043,
        "./tr": 51212,
        "./tr.js": 51212,
        "./tzl": 50110,
        "./tzl.js": 50110,
        "./tzm": 80482,
        "./tzm-latn": 38309,
        "./tzm-latn.js": 38309,
        "./tzm.js": 80482,
        "./ug-cn": 42495,
        "./ug-cn.js": 42495,
        "./uk": 54157,
        "./uk.js": 54157,
        "./ur": 80984,
        "./ur.js": 80984,
        "./uz": 64141,
        "./uz-latn": 43662,
        "./uz-latn.js": 43662,
        "./uz.js": 64141,
        "./vi": 12607,
        "./vi.js": 12607,
        "./x-pseudo": 66460,
        "./x-pseudo.js": 66460,
        "./yo": 92948,
        "./yo.js": 92948,
        "./zh-cn": 62658,
        "./zh-cn.js": 62658,
        "./zh-hk": 39352,
        "./zh-hk.js": 39352,
        "./zh-mo": 38274,
        "./zh-mo.js": 38274,
        "./zh-tw": 98451,
        "./zh-tw.js": 98451
      };

      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }

      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        }

        return map[req];
      }

      webpackContext.keys = function webpackContextKeys() {
        return Object.keys(map);
      };

      webpackContext.resolve = webpackContextResolve;
      module.exports = webpackContext;
      webpackContext.id = 46700;
      /***/
    }
  },
  /******/
  function (__webpack_require__) {
    // webpackRuntimeModules

    /******/
    var __webpack_exec__ = function __webpack_exec__(moduleId) {
      return __webpack_require__(__webpack_require__.s = moduleId);
    };
    /******/


    __webpack_require__.O(0, ["vendor"], function () {
      return __webpack_exec__(14431);
    });
    /******/


    var __webpack_exports__ = __webpack_require__.O();
    /******/

  }]);
})();
//# sourceMappingURL=main-es5.js.map