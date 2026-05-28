'use client';

import css from './Notes.module.css';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState, type ChangeEvent } from 'react';
// import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import InfoMessage from '@/components/InformMessage/InfoMessage';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import Pagination from '@/components/Pagination/Pagination';

const NotesClient = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [search] = useDebounce(searchQuery, 1000);

  const { data, isFetching } = useQuery({
    queryKey: ['note', search, page],
    queryFn: () => fetchNotes(search, page),
    placeholderData: keepPreviousData,
  });

  const handleSearchNoteInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.trim());
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

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
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
      </header>
      <main>
        {/* {isLoading && isFetching && <Loader />} */}
        {data && data.notes.length > 0 ? (
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
