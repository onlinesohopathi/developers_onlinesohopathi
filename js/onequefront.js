var question_annonymous_state="0";
var questionid_for_annonymous;

function checklog()
{
	if(uid=="hiru")
	{
		
	  $('#myModals').modal('show');
	
	}
	else
		loadallprofiles(uid);

}

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}


function checkuser()
{
	
	if(uid!="hiru")
	{
		location.href="https://www.onlinesohopathi.com/myquestion.html";
	}
	else
		location.href="https://www.onlinesohopathi.com/fblogin.html";
}

function redirectnow()
{
	var str="https://www.onlinesohopathi.com/index.html";
  //str=str.concat(quesidss);
 window.location.replace(str);

}

function fetchUserDetail(alldivss)
    {
        FB.api('/me', function(response) {
             uid = response.id;
                //alert("Name: "+ response.name + "\nFirst name: "+ response.first_name + "ID: "+response.id);
                if(alldivss.id=="myModals")
				  logger(response.id);
                    
			    else
				{   
					loadallprofilesme(quesd,response.id);
					
                }					
			    
				 				
				
			});
			
             
    }

 function checkFacebookLogin(alldiv) 
  {     $("#myModalss").modal("hide");
        $("#myModals").modal("hide");    
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            fetchUserDetail(alldiv);
			
          } 
          else 
          {
            
          }
         });
		 
    }


function logger(pqs)
{  uid=pqs;
   if(uid!="hiru")
			{   
				
				$("#myModals").modal("hide"); 
			}
   //alert("HOG");
   loadallprofiles(uid); 

            
			
    
}

function loggers(pqs)
{  uid=pqs;
   //alert("HOG");
   uploadanswers(quesd); 

            
			if(uid!="hiru")
			{   
				$("#myModalss").modal("hide"); 
				
			}
    
}

	

   

$('.chips').on('chip.add', function(e, chip){
    var obj=$('.chips').material_chip('data');
	
	console.log(obj[0].tag);
	// you have the added chip here
  });
  
$("#image-picker").change(function (event) {
    console.log("Clicked");
    readURLs(this , "img-grid");
});




function readURLs(input , imgdiv) {
  var imgdiv = document.getElementById(imgdiv);
  
  
  var curFiles = input.files;
  var b64string="hello!@1";
  var q=0,start;
  	
  console.log(curFiles);
   
  if (curFiles!= 0) {
    var list = document.createElement("ul");
    list.style.cssText = 'margin: 0 auto; text-align: center;'

    imgdiv.appendChild(list);
    var l=2;
    for (var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement("li");
	  var bstring;
     listItem.style.cssText = 'display: inline-block; vertical-align: top;';

      var para = document.createElement("p");
  	  l=2;
  	  para.id="paras";
      para.textContent = "File name " + curFiles[i].name + ".";
      var image = document.createElement("img");
    
      image.src = window.URL.createObjectURL(curFiles[i]);
    	if(localStorage.getItem("count")===null)
    	{
    		q=1;
    	}
        else
    	{
    		q= Number(	localStorage.getItem("count"))+1;		
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
      //preview.appendChild(image); // preview commented out, I am using the canvas instead
      image.onload = function() {
        // have to wait till it's loaded
        var resized = resizeMe(image,imgdiv); // send it to canvas
        localStorage.setItem(q,resized);
		/*var newinput = document.createElement("input");
        newinput.type = 'hidden';
        newinput.name = 'images[]';
        newinput.value = resized; // put result from canvas into new hidden input
        form.appendChild(newinput);*/
      }
    };
	
/*   used this part previously
 	FR.addEventListener("load", function(e) { 
          image.src       = e.target.result;
          bstring       = e.target.result;
    	  //alert(bstring);
    	localStorage.setItem(q,bstring);
    	l=1;
    	});
      
      FR.readAsDataURL( input.files[i] );*/
	  

      image.id="shadman".concat(i);
    	
    	localStorage.setItem("count",q);
		var urls=window.location.href;
		var res = urls.split("=");
		
  	
    	//localStorage.setItem("start",start);
    	
      //localStorage.setItem(q,b64string);
    	//document.getElementById("paras").innerHTML="File name " + curFiles[i].name + ".";
      image.style.cssText = 'height:300px; width:200px';	
      listItem.appendChild(image);
      listItem.appendChild(para);

    	//var lst=getBase64Image(document.getElementById(image.id),listItm);
    	list.appendChild(listItem);
    }

  }
}  

function resizeMe(img,imgdiv) {
  
  var canvas = document.createElement('canvas');

  var width = img.width;
  var height = img.height;
  var max_height=1500;
  var max_width=1500;
  
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
  
  //imgdiv.appendChild(canvas); // do the actual resized preview
  
  return canvas.toDataURL("image/jpeg",0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

}  






var CollapsibleBody =  document.getElementById("CollapseBody");



var CollapseBody =  document.getElementById("CollapseBody");

function loadonequestion(myObjs,myuid) {
	// body...
    var coldiv="CollapseBody";
	var myObj=JSON.parse(myObjs);
	var i,j,k,l,m;
	
	//localStorage.setItem(str1,"0");
	//localStorage.setItem(str2,"0");
	
  for(i=0;i<myObj.length;i++)
  {   //alert(myObj[0].username);
	  
	  var titles=document.getElementById("title");
	  titles.textContent=myObj[i].title+" Subject: " + myObj[i].question+ "Category: " +myObj[i].category;
		   
  var listItem = document.createElement("li");
  CollapseBody.appendChild(listItem);
      
    var QuestionTitle = document.createElement("div");
    QuestionTitle.classList.add('questioncard');
    QuestionTitle.classList.add('collapsible-header');
    //QuestionTitle.textContent = "Do native English speakers ever notice that someone isn't a native speaker despite speaking fluently? If yes, how?";
   		listItem.appendChild(QuestionTitle);
  
    var Profilepic = document.createElement("img");
	
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
    else{
	  Profilepic.src = "img/account_circle.svg";;
       question_annonymous_state="1";
        questionid_for_annonymous=myObj[i].userid; 
    }
	Profilepic.style.cssText = 'border-radius: 50%;width: 40px; height: 40px; margin-right:10px;';
        QuestionTitle.appendChild(Profilepic);

    var creadiv=   document.createElement("div");
	
	
	if(myObj[i].anonymous=="0")
	   creadiv.textContent = (myObj[i].username).concat(" asked: ");
    else
		creadiv.textContent = ("Somebody").concat(" asked: ");
	
    var titles=myObj[i].title;
		if(titles.length==0)
			titles="নিচের ছবিতে দেওয়া প্রশ্নগুলোর সমাধান করে দিন। Topic: ".concat(myObj[i].question);
        
        
	var creatitl= document.createElement("p");
	creatitl.textContent = "     ".concat(titles);
	creatitl.style.cssText="font-weight: bold; white-space: pre-wrap; text-align: justify;";
	
	creadiv.appendChild(creatitl);
	
	
    	//creadiv.appendChild(DescText);
	
	
	
    var ViewsDiv = document.createElement("div");
    ViewsDiv.style.cssText = 'margin: 4px; margin-top: 15px; padding: 1px; position: absolute;';
    	creadiv.appendChild(ViewsDiv);

    var ViewsSpan = document.createElement("span");
    ViewsSpan.setAttribute("data-badge-caption" , "");
	ViewsSpan.classList.add('new');
    ViewsSpan.classList.add('badge');
    ViewsSpan.textContent = myObj[i].tags;
    	ViewsDiv.appendChild(ViewsSpan);

	var AnsSpan = document.createElement("span");
	AnsSpan.setAttribute("data-badge-caption" , " Answers");
    AnsSpan.classList.add('new');
    AnsSpan.classList.add('badge');
    AnsSpan.classList.add('grey');
	var counts=myObj[i].answers;
    AnsSpan.textContent = counts.length;
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
		
		


    var Description = document.createElement("div");
	Description.id="q".concat(myObj[i].id);
	//Description.classList.add('collapsible-body');
	listItem.appendChild(Description);
	
    
    	
   
	str=myObj[i].image;
	
    var images=str.split(",");
	
	var urls;
    for (j = 0; j < images.length; j++) {	
    if(images[j].length==0)continue;
	
	urls='https://www.onlinesohopathi.com/v1/'.concat(images[j]);
	
	
	var qimgdiv=document.createElement("div");
	qimgdiv.style.cssText = 'margin-top: 25px;';
    qimgdiv.classList.add('flexbin');
    qimgdiv.classList.add('flexbin-margin');
	var qimg=document.createElement('img');
	
	//qimg.style.cssText=' display: block;overflow: auto';
	qimg.style.cssText = 'max-width: 100%; max-height: 400px; height:auto; width:auto;  ';
	
	qimg.src=urls;
	
	qimgdiv.id = images[j].concat("CollapseBody");
	
	qimgdiv.appendChild(qimg);
	
	Description.appendChild(qimgdiv);
	
	qimg.classList.add('materialboxed');
	$('.materialboxed').materialbox();
	
	}
	
	var ansdiv=document.createElement("div");
	ansdiv.classList.add('conta');
	var acount=document.createElement('h5');
	acount.style.cssText = 'margin-top: 20px;';
	
	//Answer starts loading here
	
	var anss=myObj[i].answers;
	acount.textContent=anss.length+" answers";
	ansdiv.appendChild(acount);
	Description.appendChild(ansdiv);
	
	for(k=0;k < anss.length;k++)
	{
	
	var timediv= document.createElement("div");
	timediv.classList.add('timeline-item');
	var vl = "time".concat(k);
     vl = vl.concat(coldiv);
	timediv.id = vl.concat(myObj[i].id);
	var subdiv= document.createElement("div");
	subdiv.classList.add('cd-timeline-img');
	var anspro=document.createElement('img');
	anspro.style.cssText = 'border-radius: 50%;width: 40px; height: 40px; margin-right:10px;';
        
        if(question_annonymous_state=="1" && questionid_for_annonymous==anss[k].userid){
           anspro.src = "img/account_circle.svg";
        }
        else
           anspro.src=anss[k].fbimg;
	subdiv.appendChild(anspro);
	var ansname=document.createElement('strong');
        if(question_annonymous_state=="1" && questionid_for_annonymous==anss[k].userid){
           ansname.textContent="Somebody replied: ";
        }
        else
           ansname.textContent=(anss[k].username).concat(" replied: ");
	subdiv.appendChild(ansname);
	timediv.appendChild(subdiv);
	var anspara= document.createElement("p");
	
	anspara.innerHTML= urlify(anss[k].string);
	anspara.style.cssText="white-space: pre-wrap; text-align: justify;";
	timediv.appendChild(anspara);
	
	Description.appendChild(timediv);
	
	
	
	
	var strs=anss[k].image;
    var imagess=strs.split(",");
	var urlss;
	for(l=0;l<imagess.length;l++)
	{
	
	
	if(imagess[l].length==0)continue;
	var qimgdivs=document.createElement("div");
	var matdivs= document.createElement("div");
	urlss='https://www.onlinesohopathi.com/v1/'.concat(imagess[l]);
	
		//alert(urlss);
    qimgdivs.classList.add('flexbin');
    qimgdivs.classList.add('flexbin-margin');
	matdivs.classList.add('material-placeholder');
	
	var qimgs=document.createElement('img');
	
	//qimgs.style.cssText=' display: block;overflow: auto ';
	qimgs.style.cssText='max-width: 100%; max-height: 400px; height:auto; width:auto;  ';   
	qimgs.src=urlss;
	
	
	matdivs.appendChild(qimgs);
	
	
	qimgdivs.appendChild(matdivs);
	timediv.appendChild(qimgdivs);
	qimgs.classList.add('materialboxed');
	$('.materialboxed').materialbox();
	
	
	}
	
	var likediv=document.createElement("div");
	var vl = "like".concat(k);
    vl = vl.concat(coldiv);
    likediv.id = vl.concat(myObj[i].id);

        
        
        
          var ViewsSpan = document.createElement("button");
            ViewsSpan.style.cssText = " height: 25px; width: 70px; text-align: center;background-color: #16a3a3;";
            ViewsSpan.type = "button";
        
            
            var i_within_button = document.createElement("i");
            ViewsSpan.classList.add('fa');
            ViewsSpan.classList.add('fa-thumbs-up');
            //ViewsSpan.append(i_within_button);
			ViewsSpan.textContent = anss[k].upvote.toString();
            var vl = "upvote".concat(k);
            vl = vl.concat(coldiv);
            ViewsSpan.id = vl.concat(myObj[i].id);
            likediv.appendChild(ViewsSpan);

            var AnsSpan = document.createElement("button");
            AnsSpan.style.cssText = " height: 25px; width: 70px; text-align: center;background-color: #aaa2a2;";
            AnsSpan.type = "button";

            
            var i_within_button = document.createElement("i");
            AnsSpan.classList.add('fa');
            AnsSpan.classList.add('fa-thumbs-down');
            //AnsSpan.append(i_within_button);
			AnsSpan.textContent = anss[k].downvote.toString();
            var vl = "downvote".concat(k);
            vl = vl.concat(coldiv);
            AnsSpan.id = vl.concat(myObj[i].id);

            likediv.appendChild(AnsSpan);
			//alert(myuid);
			
			if (myuid == anss[k].userid) {
                var del = document.createElement("button");
				del.type= "button";
				del.style.cssText = " height: 28px; width: 70px; text-align: center;background-color: #FE0000;";
                var i_within_button = document.createElement("i");
                i_within_button.classList.add('fa');
                i_within_button.classList.add('fa-trash-o');
                del.appendChild(i_within_button);

                //del.style.cssText = " height: 25px; width: 50px; text-align: center;background-color: #FE0000;";
                var vl = "del".concat(k);
                vl = vl.concat(coldiv);
                del.id = vl.concat(myObj[i].id);
                del.type = "button";
                likediv.appendChild(del);
            }
            Description.appendChild(likediv);
            if (myuid == anss[k].userid) {
                //alert(timediv.id);	
                delansid(del.id, timediv.id, likediv.id, anss[k].answer_id);
            }

        
        
        
	Description.appendChild(likediv);
        
         upvotebackend(ViewsSpan.id, anss[k].answer_id);
            downvotebackend(AnsSpan.id, anss[k].answer_id);

    }	
		
		
	var timedivs= document.createElement("div");
	timedivs.classList.add('timeline-item');
	var myimg= document.createElement('div');
	myimg.style.cssText="margin-top:15 px;";
	myimg.classList.add('cd-timeline-img');
	var proimgs= document.createElement('img');
    proimgs.src= "img/account_circle.svg";
	proimgs.style.cssText = 'border-radius: 50%;width: 40px; height: 40px; margin-right:10px;';
	var strngme= document.createElement('strong');
	strngme.textContent="Myself";
    myimg.appendChild(proimgs);
    myimg.appendChild(strngme);
	timedivs.appendChild(myimg);
    
	
	var ansbox= document.createElement('div');
	var txtbox= document.createElement('textarea');
	txtbox.classList.add('materialize-textarea');
	txtbox.id= "ansboxx".concat(myObj[i].id);
	txtbox.type="text";
	txtbox.placeholder="New Comment";
	ansbox.appendChild(txtbox);
	timedivs.appendChild(ansbox);
	var imganbt= document.createElement("button");
	imganbt.classList.add('waves-effect');
	imganbt.classList.add('waves-light');
	imganbt.classList.add('btn');
	var imgandbt= document.createElement("input");
	imgandbt.setAttribute("type", "file");
    imgandbt.accept = "image/*";
	imgandbt.id="image-picker".concat(myObj[i].id);
	imgandbt.style.cssText="visibility: hidden; display: none;";
	var imgpick= "document.getElementById('image-picker').click()";
	imganbt.id="anssub".concat(myObj[i].id);
	var valuess= (myObj[i].id);
	var icn= document.createElement("i");
	
	icn.classList.add('fa');
	icn.classList.add('fa-camera');
	imganbt.appendChild(icn);
	var content = document.createTextNode("Image");
	imganbt.appendChild(content);
	imganbt.appendChild(imgandbt);
	
	
	
	
	timedivs.appendChild(imganbt);
	var subbt= document.createElement("button");
	subbt.classList.add('waves-effect');
    subbt.classList.add('waves-light');
	subbt.classList.add('btn');
	subbt.id="submit".concat(myObj[i].id);
	subbt.style.cssText="margin-left: 10px;";
	var buttonanswer="submit".concat(myObj[i].id);
	var icns= document.createElement("i");
	
	icns.classList.add('fa');
	icns.classList.add('fa-paper-plane');
	subbt.appendChild(icns);
	var contents = document.createTextNode("Submit");
	subbt.appendChild(contents);
	timedivs.appendChild(subbt);
	
	
	
	
	//document.add( '<button class=\"waves-effect waves-light btn\"><i class=\"fa fa-camera\"></i>Image</button>' );
	
	//button for answer image and submit goes here
	
	
	Description.appendChild(timedivs);
	
		
	
	
	imagedisplay(valuess);
	imagepreview(valuess);
	submitbuttonforanswer(buttonanswer);
	
	
	
  }
	
	


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

function imagedisplay(objs)
{

  var objr=objs;
  objs="anssub".concat(objs);
  
  document.getElementById(objs).addEventListener("click", function(event){
  // image preview
    console.log("Clicked imageanswer...");
	var olb= "image-picker".concat(objr);
	document.getElementById(olb).click();
	
    
	

  });
 
 
}

function imagepreview(objss)
{

  var objc=objss;
  var orb= "image-picker".concat(objc);
  
  document.getElementById(orb).addEventListener("change", function(event){
  // image preview
    
	
	var values="q".concat(objc);
	//alert(objs);
    readURLs(this , values);
    console.log("Clicked imagewer...");
	

  });
 
 
}



function submitbuttonforanswer(objl)
{

 
  document.getElementById(objl).addEventListener("click", function(){
  
  // Uploading Comment
  var qid=objl.replace('submit','');
  quesd= qid;
  
    
  if(uid=="hiru")	
        $('#myModalss').modal('show');
      else if(localStorage.getItem(objl)=="0")
	  {
		  localStorage.setItem(objl,"1");
		  loadallprofilesme(quesd,uid);
	  
	  }
  });

  
 
 
}




function upvotebackend(viewspanid, ansskanswer_id) {
    var flag = 0;
	var str1="likess".concat(ansskanswer_id);
    
		
	var el = document.getElementById(viewspanid);
    console.log("ore".concat(localStorage.getItem(str1)));
    el.onclick = function () {

        if (uid == "hiru" && localStorage.getItem(str1)!="1")
		{    localStorage.setItem(str1,"1");
			$('#myModalss').modal('show');
        }
		else if(localStorage.getItem(str1)!="1") {
			 localStorage.setItem(str1,"1");
            checkexist(uid, ansskanswer_id, viewspanid,1);
        }



    };
	



}

function upvotebackend2(viewspanid, ansskanswer_id, Obj) {

    //  alert("Got your user id " + uid);

    var objstr = JSON.stringify(Obj);
    var jsonparse = JSON.parse(Obj);
    if (objstr == "\"[]\"" || (jsonparse[0].upvote == null && jsonparse[0].downvote == 1)) {
        var el = document.getElementById(viewspanid);


        var previous_text = el.textContent;
        var previous_text_int_value = parseInt(previous_text);
        previous_text_int_value++;
        el.textContent = previous_text_int_value.toString();
		el.classList.add('fa');
            el.classList.add('fa-thumbs-up');
        console.log(el.textContent);
        //  call a function of backend for updating upvote the specified answer by id from database
        if (objstr == "\"[]\"") {
            upvote(ansskanswer_id, uid,1);
        }
        else {
            upvote(ansskanswer_id, uid,0);
        }
    }

}

function downvotebackend(viewspanid, ansskanswer_id) {
    var str2="unlikess".concat(ansskanswer_id);
     
    // console.log(el.textContent);
    var el = document.getElementById(viewspanid);

    //  el.addEventListener('click', function () {
    el.onclick = function () {
        
            console.log(localStorage.getItem(str2));
            if (uid == "hiru" && localStorage.getItem(str2)===null )
            {   localStorage.setItem(str2,"1");
				$('#myModalss').modal('show');
			}
		else if(localStorage.getItem(str2)===null)  {
            localStorage.setItem(str2,"1");
			checkexist(uid, ansskanswer_id, viewspanid,0);
        }
        
        
    

    };
	



}



function downvotebackend2(viewspanid, ansskanswer_id, Obj) {

  

    var objstr = JSON.stringify(Obj);
    var jsonparse = JSON.parse(Obj);
    if (objstr == "\"[]\"" || (jsonparse[0].upvote == 1 && jsonparse[0].downvote == null)) {
        var el = document.getElementById(viewspanid);


        var previous_text = el.textContent;
        var previous_text_int_value = parseInt(previous_text);
        previous_text_int_value++;
        el.textContent = previous_text_int_value.toString();
		el.classList.add('fa');
            el.classList.add('fa-thumbs-down');
        console.log(el.textContent);
        //  call a function of backend for updating upvote the specified answer by id from database
        if (objstr == "\"[]\"") {
             downvote(ansskanswer_id, uid,1);
        }
        else {
             downvote(ansskanswer_id, uid,0);
        }
    }

}









