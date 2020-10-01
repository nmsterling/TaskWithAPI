alert("you're in!")
todoApp = new Vue({
    delimiters: ['[[', ']]'],
    el: '#todoApp',
    data: {
        message: 'Welcome to the Todo App!',
        todos: [],
        newTodo: '',
        edited: '',
    },
    methods: {
          addTodo: function() {
               axios.post('/todo/', {
                task: this.newTodo
                })
                .then(response => {
                    this.todos.push(response.data)
                })
                .catch(error => {
                    console.log(error.response)
                });
                this.newTodo = '';
          },
          complete: function(id) {
                const url = "/todo/" + id + "/";
                const todo = this.todos.filter(todo => todo.id === id)[0];
                axios.patch(url, {
                    is_completed: true
                })
                .then(response => {
                    this.todos.forEach(todo => {
                        if (todo.id === response.data.id) {
                            todo.is_completed = true;
                        }
                    })
                })
                .catch(error => {
                    console.log(error.response)
                });
                alert("You did it!");
          },
          undoComplete: function(id) {
                const url = "/todo/" + id + "/";
                const todo = this.todos.filter(todo => todo.id === id)[0];
                axios.patch(url, {
                    is_completed: false
                })
                .then(response => {
                    this.todos.forEach(todo => {
                        if (todo.id === response.data.id) {
                            todo.is_completed = false;
                        }
                    })
                })
                .catch(error => {
                    console.log(error.response)
                })
          },
          editTodo: function(id) {
                const url = "/todo/" + id + "/";
                const todo = this.todos.filter(todo => todo.id === id)[0];
                axios.patch(url, {
                    task: this.edited
                })
                .then(response => {
                    this.todos.forEach(todo => {
                        if (todo.id === response.data.id) {
                            todo.task = response.data.task;
                        }
                    })
                });
          },
          deleteTodo: function(id) {
                const url = "/todo/" + id + "/";
                const todo = this.todos.filter(todo => todo.id === id)[0];
                axios.delete(url)
                .then(response => {
                    console.log(response)
                    this.todos.forEach((todo, index) => {
                        if (todo.id === id) {
                            this.todos.splice(index, 1);
                        }
                    });
                });
          },
    },
    computed:{
        completed: function() {
            return this.todos.filter(todo => todo.is_completed === true)
        },
        notCompleted: function() {
            return this.todos.filter(todo => todo.is_completed === false)
        }
    },
    mounted: function () {
        axios.get('/todo/')
            .then(response => {
                this.todos = response.data
            })
    },
})