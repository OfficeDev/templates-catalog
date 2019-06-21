# How To
## Get the Repository in your Local Working Directory
You need to clone the repo using git before you can use the templates or push your own.
You'll then need to use npm to get the project ready.

Run these commands:
```bash
$ git clone https://github.com/dsam7/InternshipWorkspace.git
$ cd create-project
$ npm install
$ npm link
```

## Submitting Your Template to the Repository
Make sure you have a working project. We suggest having it as an npm package.

You'll need to add your project in a separate branch so it can be verified before being pushed to master.

To do this:

```bash
$ git branch *your-project-name*
$ git checkout *your-project-name*
```

Once your project is ready for submission, make sure you are in the root directory (with the templates.json file) and run these commands:
```bash
$ create-project 
```
This will edit the templates.json file with the information from your new project. This is the file that gets committed to the repository.

To finish your submission:

```bash
$ git add templates.json
$ git commit -m "*leave a message about your project*"
$ git push
```
Now your project will be reviewed and if accepted, it will make its way onto the repository!

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
