routing.$inject = ['$routeProvider', '$locationProvider'];

export default function routing($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            template: '<home></home>'
        })
        .when('/about', {
            template: '<about></about>'
        })
        .otherwise('/');
}