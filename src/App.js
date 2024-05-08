import React, { useState, useEffect } from 'react';
import MarkdownInput from './MarkDownInput';
import NoteDisplay from './NoteDisplay';
import './App.css'; // Importation du fichier CSS

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [creatingNewNote, setCreatingNewNote] = useState(false);

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  const handleSaveNote = (note) => {
    let updatedNotes;
    if (selectedNote) {
      updatedNotes = notes.map((n, index) => (index === selectedNote.index ? note : n));
    } else {
      updatedNotes = [...notes, note];
    }
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    // Mettre à jour selectedNote si la note modifiée est la note sélectionnée
    if (selectedNote && selectedNote.index === note.index) {
      setSelectedNote({ ...note });
    }
  };

  const handleNoteClick = (index) => {
    setSelectedNote({ ...notes[index], index });
    setCreatingNewNote(false);
  };

  const handleNewNoteClick = () => {
    setSelectedNote(null);
    setCreatingNewNote(true);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <button onClick={handleNewNoteClick}>Nouvelle Note</button>
        <ul className="note-list">
          {notes.map((note, index) => (
            <li key={index} onClick={() => handleNoteClick(index)}>
              <strong className='text-danger'>{note.title}</strong>
              <p>{note.content.slice(0, 200)}...</p> 
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h1>Mon Bloc-notes</h1>
        <div className="content-wrapper">
          {creatingNewNote || selectedNote ? (
            <div className='d-flex row'>
              <NoteDisplay title={selectedNote?.title} markdownValue={selectedNote.content} />
              <MarkdownInput onSave={handleSaveNote} selectedNote={selectedNote} />
            </div>
          ) : (
            <div>
              <p>Sélectionnez une note existante ou créez une nouvelle note.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
