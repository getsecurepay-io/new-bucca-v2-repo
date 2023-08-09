(function () {
  "use strict";

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (self["webpackChunkendless"] = self["webpackChunkendless"] || []).push([["default-src_app_transactions_transaction_service_ts"], {
    /***/
    99002: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "PaginatedResponse": function PaginatedResponse() {
          return (
            /* binding */
            _PaginatedResponse
          );
        }
        /* harmony export */

      });

      var _PaginatedResponse = function _PaginatedResponse() {
        _classCallCheck(this, _PaginatedResponse);
      };
      /***/

    },

    /***/
    44246: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "Order": function Order() {
          return (
            /* binding */
            _Order
          );
        },

        /* harmony export */
        "OrderResponse": function OrderResponse() {
          return (
            /* binding */
            _OrderResponse
          );
        }
        /* harmony export */

      });

      var _Order = function _Order() {
        _classCallCheck(this, _Order);
      };

      var _OrderResponse = function _OrderResponse() {
        _classCallCheck(this, _OrderResponse);
      };
      /***/

    },

    /***/
    79528: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TotalCost": function TotalCost() {
          return (
            /* binding */
            _TotalCost
          );
        },

        /* harmony export */
        "TotalCostResponse": function TotalCostResponse() {
          return (
            /* binding */
            _TotalCostResponse
          );
        }
        /* harmony export */

      });

      var _TotalCost = function _TotalCost() {
        _classCallCheck(this, _TotalCost);
      };

      var _TotalCostResponse = function _TotalCostResponse() {
        _classCallCheck(this, _TotalCostResponse);
      };
      /***/

    },

    /***/
    25171: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "TransactionService": function TransactionService() {
          return (
            /* binding */
            _TransactionService
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! rxjs */
      76491);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! rxjs */
      79441);
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! rxjs/operators */
      92597);
      /* harmony import */


      var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! src/environments/environment */
      92340);
      /* harmony import */


      var _shared_models_response_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../shared/models/response.model */
      99002);
      /* harmony import */


      var _order__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./order */
      44246);
      /* harmony import */


      var _total_cost__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./total-cost */
      79528);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/core */
      2316);
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common/http */
      53882);
      /* harmony import */


      var _shared_services_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../shared/services/notification.service */
      97161);
      /* harmony import */


      var _shared_services_cart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../shared/services/cart.service */
      5237);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/router */
      71258);

      var _TransactionService = /*#__PURE__*/function () {
        function _TransactionService(http, notificationService, cartService, router) {
          _classCallCheck(this, _TransactionService);

          this.http = http;
          this.notificationService = notificationService;
          this.cartService = cartService;
          this.router = router;
          this.apiUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.url;
          this.orderHistory = new _order__WEBPACK_IMPORTED_MODULE_2__.OrderResponse();
          this.orderHistoryListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.orderHistory);
          this.topupHistorty = [];
          this.topupHistortyListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.topupHistorty);
          this.totalCostList = new _total_cost__WEBPACK_IMPORTED_MODULE_3__.TotalCostResponse();
          this.totalCostListListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.totalCostList);
          this.sidWithdrawal = [];
          this.sidWithdrawalListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.sidWithdrawal);
          this.companyWithrawal = [];
          this.companyWithrawalListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.companyWithrawal);
          this.vendorWithrawal = new _shared_models_response_model__WEBPACK_IMPORTED_MODULE_1__.PaginatedResponse();
          this.vendorWithrawalListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.vendorWithrawal);
          this.voidedTransactions = [];
          this.voidedTransactionsListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.voidedTransactions);
          this.dailyLimit = 0;
          this.dailyLimitListener = new rxjs__WEBPACK_IMPORTED_MODULE_6__.BehaviorSubject(this.dailyLimit);
          this.isLoadingListener = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
          this.referenceUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
          this.cashingOutUpdate = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
        }

        _createClass(_TransactionService, [{
          key: "getDailyLimit",
          value: function getDailyLimit(delivery_date) {
            var _this = this;

            var query = "?delivery_date=".concat(delivery_date);
            this.http.get("".concat(this.apiUrl, "txn/get/daily_limit/").concat(query)).subscribe(function (response) {
              if (response.code = 200) {
                _this.dailyLimit = response.daily_limit_left;
              } else {
                _this.dailyLimit = 0;
              }

              _this.dailyLimitListener.next(_this.dailyLimit);
            }, function (err) {
              _this.dailyLimit = 0;

              _this.dailyLimitListener.next(_this.dailyLimit);
            });
            return this.dailyLimitListener.asObservable();
          }
        }, {
          key: "getVoidedTransactions",
          value: function getVoidedTransactions(order_date_start, order_date_end) {
            var _this2 = this;

            var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var comp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
            var pageSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
            var pageIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
            var query = "?limit=".concat(pageSize, "&offset=").concat(pageIndex, "&order_date_start=").concat(order_date_start, "&order_date_end=").concat(order_date_end).concat(status ? "&status=" + status : "").concat(comp ? "&comp=" + comp : "");
            this.http.get("".concat(this.apiUrl, "txn/void/").concat(query)).subscribe(function (response) {
              _this2.voidedTransactions = response.result;

              _this2.voidedTransactionsListener.next(_toConsumableArray(_this2.voidedTransactions));
            }, function (err) {
              _this2.voidedTransactions = [];

              _this2.voidedTransactionsListener.next(_toConsumableArray(_this2.voidedTransactions));
            });
            return this.orderHistoryListener.asObservable();
          }
        }, {
          key: "getOrderHistory",
          value: function getOrderHistory(order_date_start, order_date_end) {
            var _this3 = this;

            var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var comp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
            var vendor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
            var pageSize = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 7;
            var pageIndex = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;
            this.orderHistory.results = [];
            this.orderHistoryListener.next(Object.assign({}, this.orderHistory));
            var query = "?limit=".concat(pageSize, "&offset=").concat(pageIndex, "&order_date_start=").concat(order_date_start, "&order_date_end=").concat(order_date_end).concat(status ? "&status=" + status : "").concat(comp ? "&comp=" + comp : "").concat(vendor ? "&vendor=" + vendor : "");
            this.http.get("".concat(this.apiUrl, "txn/order-history/").concat(query)).subscribe(function (response) {
              _this3.orderHistory = response;

              _this3.orderHistoryListener.next(Object.assign({}, _this3.orderHistory));
            }, function (err) {
              _this3.orderHistory = new _order__WEBPACK_IMPORTED_MODULE_2__.OrderResponse();

              _this3.orderHistoryListener.next(Object.assign({}, _this3.orderHistory));
            });
            return this.orderHistoryListener.asObservable();
          }
        }, {
          key: "getTotalCost",
          value: function getTotalCost(delivery_start, delivery_end) {
            var _this4 = this;

            var comp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
            var pageIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
            this.orderHistory.results = [];
            this.orderHistoryListener.next(Object.assign({}, this.orderHistory));
            var query = "?limit=".concat(pageSize, "&offset=").concat(pageIndex, "&delivery_start=").concat(delivery_start, "&delivery_end=").concat(delivery_end).concat(comp ? "&comp=" + comp : "");
            this.http.get("".concat(this.apiUrl, "txn/split-report/").concat(query)).subscribe(function (response) {
              _this4.totalCostList = response;

              _this4.totalCostListListener.next(Object.assign({}, _this4.totalCostList));
            }, function (err) {
              _this4.totalCostList = new _total_cost__WEBPACK_IMPORTED_MODULE_3__.TotalCostResponse();

              _this4.totalCostListListener.next(Object.assign({}, _this4.totalCostList));
            });
            return this.totalCostListListener.asObservable();
          }
        }, {
          key: "getTopUpHistory",
          value: function getTopUpHistory(date_start, date_end) {
            var _this5 = this;

            var comp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
            var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
            var pageIndex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
            var query = "?limit=".concat(pageSize, "&offset=").concat(pageIndex, "&date_start=").concat(date_start, "&date_end=").concat(date_end).concat(comp ? "&comp=" + comp : "");
            this.http.get("".concat(this.apiUrl, "txn/topup-history/").concat(query)).subscribe(function (response) {
              if (response.code == 200) {
                _this5.topupHistorty = response.staff_topup_history;

                _this5.topupHistortyListener.next(_toConsumableArray(_this5.topupHistorty));
              } else {
                _this5.topupHistorty = [];

                _this5.topupHistortyListener.next(_toConsumableArray(_this5.topupHistorty));
              }
            }, function (err) {
              _this5.topupHistorty = [];

              _this5.topupHistortyListener.next(_toConsumableArray(_this5.topupHistorty));
            });
            return this.topupHistortyListener.asObservable();
          }
        }, {
          key: "cancelOrder",
          value: function cancelOrder(food) {
            var _this6 = this;

            // food.status = "cancelled"
            this.isLoadingListener.next(true);
            this.http.patch("".concat(this.apiUrl, "txn/bulk-order/").concat(food.id, "/"), {
              status: "cancelled"
            }).subscribe(function (response) {
              console.log(response);

              if (response.code == 200) {
                _this6.notificationService.success("Success", response.message);
              } else {
                _this6.notificationService.warning("Error", response.message);
              }

              _this6.isLoadingListener.next(false);
            }, function (err) {
              _this6.isLoadingListener.next(false);

              var errorMessage = err.error.message || err.error.details;

              _this6.notificationService.warning("Error", errorMessage);
            });
            return this.isLoadingListener.asObservable();
          }
        }, {
          key: "void",
          value: function _void(txn_id) {
            var _this7 = this;

            this.isLoadingListener.next(true);
            this.http.post("".concat(this.apiUrl, "txn/void_txn/"), {
              txn_id: txn_id
            }).subscribe(function (response) {
              if (response.code == 200) {
                _this7.notificationService.success("Success", response.message);
              } else {
                _this7.notificationService.warning("Error", response.message);
              }

              _this7.isLoadingListener.next(false);
            }, function (err) {
              _this7.isLoadingListener.next(false);

              var errorMessage = err.error.message || err.error.details;

              _this7.notificationService.warning("Error", errorMessage);
            });
            return this.isLoadingListener.asObservable();
          }
        }, {
          key: "getSidWithdrawalHistory",
          value: function getSidWithdrawalHistory() {
            var _this8 = this;

            var date_start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "2021-09-01";
            var date_end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "2021-10-20";
            var query = "?date_start=".concat(date_start, "&date_end=").concat(date_end);
            this.http.get("".concat(this.apiUrl, "txn/sid/withdrawal_history/").concat(query)).subscribe(function (response) {
              if (response.code == 200) {
                _this8.sidWithdrawal = response.result;

                _this8.sidWithdrawalListener.next(_toConsumableArray(_this8.sidWithdrawal));
              } else {
                _this8.sidWithdrawal = [];

                _this8.sidWithdrawalListener.next(_toConsumableArray(_this8.sidWithdrawal));
              }
            }, function (err) {
              _this8.sidWithdrawal = [];

              _this8.sidWithdrawalListener.next(_toConsumableArray(_this8.sidWithdrawal));
            });
            return this.sidWithdrawalListener.asObservable();
          }
        }, {
          key: "getCompanyWithdrawalHistory",
          value: function getCompanyWithdrawalHistory() {
            var _this9 = this;

            var date_start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "2021-09-01";
            var date_end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "2021-10-20";
            var query = "?date_start=".concat(date_start, "&date_end=").concat(date_end);
            this.http.get("".concat(this.apiUrl, "txn/company/withdrawal_history/").concat(query)).subscribe(function (response) {
              if (response.code == 200) {
                _this9.companyWithrawal = response.result;

                _this9.companyWithrawalListener.next(_toConsumableArray(_this9.companyWithrawal));
              } else {
                _this9.companyWithrawal = [];

                _this9.companyWithrawalListener.next(_toConsumableArray(_this9.companyWithrawal));
              }
            }, function (err) {
              _this9.companyWithrawal = [];

              _this9.companyWithrawalListener.next(_toConsumableArray(_this9.companyWithrawal));
            });
            return this.companyWithrawalListener.asObservable();
          }
        }, {
          key: "getVendorWithdrawalHistory",
          value: function getVendorWithdrawalHistory(date_start, date_end) {
            var _this10 = this;

            var query = "?date_start=".concat(date_start, "&date_end=").concat(date_end);
            this.http.get("".concat(this.apiUrl, "txn/vendor/withdrawal_history/").concat(query)).subscribe(function (response) {
              console.log(response);
              _this10.vendorWithrawal = response;

              _this10.vendorWithrawalListener.next(Object.assign({}, _this10.vendorWithrawal));
            }, function (err) {
              _this10.vendorWithrawal = new _shared_models_response_model__WEBPACK_IMPORTED_MODULE_1__.PaginatedResponse();
              _this10.vendorWithrawal.results = [];

              _this10.vendorWithrawalListener.next(Object.assign({}, _this10.vendorWithrawal));
            });
            return this.vendorWithrawalListener.asObservable();
          }
        }, {
          key: "placeOrder",
          value: function placeOrder(orders) {
            var _this11 = this;

            this.isLoadingListener.next(true);
            var data = {
              orders: orders.map(function (element) {
                return {
                  food: element.id,
                  comment: element.comment || "",
                  delivery_date: element.delivery_date,
                  quantity: element.quantity,
                  meal_type: element.meal_type
                };
              }),
              platform: "WEB",
              place: "company"
            };
            this.http.post("".concat(this.apiUrl, "txn/bulk-order/"), data).subscribe(function (response) {
              if (response.code = "201") {
                _this11.notificationService.success("Success", response.status);

                _this11.cartService.clearCart();

                _this11.router.navigate(["/transactions/order-history"]);
              } else {
                _this11.notificationService.success("Success", response.status);
              }

              _this11.isLoadingListener.next(false);
            }, function (err) {
              _this11.notificationService.warning("Error", err.error.message);

              _this11.isLoadingListener.next(false);
            });
          }
        }, {
          key: "getReference",
          value: function getReference() {
            var _this12 = this;

            this.http.get("".concat(this.apiUrl, "txn/generate/topup_code/")).pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.shareReplay)()).subscribe(function (response) {
              if (response.code == 200) {
                _this12.reference = response.ref;

                _this12.referenceUpdate.next(_this12.reference);
              }

              console.log(response);
            });
            return this.referenceUpdate.asObservable();
          }
        }, {
          key: "cashout",
          value: function cashout(comp_id) {
            var _this13 = this;

            var query;
            comp_id ? query = "?comp_id=".concat(comp_id) : query = "";
            this.http.get("".concat(this.apiUrl, "txn/cashout").concat(query)) // .get<any>(`${this.apiUrl}txn/cashout/`, { params: { cmp_id } })
            .pipe((0, rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.shareReplay)()).subscribe(function (response) {
              _this13.cashingOutUpdate.next(false);

              console.log(response);

              if (response.code == 200) {
                _this13.notificationService.success("Success", "".concat(response.message));
              }
            }, function (err) {
              console.log(err.error.message);
              var errorMessage = err.error.message || err.error.details || "Please contact Admin";

              _this13.notificationService.warning("Error", errorMessage);

              _this13.cashingOutUpdate.next(false);
            });
            return this.cashingOutUpdate.asObservable();
          }
        }, {
          key: "getIsLoading",
          value: function getIsLoading() {
            return this.isLoadingListener.asObservable();
          }
        }, {
          key: "updateTransaction",
          value: function updateTransaction(transactionId, status) {}
        }]);

        return _TransactionService;
      }();

      _TransactionService.ɵfac = function TransactionService_Factory(t) {
        return new (t || _TransactionService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_shared_services_notification_service__WEBPACK_IMPORTED_MODULE_4__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_shared_services_cart_service__WEBPACK_IMPORTED_MODULE_5__.CartService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router));
      };

      _TransactionService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({
        token: _TransactionService,
        factory: _TransactionService.ɵfac,
        providedIn: "root"
      });
      /***/
    }
  }]);
})();
//# sourceMappingURL=default-src_app_transactions_transaction_service_ts-es5.js.map