function loadallprofiles(ids) {
    var responsefromfbname, resy;
    var strl = "/".concat(ids);

    FB.api(
        strl,
        'GET', {
            "fields": "id,name,picture"
        },
        function (response) {

            uploadQuestion(response);

        }
    );

}

function loadprofilepicture(ids) {
    var responsefromfbname, resy;
    var strl = "/".concat(ids);
	console.log(ids);

    FB.api(
        strl,
        'GET', {
            "fields": "picture.width(250).height(250)"
        },
        function (response) {
            console.log(response); 
            get_me_answered(ids,response);

        }
    );

}

function parsingAllNotis(mydiv) {

    var getFromDb = "v1/index.php/checknotifs";
    var Obj;
   
    xmlhttp = new XMLHttpRequest();
    var data = new FormData();
    data.append('userid', mydiv);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            Obj = JSON.parse(this.responseText);
           // alert(this.responseText);

            loadAllNotis(mydiv, this.responseText, "Notifydiv");

            console.log("Printings response...");



        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);

}

function updatenotifystate(uidess, strn) {
    //alert("Hello bro...")    ; 
    var getFromDb = "v1/index.php/modifynotifs";
    var Obj;
    xmlhttp = new XMLHttpRequest();
    var data = new FormData();
    data.append('userid', uidess);
    data.append('quesid', strn);
    //alert(uidess);
    // alert(strn);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            //Obj = JSON.parse(this.responseText);
            var btr = "https://www.onlinesohopathi.com/onequestion.html?question=".concat(strn);
            window.location.replace(btr);

            console.log("Printings response...");



        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);

}




function uploadQuestion(profinf) {

    var title = document.getElementById("input_text").value;



    var its;
    console.log(title);
    var question = document.getElementById("textarea1").value;
    if (question.length === 0) {
        alert("Please mention the subject: e.g.- Physics, Math");
        return;
    }
    var category = document.getElementById("category-sel").value;

    if (category == "None") {
        alert("Please select a category");
        return;
    }
    console.log(category);
    var anonymous = document.getElementById("filled-in-box").checked;
    var anonymous, imagelink, bol = "'";



    var tags = "none";


    if (anonymous)
        anonymous = 1;
    else
        anonymous = 0;



    var uploadtoDb = "v1/index.php/uploadquestion";
    var temp1 = profinf.picture;
    var temp2 = temp1.data;
    var fbpic = temp2.url;

    var j = 11,
        k = 0,
        f = 0;
    var user = profinf.id;
    var usern = profinf.name;
    //alert(fbpic);
    var data = new FormData();

    if (localStorage.getItem("count") === null) {
        k = 0;

    } else {


        for (j = 1; j <= Number(localStorage.getItem("count")); j++) {
            var ster = localStorage.getItem(j);


            ster = ster.replace("data:image/jpeg;base64,", "");
            ster = ster.replace("data:image/png;base64,", "");
            ster = ster.replace("data:image/jpg;base64,", "");
            ster = ster.replace("data:image/gif;base64,", "");
            k = k + 1;


            imagelink = user.concat(k);

            localStorage.removeItem(j);

            data.append(imagelink, ster);

        }

    }
    localStorage.removeItem("count");
    data.append('userid', user);

    data.append('title', title);
    data.append('username', usern);
    data.append('question', question);
    data.append('category', tags);
    data.append('anonymous', anonymous);
    data.append('imagecount', k);
    data.append('tag', category);
    data.append('fbpics', fbpic);

    if (user == "157927098325740") //Hossain Sokal ke block kora hoise temporarily
    {
        localStorage.setItem("submit", "0");


    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                localStorage.setItem("submit", "0");
                alert("Question Uploaded");
                myLoader();


            } else if (this.readyState == 4) {
                localStorage.setItem("submit", "0");
                alert("Please try again");
            }
        };
        xmlhttp.open("POST", uploadtoDb, true);


        xmlhttp.send(data);
    }

}

function myLoader() {

    location.href = "https://www.onlinesohopathi.com";
}


function parsingAllQuestions(filter, cbd) {

    var getFromDb = "v1/index.php/viewallquestions";

    var PageToSendTo = "v1/index.php/viewallquestions?";
    var MyVariable = filter;
    var VariablePlaceholder = "filter=";
    var UrlToSend = PageToSendTo + VariablePlaceholder + MyVariable;

    var Obj;
    var data = new FormData();
    data.append('filter', filter);
    data.append('lastq', localStorage.getItem(cbd));
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);


            loadallquestions(this.responseText, cbd);

            console.log("Printing response...");

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);

}

function get_me_answered(meid,profilepic) {

    var getFromDb = "v1/index.php/viewanswerscount";
    var Obj;
    var data = new FormData();
    data.append('meid', meid);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);

            me_answered = Obj[0].ansCount;
            like_for_profile=Obj[0].likeno;
            dislike_for_profile=Obj[0].dislikeno;
            rank_for_profile=Obj[0].rank;
            points_for_profile=Obj[0].points;
            //fbpic_for_profile=Obj[0].fbpic;
			var temp1 = profilepic.picture;
			var temp2 = temp1.data;
			var fbpic = temp2.url;
            fbpic_for_profile=fbpic;
			queCount=Obj[0].queCount;

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);
}


function parsingAllAnswers(mydiv) {
    //alert("Hello bro...")    ; 
    var getFromDb = "v1/index.php/viewallanswers";
    var Obj;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            Obj = JSON.parse(this.responseText);
            loadAllanswers(this, mydiv, Obj);

            console.log("Printing response...");
            //alert(this.responseText);


        }
    };
    xmlhttp.open("GET", getFromDb, true);
    xmlhttp.send();

}

function parsingAllBlogs(filter, cbd) {
    var myNode = document.getElementById(cbd);

    var getFromDb = "v1/index.php/viewallblogs?filter=".concat(filter);

    getFromDb = getFromDb.concat("&lastq=");
    var fils = "+-".concat(localStorage.getItem("bloglast"));
    getFromDb = getFromDb.concat(fils);


    var PageToSendTo = "v1/index.php/viewallblogs";
    //var MyVariable = filter;
    var VariablePlaceholder = "filter=";
    //var UrlToSend = PageToSendTo + VariablePlaceholder + MyVariable;
    //alert(cbd);
    var Obj;


    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status != 404) {
            //Obj = this.responseText;
            //alert(this.responseText);
            Obj = JSON.parse(this.responseText);


            LoadBlog(this.responseText, cbd);

            console.log("Printing response...");

        }
    };
    xmlhttp.open("GET", getFromDb, true);
    xmlhttp.send();




}

function parsingAllSuggestionBlogs(filter, cbd) {
    var myNode = document.getElementById(cbd);
    //alert(cbd);
    //while(myNode.firstChild)
    //myNode.removeChild(myNode.firstChild);
    var getFromDb = "v1/index.php/viewallsuggestionblogs?filter=".concat(filter);

    getFromDb = getFromDb.concat("&lastq=");
    var fils = "+-".concat(localStorage.getItem("bloglast"));
    getFromDb = getFromDb.concat(fils);


    var PageToSendTo = "v1/index.php/viewallsuggestionblogs";
    //var MyVariable = filter;
    var VariablePlaceholder = "filter=";
    //var UrlToSend = PageToSendTo + VariablePlaceholder + MyVariable;
    //alert(cbd);
    var Obj;


    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status != 404) {
            //Obj = this.responseText;
            //alert(this.responseText);
            Obj = JSON.parse(this.responseText);
            console.log(this.responseText);

            LoadBlog(this.responseText, cbd);



        }
    };
    xmlhttp.open("GET", getFromDb, true);
    xmlhttp.send();




}



function parsingAllAnswers(mydiv) {
    //alert("Hello bro...")    ; 
    var getFromDb = "v1/index.php/viewallanswers";
    var Obj;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            Obj = JSON.parse(this.responseText);
            loadAllanswers(this, mydiv, Obj);

            console.log("Printing response...");
            //alert(this.responseText);


        }
    };
    xmlhttp.open("GET", getFromDb, true);
    xmlhttp.send();

}

function searchanswer(search, cbd) {

    var getFromDb = "v1/index.php/viewsearchanswer";
    var myNode = document.getElementById(cbd);
    while (myNode.firstChild) {

        myNode.removeChild(myNode.firstChild);
    }


    //alert(search);
    var Obj;
    var data = new FormData();
    data.append('search', search);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);
            // alert(this.responseText);
            console.log("Hello search........");
            loadallquestions(this.responseText, cbd);

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);


}

function uploadBlog() {
    var title = document.getElementById("title").value;
    var its;
    console.log(title);
    var username = document.getElementById("username").value;
    var userid = document.getElementById("userid").value;
    //console.log(question);
    var content = document.getElementById("content").value;
    var type = document.getElementById("type").value;
    var imagecount = document.getElementById("imagecount").value;



    var uploadtoDb = "v1/index.php/uploadblog";
    var data = new FormData();
    
    data.append('userid', userid);

    data.append('title', title);
    data.append('username', username);
    data.append('content', content);
    data.append('type', type);

    data.append('imagecount', imagecount);



    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {

            // alert("success");



        }
    };
    xmlhttp.open("POST", uploadtoDb, true);


    xmlhttp.send(data);

}



//faiza-start

function deleteanswer(delanswer) {

    var getFromDb = "v1/index.php/deleteanswerfromdatabase";



    var Obj;
    var data = new FormData();
    data.append('delanswer', delanswer);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);

            console.log("Printing response...");

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);




}

function deletequestion(delquestion) {

    var getFromDb = "v1/index.php/delquestionfromdatabase";



    var Obj;
    var data = new FormData();
    data.append('delquestion', delquestion);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            //Obj = this.responseText;
            Obj = JSON.parse(this.responseText);
            window.location.reload();
            console.log("Printing response...");

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);




}

function loadBlogsNEWfile() {
    var getFromDb = "v1/index.php/loadbloginNEWfile";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status != 404) {

            loadBlogsinNEWfile(this.responseText);
            
        }
    };
    xmlhttp.open("GET", getFromDb, true);
    xmlhttp.send();




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

