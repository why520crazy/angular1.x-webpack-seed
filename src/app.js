import angular from 'angular';
import ngRoute from 'angular-route';
import components from './components';
import appRouter from './app.router';

let appComponent = {
    restrict    : 'E',
    template    : require('./app.html'),
    controller  : function () {
        this.url = 'https://github.com/why520crazy/angular1.x-webpack-seed';
    },
    controllerAs: 'app'
};

export default angular.module('xxxApp', [ngRoute, components])
    .config(appRouter)
    .component('app', appComponent)
    .name;