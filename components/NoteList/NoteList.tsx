import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../lib/api';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (notes.length === 0) return null;

  return (
    <ul className={css.list} suppressHydrationWarning>
      {notes.map(note => (
        <li key={note.id} className={css.listItem} suppressHydrationWarning>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          {}
          <span
            suppressHydrationWarning
            style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '8px' }}
          >
            {note.createdAt}
          </span>

          <div className={css.footer} suppressHydrationWarning>
            <span className={css.tag}>{note.tag}</span>

            <Link href={`/notes/${note.id}`} className={css.detailsLink}>
              View details
            </Link>

            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
