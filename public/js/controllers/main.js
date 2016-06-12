// todoController contains all controller (mainController in our case) ---------

angular.module('todoController', [])

	// inject the Scope, Http and Todo service factory into controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// when loading application, show all todos ----------------------------
		
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			}).error(function(){
				$scope.loading = false;
			});

		// when submitting form, create new todo -------------------------------

		$scope.createTodo = function() {

			if ($scope.formData.text != undefined) { 		// validate the form
			
				$scope.loading = true;

				Todos.create($scope.formData)
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; 				// clear the form so user is ready to enter another
						$scope.todos = data; 				// assign updated list of todos
					})
					.error(function(){
						$scope.loading = false;
					});
			}
		};

		// when check/uncheck todo, update -------------------------------
		
		$scope.updateTodo = function(id, done) {
			$scope.loading = true;

			Todos.update(id, { done: done })			// Update only data you want
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; 				// assign updated list of todos
			
				})
				.error(function(){
					$scope.loading = false;
				});
		};

		// when delete a todo --------------------------------------------------

		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; 					// assign updated list of todos
				});
		};

	}]);