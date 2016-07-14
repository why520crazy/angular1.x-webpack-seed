import angular from 'angular';
import template from './template.html';

class HomeController {
    constructor() {
        this.name = 'Home';
        this.color = 'blue';
    }
}

export default angular.module('xxx.home', [])
    .component('home', {
        template  : template,
        controller: HomeController
    })
    .name;