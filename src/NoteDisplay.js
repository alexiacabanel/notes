import React from 'react';

const NoteDisplay = ({ title, markdownValue }) => {
  return (
    <div className="note-display">
      <h2>{title}</h2> {/* Affichage du titre de la note */}
      <div dangerouslySetInnerHTML={{ __html: markdownValue }} />
    </div>
  );
};

export default NoteDisplay;
