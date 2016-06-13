// Todo tests  -----------------------------------------------------------------

var su = require('superagent');
var expect = require('expect.js');
var config = require('../../config/config');
var server = require('../../server');

describe('express rest api server', function() {

    var url = 'http://localhost:' + config.port;
    var tmpTodo = null;
    var text = 'todo-test-' + Math.random();

    before(function() {
        server.listen();
    });

    after(function() {
        server.close();
    });

    // create ------------------------------------------------------------------

    it('create (success) todo', function(done) {

        su.post(url + '/api/todos') // use superagent
            .send({
                text: text
            }) // send request with body POST
            .end(function(e, res) { // test response

                expect(res.statusCode).to.eql(200); // status code must be 200 (OK)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('array'); // result must be an array
                expect(todos.length).to.be.greaterThan(0); // and contains more than 1 object (tmp obj)

                // get created todo
                for (var i in todos) {
                    if (todos[i].text === text) { // find todo with text equals random text
                        tmpTodo = todos[i]; // save todo for next tests
                        expect(tmpTodo.done).to.be(false); // test if 'done' equals 'false' by default
                        done() // end current test
                    }
                }

                expect().fail('todo not found!'); // if here, created todo not found > error
            })
    })

    it('create (empty body) todo', function(done) {

        su.post(url + '/api/todos')
            .send({}) // send request with empty body
            .end(function(e, res) { // test response

                expect(res.statusCode).to.eql(400); // status code must be 400 (bad request)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('object'); // result must be an (empty) object
                done() // end current test
            })
    })

    // get ---------------------------------------------------------------------

    it('get todos', function(done) {

        su.get(url + '/api/todos') // get todo list to check todo structure
            .send()
            .end(function(e, res) {

                expect(res.statusCode).to.eql(200); // status code must be 200 (OK)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('array'); // result must be an array
                expect(todos.length).to.be.greaterThan(0); // and contains more than 1 object (tmp obj)

                for (var i in todos) { // test all todos structure: 'id', 'text', 'done'
                    var t = todos[i];

                    expect(t).to.be.an('object');

                    expect(t).to.have.property('_id');
                    expect(t._id).to.have.length(24);

                    expect(t).to.have.property('done');

                    expect(t).to.have.property('text');
                }

                done() // end current test
            })
    })


    // update ------------------------------------------------------------------

    it('update todo', function(done) {

        su.put(url + '/api/todos/' + tmpTodo._id) // update todo with id tmpTodo._id
            .send({
                done: true
            }) // change 'done' > 'true'
            .end(function(e, res) {

                expect(res.statusCode).to.eql(200); // status code must be 200 (OK)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('array'); // result must be an array
                expect(todos.length).to.be.greaterThan(0); // and contains more than 1 object (tmp obj)

                for (var i in todos) { // find updated todo
                    if (todos[i]._id === tmpTodo._id) {
                        tmpTodo = todos[i]; // save updated todo
                        expect(tmpTodo.done).to.be(true);
                        done()
                    }
                }

                expect().fail('todo not found!'); // if here, updated todo not found > error
            })
    })

    it('update (failed text) todo', function(done) {

        su.put(url + '/api/todos/' + tmpTodo._id)
            .send({
                text: ''
            }) // change 'text' > ''
            .end(function(e, res) {

                expect(res.statusCode).to.eql(400); // status code must be 400 (bad request)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('object'); // result must be an (empty) object
                done() // end current test
            })
    })

    it('update (failed done) todo', function(done) {

        su.put(url + '/api/todos/' + tmpTodo._id)
            .send({
                done: 'not a boolean'
            }) // change 'done' > String
            .end(function(e, res) {

                expect(res.statusCode).to.eql(400); // status code must be 400 (bad request)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('object'); // result must be an (empty) object
                done() // end current test
            })
    })


    // delete ------------------------------------------------------------------

    it('delete todo', function(done) {

        su.del(url + '/api/todos/' + tmpTodo._id) // delete todo with id tmpTodo._id
            .send()
            .end(function(e, res) {

                expect(res.statusCode).to.eql(200); // status code must be 200 (OK)

                var todos = res.body; // get todo list

                expect(todos).to.be.an('array'); // result must be an array (empty or not)

                for (var i in todos) { // if find todo, delete fail
                    if (todos[i]._id === tmpTodo._id) { // find todo with tmpTodo._id
                        expect().fail('todo  found!'); // if here, todo is not deleted  > error
                    }
                }

                done(); // end current test
            })
    })
})
