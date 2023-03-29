const library = document.querySelector(".library");
window.addEventListener("load", startup, false);

let libraryArray = [];

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
    console.log(libraryArray);
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

function startup() {
    // buildLibrary();
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theMidnightLibrary = new Book("The Midnight Library", "Matt Haig", 304, false);
const aManCalledOve = new Book("A Man Called Ove", "Fredrik Backman", 368, false);
const theMartian = new Book("The Martian", "Andy Weir", 369, false);
const becoming = new Book("Becoming", "Michelle Obama", 448, false);
const theHatchet = new Book("The Hatchet", "Gary Paulsen", 195, false);

addToLibrary(theHobbit);
addToLibrary(theMidnightLibrary);
addToLibrary(aManCalledOve);
addToLibrary(theMartian);
addToLibrary(becoming);
addToLibrary(theHatchet);

// console.log(theHobbit.info());

