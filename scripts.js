var numberA = '0',
    numberB = '';

// script creates html div tag, inserts input field and table of buttons

$(document).ready(function () {
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

    // part of the function that checks button type

    if ($b.attr('type') === 'number') {

        // checks 0, . and default cases
        switch ($b.val()) {
            case '.':
                if (numberA.indexOf(".") === -1) {
                    numberA += $b.val();
                }
                break;

            case '0':
                if ((numberA.length === 1) && (numberA === '0')) {

                } else {
                    numberA += $b.val();
                    $('input').val(numberA);
                }
                break;

            default:
                if ((numberA.length === 1) && (numberA === '0')) {
                    numberA = $b.val();
                } else {

                    numberA += $b.val();
                    $('input').val(numberA);
                    console.log(action)
                }
                break;
        }
        console.log(numberA);
        $('input').val(numberA);
    }
    else if ($b.attr('type') === 'action') {

        // checks action cases
        switch ($b.val()) {

            case "+":
            case "-":
            case "x":
            case "%":
            case "÷":
                var action = $b.val();
                $('.allowDisable').attr('disabled', true);

                numberA += ' ' + action + ' ';
                $('input').val(numberA);
                console.log(action);
                break;

            case "C":
                numberA = '0';
                $('input').val(numberA);
                $('.allowDisable').attr('disabled', false);
                break;

            case "<<":
                numberA = numberA.substring(0, numberA.length - 1);
                if (numberA.length === 0) {
                    numberA = '0';
                    $('input').val(numberA);
                }
                $('input').val(numberA);
                break;

            case "+-":
                if (numberA[0] === "-") {
                    numberA = numberA.substring(1, numberA.length);
                    $('input').val(numberA);

                } else {
                    if (numberA.length !== '1' && numberA !== '0') {
                        numberA = '-' + numberA;
                        $('input').val(numberA);
                    }
                }
                break;

            default:

                break;

        }

    }
}


// function that triggers handle click function

$(document).ready(function () {
    $("button").click(handleClick);
});



