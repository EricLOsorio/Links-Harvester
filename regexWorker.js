function parseLinks(text){

  var arr = [];
  var pattern0 = /<a\s*(href=")(.*?)<\/a>/g;
  var links = text.split('<a href="');
  var numLinks = links.length-1;
  var rawLink = [];
  var rawLinkPattern = "";
  var urlString = "";
  var urlPattern = "";
  var url = [];
  var wwwUrl = [];
  var wwwLinkText = [];
  var emailAddress = [];
  var emailOnlyPattern = "";
  var emailString = "";
  var linksAndEmailsArray = [];
  var textLinkPattern = "";
  var textLinks = [];
  var endOfLinkIndx = 0;
  var objString = "";
  var jsonObject = "";
  for(var i = 0; i<numLinks; i++){
    arr.push(pattern0.exec(text));
  }
  for(var j = 0; j<arr.length; j++){
    rawLink[j] = arr[j][0];
    rawLinkPattern = /"[\S*\s*]*"/;
    urlString = rawLinkPattern.exec(rawLink[j])[0];
    urlPattern = /["](.*?)["]/;
    textLinkPattern = />(.*?)</;
    textLinks[j] = textLinkPattern.exec(rawLink[j])[0].slice(1,textLinkPattern.exec(rawLink[j])[0].length-1);
    url[j] = urlPattern.exec(urlString)[0].slice(1,urlPattern.exec(rawLink[j])[0].length-1);
  }

  for(var k = 0; k<url.length; k++){
    if(url[k].match("http:") || url[k].match("https:")){
      wwwUrl.push(url[k]);
      wwwLinkText.push(textLinks[k]);
    }else if(url[k].match("mailto:")){
        emailOnlyPattern = /[^(mailto:)][\S*\s*]*/;
      emailString = emailOnlyPattern.exec(url[k]);
      emailAddress.push(emailString);
    }
  }

  linksAndEmailsArray = [wwwLinkText,wwwUrl,emailAddress];

  objString = '{"links":[';
  if(wwwUrl.length !== 0){
    objString += '{';
    for(var m = 0; m<wwwUrl.length; m++){
      objString += '"linkText":'+'"'+wwwLinkText[m]+'"'+',';
      objString += '"url":'+'"'+wwwUrl[m]+'"}';
      if(m < wwwUrl.length-1){
        objString += ',{';
      }
    }
  }
  objString += '], "emailAddresses":[';
  for(var n =  0; n<emailAddress.length; n++){
    objString += '"'+emailAddress[n]+'"';
    if(n < emailAddress.length-1){
      objString += ',';
    }
  }
  objString += ']}';

  jsonObject = JSON.parse(objString);

  return jsonObject;

}

onmessage = function(message) {

  postMessage(parseLinks(message.data));

};