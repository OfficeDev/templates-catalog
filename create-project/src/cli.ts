import inquirer = require('inquirer');
import { addProjectInfo } from './sortJson';
import { runSearch } from './search';

/**
 * Prompt the user with questions about the project they are trying to push to the Catalog
 * Uses inquirer to prompt the questions and collect the answers
 * Questions are built off many different values including:
 *     - type : type of the prompt
 *     - name : identifier to store in answers hash
 *     - message : question to print
 *  Full documentation at https://github.com/SBoudrias/Inquirer.js#readme
 * @return project info formatted to templates.json standard
 */
export async function runPublish(): Promise<any> {
  const defaultTemplate = 'MyOfficeTemplate';
  const questions = [];

  questions.push({
    name: 'template',
    message: 'What is the name of your project?',
    default: defaultTemplate
  });

  questions.push({
    name: 'version',
    message: 'Version?',
    default: '0.0.1',
  });

  questions.push({
    name: 'author',
    message: 'Author name?'
  });

  questions.push({
    name: 'git',
    message: 'Please provide a link to your repository if possible (eg. GitHub, BitBucket, etc.)'
  });

  questions.push({
    name: 'npm',
    message: 'NPM name? (Only provide what you would type after "npm i" if you were trying to install)'
  });

  // Providing a few choices for now but will eventually have a standardized list of tags to choose from
  questions.push({
    type: 'list',
    name: 'tag',
    message: 'Is there any tag associated with your project?',
    choices: ['JavaScript', 'TypeScript', 'React', 'Other'],
    default: 'JavaScript'
  });

  const answers: any = await inquirer.prompt(questions);

  return {
    template: answers.template,
    version: answers.version,
    author: answers.author,
    npm: answers.npm,
    git: answers.git,
    tag: answers.tag,
  };
}

/**
 * Prompt the user with questions regarding their project and collect their answers
 * and then add that info to the templates.json file
 * @param args command line arguments:
 *     - create-project : needed to run the cli
 *     - search OR publish : (optional) how you would like to use the catalog
 * @return action to take (search/publish) to index.ts to then run the necessary next step
 */
export async function cli(args) {
  let argument = '';

  // Check if an optional command line argument is present
  if (args[2]) {
    argument = args[2].toLowerCase();
  }

  // Check if the argument is one of the recognized options
  if (argument !== 'search' && argument !== 'publish') {
    // Set up the question to determine what the user wants to do with the catalog
    let question: any = {
      type: 'list',
      name: 'action',
      message: 'What would you like to use the Community Templates Catalog for?',
      choices: ['Search', 'Publish']
    };
    let action: any = await inquirer.prompt(question);
    argument = action.action;
  }

  if (argument.toLowerCase() === 'search') {
    await runSearch();
  } else {
    // Prompt the user with questions about their project
    let answers = await runPublish();

    console.log('Here is your project info:');
    console.log(answers);

    // Write to templates.json
    await addProjectInfo(answers.template, answers.version, answers.author, answers.npm, answers.git, answers.tag);
  }
}
