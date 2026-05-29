import { useMutation, useQueryClient } from '@tanstack/react-query';
import NoteItem from '../NoteItem/NoteItem';
import css from './NotesList.module.css';

import { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';
import toast from 'react-hot-toast';
interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(`${note.title} was deleted`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };
  return (
    <ul className={css.list}>
      {notes?.map((note) => (
        <li className={css.listItem} key={note.id}>
          <NoteItem note={note} handleDeleteNote={handleDeleteNote} />
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
