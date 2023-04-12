const library = document.querySelector(".library");
const container = document.querySelector(".container");
const form = document.querySelector("#addNewBook");
window.addEventListener("load", startup, false);

let libraryArray = [];

class Library {
    constructor() {
        this.head = null;
    }
    addNode(title, author, pages, read){
        let node = new BookNode(title, author, pages, read);
        let curr;

        if(this.head == null){
            this.head = node;
        }else{
            curr = this.head;

            while(curr.next){
                curr = curr.next;
            }
            curr.next = node;
        }
    }
    removeNode(index){
        let count = 0;
        let temp = this.head;
        let prevNode;

        if(index === 0){
            if(temp !== null){
                temp = temp.next;
                this.head = temp;
            }
        }else if(this.size() > 1) {
            while (count !== index) {
                prevNode = temp;
                temp = temp.next;
                count++;
            }
            prevNode.next = temp.next;
        }else{
            this.head = null;
        }
    }
    displayLastNode(){
        let tempNode = this.head;
        let displayNode;

        while(tempNode){
            displayNode = tempNode;
            tempNode = tempNode.next;
        }
        return displayNode;
    }
    isEmpty(){
        return this.head === null;
    }
    size(){
        let count = 0;
        let node = this.head;
        while(node){
            count++;
            node = node.next;
        }
        return count;
    }
    printList(){
        let node = this.head;
        while(node){
            console.log(node);
            node = node.next;
        }
    }
}

class BookNode {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.next = null;
    }
}

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return (this.title + " by " + this.author + ", " + this.pages + " pages") + (!(this.read) ? ", not read." : ", read");
    }
}

let bookList = new Library();

function addToLibrary(BookNode){
    //libraryArray.push(Book);
    bookList.addNode(BookNode);
    buildLibrary();
    displayBook();
}

function displayBook(){
    const book = document.querySelector(".library > :last-child");

    book.children[1].textContent = bookList.displayLastNode().title;
    book.children[2].textContent = bookList.displayLastNode().author;
    book.children[3].textContent = bookList.displayLastNode().pages;
    console.log(bookList.displayLastNode());
    //
    // book.children[1].textContent = libraryArray[libraryArray.length - 1].title;
    // book.children[2].textContent = libraryArray[libraryArray.length - 1].author;
    // book.children[3].textContent = libraryArray[libraryArray.length - 1].pages;


    // let i = 0;
    // for(const bk of library.children){
    //     // bk.firstElementChild.textContent = libraryArray[i].title;
    //     // bk.firstElementChild.nextElementSibling.textContent = libraryArray[i].author;
    //     // bk.lastElementChild.textContent = libraryArray[i].pages;
    //     i++;
    // }
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
    let removeImg = document.createElement("img");
    removeImg.className = "remove-book icon";
    removeImg.alt = "Remove Book";
    removeImg.src = "images/close-thick.svg";

    bookDiv.appendChild(removeImg);
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
    closeButton();
}

function closeButton(){
    const closeIcon = document.querySelector(".close");
    closeIcon.addEventListener("click", () => {
        closeForm();
    })
}

function errorMessage(input){
    const isRequired = " is required.";
    let error = document.createElement("p");
    error.className = "errorMessage";
    error.textContent = input.charAt(0).toUpperCase() + input.slice(1) + `${isRequired}`;
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
            //const book = new Book(form.elements["title"].value, form.elements["author"].value, form.elements["pages"].value, notRead);
            //addToLibrary(book);
            const node = new BookNode(form.elements["title"].value, form.elements["author"].value, form.elements["pages"].value, notRead);
            bookList.addNode(node);
        }
    });
}

function showForm(){
    const popup = document.querySelector(".popupForm");
    popup.style.visibility = "visible";
}

function closeForm(){
    const popup = document.querySelector(".popupForm");
    popup.style.visibility = "hidden";
}

function startup() {
    // buildLibrary();
    createAddButton();
    submitForm();
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const theMidnightLibrary = new Book("The Midnight Library", "Matt Haig", 304, false);
const aManCalledOve = new Book("A Man Called Ove", "Fredrik Backman", 368, false);
// const theMartian = new Book("The Martian", "Andy Weir", 369, false);
// const becoming = new Book("Becoming", "Michelle Obama", 448, false);
// const theHatchet = new Book("The Hatchet", "Gary Paulsen", 195, false);
//const aPromisedLand = new Book("A Promised Land", "Barack Obama", 768, false);

// addToLibrary(theHobbit);
// addToLibrary(theMidnightLibrary);
// addToLibrary(aManCalledOve);
// addToLibrary(theMartian);
// addToLibrary(becoming);
// addToLibrary(theHatchet);
//addToLibrary(aPromisedLand);

// console.log(theHobbit.info());

const theHobbitNode = new BookNode("The Hobbit", "J.R.R. Tolkien", 295, false);
const theMidnightLibraryNode = new BookNode("The Midnight Library", "Matt Haig", 304, false);
const aManCalledOveNode = new BookNode("A Man Called Ove", "Fredrik Backman", 368, false);

addToLibrary(theHobbitNode);
addToLibrary(theMidnightLibraryNode);
addToLibrary(aManCalledOveNode);

