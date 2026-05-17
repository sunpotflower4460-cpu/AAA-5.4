import type { NoteLocale } from '../types/note'

const DAY_MS = 1000 * 60 * 60 * 24

const pad = (value: number) => String(value).padStart(2, '0')

const formatNumericDate = (date: Date, locale: NoteLocale = 'ja') => {
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())

  if (locale === 'en') {
    return `${month}/${day}/${year}`
  }

  return `${year}/${month}/${day}`
}

export function formatUpdatedAt(value: string, locale: NoteLocale = 'ja'): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return locale === 'en' ? 'Unknown date' : '日時未定'
  }

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const difference = Math.round((startOfToday.getTime() - startOfDate.getTime()) / DAY_MS)

  if (difference === 0) {
    return locale === 'en' ? 'Today' : '今日'
  }

  if (difference === 1) {
    return locale === 'en' ? 'Yesterday' : '昨日'
  }

  return formatNumericDate(date, locale)
}

export function formatEditorTimestamp(value: string, locale: NoteLocale = 'ja'): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return locale === 'en' ? 'Updated just now' : 'いま整えたところです'
  }

  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())

  return `${formatNumericDate(date, locale)} ${hours}:${minutes}`
}
