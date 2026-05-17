import type { NoteLocale } from '../types/note'

export const copy = {
  appName: '残心',
  appSubtitle: 'Zanshin Notes',
  tagline: '書いたあとにも、心がそこに残るメモ帳。',
  taglineEn: 'Write with stillness.',
  listTitle: '言葉を静かに並べる',
  listTitleEn: 'A quiet list of notes',
  emptyTitle: 'まだ、言葉は置かれていません。',
  emptySubtitle: 'No words have settled yet.',
  emptyAction: '新しい余白をひらく',
  searchPlaceholder: '言葉を探す',
  searchEmptyTitle: 'その言葉は、まだ見つかりません。',
  searchEmptySubtitle: 'No notes matched that stillness.',
  newNote: '新しい余白',
  untitled: '無題の余白',
  untitledEn: 'Untitled space',
  titlePlaceholder: '題、あるいは無題。',
  bodyPlaceholder: 'ここに言葉を置いてください。',
  back: '一覧へ戻る',
  favorite: 'お気に入りに留める',
  unfavorite: 'お気に入りを外す',
  delete: 'この言葉を手放す',
  deleteConfirm: 'この言葉を手放しますか？',
  deleteConfirmEn: 'Release this note?',
  saved: '余韻を保存しました',
  savedEn: 'Saved in stillness',
  saving: '静かに保存しています',
  savingEn: 'Saving quietly',
  updated: '更新',
  updatedEn: 'Updated',
  notesCount: '余白',
  notesCountEn: 'notes',
} as const

export function getPreferredLocale(): NoteLocale {
  if (typeof window === 'undefined') {
    return 'ja'
  }

  return window.navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en'
}

export function getUntitledLabel(locale: NoteLocale = 'ja'): string {
  return locale === 'en' ? copy.untitledEn : copy.untitled
}
