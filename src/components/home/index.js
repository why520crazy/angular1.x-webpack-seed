import angular from 'angular';
import template from './template.html';
import style from './home.less';

class HomeController {
    constructor() {
        this.style = style;
        this.name = 'Home';
        this.color = '#f87c08';
    }
}

export default angular.module('xxx.home', [])
    .component('home', {
        template  : template,
        controller: HomeController
    })
    .name;