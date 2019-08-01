import inquirer = require('inquirer');
import request = require('request');
//const file = './templates.json';
const file = 'https://raw.githubusercontent.com/OfficeDev/templates-catalog/master/templates.json';
const exec = require('child_process').execSync;
const fs = require('fs-extra');

let json: any;

/**
 * Prompt the user with questions to run a search through the Catalog
 * Calls search, prints results, and runs the search up to two times.
 */
export async function runSearch() {

    await request.get(file, (err, response, body) => {
        if (!err && response.statusCode === 200) {
            json = JSON.parse(body);
        }
    });

    json = await searchWithPrompts();
    json = json.map(j => ({'name':j.name, 'version':j.version, 'author':j.author, 'npm':j.npm, 'repository':j.repository, 'tag':j.tag}))

    console.log('Here are your search results:');

    //hack to allow console.table to display results on Node 8
    if (process.version[1] === '8') {
        delete console.table;
        require('console.table');
        console.log("We recommend using Node version 10+ for the best view of the catalog");
    }
    console.table(json);

    if (json.length > 0) {
        if (json.length > 1) {
            let further: any = await inquirer.prompt({ type: 'list', name: 'response', 'message': 'Would you like to further search through these results?', choices: ['Yes', 'No'] });
            if (further.response === 'Yes') {
                json = await searchWithPrompts();
                console.log('Here are your search results:');
                console.table(json);
            }
        }
        let install: any = await inquirer.prompt({ type: 'list', name: 'response', 'message': 'Would you like to install/clone one of these projects?', choices: ['Yes', 'No'] });
        if (install.response === 'Yes') {
            let projects: any = getInstallableProjects(json);
            await installProject(json, projects);
        }
    }
}

export async function searchWithPrompts() {
    let questions: any =
        [
            {
                type: 'list',
                name: 'param',
                message: 'What paramter would you like to search by?',
                choices: ['Name', 'Author', 'NPM', 'Repository', 'Tag']
            },
            {
                name: 'input',
                message: 'What are you searching for?'
            }
        ];

    let answers: any = await inquirer.prompt(questions);
    let results: any = [];
    results = await search(json, answers.input, answers.param);
    return results;
}

/**
 * Make sure user inputs are valid and run a search through a json file
 * @param json file to search in
 * @param input what the user is searching for
 * @param param parameter/catagory to search from
 */
export function search(json, input, param) {
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
/**
 * Returns the projects associated with what a user has searched for
 * with each project numbered
 * @param results projects currently filtered by search
 */
export function getInstallableProjects(results: any) {
    let projects = [];
    for (let i = 0; i < results.length; i++) {
        projects.push(i + ': ' + results[i].name);
    }
    return projects;
}
/**
 * Allows the user to choose a project to install and a
 * service to install from.
 * @param results 
 * @param projects 
 */
export async function installProject(results: any, projects: any) {
    let choice: any = await inquirer.prompt({ type: 'list', name: 'response', 'message': 'Please choose a project', choices: projects });
    let installType: any = await inquirer.prompt({ type: 'list', name: 'response', 'message': 'Choose which service to retrieve the project from', choices: ['NPM', 'GitHub'] });
    let installCommand: string = '';
    let projectLink: string = '';
    let index = +choice.response.substr(0, choice.response.indexOf(':'));

    if (installType.response === 'NPM') {
        installCommand = 'npm i -g ';
        projectLink = results[index].npm;
    } else {
        installCommand = 'git clone https://';
        projectLink = results[index].repository + '.git';
    }

    try {
        await exec(installCommand + projectLink);
        //get newly npm installed files from global location and move to user profile
        //allows user to get the src files instead of just the node_modules like in a normal npm install
        if (installType.response === 'NPM') {
            //TODO - node 8 has a different source folder, need to accomodate that
            //currently npm installation wont work on node version 8
            let sourceFolder = process.env.APPDATA + '/npm/node_modules/' + results[index].npm;
            let destFolder = process.env.USERPROFILE + '/' + results[index].npm;
            try {
                await fs.move(sourceFolder, destFolder);
                console.log('NPM package retrieved and can be found at: ' + destFolder);
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log('Error with Installation!');
    }
}
