import angular from 'angular';
import template from './template.html';
import './about.less';

class AboutController {
    constructor() {
        this.name = 'About';
        this.color = 'red';
    }
}

export default angular.module('xxx.about', [])
    .component('about', {
        template    : template,
        controller  : AboutController,
        controllerAs: 'about'
    })
    .name;