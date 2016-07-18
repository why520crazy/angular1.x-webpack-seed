import angular from 'angular';
import ngRoute from 'angular-route';
import appRouter from './app.router';
import './css/main.less';

let siteComponent = {
    restrict    : 'E',
    template    : require('./app.html'),
    controller  : function () {
        this.url = 'https://github.com/why520crazy/angular1.x-webpack-seed';
    },
    controllerAs: 'app'
};

export default angular.module('otherApp', [ngRoute])
    .config(appRouter)
    .component('appOther', siteComponent)
    .name;