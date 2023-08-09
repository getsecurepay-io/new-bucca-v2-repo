"use strict";
(self["webpackChunkendless"] = self["webpackChunkendless"] || []).push([["default-src_app_transactions_transaction_service_ts"],{

/***/ 99002:
/*!*************************************************!*\
  !*** ./src/app/shared/models/response.model.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PaginatedResponse": function() { return /* binding */ PaginatedResponse; }
/* harmony export */ });
class PaginatedResponse {
}


/***/ }),

/***/ 44246:
/*!***************************************!*\
  !*** ./src/app/transactions/order.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Order": function() { return /* binding */ Order; },
/* harmony export */   "OrderResponse": function() { return /* binding */ OrderResponse; }
/* harmony export */ });
class Order {
}
class OrderResponse {
}


/***/ }),

/***/ 79528:
/*!********************************************!*\
  !*** ./src/app/transactions/total-cost.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TotalCost": function() { return /* binding */ TotalCost; },
/* harmony export */   "TotalCostResponse": function() { return /* binding */ TotalCostResponse; }
/* harmony export */ });
class TotalCost {
}
class TotalCostResponse {
}


/***/ }),

/***/ 25171:
/*!*****************************************************!*\
  !*** ./src/app/transactions/transaction.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransactionService": function() { return /* binding */ TransactionService; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 76491);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 79441);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 92597);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _shared_models_response_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/models/response.model */ 99002);
/* harmony import */ var _order__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./order */ 44246);
/* harmony import */ var _total_cost__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./total-cost */ 79528);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _shared_services_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/services/notification.service */ 97161);
/* harmony import */ var _shared_services_cart_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/services/cart.service */ 5237);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 71258);











class TransactionService {
    constructor(http, notificationService, cartService, router) {
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
    getDailyLimit(delivery_date) {
        const query = `?delivery_date=${delivery_date}`;
        this.http.get(`${this.apiUrl}txn/get/daily_limit/${query}`).subscribe((response) => {
            if ((response.code = 200)) {
                this.dailyLimit = response.daily_limit_left;
            }
            else {
                this.dailyLimit = 0;
            }
            this.dailyLimitListener.next(this.dailyLimit);
        }, (err) => {
            this.dailyLimit = 0;
            this.dailyLimitListener.next(this.dailyLimit);
        });
        return this.dailyLimitListener.asObservable();
    }
    getVoidedTransactions(order_date_start, order_date_end, status = ``, comp = ``, pageSize = 10, pageIndex = 1) {
        const query = `?limit=${pageSize}&offset=${pageIndex}&order_date_start=${order_date_start}&order_date_end=${order_date_end}${status ? "&status=" + status : ""}${comp ? "&comp=" + comp : ""}`;
        this.http.get(`${this.apiUrl}txn/void/${query}`).subscribe((response) => {
            this.voidedTransactions = response.result;
            this.voidedTransactionsListener.next([...this.voidedTransactions]);
        }, (err) => {
            this.voidedTransactions = [];
            this.voidedTransactionsListener.next([...this.voidedTransactions]);
        });
        return this.orderHistoryListener.asObservable();
    }
    getOrderHistory(order_date_start, order_date_end, status = ``, comp = ``, vendor = null, pageSize = 7, pageIndex = 1) {
        this.orderHistory.results = [];
        this.orderHistoryListener.next(Object.assign({}, this.orderHistory));
        const query = `?limit=${pageSize}&offset=${pageIndex}&order_date_start=${order_date_start}&order_date_end=${order_date_end}${status ? "&status=" + status : ""}${comp ? "&comp=" + comp : ""}${vendor ? "&vendor=" + vendor : ""}`;
        this.http
            .get(`${this.apiUrl}txn/order-history/${query}`)
            .subscribe((response) => {
            this.orderHistory = response;
            this.orderHistoryListener.next(Object.assign({}, this.orderHistory));
        }, (err) => {
            this.orderHistory = new _order__WEBPACK_IMPORTED_MODULE_2__.OrderResponse();
            this.orderHistoryListener.next(Object.assign({}, this.orderHistory));
        });
        return this.orderHistoryListener.asObservable();
    }
    getTotalCost(delivery_start, delivery_end, comp = ``, pageSize = 10, pageIndex = 1) {
        this.orderHistory.results = [];
        this.orderHistoryListener.next(Object.assign({}, this.orderHistory));
        const query = `?limit=${pageSize}&offset=${pageIndex}&delivery_start=${delivery_start}&delivery_end=${delivery_end}${comp ? "&comp=" + comp : ""}`;
        this.http
            .get(`${this.apiUrl}txn/split-report/${query}`)
            .subscribe((response) => {
            this.totalCostList = response;
            this.totalCostListListener.next(Object.assign({}, this.totalCostList));
        }, (err) => {
            this.totalCostList = new _total_cost__WEBPACK_IMPORTED_MODULE_3__.TotalCostResponse();
            this.totalCostListListener.next(Object.assign({}, this.totalCostList));
        });
        return this.totalCostListListener.asObservable();
    }
    getTopUpHistory(date_start, date_end, 
    // status = ``,
    comp = ``, pageSize = 10, pageIndex = 1) {
        const query = `?limit=${pageSize}&offset=${pageIndex}&date_start=${date_start}&date_end=${date_end}${comp ? "&comp=" + comp : ""}`;
        this.http.get(`${this.apiUrl}txn/topup-history/${query}`).subscribe((response) => {
            if (response.code == 200) {
                this.topupHistorty = response.staff_topup_history;
                this.topupHistortyListener.next([...this.topupHistorty]);
            }
            else {
                this.topupHistorty = [];
                this.topupHistortyListener.next([...this.topupHistorty]);
            }
        }, (err) => {
            this.topupHistorty = [];
            this.topupHistortyListener.next([...this.topupHistorty]);
        });
        return this.topupHistortyListener.asObservable();
    }
    cancelOrder(food) {
        // food.status = "cancelled"
        this.isLoadingListener.next(true);
        this.http.patch(`${this.apiUrl}txn/bulk-order/${food.id}/`, { status: "cancelled" }).subscribe((response) => {
            console.log(response);
            if (response.code == 200) {
                this.notificationService.success("Success", response.message);
            }
            else {
                this.notificationService.warning("Error", response.message);
            }
            this.isLoadingListener.next(false);
        }, (err) => {
            this.isLoadingListener.next(false);
            const errorMessage = err.error.message || err.error.details;
            this.notificationService.warning("Error", errorMessage);
        });
        return this.isLoadingListener.asObservable();
    }
    void(txn_id) {
        this.isLoadingListener.next(true);
        this.http.post(`${this.apiUrl}txn/void_txn/`, { txn_id }).subscribe((response) => {
            if (response.code == 200) {
                this.notificationService.success("Success", response.message);
            }
            else {
                this.notificationService.warning("Error", response.message);
            }
            this.isLoadingListener.next(false);
        }, (err) => {
            this.isLoadingListener.next(false);
            const errorMessage = err.error.message || err.error.details;
            this.notificationService.warning("Error", errorMessage);
        });
        return this.isLoadingListener.asObservable();
    }
    getSidWithdrawalHistory(date_start = "2021-09-01", date_end = "2021-10-20") {
        const query = `?date_start=${date_start}&date_end=${date_end}`;
        this.http
            .get(`${this.apiUrl}txn/sid/withdrawal_history/${query}`)
            .subscribe((response) => {
            if (response.code == 200) {
                this.sidWithdrawal = response.result;
                this.sidWithdrawalListener.next([...this.sidWithdrawal]);
            }
            else {
                this.sidWithdrawal = [];
                this.sidWithdrawalListener.next([...this.sidWithdrawal]);
            }
        }, (err) => {
            this.sidWithdrawal = [];
            this.sidWithdrawalListener.next([...this.sidWithdrawal]);
        });
        return this.sidWithdrawalListener.asObservable();
    }
    getCompanyWithdrawalHistory(date_start = "2021-09-01", date_end = "2021-10-20") {
        const query = `?date_start=${date_start}&date_end=${date_end}`;
        this.http
            .get(`${this.apiUrl}txn/company/withdrawal_history/${query}`)
            .subscribe((response) => {
            if (response.code == 200) {
                this.companyWithrawal = response.result;
                this.companyWithrawalListener.next([...this.companyWithrawal]);
            }
            else {
                this.companyWithrawal = [];
                this.companyWithrawalListener.next([...this.companyWithrawal]);
            }
        }, (err) => {
            this.companyWithrawal = [];
            this.companyWithrawalListener.next([...this.companyWithrawal]);
        });
        return this.companyWithrawalListener.asObservable();
    }
    getVendorWithdrawalHistory(date_start, date_end) {
        const query = `?date_start=${date_start}&date_end=${date_end}`;
        this.http
            .get(`${this.apiUrl}txn/vendor/withdrawal_history/${query}`)
            .subscribe((response) => {
            console.log(response);
            this.vendorWithrawal = response;
            this.vendorWithrawalListener.next(Object.assign({}, this.vendorWithrawal));
        }, (err) => {
            this.vendorWithrawal = new _shared_models_response_model__WEBPACK_IMPORTED_MODULE_1__.PaginatedResponse();
            this.vendorWithrawal.results = [];
            this.vendorWithrawalListener.next(Object.assign({}, this.vendorWithrawal));
        });
        return this.vendorWithrawalListener.asObservable();
    }
    placeOrder(orders) {
        this.isLoadingListener.next(true);
        const data = {
            orders: orders.map((element) => {
                return {
                    food: element.id,
                    comment: element.comment || "",
                    delivery_date: element.delivery_date,
                    quantity: element.quantity,
                    meal_type: element.meal_type,
                };
            }),
            platform: `WEB`,
            place: "company",
        };
        this.http.post(`${this.apiUrl}txn/bulk-order/`, data).subscribe((response) => {
            if ((response.code = "201")) {
                this.notificationService.success(`Success`, response.status);
                this.cartService.clearCart();
                this.router.navigate(["/transactions/order-history"]);
            }
            else {
                this.notificationService.success(`Success`, response.status);
            }
            this.isLoadingListener.next(false);
        }, (err) => {
            this.notificationService.warning(`Error`, err.error.message);
            this.isLoadingListener.next(false);
        });
    }
    getReference() {
        this.http
            .get(`${this.apiUrl}txn/generate/topup_code/`)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.shareReplay)())
            .subscribe((response) => {
            if (response.code == 200) {
                this.reference = response.ref;
                this.referenceUpdate.next(this.reference);
            }
            console.log(response);
        });
        return this.referenceUpdate.asObservable();
    }
    cashout(comp_id) {
        let query;
        comp_id ? (query = `?comp_id=${comp_id}`) : (query = ``);
        this.http
            .get(`${this.apiUrl}txn/cashout${query}`)
            // .get<any>(`${this.apiUrl}txn/cashout/`, { params: { cmp_id } })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.shareReplay)())
            .subscribe((response) => {
            this.cashingOutUpdate.next(false);
            console.log(response);
            if (response.code == 200) {
                this.notificationService.success(`Success`, `${response.message}`);
            }
        }, (err) => {
            console.log(err.error.message);
            const errorMessage = err.error.message || err.error.details || `Please contact Admin`;
            this.notificationService.warning(`Error`, errorMessage);
            this.cashingOutUpdate.next(false);
        });
        return this.cashingOutUpdate.asObservable();
    }
    getIsLoading() {
        return this.isLoadingListener.asObservable();
    }
    updateTransaction(transactionId, status) { }
}
TransactionService.ɵfac = function TransactionService_Factory(t) { return new (t || TransactionService)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_shared_services_notification_service__WEBPACK_IMPORTED_MODULE_4__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_shared_services_cart_service__WEBPACK_IMPORTED_MODULE_5__.CartService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router)); };
TransactionService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjectable"]({ token: TransactionService, factory: TransactionService.ɵfac, providedIn: "root" });


/***/ })

}]);
//# sourceMappingURL=default-src_app_transactions_transaction_service_ts-es2015.js.map