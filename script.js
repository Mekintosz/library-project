let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = () => radioStatus();
}

function addBookToLibrary(book) {
    myLibrary.push(book)
  }

const book1 = new Book("Beksinski Fotografia", "Wieslaw Banach", 64)
const book2 = new Book("Alexander Lowen", "Radość", 327)
const book3 = new Book("Iron John", "Robert Bly", 264)

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function createLibraryCards() {

  // const card = document.createElement("div");
  for (let book of myLibrary) {
    const card = document.createElement("div");
    card.setAttribute("class", "card")

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
    
    const radioContainer = document.createElement('div'); 
    card.appendChild(radioContainer);
    radioContainer.setAttribute("class", "radio-container");

    const radioContainerRead = document.createElement('div'); 
    radioContainer.appendChild(radioContainerRead);
    radioContainerRead.setAttribute("class", "radio-div");

    const labelRead = document.createElement('label');
    labelRead.htmlFor = 'read';
    radioContainerRead.appendChild(labelRead);
    const textL1 = document.createTextNode("Read");
    labelRead.appendChild(textL1);

    const radioRead = document.createElement("input");
    radioRead.type = 'radio';
    radioRead.id = 'read';
    radioRead.value = 'read';
    radioRead.name = `${book.title}`;
    radioContainerRead.appendChild(radioRead);

    const radioContainerUnRead = document.createElement('div'); 
    radioContainer.appendChild(radioContainerUnRead);
    radioContainerUnRead.setAttribute("class", "radio-div");

    const labelUnRead = document.createElement('label');
    labelUnRead.htmlFor = 'unread';
    radioContainerUnRead.appendChild(labelUnRead);
    const textL2 = document.createTextNode("Unread");
    labelUnRead.appendChild(textL2);

    const radioUnRead = document.createElement("input");
    radioUnRead.type = 'radio';
    radioUnRead.id = 'unread';
    radioUnRead.value = 'unread';
    radioUnRead.name = `${book.title}`;
    radioContainerUnRead.appendChild(radioUnRead);
    
    const radioContainerReading = document.createElement('div'); 
    radioContainer.appendChild(radioContainerReading);
    radioContainerReading.setAttribute("class", "radio-div");

    const labelReading = document.createElement('label')
    labelReading.htmlFor = 'reading';
    radioContainerReading.appendChild(labelReading);
    const textL3 = document.createTextNode("Reading");
    labelReading.appendChild(textL3);

    const radioReading = document.createElement("input");
    radioReading.type = 'radio';
    radioReading.id = 'reading';
    radioReading.value = 'reading';
    radioReading.name = `${book.title}`;
    radioContainerReading.appendChild(radioReading);

    const editButton = document.createElement("button")
    editButton.innerText = "Edit book"
    card.appendChild(editButton);

    document.getElementById("library").appendChild(card);
  }
}

createLibraryCards();

// ------Modal------ 
const openModal = document.getElementById("addBookBtn")
const modal = document.getElementById("BookModal")
const overlay = document.getElementById("overlay")

openModal.addEventListener("click", () => addBookModal())
overlay.addEventListener("click", () => {modal.classList.remove("active")
                                        overlay.classList.remove("active")
                                        })

function addBookModal() {
  addBookForm.reset()
  modal.classList.add('active')
  overlay.classList.add('active')
}

// const status = document.getElementsByName("status")
// const title = document.getElementById("title")

function radioStatus() {
  let status = document.getElementsByName("status");
  let checkedRadio = Array.from(status).find(
    (radio) => radio.checked
  );
  return checkedRadio.value
};