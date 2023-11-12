let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const book1 = new Book("Beksinski Fotografia", "Wieslaw Banach", 64, "Read it");
const book2 = new Book("Alexander Lowen", "Radość", 327, "Just reading");
const book3 = new Book("Iron John", "Robert Bly", 264, "Not read");

function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = radioStatus(title);
  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  updateBookCards();
}

function removeBook(book) {
  let bookToRemove = myLibrary.findIndex((x) => x.title == book);
  myLibrary.splice(bookToRemove, 1);
  updateBookCards();
}

function updateBookCards() {
  removeLibraryCards();
  createLibraryCards();
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function radioStatus() {
  let status = document.getElementsByName("status");
  let checkedRadio = Array.from(status).find((radio) => radio.checked);
  return checkedRadio.value;
}

function addBookModal() {
  addBookForm.reset();
  modal.classList.add("active");
  overlay.classList.add("active");
}

function changeStatus(book, statusB) {
  let bookToChange = myLibrary.findIndex((x) => x.title == book);
  if(statusB == "Read it") {
    myLibrary[bookToChange].status = "Not read";
    updateBookCards();
    return;
  } else if (statusB == "Not read") {
    myLibrary[bookToChange].status = "Just reading";
    updateBookCards();
    return
  } else {
    myLibrary[bookToChange].status = "Read it";
    updateBookCards();
  }

}

// ------Modal------
const openModal = document.getElementById("addBookBtn");
const modal = document.getElementById("BookModal");
const overlay = document.getElementById("overlay");

openModal.addEventListener("click", () => addBookModal());
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

function removeLibraryCards() {
  const library = document.getElementById("library");
  const cards = document.getElementsByClassName("card");

  while (cards[0]) {
    library.removeChild(cards[0]);
  }
}

function createLibraryCards() {
  for (let book of myLibrary) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const title = document.createElement("p");
    const titleText = document.createTextNode(`Title:   ${book.title}`);
    card.appendChild(title);
    title.appendChild(titleText);

    const author = document.createElement("p");
    const authorText = document.createTextNode(`Author:   ${book.author}`);
    card.appendChild(author);
    author.appendChild(authorText);

    const pages = document.createElement("p");
    const pagesText = document.createTextNode(`Pages:   ${book.pages}`);
    card.appendChild(pages);
    pages.appendChild(pagesText);

    
    const status = document.createElement("p");
    const statusText = document.createTextNode(`Status:   ${book.status}`);
    card.appendChild(status);
    status.appendChild(statusText);

    const changeStatusButton = document.createElement("button");
    changeStatusButton.innerText = "Change status";
    changeStatusButton.setAttribute("class", "change-status-button")
    card.appendChild(changeStatusButton);
    changeStatusButton.addEventListener("click", () => changeStatus(book.title, book.status));

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove book";
    removeButton.setAttribute("class", "remove-button")
    card.appendChild(removeButton);
    removeButton.addEventListener("click", () => removeBook(book.title));

    document.getElementById("library").appendChild(card);
  }
}

// -------------Create book button--------------
createButton = document.getElementById("createBook");
createButton.addEventListener("click", function (event) {
  event.preventDefault();
});
createButton.addEventListener("click", () => createBook());

createLibraryCards();
