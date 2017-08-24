window.onload = (function(){

var parseButton = document.getElementById('button');
var stringInput = document.getElementById('inputString');
var harvestedLinks = document.getElementById('output');




stringInput.addEventListener('click',function(){

      harvestedLinks.className = "";
   
});

harvestedLinks.addEventListener('click', function() {
  if (harvestedLinks.className === ""){

    harvestedLinks.className = "focused";
  }
  

});

parseButton.addEventListener('click', function(){

  

  var worker = new Worker('regexWorker.js');

  worker.postMessage(stringInput.value);

  worker.onmessage = function(message) {
    var start = performance.now();
    var obj = message.data;
    var numOfLinks = obj.links.length;
    var numOfeMailAddresses = obj.emailAddresses.length;
    var linkNum = 0;
    var emailNum = 0;

  

      if(numOfLinks !== 0){
        for(var i = 0; i < numOfLinks; i++){
          linkNum=i+1;
          harvestedLinks.value += linkNum+'. Link '+linkNum+' Title: '+obj.links[i].url+'\r\r';
        }
      }

      if(numOfeMailAddresses !== 0){
        for(var j = 0 ; j < numOfeMailAddresses; j++){
          emailNum = j+1;
          linkNum++;
          harvestedLinks.value += linkNum+'.  eMail '+emailNum+' Link: '+obj.emailAddresses[j]+'\r\r';
        }
      }

      if(numOfeMailAddresses === 0 && numOfLinks === 0){
        harvestedLinks.value = "No External Links or Email Addresses exist in The Input String";
      }

      if(harvestedLinks.className === ""){
        harvestedLinks.className = "focused";
      }

      console.log(`time: ${(performance.now() - start).toFixed(2)}ms`);

  };



});


});


