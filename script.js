let myLibrary = [];
const booksDiv = document.querySelector(".books");
const newBookBtn = document.querySelector(".new-book");
const newBookForm = document.querySelector(".book-form");
const submitBookBtn = document.querySelector(".add-book");
const closeFormBtn = document.querySelector(".close-form");

newBookBtn.addEventListener("click", () => {
    newBookForm.classList.remove("hiden");
});
newBookForm.addEventListener("submit", function(e) {createBook(e)});
closeFormBtn.addEventListener("click", () => hideForm());

const siddharta = new Book("Siddharta", "Herman Hesse", 152, true);
addBookToLibrary(siddharta);
const demian = new Book("Demian", "Herman Hesse", 362, true);
addBookToLibrary(demian);
const knulp = new Book("Knulp", "Herman Hesse", 220, false);
addBookToLibrary(knulp);

displayBooks();

function Book(title, author, numPages, readed) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readed = readed;
    this.index = myLibrary.length;
}

Book.prototype.toggleReaded = function() {
    this.readed = (this.readed) ? false : true;
    console.log(this.readed);
}

function createBook(e) {
    e.preventDefault();
    const data = new FormData(newBookForm);
    const bookInfo = {};
    for (let [name, value] of data) {
        bookInfo[name] = value;
    }
    
    const newBook = new Book(bookInfo.title, bookInfo.author, bookInfo.numPages,
        bookInfo.readed);
    addBookToLibrary(newBook);
    displayBooks();
    hideForm();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    removeChilds(booksDiv);
    for (book of myLibrary) {
        if (book === "") continue;

        const article = document.createElement("article")
        article.className = "book";
        article.dataset.index = book.index;
        
        const titleDiv = document.createElement("div");
        titleDiv.className = "title";
        const authorDiv = document.createElement("div");
        authorDiv.className = "author";
        const numPagesDiv = document.createElement("div");
        numPagesDiv.className = "numPages";
        const readedDiv = document.createElement("div");
        readedDiv.className = "readed";
        
        const titleName = document.createElement("h4");
        titleName.textContent = "Title:";
        const authorName = document.createElement("h4");
        authorName.textContent = "Author:";
        const numPagesName = document.createElement("h4");
        numPagesName.textContent = "Number of pages:";
        const readedName = document.createElement("h4");
        readedName.textContent = "Readed:";

        const readedBtn = document.createElement("button");
        readedBtn.type = "button";
        readedBtn.className = "readed-book-btn";
        readedBtn.addEventListener("click", function(e) {changeBookReadStatus(e)});
        readedBtn.textContent = "change";
        
        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.className = "delete-book-btn";
        deleteBookBtn.textContent = "x";
        deleteBookBtn.type = "button";
        deleteBookBtn.addEventListener("click", function(e) {deleteBook(e)});

        const titleValue = document.createElement("p");
        titleValue.textContent = book.title;
        const authorValue = document.createElement("p");
        authorValue.textContent = book.author;
        const numPagesValue = document.createElement("p");
        numPagesValue.textContent = book.numPages;
        const readedValue = document.createElement("p");
        readedValue.textContent = book.readed;

        titleDiv.append(titleName, titleValue);
        authorDiv.append(authorName, authorValue);
        numPagesDiv.append(numPagesName, numPagesValue);
        readedDiv.append(readedName, readedValue, readedBtn);
        
        article.append(titleDiv, authorDiv, numPagesDiv, readedDiv, deleteBookBtn);
        booksDiv.appendChild(article);
    }
}

function hideForm() {
    newBookForm.classList.add("hiden");
}

function removeChilds(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function deleteBook(event) {
    let bookIdx = event.target.parentNode.dataset.index;
    myLibrary[bookIdx] = "";
    displayBooks();
}

function changeBookReadStatus(event) {
    let bookIdx = event.target.parentNode.parentNode.dataset.index;
    let book = myLibrary[bookIdx];
    book.toggleReaded();
    event.target.previousSibling.textContent = book.readed;
}