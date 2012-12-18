'use strict';

// Demonstrate how to register services
// In this case it is a simple constant service.
angular.module('GenericTool.services', [])
	.value('version', '0.2')
	.factory('yepnopeFactory',function(yepnopeService){
		return function(yepnopeService){
			// factory can be called various times
			console.log('yepnope factory called');
			return yepnopeService.load();
		};
	})
	.service('yepnopeService',function($q, $route, $rootScope) {
  		// service instantiaded once in application lifetime
  		// "singleton"
		console.log('yepnope service instantiated');
		yepnope.errorTimeout = 4000; // set to 4 second error timeout
		
		// since i could not find a way how to get a callback called on script
		// load error, the promise will be ALLWAYS resolved in the final
		// "complete" callback
		this.load = function() {
			var deferred = $q.defer();
			var $rt = $route.current.$route;
		
			$rt.dependencies = $rt.dependencies ? $rt.dependencies : false;
			//Load dependencies then set template in oncomplete method
			yepnope({
				test: ($rt.loaded === true)||(!$rt.dependencies),
				nope: $rt.dependencies.nope,
				complete: function () {
					$rootScope.templates = $rt.templates;
					//The controllers weren't loaded, manually trigger render
					if (!$rt.loaded) {
						$rt.loaded = true;
						//changed $digest to $apply;
						$rootScope.$apply(function(){
							deferred.resolve();
						});
					} else {
						deferred.resolve();
					}
				}
			});
			return deferred.promise;
		}
	});
