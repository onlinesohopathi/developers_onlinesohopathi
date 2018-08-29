var unidiv = "CollapseBody";
var ourdiv = "None";
var flag = "0";
var vlu = 0;
var uidtrue = "";
var me_answered,queCount,rank_for_profile,like_for_profile, dislike_for_profile,points_for_profile;
var fbpic_for_profile;

function checkLog() {

    if (uid != "hiru" && localStorage.getItem("submit") == "0") {
        localStorage.setItem("submit", "1");
        loadallprofiles(uid);
    }
}

function checkuser() {

    if (uid != "hiru") {
        location.href = "https://www.onlinesohopathi.com/myquestion.html";
    } else
        location.href = "https://www.onlinesohopathi.com/fblogin.html";
}

function checkFacebook() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            location.href = "https://www.onlinesohopathi.com/myquestion.html";

        } else {

        }
    });

}

function proCheckForNot(){

parsingAllNotis(uid);
}

function profileCheckForNotification(){
    if (uid == "hiru"){
            $('#myModalss').modal('show');
      //alert(uid);
         
    }
    else{
        
        parsingAllNotis(uid);
    }

            
        
}

function myquestionsList(){
    if (uid == "hiru"){
            $('#myModalss').modal('show');
     // alert("if"+uid);
    //    location.reload();
         
    }
    else{
      //  alert("else"+uid);
         //   get_me_answered(uid);
          //  parsingAllQuestions(uid, "CollapseBody4");
    }

            
        
}



$("#myModals").on('show.bs.modal', function () {


    if (uid != "hiru") {

        $('#myModals').modal('hide');

        loadallprofiles(uid);
    }


});

function checkFacebookLogin(alldiv) {
    $("#myModalss").modal("hide");
    $("#myModals").modal("hide");
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            fetchUserDetail(alldiv);

        } else {

        }
    });

}

function fetchUserDetail(alldivss) {
    FB.api('/me', function (response) {
        uid = response.id;

        if (alldivss.id == "myModals")
            logger(response.id);

        else if (alldivss.id == "myModalm") {
            uid = response.id;
            $("#myModalm").modal("hide");
          

        } else {
            
            loadallprofiless(quesd, unidiv, response.id);
                 //get_me_answered(uid);
		    
            loadprofilepicture(response.id);
			parsingAllQuestions(response.id, "CollapseBody4");
            parsingAllNotis(uid);
           // location.reload();

        }



    });


}




function logger(pqs) {
    uid = pqs;
    if (uid != "hiru") {

        $("#myModals").modal("hide");
    }

    loadallprofiles(uid);




}

function loggers(pqs) {
    uid = pqs;

    uploadanswers(quesd);


    if (uid != "hiru") {
        $("#myModalss").modal("hide");

    }

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

function getBrowserSize() {
    var w, h;

    if (typeof window.innerWidth != 'undefined') {
        w = window.innerWidth; //other browsers
        h = window.innerHeight;
    } else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth !== 0) {
        w = document.documentElement.clientWidth; //IE
        h = document.documentElement.clientHeight;
    } else {
        w = document.body.clientWidth; //IE
        h = document.body.clientHeight;
    }
    return {
        'width': w,
        'height': h
    };
}


$(window).on("scroll", function () {
    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    // alert(scrollHeight);
    if (scrollPosition >= scrollHeight - 100 && vlu === 0) {
        //alert("misu");
        vlu = 1;
        if (unidiv == "CollapseBody")
            parsingAllQuestions("1", unidiv);
        else if (unidiv == "CollapseBody1")
            parsingAllQuestions("hscs", unidiv);
        else if (unidiv == "CollapseBody2")
            parsingAllQuestions("sscs", unidiv);
        else if (unidiv == "CollapseBody4") {
            //loadprofilepicture(uid);
            get_me_answered(uid);
			parsingAllQuestions(uid, unidiv);
        }
        localStorage.setItem(unidiv.concat("scroll"), 1);

        // when scroll to bottom of the page
    } else if (scrollPosition < scrollHeight - 100) {
        vlu = 0;
    }
});



function redirects() {
    var str = "https://www.onlinesohopathi.com/index.html";
    //str=str.concat(quesidss);
    window.location.replace(str);

}

function redirectnow() {
    var str = "https://www.onlinesohopathi.com/index.html";
    //str=str.concat(quesidss);
    window.location.replace(str);

}

function redirects() {
    var str = "https://www.onlinesohopathi.com/notification.html";
 

}

$("#image-picker").change(function (event) {
    console.log("Clicked");
    readURLs(this, "img-grid");
});

function readURLs(input, imgdiv) {
    var imgdiv = document.getElementById(imgdiv);


    var curFiles = input.files;
    var b64string = "hello!@1";
    var q = 0,
        start;
	var p=0;

    console.log(curFiles);

    if (curFiles != 0) {
        var list = document.createElement("ul");
        list.style.cssText = 'margin: 0 auto; text-align: center;'

        imgdiv.appendChild(list);
        var l = 2;
        for (var i = 0; i < curFiles.length; i++) {
            var listItem = document.createElement("li");
            var bstring;
            listItem.style.cssText = 'display: inline-block; vertical-align: top;';

            var para = document.createElement("p");
            l = 2;
            para.id = "paras";
            para.textContent = "File name " + curFiles[i].name + ".";
            var image = document.createElement("img");

            image.src = window.URL.createObjectURL(curFiles[i]);
            if (localStorage.getItem("count") === null) {
                q = 1;
            } else {
                q = Number(localStorage.getItem("count")) + 1;
            }

            //var FR= new FileReader();
            var reader = new FileReader();
            reader.readAsArrayBuffer(input.files[i]);

            reader.onload = function (event) {
                // blob stuff
                var blob = new Blob([event.target.result]); // create blob...
                window.URL = window.URL || window.webkitURL;
                var blobURL = window.URL.createObjectURL(blob); // and get it's URL

                // helper Image object
                var image = new Image();
                image.src = blobURL;

                image.onload = function () {
                    // have to wait till it's loaded
                    var resized = resizeMe(image, imgdiv); // send it to canvas
                    localStorage.setItem(q, resized);

                }
            };



            image.id = "shadman".concat(i);

            localStorage.setItem("count", q);
            var urls = window.location.href;
            var res = urls.split("=");


            image.style.cssText = 'height:300px; width:200px';
            listItem.appendChild(image);
            listItem.appendChild(para);

            //var lst=getBase64Image(document.getElementById(image.id),listItm);
            list.appendChild(listItem);
        }

    }
}

function resizeMe(img, imgdiv) {

    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height;
    var max_height = 1500;
    var max_width = 1500;

    //calculate the width and height, constraining the proportions
    if (width > height) {
        if (width > max_width) {
            //height *= max_width / width;
            height = Math.round(height *= max_width / width);
            width = max_width;
        }
    } else {
        if (height > max_height) {
            //width *= max_height / height;
            width = Math.round(width *= max_height / height);
            height = max_height;
        }
    }

    //resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);


    return canvas.toDataURL("image/jpeg", 0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

}



$('#searches').click(function (e) {


    ourdiv = "yes";
    if (unidiv != "CollapseBody3")
        searchanswer(document.getElementById("comment").value, unidiv);
    else
        parsingAllBlogs(document.getElementById("comment").value, "CollapseBody3");



});

function loadhome(uidme) {
    queslid = "none";
    

    if (parseInt(getBrowserSize().width) < 500) {

        
        document.getElementById("blogsCollapseBody").style.visibility = "hidden";
        document.getElementById("blogsCollapseBody").style.position = "absolute";
        document.getElementById("blogsCollapseBody").style.left = "-9999px";
        
    }
    uidtrue = uidme;

    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);

    localStorage.removeItem("count");
    localStorage.setItem("delete", "0");
    localStorage.setItem("CollapseBody".concat("scroll"), 0);

    parsingAllQuestions("0", "CollapseBody");
    leaderboard_backend("home");
 


}



$(".Homes").ready(function () {
    queslid = "none";
    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);

    localStorage.removeItem("count");
    localStorage.setItem("CollapseBody".concat("scroll"), 0);
    localStorage.setItem("CollapseBody1".concat("scroll"), 0);
    localStorage.setItem("CollapseBody2".concat("scroll"), 0);





});

function loadhsc(uidme) {
    queslid = "none";
    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);

    localStorage.removeItem("count");
    localStorage.setItem("CollapseBody1".concat("scroll"), 0);
    uidtrue = uidme;

    parsingAllQuestions("hsc", "CollapseBody1");



}

function loadssc(uidme) {
    queslid = "none";
    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);
    uidtrue = uidme;
    localStorage.removeItem("count");
    localStorage.setItem("CollapseBody2".concat("scroll"), 0);

    parsingAllQuestions("ssc", "CollapseBody2");



}

/*
$(".BLOGS").ready(function () {
    queslid = "none";



    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);

    localStorage.removeItem("count");


    parsingAllBlogs("0", "CollapseBody3");




});

*/

$(".Notification").ready(function () {

    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);

    localStorage.removeItem("count");



});

function loadmyquestions(uidme) {
    queslid = "none";
    for (var i = 1; i <= 30; i++)
        localStorage.removeItem(i);
    uidtrue = uidme;
    localStorage.removeItem("count");
    localStorage.setItem("CollapseBody4".concat("scroll"), 0);


}

function loadsuggestionblogs(uidme) {
    parsingAllSuggestionBlogs("0", "suggestionCollapseBody");

}


var blogs = document.getElementById('blogs'); // Inside html div class="conta"

function loadAllNotis(uides, myobb, divgg) {
    var myObjn = JSON.parse(myobb);

    var CollapseBodys = document.getElementById(divgg);


    var i, j, k, l, m;
   
    console.log(myObjn.length);
       console.log(uid);
  //  var Nots = document.getElementById("Nott");
//     Nots.textContent="Not";
  //  Nots.textContent = "Notifications" + "(" + myObjn.length + ")";
    for (i = 0; i < myObjn.length; i++) {


        var listItems = document.createElement("li");
        listItems.id = "notif".concat(myObjn[i].id);
        var noticeid = "notif".concat(myObjn[i].id);

        CollapseBodys.appendChild(listItems);

        var QuestionTitles = document.createElement("div");
        QuestionTitles.classList.add('questioncard');
        QuestionTitles.classList.add('collapsible-header');
        //QuestionTitle.textContent = "Do native English speakers ever notice that someone isn't a native speaker despite speaking fluently? If yes, how?";
        listItems.appendChild(QuestionTitles);

        var Profilepics = document.createElement("img");


        Profilepics.src = "img/notification.svg";
        Profilepics.style.cssText = 'border-radius: 50%;width: 40px; height: 40px; margin-right:10px;';
        QuestionTitles.appendChild(Profilepics);

        var creadivs = document.createElement("div");


        creadivs.textContent = "Question Id->" + myObjn[i].id + ": You have a new reply to a question you are following ";
        QuestionTitles.appendChild(creadivs);

        viewnotifiedquestion(uides, noticeid);

    }
}

function LoadBlog(myObjss, divg) {

    var blogs = document.createElement("div");
    blogs.id = "containBLOGS";

    var allr = 'blogs'.concat(divg);
    var myNode = document.getElementById(allr);

    var head = document.createElement("h4");
    head.classList.add = "text-lighten-4";
    var header = document.createElement("strong");
    if (divg != "suggestionCollapseBody")
        header.textContent = "Blog Posts";
    else
        header.textContent = "এইচএসসি বিষয়ভিত্তিক সাজেশন";
    head.appendChild(header);


  
    myNode.appendChild(head);
    var myObjr = JSON.parse(myObjss);


    myNode.appendChild(blogs);



    for (var it = 0; it < myObjr.length; it++) {
        // var alls = 'blogs'.concat(divg);
        if (it == myObjr.length - 1)
            localStorage.setItem("bloglast", myObjr[it].id);


        var blogContainer = document.createElement("div");
        blogContainer.style.cssText = 'cursor: pointer;';
        vals = divg.concat("blog");
        var rest = vals.concat(myObjr[it].id);
        blogContainer.id = vals.concat(myObjr[it].id); // Need to be assigned
        blogContainer.classList.add('timeline-item');


        var blogProfilePic = document.createElement("div");
        blogProfilePic.classList.add('cd-timeline-img');


        var blogimg = document.createElement("img");
        blogimg.src = "img/account_circle.svg";
        blogProfilePic.appendChild(blogimg);

        var writer = document.createElement("strong");
        writer.textContent = myObjr[it].username;
        blogProfilePic.appendChild(writer);
        var img = document.createElement("img");
        if (myObjr[it].id == "17")
            img.src = "https://www.onlinesohopathi.com/v1/" + myObjr[it].userid + ".jpg";
        else
            img.src = "https://www.onlinesohopathi.com/v1/blog" + myObjr[it].id + ".jpg";
        img.style.cssText = "height: 50%; width: 100%;";
        blogContainer.appendChild(img);
        var blogtitle = document.createElement("h5");
        var bold = document.createElement("b");
        bold.textContent = myObjr[it].title;
        bold.style.cssText = " color : #000000;";
        blogtitle.appendChild(bold);
        //blogtitle.textContent = 
        blogContainer.appendChild(blogtitle);
        blogContainer.appendChild(blogProfilePic);



        var blogextras = document.createElement("div");
        blogextras.style.cssText = "margin: 4px; margin-top: 15px; padding: 1px; position: absolute;";
        var downvote = document.createElement("span");
        downvote.classList.add('new');
        downvote.classList.add('badge');
        downvote.classList.add('red');
        downvote.textContent = "1 comment";
        blogextras.appendChild(downvote);

        var upvote = document.createElement("upvote");
        upvote.classList.add('new');
        upvote.classList.add('badge');
        upvote.classList.add('teal');
        upvote.textContent = "2 upvote";
        blogextras.appendChild(upvote);


        blogs.appendChild(blogContainer);

        blogclick(rest, divg);



    }


}

function loadBlogsinNEWfile(myObjss) {

   

//
//    if (divg == "CollapseBody3") {
//        while (myNode.firstChild)
//            myNode.removeChild(myNode.firstChild);
//    }
//    myNode.appendChild(head);
    
    var blogs = document.createElement("div");
    blogs.id = "containBLOGS";
    
    var myNode = document.getElementById("blogsCollapseBody3");
    
    var myObjr = JSON.parse(myObjss);

    var category_container = document.createElement("div");
    //category_container.classList.add('row-fluid');
    category_container.style.cssText = 'display:table;margin:10px auto;border-spacing: 10px;';
    myNode.appendChild(category_container);

    var category_list = ["suggestion", "knowledge", "admission er dinguli", "critical question"]; //use SQL query here for generating category of blogs

        for (var it = 0; it < category_list.length; it++) {

            var category = document.createElement("button");
            category.style.cssText = 'margin: 10px ;';

            category.id = "cat".concat(it).concat(category_list[it]);
            category.classList.add('waves-effect');
            category.classList.add('waves-light');
            category.classList.add('btn');


            // subbt.id="submit".concat(myObj[i].id);
            category.style.cssText = "margin-left: 10px;";
            // var buttonanswer="submit".concat(myObj[i].id);
            var category_icon = document.createElement("i");

            category_icon.classList.add('fa');
            if (it == 0) {

                //    category.style.cssText = 'background-color:#3498DB;';
                category_icon.classList.add('fa-lightbulb-o');
                var contents = document.createTextNode("  HSC suggestion");
            } else if (it == 2) {
                // category.style.cssText = 'background-color:#9C27B0;';

                category_icon.classList.add('fa-graduation-cap');
                var contents = document.createTextNode("  এডমিশনের দিনগুলি");

            } else if (it == 3) {
                // category.style.cssText = 'background-color:#E9EBEE;';

                category_icon.classList.add('fa-question-circle');
                var contents = document.createTextNode("  " + category_list[it]);
            } else if (it == 1) {
                //  category.style.cssText = 'background-color:#ED7D31;';

                category_icon.classList.add('fa-book');
                var contents = document.createTextNode("  " + category_list[it]);
            }

            category_icon.classList.add('fa-1.5x');
            category.appendChild(category_icon);
            category.appendChild(contents);
            category_container.appendChild(category);

        }

    
    myNode.appendChild(blogs);

var divg="CollapseBody3";
    for (var it = 0; it < myObjr.length; it++) {
        // var alls = 'blogs'.concat(divg);
        if (it == myObjr.length - 1)
            localStorage.setItem("bloglast", myObjr[it].id);


        var blogContainer = document.createElement("div");
        blogContainer.style.cssText = 'cursor: pointer;';
        vals = divg.concat("blog");
        var rest = vals.concat(myObjr[it].id);
        blogContainer.id = vals.concat(myObjr[it].id); // Need to be assigned
        blogContainer.classList.add('timeline-item');


        var blogProfilePic = document.createElement("div");
        blogProfilePic.classList.add('cd-timeline-img');


        var blogimg = document.createElement("img");
        blogimg.src = "img/account_circle.svg";
        blogProfilePic.appendChild(blogimg);

        var writer = document.createElement("strong");
        writer.textContent = myObjr[it].username;
        blogProfilePic.appendChild(writer);
        var img = document.createElement("img");
        if (myObjr[it].id == "17")
            img.src = "https://www.onlinesohopathi.com/v1/" + myObjr[it].userid + ".jpg";
        else
            img.src = "https://www.onlinesohopathi.com/v1/blog" + myObjr[it].id + ".jpg";
        img.style.cssText = "height: 60%; width: 80%;";
        blogContainer.appendChild(img);
        var blogtitle = document.createElement("h5");
        var bold = document.createElement("b");
        bold.textContent = myObjr[it].title;
        bold.style.cssText = " color : #000000;";
        blogtitle.appendChild(bold);
        //blogtitle.textContent = 
        blogContainer.appendChild(blogtitle);
        blogContainer.appendChild(blogProfilePic);



        var blogextras = document.createElement("div");
        blogextras.style.cssText = "margin: 4px; margin-top: 15px; padding: 1px; position: absolute;";
        var downvote = document.createElement("span");
        downvote.classList.add('new');
        downvote.classList.add('badge');
        downvote.classList.add('red');
        downvote.textContent = "1 comment";
        blogextras.appendChild(downvote);

        var upvote = document.createElement("upvote");
        upvote.classList.add('new');
        upvote.classList.add('badge');
        upvote.classList.add('teal');
        upvote.textContent = "2 upvote";
        blogextras.appendChild(upvote);


        blogs.appendChild(blogContainer);

        blogclick(rest, divg);



    }
    
        for (var it = 0; it < category_list.length; it++) {
            cat_id = "cat".concat(it).concat(category_list[it]);
            category_click(cat_id, blogs.id, category_list[it], myObjr, divg);
        }



}

function category_click(category_id, main_id, cat_name, myObjr, divg) {

    var blogs = document.getElementById(main_id);
    document.getElementById(category_id).addEventListener("click", function (event) {
        console.log(cat_name);
        while (blogs.firstChild)
            blogs.removeChild(blogs.firstChild);
        //  load_specific_category(cat_name);

        for (var it = 0; it < myObjr.length; it++) {


            if (myObjr[it].type == cat_name) {
                var blogContainer = document.createElement("div");
                blogContainer.style.cssText = 'cursor: pointer;';
                var vals = divg.concat("blog");
                var rest = vals.concat(myObjr[it].id);
                blogContainer.id = vals.concat(myObjr[it].id); // Need to be assigned
                blogContainer.classList.add('timeline-item');


                var blogProfilePic = document.createElement("div");
                blogProfilePic.classList.add('cd-timeline-img');


                var blogimg = document.createElement("img");
                blogimg.src = "img/account_circle.svg";
                blogProfilePic.appendChild(blogimg);

                var writer = document.createElement("strong");
                writer.textContent = myObjr[it].username;
                blogProfilePic.appendChild(writer);
                var img = document.createElement("img");
                if (myObjr[it].id == "17")
                    img.src = "https://www.onlinesohopathi.com/v1/" + myObjr[it].userid + ".jpg";
                else
                    img.src = "https://www.onlinesohopathi.com/v1/blog" + myObjr[it].id + ".jpg";
                img.style.cssText = "height: 50%; width: 100%;";
                blogContainer.appendChild(img);
                var blogtitle = document.createElement("h5");
                var bold = document.createElement("b");
                bold.textContent = myObjr[it].title;
                bold.style.cssText = " color : #000000;";
                blogtitle.appendChild(bold);
                //blogtitle.textContent = 
                blogContainer.appendChild(blogtitle);
                blogContainer.appendChild(blogProfilePic);



                var blogextras = document.createElement("div");
                blogextras.style.cssText = "margin: 4px; margin-top: 15px; padding: 1px; position: absolute;";
                var downvote = document.createElement("span");
                downvote.classList.add('new');
                downvote.classList.add('badge');
                downvote.classList.add('red');
                downvote.textContent = "1 comment";
                blogextras.appendChild(downvote);

                var upvote = document.createElement("upvote");
                upvote.classList.add('new');
                upvote.classList.add('badge');
                upvote.classList.add('teal');
                upvote.textContent = "2 upvote";
                blogextras.appendChild(upvote);
                //blogContainer.appendChild(blogextras);



                blogs.appendChild(blogContainer);

                blogclick(rest, divg);

            }

        }





    });


}



function savediv(divid) {
    if (ourdiv == "yes") {

        if (unidiv == "CollapseBody")
            parsingAllQuestions("0", unidiv);
        else if (unidiv == "CollapseBody1")
            parsingAllQuestions("hsc", unidiv);
        else if (unidiv == "CollapseBody2")
            parsingAllQuestions("ssc", unidiv);
        else if (unidiv == "CollapseBody3") {
            var myNodes = document.getElementById("blogsCollapseBody3");

            parsingAllBlogs("0", unidiv);

        } else if (unidiv == "CollapseBody4") {
            get_me_answered(uid);
            parsingAllQuestions(uid, "CollapseBody4");

        }

    } else {
        if (divid == "CollapseBody4") {
            if (uid == "hiru") {
                flag = "1";
                // alert("OH");
                $('#myModalm').modal('show');
            } else if (flag == "0") {
                flag = "1";
                get_me_answered(uid);
                parsingAllQuestions(uid, "CollapseBody4");
            }
        } else if (divid == "Notifydiv") {


        }
    }
    unidiv = divid;
    document.getElementById("comment  ").value = "";
    ourdiv = "None";
    //alert(unidiv);

}




function loadallquestions(myObjs, coldiv) {

    var myObj = JSON.parse(myObjs);

    var CollapseBody = document.getElementById(coldiv);



    if (coldiv == "CollapseBody4") {
        /*
        var spandiv = document.createElement("div");
        spandiv.style.cssText = 'display:table;margin:10px auto;border-spacing: 10px;';
        CollapseBody.appendChild(spandiv);

        var askedspan = document.createElement("span");
        askedspan.style.cssText = 'display:inline-block;background-color:#4bbcb1;margin-right: 20px;border: 2px solid #01321F;padding: 10px;border-radius: 25px;';
        askedspan.textContent = "    Asked Questions : ".concat(queCount);
        spandiv.appendChild(askedspan);

        var answeredspan = document.createElement("span");
        answeredspan.textContent = "Answered  Questions : ".concat(me_answered);
        answeredspan.style.cssText = 'display:inline-block;background-color:#4bbcb1;border: 2px solid #01321F;padding: 10px;border-radius: 25px;';
        spandiv.appendChild(answeredspan);
        */

        var rankspan = document.getElementById('rank');
        rankspan.innerHTML = rank_for_profile;
        var usernamediv = document.getElementById('userName');
        usernamediv.innerHTML = myObj[0].username;
        // var fbpicdiv = document.getElementById('fbpic');
        //fbpicdiv.src =fbpic_for_profile;
        // fbpicdiv.src ="http://graph.facebook.com/".concat(myObj[0].userid)."/picture?type=large&redirect=true&width=250&height=250";
        console.log(fbpic_for_profile);
        document.getElementById('fbpic').src=fbpic_for_profile;
        document.getElementById('likeCount').innerHTML=like_for_profile;
        document.getElementById('queCount').innerHTML=queCount;
        document.getElementById('ansCount').innerHTML=me_answered;
		
    }


    var i, j, k, l, m;
    console.log(myObj.length);

    for (i = 0; i < myObj.length; i++) {
        if (coldiv == "CollapseBody4")
            myObj[i].anonymous = "0";
        if (i == myObj.length - 1) {
            queslid = "OK";
            localStorage.setItem(coldiv, myObj[i].id);
        }
        var listItem = document.createElement("li");
        listItem.id = "questions" + coldiv + myObj[i].id;
        questionids = "questions" + coldiv + myObj[i].id;

        listItem.classList.add('collapsible');  // Adding card shape to each question
        listItem.style.cssText = 'margin:12px;';

        CollapseBody.appendChild(listItem);

        var QuestionTitle = document.createElement("div");
        QuestionTitle.classList.add('questioncard');
        QuestionTitle.classList.add('collapsible-header');
        //QuestionTitle.textContent = "Do native English speakers ever notice that someone isn't a native speaker despite speaking fluently? If yes, how?";
        listItem.appendChild(QuestionTitle);

        var Profilepic = document.createElement("img");
        //alert(myObj[i].anonymous);
        if (myObj[i].anonymous == "0")
		{
		  if(i%4==1)	
			Profilepic.src = "https://onlinesohopathi.com/img/images1.jpg";
		  else if(i%4==2)
			 Profilepic.src = "https://onlinesohopathi.com/img/images2.jpg";
		  else if(i%4==3)
			 Profilepic.src = "https://onlinesohopathi.com/img/images3.jpg";
		  else if(i%4==0)
			 Profilepic.src = "https://onlinesohopathi.com/img/images4.jpg";
          		 
			
		}
        
		
		else
            Profilepic.src = "img/account_circle.svg";
        Profilepic.style.cssText = 'border-radius: 50%;width: 50px; height: 50px; margin-right:5px;';
        QuestionTitle.appendChild(Profilepic);

        var creadiv = document.createElement("div");


        if (myObj[i].anonymous == "0")
            creadiv.textContent = "Q" + myObj[i].id + "." + (myObj[i].username) + " asked: ";
        else
            creadiv.textContent = "Q" + myObj[i].id + "." + "Somebody" + " asked: ";

        var creatitl = document.createElement("p");
        var titles = myObj[i].title;
        var cat = myObj[i].question;
        if (cat.substring(0, 5) != "OSMT_") {
            if (titles.length === 0)
                titles = "নিচের ছবিতে দেওয়া প্রশ্নগুলোর সমাধান করে দিন। Topic: ".concat(myObj[i].question);
            creatitl.textContent = "     ".concat(titles);
            creatitl.style.cssText = "font-weight: bold;  ";

            creadiv.appendChild(creatitl);
        }
		else
		{
		   if(titles.length!=0)
		   {
			creatitl.textContent = "     ".concat(titles);
            creatitl.style.cssText = "font-weight: bold;  ";

            creadiv.appendChild(creatitl);   
		   }
		}

        var str = myObj[i].image;

        str = myObj[i].image;

        var images = str.split(",");
        var urls;
        if (cat.substring(0, 5) == "OSMT_") {
            console.log("YYY");
            for (j = 0; j < images.length; j++)

            {
                if (images[j].length == 0) continue;

                urls = 'https://www.onlinesohopathi.com/v1/'.concat(images[j]);


                var qimgdiv = document.createElement("div");
                qimgdiv.style.cssText = 'margin-top: 25px;';
                qimgdiv.classList.add('flexbin');
                qimgdiv.classList.add('flexbin-margin');
                var qimg = document.createElement('img');

                //qimg.style.cssText=' display: block;overflow: auto';
                var wide = listItem.offsetWidth;



                qimg.src = urls;
                qimg.style.cssText = "max-width: 100%; max-height: 400px; height: auto; width: auto; ";



                qimgdiv.id = images[j].concat("CollapseBody");
                qimgdiv.appendChild(qimg);
                creadiv.appendChild(qimgdiv);

            }




        }


        var ViewsDiv = document.createElement("div");
        ViewsDiv.style.cssText = 'margin: 4px; margin-top: 1px; padding: 1px; position: absolute;';
        creadiv.appendChild(ViewsDiv);


        if (uid == myObj[i].userid) {
            var del = document.createElement("span");
            del.setAttribute("data-badge-caption", "");
            del.classList.add('new');
            del.classList.add('badge');
            del.classList.add('red');
            del.textContent = " Delete";
            var vl = "del".concat(coldiv);
            del.id = vl.concat(myObj[i].id);
            // del.type = "button";
            ViewsDiv.appendChild(del);
           // console.log(uid);
        }

        var ViewsSpan = document.createElement("span");
        ViewsSpan.setAttribute("data-badge-caption", "");
        ViewsSpan.classList.add('new');
        ViewsSpan.classList.add('badge');
        ViewsSpan.textContent = (myObj[i].tags).toUpperCase();
        ViewsDiv.appendChild(ViewsSpan);

        var AnsSpan = document.createElement("span");
        AnsSpan.setAttribute("data-badge-caption", " Answers");
        AnsSpan.classList.add('new');
        AnsSpan.classList.add('badge');
        AnsSpan.classList.add('grey');
        var and = myObj[i].answers;
        AnsSpan.textContent = and.length;
        ViewsDiv.appendChild(AnsSpan);

        var SubSpan = document.createElement("span");
        SubSpan.setAttribute("data-badge-caption", "");
        SubSpan.classList.add('new');
        SubSpan.classList.add('badge');
        SubSpan.classList.add('baby-blue');
        var ands = myObj[i].question;
        SubSpan.textContent = ands;
        ViewsDiv.appendChild(SubSpan);



        QuestionTitle.appendChild(creadiv);






        if (uid == myObj[i].userid) {
            delqueid(del.id, myObj[i].id, listItem.id);
        }

        questiondisplay(questionids, coldiv);
    }
    console.log(parseInt(getBrowserSize().width));
    if (ourdiv != "yes" && localStorage.getItem(coldiv.concat("scroll")) != 1 && parseInt(getBrowserSize().width) >= 500)
        parsingAllBlogs("0", coldiv);




}

function questiondisplay(ideas, coldir) {

    document.getElementById(ideas).addEventListener("click", function (event) {
        var strn = ideas;
        var rep = "questions" + coldir;
        strn = strn.replace(rep, "");


        var btr = "https://www.onlinesohopathi.com/onequestion.html?question=".concat(strn);

        if (localStorage.getItem("delete") == "0") {
            var win = window.open(btr, '_blank');
            win.focus();
        }

    });

}

function delansid(delid, timedivid, likedivid, ansskanswer_id) {


    var el = document.getElementById(delid);
    // document.addEventListener('DOMContentLoaded', function () {


    el.onclick = function () {
        var answer = confirm("Delete  Answer?");
        if (answer) {
            var elem1 = document.getElementById(timedivid);
            elem1.parentElement.removeChild(elem1);
            var elem2 = document.getElementById(likedivid);
            elem2.parentElement.removeChild(elem2);
            //  call a function of backend for deleting the specified answer by id from database

            deleteanswer(ansskanswer_id);
        } else {
            //some code
        }

    };

}


function delqueid(delid, queid, listItemid) {


    var el = document.getElementById(delid);
    // document.addEventListener('DOMContentLoaded', function () {


    el.onclick = function () {
        localStorage.setItem("delete", 1);
        var question = confirm("Delete  Question?")
        if (question) {
            var elem1 = document.getElementById(listItemid);
            elem1.parentElement.removeChild(elem1);

            deletequestion(queid);

        } else {

            window.location.reload();
            //some code
        }

    }


}


function imagedisplay(objs, savedivs) {

    var objr = objs;
    objs = "anssub".concat(savedivs);
    objs = objs.concat(objr);
    document.getElementById(objs).addEventListener("click", function (event) {
        // image preview
        console.log("Clicked imageanswer...");
        var olb = "image-picker".concat(savedivs);
        olb = olb.concat(objr);
        document.getElementById(olb).click();




    });


}

function imagepreview(objss, savedivs) {

    var objc = objss;
    var orb = "image-picker".concat(savedivs);
    orb = orb.concat(objc);

    document.getElementById(orb).addEventListener("change", function (event) {
        // image preview


        var values = "q".concat(savedivs);
        values = values.concat(objc);
        //alert(objs);
        readURLs(this, values);
        console.log("Clicked imagewer...");


    });


}

function blogclick(buttons, savdivs) {

    document.getElementById(buttons).addEventListener("click", function (event) {
        var strn = buttons;
        var btr = "";
        strn = strn.replace(savdivs.concat("blog"), "");
        // alert(strn);
        // body...
        if (strn == 17)
            btr = "oneblog.html?filter=".concat(strn);
        else {
            var files = "blog" + strn + ".html";
            btr = files + "?filter=" + strn;
        }

        location.href = btr;

    });

}

function viewnotifiedquestion(uidess, ideas) {

    document.getElementById(ideas).addEventListener("click", function (event) {
        var strn = ideas;
        strn = strn.replace("notif", "");
        // alert(strn);
        // body...

        var btr = "https://www.onlinesohopathi.com/onequestion.html?question=".concat(strn);
        updatenotifystate(uidess, strn);

        //location.href = btr;

    });

}



function submitbuttonforanswer(objl, savedivs) {


    document.getElementById(objl).addEventListener("click", function () {
        // Uploading Comment
        var alg = 'submit'.concat(savedivs);
        var qid = objl.replace(alg, '');
        quesd = qid;

        var stt = "#".concat(objl);
        if (uid == "hiru")
            $('#myModalss').modal('show');
        else
            loadallprofiless(quesd, savedivs, uid);
        //document.getElementById("myModalss").showModal(); 

        //uploadanswers(qid);

    });




}

function loadimgques(objl, savedivs) {
    var alg = objl.concat(savedivs);

    document.getElementById(alg).addEventListener("click", function () {
        // Uploading Comment
        var algs = alg;
        algs = algs.replace(savedivs, '');
        algs = "https://www.onlinesohopathi.com/v1".concat(algs);

        var stt = "#".concat(objl);
        if (uid == "hiru")
            $('#myModalss').modal('show');
        else
            loadallprofiless(quesd, savedivs, uid);


    });

}

function leaderboard_load(myObjs) {

    var myObj = JSON.parse(myObjs);
    var username_id;
    var points_id;

     for (i = 0; i <5; i++) {
        username_id="Leader_rank".concat(i+1);
        points_id="Leader_rank".concat(i+1);
        points_id+="_points";
        document.getElementById(username_id).innerHTML=myObj[i].username;
        document.getElementById(points_id).innerHTML=myObj[i].points;
     }


}



