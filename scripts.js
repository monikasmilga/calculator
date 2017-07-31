var numberA = '0',
    numbers = ['0'],
    actions = [];

var $b;
var action;

var ACTION_INCREMENT = 'increment',
    ACTION_REPLACE = 'replace',
    ACTION_DELETE = 'delete',
    ACTION_DELETEONE = 'backspace',
    ACTION_PLUSMINUS = 'plus minus',
    ACTION_CALCULATE = 'calculate'

;


// script creates html div tag, inserts input field and table of buttons

$
(document).ready(function () {
    $('body').prepend("<div id='buttonField'></div>");
    $('#buttonField').append("<input value='0' disabled>");

    $.each(buttonArray, function (index, buttonArray) {
        $("#buttonField").append($("<button>" + buttonArray.value + "</button>").attr("class", buttonArray.buttonClass).attr("type", buttonArray.type).attr("value", buttonArray.value));
    });
});


// when clicked gets button value and inserts in input field

function handleClick(e) {
    var $b = $(e.currentTarget);
    // console.log($b.attr('class'), $b.attr('type'));

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


    function updateNumber(action, value) {

        switch (action) {
            case ACTION_INCREMENT:

                var n = numbers[actions.length];

                switch (value) {
                    case '.':
                        if (n.indexOf(".") === -1) {
                            n += value;
                        }
                        break;

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

            case ACTION_REPLACE:


                break;

            case ACTION_DELETE:
                numbers = ['0'];
                $('input').val('0');
                actions = [];

                break;

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

                            case '%':
                                a = (a/100)*b;
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

                $('input').val(a);
                numbers = [a];
                actions = [];

                break;
        }
    }


    // part of the function that checks button type

    if ($b.attr('type') === 'number') {
        updateNumber(ACTION_INCREMENT, $b.val());

    }
    else if ($b.attr('type') === 'action') {

        // checks action cases
        switch ($b.val()) {

            case "+":
            case "-":
            case "x":
            case "%":
            case "÷":

                var n = numbers[actions.length];

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

                // var action = $b.val();
                // $('.allowDisable').attr('disabled', true);
                //
                // numberA += ' ' + action + ' ';
                // $('input').val(numberA);
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

            default:

                break;
        }
    }

    updateInput();
}


// function that triggers handle click function

$(document).ready(function () {
    $("button").click(handleClick);
});



