document.getElementById("formFile").addEventListener('change', F2) 
 function fn(){
   if(document.getElementById('hello') !== null){
       document.getElementById('hello').remove();
      }
}

 function F2() {
var fileInput= document.getElementById("formFile")
var filePath = fileInput.value;
 var allowedExtensions = 
                    /(.txt)$/i;
if (!allowedExtensions.exec(filePath)) {
                alert('Invalid file type');
                fileInput.value = '';
                return false;
    }                
else {
 var fileInstance= new FileReader()
  
  fileInstance.onload= function() {
    document.getElementById("line").innerHTML=fileInstance.result
    apiHit(fileInstance.result)
  }
fileInstance.readAsText(this.files[0])
 
 }
 }
function apiHit(inp) {
 
inputToApi=(inp.split(" ")).join('+');
//console.log(inputToApi)
url="https://api.textgears.com/spelling?key=pFpSr9WJcvRmmAp3&text="+inputToApi+"&language=en-GB"
    x=fetch(url)
    x.then(res=>res.json()).then(data => { 
    y=Object.values(data["response"])
     misspeltaArray=[], z=[] ,offset=[]
    for(let i=0;i<y[1].length;i++) {
  // console.log((y[1][i]["bad"]))
    misspeltaArray[i]=y[1][i]["bad"]
    z[i]=(y[1][i]["better"][1])
     offset[i]=y[1][i]["offset"] }
    //console.log(offset)
    //
    len=misspeltaArray.length;
   
     res=[]
 for(let i=0;i<misspeltaArray.length;i++)
    {
       var zee='<span onclick="suggestions(this)" id="'+ i +'" class="'+i+'">'+ misspeltaArray[i] +'</span>'
      //console.log(zee)
      res[0]=inp.substring(0,offset[0])
      res[i+1]=inp.substring(offset[i],offset[i+1]).replace(misspeltaArray[i],zee)  
}
document.getElementById('line').innerHTML=res.join('')
}
).catch((e)=> {
var res
 
   
    }
) }

function suggestions(peer) {
  identifer=peer;
  //console.log(peer.id)
       var yelow=" "
       if(document.getElementById('hello') !== null){
       document.getElementById('hello').remove();
      }
        for(let j=0;j<y[1][identifer.id]["better"].length;j++) {
         p= y[1][identifer.id]["better"][j]
        //console.log(x)
       yelow+="<li class='list-group-item list-group-item-action list-group-item-info' onclick='display(this,event)'>"+ p.toLowerCase() +"</li>"
              } 
 suggestionList='<div id="hello"  style="z-index:50">'+"<ul class='list-group'  >"+yelow+"</ul>"+"</div>"
 

     hello=document.getElementById('hello')
    document.getElementById(identifer.id).innerHTML=document.getElementById(identifer.id).innerHTML+ suggestionList;
    sugPos (document.getElementById('hello'),event.pageX, event.pageY)
}


   function display(selectedWord,event) { 
document.getElementById(identifer.className).innerHTML=selectedWord.innerHTML; document.getElementById(identifer.id).style.backgroundColor="white"; document.getElementById(identifer.id).removeEventListener("onclick",display)
    event.stopPropagation();
}

function sugPos(a,x,y){
    a.style.left=x+'px';
    a.style.top=y+'px';
}