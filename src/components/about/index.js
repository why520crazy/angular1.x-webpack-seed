import angular from 'angular';
import template from './template.html';

class AboutController {
    constructor() {
        this.name= 'About';
        this.color = 'red';
    }
}

export default angular.module('xxx.about', [])
    .component('about', {
        template  : template,
        controller: AboutController
    })
    .name;