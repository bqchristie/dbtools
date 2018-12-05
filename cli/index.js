var inquirer = require('inquirer');

var questions = [
    {
        type: 'input',
        name: 'model',
        message: 'What is the name of object model you want to create?'
    }
]
inquirer
    .prompt(questions)
    .then(answers => {
        console.log(answers);
    });