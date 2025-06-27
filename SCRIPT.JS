// Sample book data
let books = [
    {
        id: 1,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        price: 12.99,
        category: "mystery",
        description: "A psychological thriller about a woman who shoots her husband and then stops speaking.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true,
        bestseller: true
    },
    {
        id: 2,
        title: "Educated",
        author: "Tara Westover",
        price: 14.95,
        category: "biography",
        description: "A memoir about a woman who leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true,
        bestseller: true
    },
    {
        id: 3,
        title: "Dune",
        author: "Frank Herbert",
        price: 9.99,
        category: "science-fiction",
        description: "A science fiction novel about a desert planet and the boy who would become its messiah.",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: false,
        bestseller: true
    },
    {
        id: 4,
        title: "The Midnight Library",
        author: "Matt Haig",
        price: 13.50,
        category: "fiction",
        description: "A novel about a library between life and death where each book represents a different life path.",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true,
        bestseller: false
    },
    {
        id: 5,
        title: "Atomic Habits",
        author: "James Clear",
        price: 11.99,
        category: "non-fiction",
        description: "A guide to building good habits and breaking bad ones with tiny changes.",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: false,
        bestseller: true
    },
    {
        id: 6,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 10.25,
        category: "fantasy",
        description: "A fantasy novel about a hobbit who goes on an adventure to win a share of a dragon's treasure.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        featured: true,
        bestseller: false
    }
];

// DOM Elements
const featuredBooksContainer = document.getElementById('featuredBooks');
const bestsellerBooksContainer = document.getElementById('bestsellerBooks');
const bookModal = document.getElementById('bookModal');
const addBookBtn = document.getElementById('addBookBtn');
const closeModal = document.getElementById('closeModal');
const bookForm = document.getElementById('bookForm');

// Initialize the app
function init() {
    renderBooks();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    addBookBtn.addEventListener('click', () => {
        bookModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        bookModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === bookModal) {
            bookModal.style.display = 'none';
        }
    });

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewBook();
    });
}

// Render books to the page
function renderBooks() {
    featuredBooksContainer.innerHTML = '';
    bestsellerBooksContainer.innerHTML = '';

    const featuredBooks = books.filter(book => book.featured);
    const bestsellerBooks = books.filter(book => book.bestseller);

    featuredBooks.forEach(book => {
        featuredBooksContainer.appendChild(createBookCard(book));
    });

    bestsellerBooks.forEach(book => {
        bestsellerBooksContainer.appendChild(createBookCard(book));
    });
}

// Create book card element
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
        <div class="book-img">
            <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">By ${book.author}</p>
            <p class="book-price">$${book.price.toFixed(2)}</p>
            <div class="book-actions">
                <button class="btn btn-sm">View Details</button>
                <button class="btn btn-sm btn-danger" data-id="${book.id}">Add to Cart</button>
            </div>
        </div>
    `;

    // Add event listener to Add to Cart button
    const addToCartBtn = card.querySelector('.btn-danger');
    addToCartBtn.addEventListener('click', () => {
        alert(`Added "${book.title}" to your cart!`);
    });

    return card;
}

// Add new book
function addNewBook() {
    const newBook = {
        id: Date.now(),
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        price: parseFloat(document.getElementById('bookPrice').value),
        category: document.getElementById('bookCategory').value,
        description: document.getElementById('bookDescription').value,
        image: document.getElementById('bookImage').value,
        featured: true,
        bestseller: false
    };

    books.push(newBook);
    renderBooks();
    bookModal.style.display = 'none';
    bookForm.reset();
    alert('Book added successfully!');
}

// Initialize the application
init();
