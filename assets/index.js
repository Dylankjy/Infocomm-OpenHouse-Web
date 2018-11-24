/* Copyright (c) Dylan Kok (Koku Shunage) 2018. Distribution and unauthorised storage of this file is prohibited */
console.log('Okay, Loaded. By Dylan Kok (Koku Shunage)')

// Detect when to timeout session
let timeout;
document.onmousemove = function () {
    if ($("#welcome").is(":hidden") === true) {
        clearTimeout(timeout);
        timeout = setTimeout(function () { afk(); }, 45000);
    }
}

function sessionReset() {
    window.location.reload(false)
}

// Warn AFK
let afkModalTimer
function afk() {
    console.log("[DEBUG] afk()")
    $("#afk-warn").addClass("is-active");
    afkModalTimer = setTimeout(function () { sessionReset() }, 10000);
}

function afkActive() {
    clearTimeout(afkModalTimer)
    $("#afk-warn").removeClass("is-active");
}

// Code hints for Try it
let hint_tryit1 = `# Use print to print your name
# Here's an example, print('Shigami')

`
let hint_tryit2 = `# Start with variables. You may use any number.
x = 
y = 

# Add x and y and assign it to a variable called, result
result =

# Print result. This has already been done for you.
print(result)`

let hint_tryit3 = `# Start with variables. 
# You may input any marks to test your code.
marks = 

# Check if marks are higher than 75. Example: if a >= 50:
if marks >= 75:
    print("This student has gotten an 'A' grade.")
else:
    print("This mark is not an 'A'")
`

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
            /*$(".page-footer").removeClass( "pos-relative" ).addClass( "pos-absolute" );*/
            $('#lesson1').hide()
            $('#tryit1').hide()
            $('#code-section').hide()
            $('#lesson2').show()
            break;
        }
        case 'TRYIT-1': {
            /*$(".page-footer").removeClass( "pos-absolute" ).addClass( "pos-relative" );*/
            $('#lesson2').hide()
            $('#tryit2').hide()
            $('#code-section').show()
            $('#tryit1').show()
            /* Setup hints in code sec */
            $('#yourcode').val(hint_tryit1);
            break;
        }
        case 'TRYIT-2': {
            /*$(".page-footer").removeClass( "pos-absolute" ).addClass( "pos-relative" );*/
            $('#tryit1').hide()
            $('#lesson3').hide()
            $('#code-section').show()
            $('#tryit2').show()
            /* Setup hints in code sec */
            $('#yourcode').val(hint_tryit2);
            break;
        }
        case 'LESSON-3': {
            /*$(".page-footer").removeClass( "pos-relative" ).addClass( "pos-absolute" );*/
            $('#tryit2').hide()
            $('#tryit3').hide()
            $('#code-section').hide()
            $('#lesson3').show()
            break;
        }
        case 'TRYIT-3': {
            /*$(".page-footer").removeClass( "pos-relative" ).addClass( "pos-absolute" );*/
            $('#lesson3').hide()
            $('#code-section').show()
            $('#yourcode').val(hint_tryit3);
            $('#tryit3').show()
            break;
        }
        case 'END': {
            /*$(".page-footer").removeClass( "pos-relative" ).addClass( "pos-absolute" );*/
            $('#tryit3').hide()
            $('#code-section').hide()
            $('#resetSession').hide()
            $('#end').show()
            setTimeout(function () { window.location.reload(false) }, 12000)
            break;
        }
        default: {
            console.log("Hmmmm... Something went wrong. I'll refresh the page to fix it.")
            alert("Hmmmm... Something went wrong. I'll refresh the page to fix it.")
            window.location.reload(true)
        }
    }
}

// Clear console output
function clearConsole() {
    var ta = document.getElementById('output'); {
        ta.value = '';
    }
}

// Allow tabs in Text Areas
function insertTab(o, e) {
    var kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
    if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        var oS = o.scrollTop;
        if (o.setSelectionRange) {
            var sS = o.selectionStart;
            var sE = o.selectionEnd;
            o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
            o.setSelectionRange(sS + 1, sS + 1);
            o.focus();
        }
        else if (o.createTextRange) {
            document.selection.createRange().text = "\t";
            e.returnValue = false;
        }
        o.scrollTop = oS;
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    }
    return true;
}

// Skrupt
// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
    var mypre = document.getElementById("output");
    mypre.innerHTML = mypre.innerHTML + text;
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit() {
    var prog = document.getElementById("yourcode").value;
    var mypre = document.getElementById("output");
    mypre.innerHTML = '';
    Sk.pre = "output";
    Sk.configure({ output: outf, read: builtinRead });
    var myPromise = Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    myPromise.then(function (mod) {
        console.log('success');
    },
        function (err) {
            console.log(err.toString());
            alert("ERROR OUTPUT:     " + err);
        });
}
