// todoDirectives contains all directives ( html items) ------------------------

angular.module('todoDirectives', [])
	
	.directive('todoForm', function() {				//todoForm become <todo-form></todo-form> in html
	  	return {
	    	restrict: 'E',							
	    	templateUrl: '/templates/todo-form.html'
		};
	})

	.directive('todoList', function() {				//todoList become <todo-list></todo-list> in html
	  	return {
	    	restrict: 'E',							
	    	templateUrl: '/templates/todo-list.html'
		};
	});