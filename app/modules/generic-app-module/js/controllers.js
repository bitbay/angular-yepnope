'use strict';
/* App Controllers */
// The top level AppController dynamically sets state for:
//     templates.layout (simulates ng-view but allows for multiple includes)
hbo.GenericTool.controller('AppController', [
	'$rootScope',
	'$route',
	'$location',
	function ($rootScope, $route, $location) { 
    $rootScope.$on('$routeChangeStart', function(next, current){
    	console.log('routeChangeStart event triggered');
    });
    $rootScope.$on('$routeChangeSuccess', function(current, previous){
		console.log('routeChangeSuccess event triggered');
	});
	$rootScope.$on('$routeChangeError', function(current, previous, rejection){
		console.log('routeChangeError event triggered');
	});
}]); 
