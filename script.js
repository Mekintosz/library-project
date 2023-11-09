let myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const book1 = new Book("Beksinski Fotografia", "Wieslaw Banach", 64, "read");
const book2 = new Book("Alexander Lowen", "Radość", 327, "reading");
const book3 = new Book("Iron John", "Robert Bly", 264, "unread");

function createBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = radioStatus(title);
  let newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  createBookCard();
}

function removeBook(book) {
  let bookToRemove = myLibrary.findIndex((x) => x.title == book);
  myLibrary.splice(bookToRemove, 1);
  createBookCard();
}

function createBookCard() {
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
  if(statusB == "read") {
    myLibrary[bookToChange].status = "unread";
    createBookCard();
    return;
  } else if (statusB == "unread") {
    myLibrary[bookToChange].status = "reading";
    createBookCard();
    return
  } else {
    myLibrary[bookToChange].status = "read";
    createBookCard();
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

    // const radioContainer = document.createElement('div');
    // card.appendChild(radioContainer);
    // radioContainer.setAttribute("class", "radio-container");

    // const radioContainerRead = document.createElement('div');
    // radioContainer.appendChild(radioContainerRead);
    // radioContainerRead.setAttribute("class", "radio-div");

    // const labelRead = document.createElement('label');
    // labelRead.htmlFor = 'read';
    // radioContainerRead.appendChild(labelRead);
    // const textL1 = document.createTextNode("Read");
    // labelRead.appendChild(textL1);

    // const radioRead = document.createElement("input");
    // radioRead.type = 'radio';
    // radioRead.id = 'read';
    // radioRead.value = 'read';
    // radioRead.checked = book.status == 'read';
    // radioRead.name = `${book.title}`;
    // radioContainerRead.appendChild(radioRead);

    // const radioContainerUnRead = document.createElement('div');
    // radioContainer.appendChild(radioContainerUnRead);
    // radioContainerUnRead.setAttribute("class", "radio-div");

    // const labelUnRead = document.createElement('label');
    // labelUnRead.htmlFor = 'unread';
    // radioContainerUnRead.appendChild(labelUnRead);
    // const textL2 = document.createTextNode("Unread");
    // labelUnRead.appendChild(textL2);

    // const radioUnRead = document.createElement("input");
    // radioUnRead.type = 'radio';
    // radioUnRead.id = 'unread';
    // radioUnRead.value = 'unread';
    // radioUnRead.checked = book.status == 'unread';
    // radioUnRead.name = `${book.title}`;
    // radioContainerUnRead.appendChild(radioUnRead);

    // const radioContainerReading = document.createElement('div');
    // radioContainer.appendChild(radioContainerReading);
    // radioContainerReading.setAttribute("class", "radio-div");

    // const labelReading = document.createElement('label')
    // labelReading.htmlFor = 'reading';
    // radioContainerReading.appendChild(labelReading);
    // const textL3 = document.createTextNode("Reading");
    // labelReading.appendChild(textL3);

    // const radioReading = document.createElement("input");
    // radioReading.type = 'radio';
    // radioReading.id = 'reading';
    // radioReading.value = 'reading';
    // radioReading.checked = book.status == 'reading';
    // radioReading.name = `${book.title}`;
    // radioContainerReading.appendChild(radioReading);
    const status = document.createElement("p");
    const statusText = document.createTextNode(`Status:   ${book.status}`);
    card.appendChild(status);
    status.appendChild(statusText);

    const changeStatusButton = document.createElement("button");
    changeStatusButton.innerText = "Change status";
    card.appendChild(changeStatusButton);
    changeStatusButton.addEventListener("click", () => changeStatus(book.title, book.status));

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove book";
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

// let radioStatus = document.getElementsByName("status")
// radioStatus.addEventListener("click",() => )

createLibraryCards();
