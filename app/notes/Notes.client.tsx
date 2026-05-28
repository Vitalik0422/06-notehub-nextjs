'use client';

import css from './Notes.module.css';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState, type ChangeEvent } from 'react';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import Pagination from '@/components/Pagination/Pagination';
import InfoMessage from '@/components/InformMessage/InfoMessage';

const NotesClient = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [search] = useDebounce(searchQuery.trim(), 1000);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });

  const handleSearchNoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const openModal = () => {
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };
  //boolean const
  const isSearchFetching = searchQuery.length > 0 && isFetching;
  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    if (page < totalPages) {
      queryClient.prefetchQuery({
        queryKey: ['notes', search, page + 1],
        queryFn: () => fetchNotes(search, page + 1),
      });
    }
  }, [page, search, totalPages, queryClient]);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          searchValue={searchQuery}
          handleSearchNoteInput={handleSearchNoteInput}
          isLoading={isSearchFetching}
        />

        {totalPages > 1 && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
        <button className={css.button} onClick={openModal}>
          Створити нотатку +
        </button>
      </div>
      <main>
        {isLoading ? (
          <p>Loading, please wait...</p>
        ) : data && data.notes.length > 0 ? (
          <NoteList notes={data.notes} />
        ) : (
          <InfoMessage />
        )}
      </main>
      {isVisibleModal && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
};

export default NotesClient;
