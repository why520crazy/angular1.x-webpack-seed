import angular from 'angular';
import template from './template.html';
import './about.less';

class AboutController {
    constructor() {
        this.name = 'About';
        this.color = 'red';

        // 动态加载
        // require.ensure(['./module-a'], function(require) {
        //     var a = require('./module-a');
        //     a();
        // });
    }
}

export default angular.module('xxx.about', [])
    .component('about', {
        template    : template,
        controller  : AboutController,
        controllerAs: 'about'
    })
    .name;