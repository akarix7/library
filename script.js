const library = document.querySelector(".library");
const container = document.querySelector(".container");
const form = document.querySelector("#addNewBook");
window.addEventListener("load", startup, false);

let libraryArray = [];

// class Book {
//     constructor(title, author, pages, read) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;
//     }
// }

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return (this.title + " by " + this.author + ", " + this.pages + " pages") + (!(this.read) ? ", not read." : ", read");
    }
}

function addToLibrary(Book){
    libraryArray.push(Book);
    buildLibrary();
    displayBook();
}

function displayBook(){
    let i = 0;
    for(const bk of library.children){
        bk.firstElementChild.textContent = libraryArray[i].title;
        bk.firstElementChild.nextElementSibling.textContent = libraryArray[i].author;
        bk.lastElementChild.textContent = libraryArray[i].pages;
        i++;
    }
}

function buildLibrary(){
    let bookDiv = document.createElement("div");
    bookDiv.className = "book";
    library.appendChild(bookDiv);

    let titleH2 = document.createElement("h2");
    titleH2.className = "title";
    let authorH3 = document.createElement("h3");
    authorH3.className = "author";
    let pages = document.createElement("p");
    pages.className = "pages";

    bookDiv.appendChild(titleH2);
    bookDiv.appendChild(authorH3);
    bookDiv.appendChild(pages);

}

function createAddButton(){
    let button = document.createElement("button");
    button.className = "add";
    button.textContent = "Add Book";
    container.appendChild(button);

    button.addEventListener("click", () => {
        showForm();
    })
}

function errorMessage(input){
    const isRequired = " is required.";
    let error = document.createElement("p");
    error.className = "errorMessage";
    error.textContent = input.charAt(0).toUpperCase() + input.slice(1) + `${isRequired}`
    container.appendChild(error);
}
function validateData(input){
    if(input.value === ""){
        errorMessage(input.name);
        return false;
    }else{
        return true;
    }
    //return input.value === "" ? errorMessage(input.name) : true;
}

function submitForm(){
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if(validateData(form.elements["title"]) &&
            validateData(form.elements["author"]) &&
            validateData(form.elements["pages"])){
            const notRead = form.elements["read"].value !== "no";
            const book = new Book(form.elements["title"].value, form.elements["author"].value, form.elements["pages"].value, notRead);
            addToLibrary(book);
        }
    });
}

function showForm(){
    const popup = document.querySelector(".popupForm");
    popup.hidden = false;
}


function startup() {
    // buildLibrary();
    createAddButton();
    submitForm();
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theMidnightLibrary = new Book("The Midnight Library", "Matt Haig", 304, false);
const aManCalledOve = new Book("A Man Called Ove", "Fredrik Backman", 368, false);
const theMartian = new Book("The Martian", "Andy Weir", 369, false);
const becoming = new Book("Becoming", "Michelle Obama", 448, false);
const theHatchet = new Book("The Hatchet", "Gary Paulsen", 195, false);
//const aPromisedLand = new Book("A Promised Land", "Barack Obama", 768, false);

addToLibrary(theHobbit);
addToLibrary(theMidnightLibrary);
addToLibrary(aManCalledOve);
addToLibrary(theMartian);
addToLibrary(becoming);
addToLibrary(theHatchet);
//addToLibrary(aPromisedLand);

// console.log(theHobbit.info());

