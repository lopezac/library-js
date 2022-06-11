class Book {
    constructor(title, author, numPages, readed, library) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.readed = readed;
        this.index = (library.length) ? library.length : library.library.length;
    }

    toggleReaded() {
        this.readed = (this.readed) ? false : true;
    }
}

class Library {
    constructor() {
        this.library = [];
    }

    createBook(e) {
        e.preventDefault();
        const data = new FormData(newBookForm);
        const bookInfo = {};
        for (let [name, value] of data) {
            bookInfo[name] = value;
        }
        
        const newBook = new Book(bookInfo.title, bookInfo.author, bookInfo.numPages,
            bookInfo.readed, this.library);
        this.addBookToLibrary(newBook);
        this.displayBooks();
        this.hideForm();
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }
    
    displayBooks() {
        this.#removeChilds(booksDiv);
        for (let book of this.library) {
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
            numPagesName.textContent = "N° pages:";
            const readedName = document.createElement("h4");
            readedName.textContent = "Readed:";
    
            
            let instance = this;
            const readedBtn = document.createElement("button");
            readedBtn.type = "button";
            readedBtn.classList.add("readed-book-btn", "btn-icon");
            readedBtn.addEventListener("click", function(e) {
                instance.#changeBookReadStatus(e);
            });
    
            const deleteBookBtn = document.createElement("button");
            deleteBookBtn.classList.add("delete-book-btn", "btn-icon");
            deleteBookBtn.type = "button";
            deleteBookBtn.addEventListener("click", function(e) {
                instance.#deleteBook(e)
            });
    
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
            readedDiv.append(readedName, readedValue);
            
            article.append(titleDiv, authorDiv, numPagesDiv, readedDiv, 
                readedBtn, deleteBookBtn);
            booksDiv.appendChild(article);
        }
    }
    
    hideForm() {
        newBookForm.classList.add("hiden");
    }
    
    #removeChilds(parent) {
        while (parent.lastChild) {
            parent.removeChild(parent.lastChild);
        }
    }
    
    #deleteBook(event) {
        let bookIdx = event.target.parentNode.dataset.index;
        this.library[bookIdx] = "";
        this.displayBooks();
    }
    
    #changeBookReadStatus(event) {
        let bookIdx = event.target.parentNode.dataset.index;
        let book = this.library[bookIdx];
        book.toggleReaded();
        event.target.previousSibling.lastChild.textContent = book.readed;
    }
}

const booksDiv = document.querySelector(".books");
const newBookBtn = document.querySelector(".new-book");
const submitBookBtn = document.querySelector(".add-book");
const myLibrary = new Library;

const siddharta = new Book("Siddharta", "Herman Hesse", 152, true, myLibrary);
myLibrary.addBookToLibrary(siddharta);
const demian = new Book("Demian", "Herman Hesse", 362, true, myLibrary);
myLibrary.addBookToLibrary(demian);
const knulp = new Book("Knulp", "Herman Hesse", 220, false, myLibrary);
myLibrary.addBookToLibrary(knulp);

myLibrary.displayBooks();

const newBookForm = document.querySelector(".book-form");
const closeFormBtn = document.querySelector(".close-form");

newBookBtn.addEventListener("click", () => {
    newBookForm.classList.remove("hiden");
});
newBookForm.addEventListener("submit", function(e) {myLibrary.createBook(e)});
closeFormBtn.addEventListener("click", () => myLibrary.hideForm());