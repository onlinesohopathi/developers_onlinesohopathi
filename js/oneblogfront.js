function validate(){
  
  var strngs="https://www.onlinesohopathi.com/v1/";
	   var urls=window.location.href;
       var res = urls.split("=");
       res[1]=res[1].concat(".jpg");
       strngs=strngs.concat(res[1]);
	   
	   var metas=document.getElementsByTagName("meta");
	for (var x=0; x<metas.length; x++) { 
      if (metas[x].getAttribute("property") == "og:image") { 
         metas[x].setAttribute("content",strngs); 
      }
      
   } 
        	   
  
  console.log('validated!');
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

$(document).ready(function(){
  // we call the function
  validate();
});



function checklog()
{
	if(uid=="hiru")
	{
		
	  $('#myModals').modal('show');
	
	}
	else
		loadallprofiles(uid);

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
                //alert("Name: "+ response.name + "\nFirst name: "+ response.first_name + "ID: "+response.id);
                if(alldivss.id=="myModals")
				  logger(response.id);
			    else
				{   
					loadallprofiless(quesd,response.id);
					
                }					
			    
				 				
				
			});
			
             
    }

 function checkFacebookLogin(alldiv) 
  {         
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
     listItem.style.cssText = 'display: inline-block; vertical-align: top;'

      var para = document.createElement("p");
  	  l=2;
  	  para.id="paras";
      para.textContent = "File name " + curFiles[i].name + ".";
      var image = document.createElement("img");
    
      //image.src = window.URL.createObjectURL(curFiles[i]);
    	if(localStorage.getItem("count")===null)
    	{
    		q=1;
    	}
        else
    	{
    		q= Number(	localStorage.getItem("count"))+1;		
    	}
    
    	var FR= new FileReader();
    	FR.addEventListener("load", function(e) { 
          image.src       = e.target.result;
          bstring       = e.target.result;
    	  //alert(bstring);
    	localStorage.setItem(q,bstring);
    	l=1;
    	});
      
      FR.readAsDataURL( input.files[i] );
	  

      image.id="shadman".concat(i);
    	
    	localStorage.setItem("count",q);
  	
    	//localStorage.setItem("start",start);
    	
      //localStorage.setItem(q,b64string);
    	//document.getElementById("paras").innerHTML="File name " + curFiles[i].name + ".";
      image.style.cssText = 'height:90px; width:90px';	
      listItem.appendChild(image);
      listItem.appendChild(para);

    	//var lst=getBase64Image(document.getElementById(image.id),listItm);
    	list.appendChild(listItem);
    }

  }
}  
  






















var CollapsibleBody =  document.getElementById("CollapseBody");

function loadallprofiles(ids)
{
    var responsefromfbname;
	var strl="/".concat(ids);
    
   FB.api(
  strl,
  'GET',
  {"fields":"id,name,picture"},
  function(response) {
     //response.name;
      //var responsefromfbpic=response.picture.data.url;
      //alert(response.name);
      
      // Insert your code here
  }
);
} 



function loadoneblog(myObjs) {
	// body...
	var myObj=JSON.parse(myObjs);
	var i,j,k,l,m;
	
  for(i=0;i<myObj.length;i++)
  { 
    if(myObj[i].id=="17")
	{
    var strn="https://www.onlinesohopathi.com/v1/".concat(myObj[i].userid);
    strn=strn.concat(".jpg");
	}
	else
	{
	var strn="https://www.onlinesohopathi.com/v1/blog".concat(myObj[i].id);
    strn=strn.concat(".jpg");  
	
	}
	/*if(myObj[i].id=="34")
	{
	 var meta = document.createElement('meta');
meta.setAttribute("property", "og:image");
meta.content = "https://www.onlinesohopathi.com/v1/blog34.jpg";
document.getElementsByTagName('head')[0].appendChild(meta);
	
	}*/
    	
	
    	
    var spec=document.getElementById("special");
	var h2=document.createElement("h4");
	h2.textContent=myObj[i].title;
	spec.appendChild(h2);
	var strong=document.createElement("strong");
	strong.textContent=myObj[i].username;
	strong.style.cssText="white-space: pre-wrap;";
    spec.appendChild(strong);
	//alert(strn);
	document.getElementById("blgpic").src=strn;
	var contents=document.getElementById("contents");
	var contpra=document.createElement("p");
	
	contpra.innerHTML=myObj[i].content;
	contpra.style.cssText="white-space: pre-wrap; text-align: justify; font-size:18px; ";
	contents.appendChild(contpra);
        
  
    var listItem = document.createElement("li");
    CollapseBody.appendChild(listItem); 
    
    var Description = document.createElement("div");
	Description.id="b".concat(myObj[i].id);  
    
	
	var ansdiv=document.createElement("div");
	ansdiv.classList.add('conta');
	var acount=document.createElement('h5');
	
	
	//Answer starts loading here
	
	var anss=myObj[i].comments;
	acount.textContent=anss.length+" comments";
	ansdiv.appendChild(acount);
	Description.appendChild(ansdiv);
	
	for(k=0;k < anss.length;k++)
	{
	
	var timediv= document.createElement("div");
	timediv.classList.add('timeline-item');
	var subdiv= document.createElement("div");
	subdiv.classList.add('cd-timeline-img');
	var anspro=document.createElement('img');
	anspro.src=anss[k].fbpic;
	anspro.style.cssText = 'border-radius: 50%;width: 40px; height: 40px; margin-right:10px;';
	subdiv.appendChild(anspro);
	var ansname=document.createElement('strong');
	ansname.textContent=anss[k].username;
	subdiv.appendChild(ansname);
	timediv.appendChild(subdiv);
	var anspara= document.createElement("p");
	anspara.textContent= anss[k].content;
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
	
    qimgdivs.classList.add('flexbin');
    qimgdivs.classList.add('flexbin-margin');
	matdivs.classList.add('material-placeholder');
	
	var qimgs=document.createElement('img');
	qimgs.classList.add('materialboxed');
	qimgs.classList.add('initialized');
	qimgs.style.cssText=' height: 130%; width: 100%; ';
	
	qimgs.src=urlss;
	matdivs.appendChild(qimgs);
	qimgdivs.appendChild(matdivs);
	timediv.appendChild(qimgdivs);
	}
	var likediv=document.createElement("div");
	likediv.style.cssText=" margin: 4px; padding: 1px; position: absolute; ";
	var ViewsSpan = document.createElement("span");
    
	ViewsSpan.setAttribute("data-badge-caption" , " Upvotes");
	ViewsSpan.classList.add('new');
    ViewsSpan.classList.add('badge');
    ViewsSpan.textContent = "0";
    	likediv.appendChild(ViewsSpan);

	var AnsSpan = document.createElement("span");
	AnsSpan.setAttribute("data-badge-caption" , " Downvotes");
    AnsSpan.classList.add('new');
    AnsSpan.classList.add('badge');
    AnsSpan.classList.add('grey');
    AnsSpan.textContent = "0";
    	likediv.appendChild(AnsSpan);
	Description.appendChild(likediv);

    }	
		
		
	var timedivs= document.createElement("div");
	timedivs.classList.add('timeline-item');
	var myimg= document.createElement('div');
	myimg.style.cssText="margin-top:15 px;";
	myimg.classList.add('cd-timeline-img');
	var proimgs= document.createElement('img');
    proimgs.src= "img/account_circle.svg";
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
	
	
	
	
	
	
	
	Description.appendChild(timedivs);
	
		
	listItem.appendChild(Description);
	
	imagedisplay(valuess);
	imagepreview(valuess);
	submitbuttonforanswer(buttonanswer);
	
	
	
  }
	
	


}


function loadoneblogcomments(myObjs) {
	// body...
	var myObj=JSON.parse(myObjs);
	var i,j,k,l,m;
	
  for(i=0;i<myObj.length;i++)
  { 
    
	
        
  
    var listItem = document.createElement("li");
    CollapseBody.appendChild(listItem); 
    
    var Description = document.createElement("div");
	Description.id="b".concat(myObj[i].id);  
    
	
	var ansdiv=document.createElement("div");
	ansdiv.classList.add('conta');
	var acount=document.createElement('h5');
	
	
	//Answer starts loading here
	
	var anss=myObj[i].comments;
	acount.textContent=anss.length+" comments";
	ansdiv.appendChild(acount);
	Description.appendChild(ansdiv);
	
	for(k=0;k < anss.length;k++)
	{
	
	var timediv= document.createElement("div");
	timediv.classList.add('timeline-item');
	var subdiv= document.createElement("div");
	subdiv.classList.add('cd-timeline-img');
	var anspro=document.createElement('img');
	anspro.src=anss[k].fbpic;
	anspro.style.cssText = 'border-radius: 50%;width: 40px; height: 40px; margin-right:10px;';
	subdiv.appendChild(anspro);
	var ansname=document.createElement('strong');
	ansname.textContent=anss[k].username;
	subdiv.appendChild(ansname);
	timediv.appendChild(subdiv);
	var anspara= document.createElement("p");
	anspara.textContent= anss[k].content;
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
	
    qimgdivs.classList.add('flexbin');
    qimgdivs.classList.add('flexbin-margin');
	matdivs.classList.add('material-placeholder');
	
	var qimgs=document.createElement('img');
	qimgs.classList.add('materialboxed');
	qimgs.classList.add('initialized');
	qimgs.style.cssText=' height: 130%; width: 100%; ';
	
	qimgs.src=urlss;
	matdivs.appendChild(qimgs);
	qimgdivs.appendChild(matdivs);
	timediv.appendChild(qimgdivs);
	}
	var likediv=document.createElement("div");
	likediv.style.cssText=" margin: 4px; padding: 1px; position: absolute; ";
	var ViewsSpan = document.createElement("span");
    
	ViewsSpan.setAttribute("data-badge-caption" , " Upvotes");
	ViewsSpan.classList.add('new');
    ViewsSpan.classList.add('badge');
    ViewsSpan.textContent = "0";
    	likediv.appendChild(ViewsSpan);

	var AnsSpan = document.createElement("span");
	AnsSpan.setAttribute("data-badge-caption" , " Downvotes");
    AnsSpan.classList.add('new');
    AnsSpan.classList.add('badge');
    AnsSpan.classList.add('grey');
    AnsSpan.textContent = "0";
    	likediv.appendChild(AnsSpan);
	Description.appendChild(likediv);

    }	
		
		
	var timedivs= document.createElement("div");
	timedivs.classList.add('timeline-item');
	var myimg= document.createElement('div');
	myimg.style.cssText="margin-top:15 px;";
	myimg.classList.add('cd-timeline-img');
	var proimgs= document.createElement('img');
    proimgs.src= "img/account_circle.svg";
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
	
		
	listItem.appendChild(Description);
	
	imagedisplay(valuess);
	imagepreview(valuess);
	submitbuttonforanswer(buttonanswer);
	
	
	
  }
	
	


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
      else
         loadallprofiless(quesd,uid);

  });

  
 
 
}









