import inquirer from 'inquirer';
const fs = require('fs');
const file = './templates.json';

export async function go() {
    let json = fs.readFileSync(file, function read(err, data) {
      if (err) throw err;
    });
  
    json = JSON.parse(json);
  
    let questions = 
    [
        {
            type: 'list',
            name: 'param',
            message: 'What paramter would you like to search by?',
            choices: ['Name', 'Author', 'NPM', 'Repository', 'Tag']
        },
        {
            type: String,
            name: 'input',
            message: 'What are you searching for?'
        }
    ];
    let answers = await inquirer.prompt(questions);
    
    //let param = readline.question("What paramter would you like to search by?\n");
    //let input = readline.question("What are you searching for?\n");
    
    let results = [];
    results = await search(json, answers.input, answers.param);

    console.log("Here are your search results:");
    console.log(results);

    let further = await inquirer.prompt({ type: 'list', name: 'response', 'message': 'Would you like to further search through these results?', choices: ['Yes', 'No']});
    
    if (further.response == 'Yes') {
        console.log('here');
        answers = await inquirer.prompt(questions);
        results = await search(results, answers.input.toLowerCase(), answers.param.toLowerCase());
        console.log("Here are your search results:");
        console.log(results);
    }
  }

async function search(json, input, param) {
    input = input.toLowerCase();
    param = param.toLowerCase();
    let temp = [];
    for (let i = 0; i < json.length; i++) {
        let a = json[i][param];
        if (a.toLowerCase().indexOf(input) > -1) {
            temp.push(json[i]);
        }
    }
    return temp;
}