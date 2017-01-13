window.onload=(function(){

var parseButton=document.getElementById('button');
var stringInput=document.getElementById('inputString');
var harvestedLinks=document.getElementById('output');


function parseLinks(text){

  var arr=[];
  var pattern0=/<a\s*(href=")(.*?)<\/a>/g;
  var links=text.split('<a href="');
  var numLinks=links.length-1;
  var rawLink=[];
  var rawLinkPattern="";
  var urlString="";
  var urlPattern="";
  var url=[];
  var wwwUrl=[];
  var wwwLinkText=[];
  var emailAddress=[];
  var emailOnlyPattern="";
  var emailString="";
  var linksAndEmailsArray=[];
  var textLinkPattern="";
  var textLinks=[];
  var endOfLinkIndx=0;
  var objString="";
  var jsonObject="";
  for(var i=0;i<numLinks;i++){
    arr.push(pattern0.exec(text));
  };
  for(var j=0;j<arr.length;j++){
    rawLink[j]=arr[j][0];
    rawLinkPattern=/"[\S*\s*]*"/;
    urlString=rawLinkPattern.exec(rawLink[j])[0];
    urlPattern=/["](.*?)["]/;
    textLinkPattern=/>(.*?)</;
    textLinks[j]=textLinkPattern.exec(rawLink[j])[0].slice(1,textLinkPattern.exec(rawLink[j])[0].length-1);
    url[j]=urlPattern.exec(urlString)[0].slice(1,urlPattern.exec(rawLink[j])[0].length-1);
  };

  for(var k=0;k<url.length;k++){
    if(url[k].match("http:")||url[k].match("https:")){
      wwwUrl.push(url[k]);
      wwwLinkText.push(textLinks[k]);
    }else if(url[k].match("mailto:")){
        emailOnlyPattern=/[^(mailto:)][\S*\s*]*/;
      emailString=emailOnlyPattern.exec(url[k]);
      emailAddress.push(emailString);
    };
  };

  linksAndEmailsArray=[wwwLinkText,wwwUrl,emailAddress]

  objString='{"links":[';
  if(wwwUrl.length !==0){
    objString+='{';
    for(var i=0;i<wwwUrl.length;i++){
      objString+='"linkText":'+'"'+wwwLinkText[i]+'"'+',';
      objString+='"url":'+'"'+wwwUrl[i]+'"}';
      if(i<wwwUrl.length-1){
        objString+=',{';
      };
    };
  };
  objString+='], "emailAddresses":[';
  for(var j=0;j<emailAddress.length;j++){
    objString+='"'+emailAddress[j]+'"';
    if(j<emailAddress.length-1){
      objString+=',';
    };
  };
  objString+=']}';

  jsonObject=JSON.parse(objString);

  return jsonObject;

};

stringInput.addEventListener('click',function(){
  output.className="";
})

parseButton.addEventListener('click', function(){

  var obj=parseLinks(stringInput.value);
  var numOfLinks=obj.links.length;
  var numOfeMailAddresses=obj.emailAddresses.length;
  var linkNum=0;
  var emailNum=0;

  if(numOfLinks!==0){
    for(var i=0;i<numOfLinks;i++){
      linkNum=i+1;
      harvestedLinks.value+=linkNum+'. Link '+linkNum+' Title: '+obj.links[i].url+'\r\r';
    };
  };

if(numOfeMailAddresses!==0){
  for(var j=0;j<numOfeMailAddresses;j++){
    emailNum=j+1;
    linkNum++;
    harvestedLinks.value+=linkNum+'.  eMail '+emailNum+' Link: '+obj.emailAddresses[j]+'\r\r';
  };
};

if(numOfeMailAddresses===0 && numOfLinks===0){
  harvestedLinks.value="No External Links or Email Addresses exist in The Input String";
};

  output.className+="focused";


});


});


