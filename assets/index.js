/* Copyright (c) Dylan Kok (Koku Shunage) 2018. Distribution and unauthorised storage of this file is prohibited */
console.log('Okay, Loaded. By Dylan Kok (Koku Shunage)')

/* Detect when to timeout session */
let timeout;
document.onmousemove = function () {
    if ($("#welcome").is(":hidden") === true) {
        clearTimeout(timeout);
        timeout = setTimeout(function () { window.location.reload(false) }, 60000);
    }
}

function sessionReset() {
    window.location.reload(false)
}

/* Code hints for Try it */
let hint_tryit1 = `# Start with typing your name. Maybe start a variable called 'name'
# Hint: name = ____
name = ""

# Now, you can try printing. Hint: Use two 'print' One for 'Hello ...' & other for your name
print('')
print()

# Try to display 'Hello my name is (your name)'
# For example, 'Hello my name is Coconut'`

function page(switchInput) {
    switch (switchInput) {
        case 'LESSON-1': {
            /* Hide */
            $('#welcome').hide()
            $('#lesson2').hide()
            $('#code-section').hide()
            /* Display */
            $('#lesson1').show()
            $('#resetSession').show()
            break;
        }
        case 'LESSON-2': {
            $(".page-footer").removeClass( "pos-relative" ).addClass( "pos-absolute" );
            $('#lesson1').hide()
            $('#tryit1').hide()
            $('#code-section').hide()
            $('#lesson2').show()
            break;
        }
        case 'TRYIT-1': {
            $(".page-footer").removeClass( "pos-absolute" ).addClass( "pos-relative" );
            $('#lesson2').hide()
            $('#lesson3').hide()
            $('#code-section').show()
            $('#tryit1').show()
            /* Setup hints in code sec */
            $('#yourcode').val(hint_tryit1);
            break;
        }
        case 'LESSON-3': {
            $(".page-footer").removeClass( "pos-relative" ).addClass( "pos-absolute" );
            $('#tryit1').hide()
            $('#code-section').hide()
            $('#lesson3').show()
            break;
        }
        default: {
            console.log("Hmmmm... Something went wrong. I'll refresh the page to fix it.")
        }
    }
}