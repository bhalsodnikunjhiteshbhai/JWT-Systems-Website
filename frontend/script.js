const API = 'http://localhost:5000/api/notes'; // Change if deployed to Render or other server


// ================== REGISTER ==================
function register(e) {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

fetch('http://localhost:5000/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
    .then(res => res.json())
    .then(data => {
      alert('Registered successfully!');
      window.location.href = 'index.html';
    })
    .catch(err => alert('Registration failed'));
}

// ================== LOGOUT ==================
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'register.html';
}

// ================== NOTE APP ==================
// DOM elements
const noteForm = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const notesList = document.getElementById("notes-list");

// Load notes from localStorage
document.addEventListener("DOMContentLoaded", displayNotes);

// Add a new note
noteForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const noteText = noteInput.value.trim();
  if (noteText !== "") {
    addNote(noteText);
    noteInput.value = "";
  }
});

// Add note to localStorage and display
function addNote(text) {
  const notes = getNotes();
  notes.push(text);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

// Get notes from localStorage
function getNotes() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}

// Display notes on the page
function displayNotes() {
  const notes = getNotes();
  notesList.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.className = "note-item";
    li.innerHTML = `
      ${note}
      <button onclick="deleteNote(${index})" class="delete-btn">Delete</button>
    `;
    notesList.appendChild(li);
  });
}

// Delete a note
function deleteNote(index) {
  const notes = getNotes();
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}
