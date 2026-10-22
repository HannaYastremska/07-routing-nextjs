import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const notehubApi = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

notehubApi.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<FetchNotesResponse> => {
  const appliedTag = tag && tag !== 'all' ? tag : undefined;

  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      search: search || undefined,
      tag: appliedTag,
    },
  });
  return response.data;
};

export const createNote = async (noteData: CreateNoteDto): Promise<Note> => {
  const response = await notehubApi.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await notehubApi.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await notehubApi.get<Note>(`/notes/${id}`);
  return response.data;
};
