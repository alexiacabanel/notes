// MarkdownInput.js
import React, { useState, useEffect } from 'react';

const MarkdownInput = ({ onSave, selectedNote }) => {
  const [note, setNote] = useState({ title: '', content: '' });

  useEffect(() => {
    // Met à jour la note lorsqu'une note est sélectionnée
    if (selectedNote) {
      setNote({ ...selectedNote });
    } else {
      setNote({ title: '', content: '' });
    }
  }, [selectedNote]);

  const handleTitleChange = (event) => {
    setNote({ ...note, title: event.target.value });
  };

  const handleInputChange = (event) => {
    setNote({ ...note, content: event.target.value });
  };

  const handleSave = () => {
    onSave(note);
  };

  return (
    <div className='d-flex mt-5'>
        <div className='row'>
      <input
        type="text"
        placeholder="Titre de la note"
        value={note.title}
        onChange={handleTitleChange}
      />
      <textarea
        value={note.content}
        onChange={handleInputChange}
        rows={10}
        cols={50}
      />
      <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default MarkdownInput;
