function loadhome()
{
  window.location.href = "/";

}

function loadus() {
    window.location.href = "aboutus.html";
}

function loadblogsNEWhtml() {
    window.location.href = "blogload.html";
}

function loadNotificationNEWhtml() {
    window.location.href = "notification.html";
}


function loadMyquestionNEWhtml() {
    window.location.href = "myquestionsload.html";
}


function loadlibrary() {
    window.location.href = "library.html";
}
function loadvideo() {
    window.location.href = "video.html";
}

function notificationCount(mydiv){
    
    var getFromDb = "v1/index.php/checknotifs";
    var Obj;
   
    xmlhttp = new XMLHttpRequest();
    var data = new FormData();
    data.append('userid', mydiv);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            Obj = JSON.parse(this.responseText);
              var Nots = document.getElementById("Nott");
     Nots.textContent="Not";
    Nots.textContent = "Notifications" + "(" + Obj.length + ")";

            console.log(Obj.length);



        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);

    
}