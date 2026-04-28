var addbtn = document.getElementById("add-pop-btn");
var overlay = document.querySelector(".overlay");
var popup = document.querySelector(".popup");

function showPopup() {
    overlay.style.display = "block";
    popup.style.display = "block";
    // Trigger reflow to ensure the transition works
    void popup.offsetWidth;
    overlay.classList.add("show");
    popup.classList.add("show");
}

function hidePopup() {
    overlay.classList.remove("show");
    popup.classList.remove("show");
    // Wait for transition to finish before hiding
    setTimeout(() => {
        overlay.style.display = "none";
        popup.style.display = "none";
    }, 400);
}

addbtn.addEventListener("click", showPopup);

var canbtn = document.getElementById("cancel");
canbtn.addEventListener("click", hidePopup);

// selecting container, add-btn, inputs, textarea
var container = document.querySelector(".container");
var addBook = document.getElementById("add-book");
var bookTitle = document.getElementById("book-title");
var bookAuthor = document.getElementById("book-author");
var bookDescription = document.getElementById("book-description");

addBook.addEventListener("click", function (event) {
    event.preventDefault();
    
    if (!bookTitle.value || !bookAuthor.value || !bookDescription.value) {
        alert("Please fill all fields");
        return;
    }

    var div = document.createElement("div");
    div.setAttribute("class", "book-container");
    div.innerHTML = `<h2>${bookTitle.value}</h2>
                 <h5>${bookAuthor.value}</h5>
                 <p>${bookDescription.value}</p>
                 <button class="delete-btn" onclick='deletebtn(event)'>Delete</button>`;
    container.append(div);
    
    hidePopup();
    
    // Clear inputs
    bookTitle.value = "";
    bookAuthor.value = "";
    bookDescription.value = "";
});

function deletebtn(event) {
    const card = event.target.closest(".book-container");
    card.style.opacity = "0";
    card.style.transform = "scale(0.8)";
    setTimeout(() => {
        card.remove();
    }, 300);
}