const file = 'https://raw.githubusercontent.com/OfficeDev/templates-catalog/master/templates.json';

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
        var listItem = $('<li class="names">' + listItemString + '</li>');
        var listItemTitle = $('.title', listItem);
        listItemTitle.html(item.name);
        var listItemDesc = $('.description', listItem);
        var description = "<ul>Version: " + item.version + "</ul>";
        description += "<ul>Author: " + item.author + "</ul>";
        description += "<ul>NPM: " + '<a href="' + "https://npmjs.com/package/" + item.npm + '">' + item.npm + "</a></ul>";
        let link = item.repository.length > 28 ? 'link' : item.repository;
        description += "<ul>Repository: " + '<a href="' + "https://" + item.repository + '">' + link + "</a></ul>";
        description += "<ul>Tag: " + item.tag + "</ul>";
        listItemDesc.html(description);
        $('#dataList').append(listItem);
    }

});

function search() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();
    let nameList = document.getElementsByClassName('names');
    for (i = 0; i < nameList.length; i++) {
        if (!nameList[i].innerHTML.toLowerCase().includes(input)) {
            nameList[i].style.display="none";
        } else {
            nameList[i].style.display="inline-table";
        }
    }
}