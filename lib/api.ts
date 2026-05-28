import { Note, NoteFormData } from '@/types/types';
import axios from 'axios';

axios.defaults.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
axios.defaults.baseURL = 'https://notehub-public.goit.study/api/';

interface Notes {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search?: string,
  page = 1,
  perPage = 12,
): Promise<Notes> => {
  const params: { page: number; perPage: number; search?: string } = {
    page,
    perPage,
  };

  if (search) {
    params.search = search;
  }

  const response = await axios.get<Notes>(`/notes`, {
    params,
  });
  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await axios.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (note: NoteFormData): Promise<Note> => {
  const response = await axios.post<Note>('/notes', note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`);
  return response.data;
};
