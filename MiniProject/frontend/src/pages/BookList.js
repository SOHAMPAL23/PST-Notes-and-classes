import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookList({ token }) {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: '', year: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books', { headers: { Authorization: `Bearer ${token}` } });
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/books/${editingId}`, form, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post('/api/books', form, { headers: { Authorization: `Bearer ${token}` } });
      }
      setForm({ title: '', author: '', genre: '', year: '' });
      setEditingId(null);
      fetchBooks();
      setError('');
    } catch (err) {
      setError('Failed to save book');
    }
  };

  const handleEdit = book => {
    setForm({ title: book.title, author: book.author, genre: book.genre, year: book.year });
    setEditingId(book._id);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/api/books/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  return (
    <div className="booklist-container">
      <h2>Book Catalog</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} required />
        <input name="year" placeholder="Year" type="number" value={form.year} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Book</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', author: '', genre: '', year: '' }); }}>Cancel</button>}
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <b>{book.title}</b> by {book.author} ({book.genre}, {book.year})
            <button onClick={() => handleEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList; 