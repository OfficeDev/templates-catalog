import inquirer = require('inquirer');
import { addProjectInfo } from './sortJson';
import { runSearch } from './search';

/**
 * Prompt the user with questions about the project they are trying to push to the Catalog
 * @return project info formatted to templates.json standard
 */
async function promptUser() : Promise<any> {
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
      message: 'NPM Link?'
    });
    
    //Providing a few choices for now but will eventually have a standardized list of tags to choose from
    questions.push({
      type: 'list',
      name: 'tag',
      message: 'Is there any tag associated with your project?',
      choices: ['JavaScript', 'TypeScript', 'React', 'Other'],
      default: 'JavaScript'
    });
    
    const answers : any = await inquirer.prompt(questions);

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
    * @param args command line arguments
    */
   export async function cli(args) {
     
    let question : any = 
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to use the Community Templates Catalog for?',
      choices: ['Search', "Publish"]
    }
    let action : any = await inquirer.prompt(question);

    if (action.action === 'Search') {
      runSearch();
    } else {
      let answers = await promptUser();
    
      console.log('Here is your project info:');
      console.log(answers);

      addProjectInfo(answers.template, answers.version, answers.author, answers.npm, answers.git, answers.tag);
    }
  }