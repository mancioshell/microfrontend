import angular from 'angular'

import AjaxService from './ajax-service'

const services = angular.module('app.services', [])
services.factory('AjaxService', ['$q', '$log', AjaxService])