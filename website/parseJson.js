//const fs = require("fs");
const file = '../templates.json';

$(function () {
    var dataJSON = '[ { "name": "abc", "npm": "@a/bc", "repository": "", "tag": "N/A" }, { "name": "BetBuddy", "npm": "@betbuddy/bet", "repository": "github.com/BetBuddy", "tag": "Android" }, { "name": "c", "npm": "c/c", "repository": "", "tag": "c#" }, { "name": "DBZ", "npm": "@db/z", "repository": "", "tag": "TypeScript" }, { "name": "drake", "npm": "@toronto/raptors", "repository": "github.com/6", "tag": "NBA" }, { "name": "dsam", "npm": "@dsamdani/dsam", "repository": "", "tag": "test" }, { "name": "Dubs", "version": "0.0.7", "author": "sc", "npm": "@gsw/dubs", "repository": "github.com/SC/30", "tag": "Python" }, { "name": "June7", "version": "6.7.19", "author": "r", "npm": "@june/7", "repository": "github.com/june/7", "tag": "React" }, { "name": "MyOfficeTemplate", "npm": "", "repository": "", "tag": "N/A" }, { "name": "Office-Addin-TaskPane-JS", "npm": "", "repository": "github.com/OfficeDev/Office-Addin-TaskPane-JS", "tag": "Office-Addin" }, { "name": "Project1", "version": "1.0.0", "author": "dsamdani", "npm": "@project/1", "repository": "github.com/dsam7", "tag": "React" }, { "name": "Raptors", "npm": "@Raptors/Dinos", "repository": "github.com/WeTheNorth/Raptor", "tag": "NBA" }, { "name": "Test", "npm": "@test/test", "repository": "github.com/Test/1", "tag": "N/A" }, { "name": "tester", "npm": "@tester/tester123", "repository": "github.com/tester", "tag": "N/A" }, { "name": "ViewJS", "version": "0.0.1", "author": "jsViewer", "npm": "@js/view", "repository": "github.com/js/view", "tag": "JavaScript" }, { "name": "WorldCup", "npm": "@world/cup", "repository": "github.com/WC/world", "tag": "C#" }, { "name": "Yo-Office", "version": "6.0.0", "author": "office", "npm": "generator-office", "repository": "github.com/OfficeDev/generator-office", "tag": "TypeScript" }, { "name": "zoo", "npm": "zbo", "repository": "z", "tag": "java" } ]';
    
    //var dataJSON = fs.readFileSync(file);
    //console.log(dataJSON);

    var dataObject = JSON.parse(dataJSON);
    var listItemString = $('#listItem').html();

    dataObject.forEach(buildNewList);

    function buildNewList(item, index) {
        var listItem = $('<li>' + listItemString + '</li>');
        var listItemTitle = $('.title', listItem);
        listItemTitle.html(item.name);
        //var listItemAmount = $('.amount', listItem);
        //listItemAmount.html(item.version);
        var listItemDesc = $('.description', listItem);
        var description = "<ul>Version: " + item.version + "</ul>";
        description += "<ul>Author: " + item.author + "</ul>";
        description += "<ul>NPM: " + '<a href="' + "https://npmjs.com/package/" + item.npm + '">' + item.npm + "</a></ul>";
        description += "<ul>Repository: " + '<a href="' + "https://" + item.repository + '">' + item.repository + "</a></ul>";
        description += "<ul>Tag: " + item.tag + "</ul>";
        listItemDesc.html(description);
        $('#dataList').append(listItem);
    }

});