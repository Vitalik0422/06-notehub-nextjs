import { Note } from '@/types/note';
import css from './NoteItem.module.css';
import Link from 'next/link';

interface NoteItemProps {
  note: Note;
  handleDeleteNote: (id: string) => void;
}

const NoteItem = ({
  note: { title, content, tag, id },
  handleDeleteNote,
}: NoteItemProps) => {
  const handleDeleteClick = () => {
    handleDeleteNote(id);
  };
  return (
    <>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <Link href={`/notes/${id}`} className={css.viewButton}>
          View Details
        </Link>
        <button className={css.button} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </>
  );
};

export default NoteItem;
