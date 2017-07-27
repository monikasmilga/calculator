// array of button objects
var buttonArray = [
    {
        "type": "action",
        "value": "C",
        "buttonClass": "lightgreen"
    },
    {
        "type": "action",
        "value": "<<",
        "buttonClass": "lightblue"
    },
    {
        "type": "action",
        "value": "%",
        "buttonClass": "lightblue"
    },
    {
        "type": "action",
        "value": "/",
        "buttonClass": "lightblue"
    },
    {
        "type": "number",
        "value": 9,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": 8,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": 7,
        "buttonClass": "grey"
    },
    {
        "type": "action",
        "value": "*",
        "buttonClass": "lightblue"
    },
    {
        "type": "number",
        "value": 4,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": 5,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": 6,
        "buttonClass": "grey"
    },
    {
        "type": "action",
        "value": "-",
        "buttonClass": "lightblue"
    },
    {
        "type": "number",
        "value": 1,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": 2,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": 3,
        "buttonClass": "grey"
    },
    {
        "type": "action",
        "value": "+",
        "buttonClass": "lightblue"
    },
    {
        "type": "number",
        "value": "+-",
        "buttonClass": "lightblue"
    },
    {
        "type": "number",
        "value": 0,
        "buttonClass": "grey"
    },
    {
        "type": "number",
        "value": ".",
        "buttonClass": "lightblue"
    },
    {
        "type": "action",
        "value": "=",
        "buttonClass": "lightgreen"
    }
];

var clickedButton;
// script creates html div tag, inserts input field and table of buttons

$(document).ready(function () {
    $('body').prepend("<div id='buttonField'></div>");
    $('#buttonField').append("<input disabled>"); // change to read only, give value

    $.each(buttonArray, function (index, buttonArray) {
        $("#buttonField").append($("<button>" + buttonArray.value + "</button>").attr("class", buttonArray.buttonClass).attr("type", buttonArray.type).attr("value", buttonArray.value));
    });
});

// when clicked gets button value and inserts in input field

$(document).ready(function () {
    $("button").click(function (e) {
        clickedButton = e.currentTarget;
        $('input').val(clickedButton.value);
    });
});

