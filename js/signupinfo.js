//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");
var $phnnum = $("#phnnum");
var $username = $("#signUpUsername");
//Hide hints
$("form span").hide();
//$("#submitinfo").next().hide();
$("#phnnum").next().hide();
document.getElementById("submitinfo").disabled = true;

function isPasswordValid() {
    return $password.val().length > 8;
}

function arePasswordsMatching() {
    return $password.val() === $confirmPassword.val();
}

function canSubmit() {
    return isPasswordValid() && arePasswordsMatching();
}

function passwordEvent() {
    //Find out if password is valid  
    if (isPasswordValid()) {
        //Hide hint if valid
        $password.next().hide();
    } else {
        //else show hint
        $password.next().show();
    }
}

function confirmPasswordEvent() {
    //Find out if password and confirmation match
    if (arePasswordsMatching()) {
        //Hide hint if match
        $confirmPassword.next().hide();
    } else {
        //else show hint 
        $confirmPassword.next().show();
    }
}

function enableSubmitEvent() {
    if(canSubmit()){
        document.getElementById("submitinfo").disabled = false;
    }
    else{
        document.getElementById("submitinfo").disabled = true;


}
}

function SubmitButton(){

$("#submitinfo").click(function(){
        sameNumberExists($phnnum.val(), $password.val(), $username.val());
});

}
//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input

  $confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent).keyup(SubmitButton);

//enableSubmitEvent();



function sameNumberExists(phn, pass, username) {
    if ($username.val().length == 0 ) {
        alert("Please mention the Username");
        return;
    }

    var getFromDb = "v1/index.php/submitinfocheck";

    var Obj;
    var data = new FormData();
    data.append('phn', phn);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);
            var objstr = JSON.stringify(this.responseText);
            if (objstr== "\"[]\"" || Obj[0].phone_num == null ) {
                console.log("Hello");
                submitInfo(phn, pass, username);
            } else {
                console.log("else");

                $("#phnnum").next().show();
            }

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);


}
/*
  $("form").submit(function(){
        sameNumberExists($phnnum.val(), $password.val(), $username.val());
    });

*/

function submitInfo(phn, pass, username) {
    var getFromDb = "v1/index.php/loadsignupinfo";

    var Obj;
    var data = new FormData();
    data.append('phn', phn);
    data.append('pass', pass);
    data.append('username', username);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);
            console.log("subitinfo");
        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);


}
