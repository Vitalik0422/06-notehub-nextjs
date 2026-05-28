import { Note } from '@/types/types';
import css from './NoteItem.module.css';
import Link from 'next/link';

interface NoteItemProps {
  note: Note;
}
const NoteItem = ({ note: { title, content, tag, id } }: NoteItemProps) => {
  return (
    <>
      <h2 className={css.title}>{title}</h2>
      <p className={css.content}>{content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <Link href={`/notes/${id}`} className={css.viewButton}>
          View Details
        </Link>
        <button className={css.button}>Delete</button>
      </div>
    </>
  );
};

export default NoteItem;
