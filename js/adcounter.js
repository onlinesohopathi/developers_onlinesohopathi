function uploadadcounter(publisherid) {
    var responsefromfbname, resy;
    //var strl = "/".concat(ids);
	var ipaddress;

    $.getJSON('https://ipinfo.io', function(data) {
    ipaddress=data.ip;
	//var ipaddress=Obj[0].ip;
	console.log(ipaddress);
	uploadadinDataBase(publisherid,ipaddress);
   

  });

}

function uploadadinDataBase(publisherid,ipaddress)
{
	var getFromDb = "v1/adcounter.php/uploadadcounter";


    var data = new FormData();
    data.append('publisher_id', publisherid);
    data.append('ip_address', ipaddress);
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            
            
			location.href="https://joykoly.com/";
			console.log("Ad uploadedss...");

        }
    };
    xmlhttp.open("POST", getFromDb, true);
    xmlhttp.send(data);

}