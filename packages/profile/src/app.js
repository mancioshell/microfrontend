import "angular";
import "angular-route";

import 'single-spa-angularjs/lib/parcel.js';

import "./services";
import "./profile";

const app = angular.module("app", ["ngRoute", 'single-spa-angularjs', "app.profile", "app.services"]);

app.config(['$locationProvider', ($locationProvider) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    })
}])
