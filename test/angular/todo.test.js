// to run test : cd /test/angular/ => karma start karma.conf.js ----------------

// fixtures
var todos = [{
    "_id": "55d635ee610ec5e20e3eccae",
    "done": true,
    "text": "Fist todo"
}, {
    "_id": "55d63a774e6194951fc3c50e",
    "done": false,
    "text": "Second todo"
}];


describe('khipsTodo', function() {

    beforeEach(module('khipsTodo'));

    // mainController --------------------------------------------------------------

    describe('mainController', function() {

        // -------------------------------------------------------------------------

        var $controller;
        var $scope = {},
            controller;

        beforeEach(inject(function(_$controller_) { // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
            controller = $controller('mainController', {
                $scope: $scope
            });

        }));

        it('assigns loading', function() {
            expect($scope.loading).toBeTruthy();
        });

        it('should have createTodo function', function() {
            expect($scope.createTodo).toBeDefined();
        });

        it('should have updateTodo function', function() {
            expect($scope.createTodo).toBeDefined();
        });

        it('should have deleteTodo function', function() {
            expect($scope.createTodo).toBeDefined();
        });

        // -------------------------------------------------------------------------

        it('should have loading to true by default', inject(function($httpBackend) {

            $httpBackend.expectGET('/api/todos').respond(todos);
            $httpBackend.flush();

            expect($scope.todos).toEqual(todos);

        }));

    });

});
