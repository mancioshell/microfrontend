import angular from 'angular'
import ProfileRoutes from './routes'

import Profile from "./profile.component"
import ProfileDetails from "./profile-details.component"

angular.module('app.profile', ['ngRoute'])
    .config(ProfileRoutes)
    .component('profileComponent', Profile)
    .component('profileDetails', ProfileDetails)

ProfileRoutes.$inject = ['$routeProvider', '$logProvider']
Profile.$inject = ['$log']
ProfileDetails.$inject = ['$log']