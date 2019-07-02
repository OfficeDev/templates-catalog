const file = 'https://raw.githubusercontent.com/OfficeDev/templates-catalog/master/templates.json?token=ADD4CN6TARWYJULWI36RFC25ETNAI';

$(function () {
    var dataJSON;

    $.ajax({
        url: file,
        async: false,
        success: function (data) { dataJSON = data; }
    });

    var dataObject = JSON.parse(dataJSON);
    var listItemString = $('#listItem').html();

    dataObject.forEach(buildNewList);

    function buildNewList(item, index) {
        var listItem = $('<li>' + listItemString + '</li>');
        var listItemTitle = $('.title', listItem);
        listItemTitle.html(item.name);
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