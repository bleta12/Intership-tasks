class Book {
  constructor(title, author, isAvailable, ratings) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
    this.ratings = ratings;
  }
}


class Library {
  constructor() {
    this.books = [];
  }

  addBook = (book) => {
    this.books.push(book);
  }

  removeBook = (book) => {
    this.books = this.books.filter(b => b.title !== book.title);
  }

  toggleAvailability(title) {
    this.books = this.books.map(b => {
      if (b.title === title) {
        return { ...b, isAvailable: !b.isAvailable };
      }
      return b;
    });
  }

  addRating(title, rating) {
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    this.books = this.books.map(b => {
      if (b.title === title) {
        return {
          ...b,
          ratings: [...b.ratings, rating],
        };
      }
      return b;
    });
  }

  getAverageRating(title) {
    const book = this.books.find(b => b.title === title);
    if (!book) return null;
    if (!book.ratings || book.ratings.length === 0) return 0;

    const sum = book.ratings.reduce((total, rating) => total + rating, 0);
    return sum / book.ratings.length;
  }

  getAvailableBooks() {
    return this.books.filter(book => book.isAvailable);
  }
}

const library = new Library();
let showAvailableOnly = false;

const addBookForm = document.getElementById('addBookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const bookList = document.getElementById('bookList');

const totalBooks = document.getElementById('totalBooks');
const availableBooks = document.getElementById('availableBooks');
const topRatedBook = document.getElementById('topRatedBook');
const filterAvailableBtn = document.getElementById('filterAvailable');

addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  if (!title || !author) return;

  const book = new Book(title, author, true, []);
  library.addBook(book);

  titleInput.value = '';
  authorInput.value = '';

  renderBooks();
});

filterAvailableBtn.addEventListener('click', () => {
  showAvailableOnly = !showAvailableOnly;
  filterAvailableBtn.textContent = showAvailableOnly ? "Show All" : "Show Available Only";
  renderBooks();
});

function renderBooks() {
  bookList.innerHTML = '';

  let booksToShow = showAvailableOnly ? library.getAvailableBooks() : library.books;

  booksToShow.sort((a, b) => {
    return library.getAverageRating(b.title) - library.getAverageRating(a.title);
  });

  booksToShow.forEach(book => {
    const div = document.createElement('div');
    div.className = `book ${book.isAvailable ? 'available' : 'unavailable'}`;

    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Available: ${book.isAvailable ? "Yes" : "No"}</p>
      <p>Average Rating: ${library.getAverageRating(book.title).toFixed(2)}</p>
      <div class="rating-input">
        <input type="number" min="1" max="5" placeholder="1-5" class="rating-field" />
        <button class="add-rating-btn">Add Rating</button>
      </div>
      <button class="toggle-btn">Toggle Availability</button>
      <button class="remove-btn">Remove Book</button>
    `;

    div.querySelector('.toggle-btn').addEventListener('click', () => {
      library.toggleAvailability(book.title);
      renderBooks();
    });

    const ratingInput = div.querySelector('.rating-field');
    div.querySelector('.add-rating-btn').addEventListener('click', () => {
      const rating = parseFloat(ratingInput.value);
      if (!isNaN(rating) && rating >= 1 && rating <= 5) {
        library.addRating(book.title, rating);
        renderBooks();
      } else {
        alert('Please enter a valid rating between 1 and 5.');
      }
    });

    div.querySelector('.remove-btn').addEventListener('click', () => {
      library.removeBook(book);
      renderBooks();
    });

    bookList.appendChild(div);
  });

  totalBooks.textContent = library.books.length;
  availableBooks.textContent = library.getAvailableBooks().length;

  const sortedByRating = [...library.books].sort(
    (a, b) => library.getAverageRating(b.title) - library.getAverageRating(a.title)
  );
  topRatedBook.textContent = sortedByRating[0]
    ? `${sortedByRating[0].title} (${library.getAverageRating(sortedByRating[0].title).toFixed(2)})`
    : "N/A";
}

renderBooks();
