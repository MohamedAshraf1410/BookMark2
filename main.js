var siteNameInput=document.getElementById("bookmarkName");
var siteUrlInput=document.getElementById("Url")
var regex = /^.{3,}$/;
var urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[^\s]*)?$/;

var links=[];
var counter;
links=JSON.parse(localStorage.getItem('AllLinks'))||[]
display()
function getvalues(){
var site={siteName:siteNameInput.value,
    siteUrl:siteUrlInput.value
}
if(regex.test(site.siteName)&&urlRegex.test(site.siteUrl)){
if(!check2()){    
links.unshift(site)
console.log(links)
siteUrlInput.classList.remove("is-invalid");
siteUrlInput.classList.remove("is-valid");
siteNameInput.classList.remove("is-inavlid");
siteNameInput.classList.remove("is-valid")

display();
localStorage.setItem('AllLinks',JSON.stringify(links))
base();
}
else{
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Already bookmarked this site",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
}
}
else 
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Site Name or Url is not valid, Please follow the rules below :  Site name must contain at least 3 characters Site URL must be a valid one",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
}


function display(){
    var box=""

    for(var i=0;i<links.length;i++){
    box+=`<tr><td>${i+1}</td>
                <td>${links[i].siteName}</td>
                <td><a target="_blank" href="${links[i].siteUrl}"><button class="btn btn1 px-4"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button onclick="Delete(${i})" class="btn btn-danger px-4"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                <td><button onclick="getValue(${i})" class="btn btn-primary px-4">update</button></td>
                </tr>`
            }
            document.getElementById("demo").innerHTML=box;

}
function base(){
    siteNameInput.value="" 
    siteUrlInput.value=""
}
function Delete(index){
links.splice(index,1)
localStorage.setItem('AllLinks',JSON.stringify(links))
display()
}
siteNameInput.addEventListener('input', function () {
   var element=document.getElementById("rule1")
    if (regex.test(siteNameInput.value)) {
        siteNameInput.classList.remove("is-invalid");
        siteNameInput.classList.add("is-valid");
        element.style.display="none"

    } else { 
        siteNameInput.classList.remove("is-valid");
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("form-border")
        element.style.display="block"

    }
});

siteUrlInput.addEventListener('input', function () {
    var element=document.getElementById("rule2")

    if (urlRegex.test(siteUrlInput.value)) {
        siteUrlInput.classList.remove("is-invalid");
        siteUrlInput.classList.add("is-valid");
        element.style.display="none"

    } else {
       
        siteUrlInput.classList.remove("is-valid");
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.remove("form-border")
        element.style.display="block"

    }
});

function Delete(index) {
    links.splice(index, 1);
    localStorage.setItem('AllLinks', JSON.stringify(links));
    display();
}
function check2(){
    for(var i=0;i<links.length;i++){
        if(siteNameInput.value==links[i].siteName||siteUrlInput.value===links[i].siteUrl)
            return true;
    }
}

function getValue(index){
counter=index                                                                                                                                        
siteNameInput.value=links[index].siteName
siteUrlInput.value=links[index].siteUrl
document.getElementById('upbutton').style.display='block'
document.getElementById('subbutton').style.display='none'
}
function update(){
    links[counter].siteName=siteNameInput.value
    links[counter].siteUrl=siteUrlInput.value
display()
localStorage.setItem('AllLinks',JSON.stringify(links))
Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500
  });
document.getElementById('upbutton').style.display='none'
document.getElementById('subbutton').style.display='block'


}