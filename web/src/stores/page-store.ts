import { create } from 'zustand'

type PageState = 'home' | 'notFound' | 'redirecting'

interface SetPageState {
  page: PageState
  originalLink: string | null
  setPage: (page: PageState) => void
  setOriginalLink: (link: string) => void
}

export const useSetPage = create<SetPageState>((set) => ({
  page: 'home',
  originalLink: null,
  setPage: (page) => set({ page }),
  setOriginalLink: (link) => set({ originalLink: link }),
}))