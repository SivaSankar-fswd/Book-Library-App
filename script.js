var addbtn=document.getElementById("add-pop-btn");

var overlay=document.querySelector(".overlay");
var popup=document.querySelector(".popup");

addbtn.addEventListener("click",function(){
   overlay.style.display="block";
   popup.style.display="block";
})

var canbtn=document.getElementById("cancel");

canbtn.addEventListener("click",function(){
   overlay.style.display="none";
   popup.style.display="none";
})
// selecting container,add-btn, inputs,textarea
var container=document.querySelector(".container");
var addBook=document.getElementById("add-book");
var bookTitle=document.getElementById("book-title");
var bookAuthor=document.getElementById("book-author");
var bookDescription=document.getElementById("book-description");

addBook.addEventListener("click",function(event){
   event.preventDefault();
   var div=document.createElement("div");
   div.setAttribute("class","book-container");
   div.innerHTML=`<h2>${bookTitle.value}</h2>
                 <h5>${bookAuthor.value}</h5>
                 <p>${bookDescription.value}</p>
                 <button id="delete-btn" onclick='deletebtn(event)'>Delete</button>`;
   container.append(div);
   overlay.style.display="none";
   popup.style.display="none";
   bookTitle.value="";
   bookAuthor.value="";
   bookDescription.value="";
})
function deletebtn(event){
   event.target.parentElement.remove()

}