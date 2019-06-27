const fs = require('fs');
const file = './templates.json';

/**
 * Compare two strings alphabetically
 * @param a string 1
 * @param b string 2 
 */
export function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
}
/**
 * Using the information collected from the user, find the spot in the templates.json
 * file to add the new project and insert it while maintaining alphabetical order
 * @param name 
 * @param npm 
 * @param repository 
 * @param tag 
 */
export function addProjectInfo(name, version, author, npm, repository, tag) {
    let json: any = fs.readFileSync(file, function read(err, data) {
        if (err) throw err;
    });
    json = JSON.parse(json);
    let project =
    {
        "name": name,
        "version": version,
        "author": author,
        "npm": npm,
        "repository": repository,
        "tag": tag
    };

    //Add new project using Insertion Sort
    for (let i = json.length - 1; i >= 0; i--) {
        if (compareStrings(json[i].name, project.name) > 0) {
            let temp = json[i];
            json[i + 1] = temp;
        } else {
            json[i + 1] = project;
            break;
        }
    }

    fs.writeFileSync(file, JSON.stringify(json, null, "\t"), function (err) {
        if (err) throw err;
    });
}