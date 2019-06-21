import inquirer from 'inquirer';
const fs = require('fs');
const file = './templates.json';

/**
 * Prompt the user with questions to run a search through the Catalog
 * Calls search, prints results, and runs the search up to two times.
 */
export async function runSearch() {
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

/**
 * Make sure user inputs are valid and run a search through a json file
 * @param json file to search in 
 * @param input what the user is searching for
 * @param param parameter/catagory to search from 
 */  
async function search(json, input, param) {
    input = input.toLowerCase();
    param = param.toLowerCase();
    let temp = [];
    let catalogEntry;
    for (let i = 0; i < json.length; i++) {
        if (json[i][param]) {
            catalogEntry = json[i][param];
            //if a match is found
            if (catalogEntry.toLowerCase().indexOf(input) > -1) {
                temp.push(json[i]);
            }
        }
    }
    return temp;
}