//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");
var $phnnum = $("#phnnum");
var $username = $("#signUpUsername");
var $loginpass=$("#loginpassword");
var $loginphn=$("#loginphnnumber");
//Hide hints
$("form span").hide();
//$("#loginbutton").next().hide();

//$("#submitinfo").next().hide();
$phnnum.next().hide();
$username.next().hide();



//////////////////////////////signup functions ////////////////////////////////////


document.getElementById("submitinfo").disabled = true;

function isPasswordValid() {
    return $password.val().length > 8  ;
}

function isPhnValid() {
      return $phnnum.val().length ==11 &&  ($phnnum.val().slice(0,3)=="017" || $phnnum.val().slice(0,3)=="018" || $phnnum.val().slice(0,3)=="015" || $phnnum.val().slice(0,3)=="016" || $phnnum.val().slice(0,3)=="019") ;
}


function arePasswordsMatching() {
    return $password.val() === $confirmPassword.val();
}

function canSubmit() {
    return isPasswordValid() && arePasswordsMatching() && isPhnValid();
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
function phnNumberEvent() {
    //Find out if password is valid  
    if (isPhnValid()) {
        //Hide hint if valid
        $phnnum.next().hide();
    } else {
        //else show hint
        $phnnum.next().show();
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

$phnnum.focus(phnNumberEvent).keyup(phnNumberEvent);
//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

//When event happens on confirmation input

  $confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent).keyup(SubmitButton);

//enableSubmitEvent();



function sameNumberExists(phn, pass, username) {
    if ($username.val().length == 0 ) {
      $username.next().show();
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
                //console.log("Hello");
                submitInfo(phn, pass, username);
            } else {
                //console.log("else");

                $phnnum.next().show();
            }

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);


}


  // $("form").submit(function(){
  //       sameNumberExists($phnnum.val(), $password.val(), $username.val());
  //   });


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
            console.log(this.responseText);
            $phnnum.next().hide();
            $username.next().hide();
            location.href = "https://www.onlinesohopathi.com/fblogin.html";
        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);


}


//------------------------------------------- login functions----------------------------------//



// $("#loginbutton").click(function{

// Logincheck();
// });



function Logincheck() {
    if ($loginpass.val().length == 0 || $loginphn.val().length==0 || $loginpass.val().length == null || $loginphn.val().length==null) {
     // $("#loginbutton").next().show();
       $("#spanlogin").show();
        return;
    }


    var getFromDb = "v1/index.php/logininfocheck";

    var Obj;
    var data = new FormData();
    data.append('phn', $loginphn.val());
    data.append('pass', $loginpass.val());
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);
            var objstr = JSON.stringify(this.responseText);
            if (objstr== "\"[]\"" || Obj[0].phone_num == null) {
                 $("#spanlogin").show();
                console.log("valo achi valo theke");
            } else {
                $("#spanlogin").hide();
              var  phnid=Obj[0].phone_num;
              var loginname=Obj[0].username;
              //  location.href = "https://www.onlinesohopathi.com/fblogin.html";
              console.log(phnid);
              console.log(loginname);
            }

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);


}
