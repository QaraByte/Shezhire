// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    $.ajax({
        url: '/Home/GetNodes',
        success: function (data) {
            let nodes = JSON.parse(data);
            console.log(nodes);
            for (let i = 0; i < nodes.length; i++) {
                //let div = $('<div>');
                let node = {};
                node.Element = $('<p id="' + nodes[i].Id + '">[' + nodes[i].Id + ']' + nodes[i].Name + '</p>');
                if (nodes[i].Parent_id == 0) {
                    $('.nodes').append(node.Element);
                }
                else {
                    $('#' + nodes[i].Parent_id).next().after(node.Element);
                }

                let birthDate = new Date(nodes[i].Birthdate);

                if (birthDate.getTime() !== -62135618500000) {
                    //$('.nodes').append('<p>д.р. ' + FormatDate(birthDate) + '</p>');
                    node.Birthdate = $('<p>д.р. ' + birthDate.getDate() + '.' + birthDate.getMonth() + '.' + birthDate.getFullYear() + '</p>');
                }
                else {
                    node.Birthdate = $('<p>д.р.</p>');
                }
                if (nodes[i].Parent_id == 0) {
                    $('.nodes').append(node.Birthdate);
                }
                else {
                    //$('#' + nodes[i].Parent_id).next().after(node.Birthdate);
                    node.Element.after(node.Birthdate)
                }
            }
        }
    });
});

function FormatDate(date) {
    let value = date.split(' ');
    if (value.length == 1) {
        let dateFormat = value[0].split('.').reverse().join('-');
        return dateFormat;
    }
    else {
        let dateFormat = value[0].split('.').reverse().join('-');
        if (value[0] == '01.01.0001')
            return null;
        let timeFormat = value[1].split(':')
        return dateFormat + 'T' + timeFormat[0] + ':' + timeFormat[1];
    }
}
