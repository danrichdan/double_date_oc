/**
 * Created by baultik on 12/6/16.
 */
var passwordInput = null;
var confirmInput = null;
var submitButton = null;
var feedback = null;

$(document).ready(function () {
    passwordInput = $("#pwd");
    confirmInput = $("#confirm");
    submitButton = $("#submit");

    submitButton.on("click",function () {
        if (feedback) {
            feedback.detach();
        }
        feedback = $("<div>",{
            class:"alert alert-dismissible fade in"
        });

        var link = $("<a>",{
            class:"close",
            href:"#",
            "data-dismiss":"alert",
            "aria-label":"close"
        });
        link.html("&times;");

        var result = validatePassword();
        if (result) {
            feedback.html(result);
            feedback.addClass("alert-danger");
            feedback.append(link);
            $("body").append(feedback);
        } else {
            //submit password
            feedback.html("success!");
            feedback.addClass("alert-success");
            feedback.append(link);
            $("body").append(feedback);
        }
    });
});

function validatePassword() {
    var pass = passwordInput.val();
    var conf = confirmInput.val();
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;//8 characters, uppercase, lowercase, number
    //var test =  pattern.test("Aa123456");

    if (pass !== conf) {
        return "password and confirm password do not match";
    }

    if (pass.match(pattern) === null) {
        return "password must be 8 characters long and contain a number, uppercase letter and lower case letter";
    }

    return false;
}
