import NoteItem from '../NoteItem/NoteItem';
import css from './NotesList.module.css';

import { Note } from '@/types/note';
interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes?.map((note) => (
        <li className={css.listItem} key={note.id}>
          <NoteItem note={note} />
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
