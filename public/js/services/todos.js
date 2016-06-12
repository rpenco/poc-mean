// todo service, factory requests ---------------------------------------------

angular.module('todoService', [])

	.factory('Todos', ['$http',function($http) {	// Name factory 'Todos', use $http module for AJAX requests
		return {
			
			get : function() {
				return $http.get('/api/todos');
			},
			
			create : function(data) {
				return $http.post('/api/todos', data);
			},
			
			update : function(id, data) {
				return $http.put('/api/todos/' + id, data);
			},

			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);