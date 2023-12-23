class Book {
  constructor (title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  }

  changeStatus() {
    if(this.status == "Read it") {
      this.status = "Not read";
      return;
    } else if (this.status == "Not read") {
      this.status = "Just reading";
      return
    } else {
      this.status = "Read it";
    }
  }
}

class Library {
  constructor() {
  this.shelf = [];
  }

  addBook(newBook) {
    this.shelf.push(newBook)
  }

  removeBook(book) {
    let bookToRemove = this.shelf.findIndex((x) => x.title == book);
    this.shelf.splice(bookToRemove, 1);
  }
}

const myLibrary = new Library;

const book1 = new Book("Beksinski Fotografia", "Wieslaw Banach", 64, "Read it");
const book2 = new Book("Alexander Lowen", "Radość", 327, "Just reading");
const book3 = new Book("Iron John", "Robert Bly", 264, "Not read");

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = radioStatus(title);
  let newBook = new Book(title, author, pages, status);
  myLibrary.addBook(newBook);
  updateBookCards();
}

function updateBookCards() {
  removeLibraryCards();
  renderLibraryCards();
}

function radioStatus() {
  let status = document.getElementsByName("status");
  let checkedRadio = Array.from(status).find((radio) => radio.checked);
  return checkedRadio.value;
}

function openAddBookModal() {
  addBookForm.reset();
  modal.classList.add("active");
  overlay.classList.add("active");
}

// ------Modal------
const openModal = document.getElementById("addBookBtn");
const modal = document.getElementById("BookModal");
const overlay = document.getElementById("overlay");
const closeModalButton = document.getElementById("closeModalButton");

openModal.addEventListener("click", () => openAddBookModal());
overlay.addEventListener("click", () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

closeModalButton.addEventListener("click", () => {
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

function renderLibraryCards() {
  for (let book of myLibrary.shelf) {
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

    const statusContainer = document.createElement("div");
    statusContainer.setAttribute("class", "status-container");
    card.appendChild(statusContainer);

    const status = document.createElement("p");
    const statusText = document.createTextNode(`Status:   ${book.status}`);
    statusContainer.appendChild(status);
    status.appendChild(statusText);

    const changeStatusButton = document.createElement("button");
    changeStatusButton.innerText = "Change status";
    changeStatusButton.setAttribute("class", "change-status-button")
    statusContainer.appendChild(changeStatusButton);
    changeStatusButton.addEventListener("click", () => {book.changeStatus();
    updateBookCards();
    });

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove book";
    removeButton.setAttribute("class", "remove-button")
    card.appendChild(removeButton);
    removeButton.addEventListener("click", () => {myLibrary.removeBook(book.title); updateBookCards();});

    document.getElementById("library").appendChild(card);
  }
};

(function renderAddBookBtn() {
  createButton = document.getElementById("createBook");
  createButton.addEventListener("click", function (event) {
    event.preventDefault()
  });
  createButton.addEventListener("click", () => createBook());
})();

renderLibraryCards();
