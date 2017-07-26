
// array of button objects
var buttonArray = [
    {
        type: "action",
        value: "C",
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "<<",
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "%",
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "/",
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 9,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 8,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 7,
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "*",
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 4,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 5,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 6,
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "-",
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 1,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 2,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 3,
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "+",
        buttonClass: "grey"
    },
    {
        type: "number",
        value: "+-",
        buttonClass: "grey"
    },
    {
        type: "number",
        value: 0,
        buttonClass: "grey"
    },
    {
        type: "number",
        value: ".",
        buttonClass: "grey"
    },
    {
        type: "action",
        value: "=",
        buttonClass: "grey"
    }
];


// script creates html div tag, inserts input field and table of buttons

$(document).ready(function () {
    $('body').prepend("<div id='buttonField'>");
    $('#buttonField').append("<input>");
    $.each(buttonArray, function (value, symbol) {
        $("#buttonField").append("<button>" + symbol.value + "</button>");
    });
});

// onclick

$(document).ready(function () {
    $("button").click(function (event) {
        console.log(event);
    });
});
