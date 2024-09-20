const express = require('express');
const app = express();
const PORT = 3000;

// Array untuk menyimpan data buku
let books = [
  { id: 1, title: 'Book One', author: 'Author One' },
  { id: 2, title: 'Book Two', author: 'Author Two' },
];

// Middleware untuk logging setiap request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Set view engine ke EJS
app.set('view engine', 'ejs');

// Middleware untuk parsing body dari request POST
app.use(express.urlencoded({ extended: true }));

// Route: Menampilkan daftar buku
app.get('/', (req, res) => {
  res.render('index', { books });
});

// Route: Menampilkan form untuk menambahkan buku baru
app.get('/add-book', (req, res) => {
  res.render('add-book');
});

// Route: Menambahkan buku baru
app.post('/add-book', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.redirect('/');
});

// Route: Menghapus buku
app.post('/delete-book/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter(book => book.id != id);
  res.redirect('/');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
