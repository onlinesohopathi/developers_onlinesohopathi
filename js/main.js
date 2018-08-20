 /*function botCheck(){
var botPattern = "(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)";
          var re = new RegExp(botPattern, 'i');
          var userAgent = navigator.userAgent;
          if (re.test(userAgent)) {
              
			  return "yes";
          }else{
            return "no";
          }
};*/
 
 
 $(document).ready(function(){
 console.log("Ready");
 
 
 
 //e.preventDefault();
 //$("#myModals").modal('show');
 // 	$('ul.tabs').tabs({
	//   swipeable: true,
	//   responsiveThreshold: Infinity
	// });

//$('.fixed-action-btn.toolbar').openToolbar();

//  function makeExpandingArea(container) {
//  var area = container.querySelector('textarea');
//  var span = container.querySelector('span');
//  if (area.addEventListener) {
//    area.addEventListener('input', function() {
//      span.textContent = area.value;
//    }, false);
//    span.textContent = area.value;
//  } else if (area.attachEvent) {
//    // IE8 compatibility
//    area.attachEvent('onpropertychange', function() {
//      span.innerText = area.value;
//    });
//    span.innerText = area.value;
//  }
// // Enable extra CSS
// container.className += "active";
// }var areas = document.querySelectorAll('.expandingArea');
// var l = areas.length;while (l--) {
//  makeExpandingArea(areas[l]);
// }

// var chip = {
//     tag: 'chip content',
//     image: '', //optional
//     id: 1, //optional
//   };
      

$('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Physics',
    }, {
      tag: 'Chemistry',
    }, {
      tag: 'Math',
    },{
      tag: 'English',
    },{
      tag: 'Biology',
    },{
      tag: 'General Knowledge',
    }],
  });
  $('.chips-placeholder').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });
  $('.chips-autocomplete').material_chip({
    autocompleteOptions: {
      data: {
        'Physics': null,
        'Chemistry': null,
        'Math': null,
        'English': null,
        'Biology': null
      },
      limit: Infinity,
      minLength: 1
    }
  });


  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
 });
 
 
  
  