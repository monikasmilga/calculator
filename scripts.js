var numbers = ['0'],
    actions = [],
    action;

var ACTION_INCREMENT = 'increment',
    ACTION_DELETE = 'delete',
    ACTION_DELETEONE = 'backspace',
    ACTION_PLUSMINUS = 'plus minus',
    ACTION_CALCULATE = 'calculate',
    ACTION_PERCENT = 'percent';

// script creates html div tag, inserts input field and table of buttons

$(document).ready(function () {
    $('body').prepend("<div id='buttonField'></div>");
    $('#buttonField').append("<input value='0' disabled>");

    $.each(buttonArray, function (index, buttonArray) {
        $("#buttonField").append($("<button>" + buttonArray.value + "</button>").attr("class", buttonArray.buttonClass).attr("type", buttonArray.type).attr("value", buttonArray.value));
    });
});


// function that triggers handle click function

$(document).ready(function () {
    $("button").click(handleClick);
});


// when clicked gets button value and inserts in input field and does calculation/logic

function handleClick(e) {
    var $b = $(e.currentTarget);


    // function that has different cases of how numbers can be changed
    function updateNumber(action, value) {

        switch (action) {

            case ACTION_INCREMENT:

                var n = numbers[actions.length];

                // lets only one dot in a number
                switch (value) {
                    case '.':
                        if (n.indexOf(".") === -1) {
                            n += value;
                        }
                        break;

                    // lets only one zero digit when it is the first number
                    case '0':
                        if ((n.length === 1) && (n === '0')) {

                        } else {
                            n += value;
                            $('input').val(n);
                        }
                        break;

                    default:
                        if ((n.length === 1) && (n === '0')) {
                            n = value;
                        } else {

                            n += value;
                            $('input').val(n);
                        }
                        break;
                }
                numbers[actions.length] = n;
                $('input').val(n);
                break;

// changes actions and numbers values to zero, clears calculations
            case ACTION_DELETE:
                numbers = ['0'];
                $('input').val('0');
                actions = [];

                break;

// removes one digit or action symbol from code
            case ACTION_DELETEONE:

                if (numbers[actions.length] === '0') {
                    if (numbers.length > 1) {
                        numbers.pop();
                        actions.pop();
                    }
                } else {
                    numbers[actions.length] = numbers[actions.length].substring(0, numbers[actions.length].length - 1);
                    if (numbers[actions.length].length === 0) {
                        numbers[actions.length] = '0'
                    }
                }

                break;

// changes last number's value to opposite
            case ACTION_PLUSMINUS:
                if (numbers[actions.length][0] === "-") {
                    numbers[actions.length] = numbers[actions.length].substring(1, numbers[actions.length].length);
                    $('input').val(numbers[actions.length]);

                } else {
                    if (numbers[actions.length].length !== '1' && numbers[actions.length] !== '0') {
                        numbers[actions.length] = '-' + numbers[actions.length];
                        $('input').val(numbers[actions.length]);
                    }
                }

                break;

// does basic calculations and returns final result, cleans actions array
            case ACTION_CALCULATE:

                var a, b;
                for (var i = 0; i < numbers.length; i++) {
                    if (a) {
                        b = parseFloat(numbers[i]);
                        switch (actions[i - 1]) {
                            case '+':
                                a += b;
                                break;

                            case '-':
                                a -= b;
                                break;

                            case 'x':
                                a *= b;
                                break;

                            case '÷':
                                a /= b;
                                break;
                        }
                    } else {
                        a = parseFloat(numbers[0]);
                    }
                }
                numbers = [a.toString()];
                actions = [];
                break;

// does basic calculations until last number, and counts percentage of the result according to the last number
            case ACTION_PERCENT:

                for (i = 0; i < numbers.length - 1; i++) {
                    if (a) {
                        b = parseFloat(numbers[i]);

                        switch (actions[i - 1]) {
                            case '+':
                                a += b;
                                break;

                            case '-':
                                a -= b;
                                break;

                            case 'x':
                                a *= b;
                                break;

                            case '÷':
                                a /= b;
                                break;
                        }
                    } else {
                        a = parseFloat(numbers[0]);
                    }
                }

                numbers[actions.length] = (numbers[actions.length] * (a / 100)).toString();

                // switches "not a number" string to zero, when b value does not exist
                if (numbers[actions.length] === 'NaN') {
                    numbers[actions.length] = '0';
                }
                break;
        }
    }


    // part of the function that checks button type (number or action)

    if ($b.attr('type') === 'number') {
        updateNumber(ACTION_INCREMENT, $b.val())
    }
    else if ($b.attr('type') === 'action') {


        // checks action button cases, calls action functions
        switch ($b.val()) {

            case "+":
            case "-":
            case "x":
            case "÷":

                var n = numbers[actions.length];

                // removes unnecessary dot when it's at the end of number
                if (n[n.length - 1] === '.') {
                    numbers[actions.length] = n.substring(0, n.length - 1);
                }


                if (numbers[numbers.length - 1] !== '0') {
                    actions.push($b.val());
                    numbers[actions.length] = '0';
                } else {
                    actions.pop();
                    actions.push($b.val());
                }

                numbers[actions.length] = '0';
                break;

            case "=":
                updateNumber(ACTION_CALCULATE);
                break;

            case "C":
                updateNumber(ACTION_DELETE);
                break;

            case "<<":
                updateNumber(ACTION_DELETEONE);
                break;

            case "+-":
                updateNumber(ACTION_PLUSMINUS, $b.val());
                break;

            case "%":
                updateNumber(ACTION_PERCENT, $b.val());
                break;

            default:
                break;
        }
    }

    updateInput();


    // shows clicked button values or calculation results

    function updateInput() {
        var resultString = '';

        if (numbers.length === 1) {
            resultString = numbers[0]
        } else {

            for (var i = 0; i < numbers.length; i++) {
                if (numbers[i] !== '0')
                    resultString += numbers[i];

                if (actions[i]) {
                    resultString += " " + actions[i] + " ";
                }
            }
        }

        $('input').val(resultString);
        console.log(numbers, actions);
    }
}






