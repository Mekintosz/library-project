const STATUS_FLOW = ["Read it", "Not read", "Just reading"];
const STORAGE_KEY = "bookshelf:data:v1";

const selectors = {
  addBookButton: document.getElementById("addBookBtn"),
  modal: document.getElementById("BookModal"),
  overlay: document.getElementById("overlay"),
  closeModalButton: document.getElementById("closeModalButton"),
  library: document.getElementById("library"),
  form: document.getElementById("addBookForm"),
  statusDefault: document.getElementById("reading"),
};

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `book-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sanitizeText(value) {
  return value.trim();
}

function normalizePages(pages) {
  const parsed = Number(pages);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function getNextStatus(status) {
  const index = STATUS_FLOW.indexOf(status);
  if (index === -1) {
    return STATUS_FLOW[0];
  }

  return STATUS_FLOW[(index + 1) % STATUS_FLOW.length];
}

class Book {
  constructor({ id = createId(), title, author, pages, status }) {
    this.id = id;
    this.title = sanitizeText(title);
    this.author = sanitizeText(author);
    this.pages = normalizePages(pages);
    this.status = STATUS_FLOW.includes(status) ? status : STATUS_FLOW[0];
  }

  toggleStatus() {
    this.status = getNextStatus(this.status);
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      pages: this.pages,
      status: this.status,
    };
  }
}

class Library {
  constructor(storageKey = STORAGE_KEY) {
    this.storageKey = storageKey;
    this.shelf = [];
  }

  load(defaultBooks = []) {
    const storedBooks = localStorage.getItem(this.storageKey);

    if (!storedBooks) {
      this.shelf = defaultBooks.map((book) => new Book(book));
      this.persist();
      return;
    }

    try {
      const parsed = JSON.parse(storedBooks);
      this.shelf = Array.isArray(parsed)
        ? parsed.map((book) => new Book(book))
        : [];
    } catch (error) {
      console.error("Failed to parse saved library data:", error);
      this.shelf = [];
    }
  }

  persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.shelf));
  }

  add(bookData) {
    const book = bookData instanceof Book ? bookData : new Book(bookData);
    this.shelf.push(book);
    this.persist();
    return book;
  }

  remove(bookId) {
    const previousLength = this.shelf.length;
    this.shelf = this.shelf.filter((book) => book.id !== bookId);

    if (this.shelf.length !== previousLength) {
      this.persist();
      return true;
    }

    return false;
  }

  updateStatus(bookId) {
    const book = this.find(bookId);
    if (!book) {
      return null;
    }

    book.toggleStatus();
    this.persist();
    return book;
  }

  find(bookId) {
    return this.shelf.find((book) => book.id === bookId) ?? null;
  }

  isEmpty() {
    return this.shelf.length === 0;
  }
}

const library = new Library();

const DEFAULT_BOOKS = [
  {
    title: "Beksinski Fotografia",
    author: "Wieslaw Banach",
    pages: 64,
    status: "Read it",
  },
  {
    title: "Alexander Lowen",
    author: "Radość",
    pages: 327,
    status: "Just reading",
  },
  {
    title: "Iron John",
    author: "Robert Bly",
    pages: 264,
    status: "Not read",
  },
];

library.load(DEFAULT_BOOKS);

function openModal() {
  selectors.form.reset();
  selectors.statusDefault.checked = true;
  selectors.modal.classList.add("active");
  selectors.overlay.classList.add("active");
}

function closeModal() {
  selectors.modal.classList.remove("active");
  selectors.overlay.classList.remove("active");
}

function handleOverlayClick() {
  closeModal();
}

function handleEscapeKey(event) {
  if (event.key === "Escape" && selectors.modal.classList.contains("active")) {
    closeModal();
  }
}

function createEmptyState() {
  const emptyState = document.createElement("div");
  emptyState.className = "card empty-state";
  emptyState.innerHTML = `<p>No books on the shelf yet.</p><p>Add your first book to get started!</p>`;
  return emptyState;
}

function createBookCard(book) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.bookId = book.id;

  const title = document.createElement("p");
  title.className = "card-title";
  title.textContent = `"${book.title}"`;

  const author = document.createElement("p");
  author.className = "card-author";
  author.textContent = `by ${book.author}`;

  const pages = document.createElement("p");
  pages.className = "card-pages";
  pages.textContent = `${book.pages} ${book.pages === 1 ? "page" : "pages"}`;

  const statusContainer = document.createElement("div");
  statusContainer.className = "status-container";

  const status = document.createElement("p");
  status.className = "card-status";
  status.textContent = book.status;

  const changeStatusButton = document.createElement("button");
  changeStatusButton.className = "change-status-button";
  changeStatusButton.textContent = "Change status";
  changeStatusButton.dataset.action = "toggle-status";

  statusContainer.append(status, changeStatusButton);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-button";
  removeButton.textContent = "Remove book";
  removeButton.dataset.action = "remove";

  card.append(title, author, pages, statusContainer, removeButton);
  return card;
}

function renderLibrary() {
  selectors.library.innerHTML = "";

  if (library.isEmpty()) {
    selectors.library.appendChild(createEmptyState());
    return;
  }

  const fragment = document.createDocumentFragment();
  library.shelf.forEach((book) => {
    fragment.appendChild(createBookCard(book));
  });
  selectors.library.appendChild(fragment);
}

function handleLibraryClick(event) {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const card = button.closest(".card");
  if (!card) {
    return;
  }

  const { bookId } = card.dataset;
  const { action } = button.dataset;

  if (!bookId || !action) {
    return;
  }

  if (action === "toggle-status") {
    library.updateStatus(bookId);
    renderLibrary();
    return;
  }

  if (action === "remove") {
    library.remove(bookId);
    renderLibrary();
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!selectors.form.reportValidity()) {
    return;
  }

  const formData = new FormData(selectors.form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const status = formData.get("status");

  library.add({ title, author, pages, status });
  renderLibrary();
  closeModal();
}

selectors.addBookButton.addEventListener("click", openModal);
selectors.overlay.addEventListener("click", handleOverlayClick);
selectors.closeModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  closeModal();
});
selectors.library.addEventListener("click", handleLibraryClick);
selectors.form.addEventListener("submit", handleFormSubmit);
document.addEventListener("keydown", handleEscapeKey);

renderLibrary();
