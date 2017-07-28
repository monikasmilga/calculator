var numberA = '0',
    numbers = ['0', ''],
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

        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] !== '0')
                resultString += numbers[i];

            if (actions[i]) {
                resultString += " " + actions[i] + " ";
            }
        }
        $('input').val(resultString)
        console.log(resultString);
    }


    function updateNumber(action, value) {

        switch (action) {
            case ACTION_INCREMENT:

                var n = numbers[actions.length];

// checks 0, . and default cases
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


                break;

            case ACTION_DELETEONE:


                break;

            case ACTION_PLUSMINUS:


                break;

            case ACTION_CALCULATE:
                var a, b;
                for (var i = 0; i < numbers.length; i++) {
                    if (a) {
                        b = numbers[i];
                        switch (actions[i - 1]) {
                            case '+':
                                a += b;
                                break;

                            case '-':
                                a -= b;
                                break;

                            case '%':
                                a %= b;
                                break;

                            case 'x':
                                a *= b;
                                break;

                            case '÷':
                                a /= b;
                                break;
                        }
                    } else {
                        a = numbers[0];
                    }

                }

                break;
        }
    }


    // part of the function that checks button type

    if ($b.attr('type') === 'number') {
        updateNumber(ACTION_INCREMENT, $b.val())

    }
    else if ($b.attr('type') === 'action') {

        // checks action cases
        switch ($b.val()) {

            case "+":
            case "-":
            case "x":
            case "%":
            case "÷":

                if (numbers[numbers.length - 1] !== '0') {
                    actions.push($b.val());
                    numbers[actions.lenght] = '0';
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

            case "C":
                updateNumber(ACTION_DELETE);

                // numberA = '0';
                // $('input').val(numberA);
                // $('.allowDisable').attr('disabled', false);
                break;

            case "<<":
                updateNumber(ACTION_DELETEONE);
                // numberA = numberA.substring(0, numberA.length - 1);
                // if (numberA.length === 0) {
                //     numberA = '0';
                //     $('input').val(numberA);
                // }
                // $('input').val(numberA);
                break;

            case "+-":
                updateNumber(ACTION_PLUSMINUS, b.val());

                // if (numberA[0] === "-") {
                //     numberA = numberA.substring(1, numberA.length);
                //     $('input').val(numberA);
                //
                // } else {
                //     if (numberA.length !== '1' && numberA !== '0') {
                //         numberA = '-' + numberA;
                //         $('input').val(numberA);
                //     }
                // }
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



