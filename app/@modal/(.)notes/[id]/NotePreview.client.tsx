'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api';
import Modal from '../../../../components/Modal/Modal';
import css from './notepreview.module.css';

const NotePreviewClient = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;
  if (isError || !note) return null;

  return (
    <Modal isOpen={true} onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          {}
          <button type="button" className={css.backBtn} onClick={handleClose}>
            Back
          </button>

          <header className={css.header}>
            <h2>{note.title}</h2>
          </header>

          <span className={css.tag}>{note.tag}</span>

          <p className={css.content}>{note.content}</p>

          <div className={css.date}>{note.createdAt}</div>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
