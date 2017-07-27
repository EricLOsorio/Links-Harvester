window.onload=(function(){

var parseButton=document.getElementById('button');

var stringInput=document.getElementById('inputString');

var harvestedLinks=document.getElementById('output');


function parseLinks(text){

var pattern = /(mailto:(.*?)">(.*?)<)|(http(s)?:\/\/)(.*?)">(.*?)</g,

    arr=[],  //initial array to store regex search results

    links=text.split('<a href="'),  //split text to determine number of links
   
    numLinks=links.length-1,  //number of links in text
    
    hrefs=[],  //array to hold  only valid hrefs
    
    emailsArr=[], //array to hold only email links
   
    linksArr=[]; //array to hold link objects composed of linkText and url
   

   function linksObject(linkText,url){ //constructor for links objects

     this.linkText=linkText,

     this.url=url
   }

   function harvestObject(links,emailAddresses){ //constructor for returned Objects with all harvested links

     this.links=links,

     this.emailAddresses=emailAddresses
   }

  for(var i=0;i<numLinks;i++){

      arr.push(pattern.exec(text));  //get all matches for our pattern

  };

   hrefs=arr.filter(function(arr){

     return arr;  //filter only valid matches, no nulls

  });


for(var i=0;i<hrefs.length;i++){ //separate parts we care about

  var email=/^mailto:/;

  if(email.test(hrefs[i][0])){

    emailsArr.push(hrefs[i][2]);  //put email links in the emailsArr array

  } else{

      var linksObj=new linksObject(hrefs[i][7],hrefs[i][6]); //create links object

      linksArr.push(linksObj); //put links objects into the linksArr array

  }

}

var returnObject=new harvestObject(linksArr,emailsArr); //create the object to be returned

return returnObject;

};



/*******Clear the output window highlight when input window is clicked*********/

stringInput.addEventListener('click',function(){

  output.className="";

})

/********Parse Text, store in object and format output response*****************/

parseButton.addEventListener('click', function(){

  var obj=parseLinks(stringInput.value);  //parse text

  var numOfLinks=obj.links.length;  //how many site links

  var numOfeMailAddresses=obj.emailAddresses.length; //how many email addresses

  var linkNum=0; //keep track to display link as the nth link

  var emailNum=0; //keep track to display email as the nth email address

  harvestedLinks.value="";  //clear any previous output

  if(numOfLinks!==0){  //If links present get info from object and format output 

    for(var i=0;i<numOfLinks;i++){

      linkNum=i+1;

      harvestedLinks.value+=linkNum+'. Link '+linkNum+' Title: '+obj.links[i].url+'\r\r';

    };

  };

if(numOfeMailAddresses!==0){ //if email addresses present get info from object and format output

  for(var j=0;j<numOfeMailAddresses;j++){

    emailNum=j+1;

    linkNum++;

    harvestedLinks.value+=linkNum+'.  eMail '+emailNum+' Link: '+obj.emailAddresses[j]+'\r\r';

  };

};

if(numOfeMailAddresses===0 && numOfLinks===0){ //If no links or emails present display message

  harvestedLinks.value="No External Links or Email Addresses exist in The Input String";

};

  output.className+="focused"; 


});


});


