$(document).ready(function(){

 leaderboard_backend("full");



});



function full_leaderboard_load(myObjs)
{
	var myObj=JSON.parse(myObjs);
console.log(myObj.length);
var wrapper=document.createElement('div');
wrapper.classList.add('wrapper');
var leadertable=document.getElementById("leadertable");
leadertable.appendChild(wrapper);
var wrapper_header=document.createElement('div');
wrapper_header.classList.add('wrapper__header');
wrapper.appendChild(wrapper_header);
var logo=document.createElement('div');
logo.classList.add('b_logo');
var headerimg=document.createElement('img');
headerimg.src="https://images.vexels.com/media/users/3/135313/isolated/lists/9c44517fa04da541c35888362bce2d1b-award-trophy-icon.png";
headerimg.width="40";
logo.appendChild(headerimg);
wrapper_header.appendChild(logo);
var caption=document.createElement('div');
caption.classList.add('b_caption');

var headercaption=document.createElement('p');
headercaption.textContent="Leaderboard";
caption.appendChild(headercaption);
wrapper_header.appendChild(caption);
var wrapper_content=document.createElement('div');
wrapper_content.classList.add('wrapper__content');
wrapper.appendChild(wrapper_content);



var leaderboardlist=document.createElement("ul");
leaderboardlist.id="leaderboard-list";
wrapper_content.appendChild(leaderboardlist);
for (i = 0; i < 16; i++) {

  var listItem = document.createElement("li");
  listItem.id = "Leader".concat(i+1);
  leaderboardlist.appendChild(listItem);
  var imgdiv=document.createElement('div');
  imgdiv.id="Badge".concat(i+1);
  imgdiv.classList.add('graphic');
  var imgview=document.createElement('img');
  imgview.id="Leaderbadge".concat(i+1);
  imgview.src="img/images1.jpg";
  imgdiv.appendChild(imgview);
  listItem.appendChild(imgdiv);
  


}

}