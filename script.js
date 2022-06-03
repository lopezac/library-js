let myLibrary = [];

function Book(title, author, numPages, readed) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readed = readed;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}