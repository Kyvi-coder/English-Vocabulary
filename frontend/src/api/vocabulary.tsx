import type { Topic } from './topics'

export type Vocabulary = {
  id: number
  word: string
  meaning: string
  pronunciation: string | null
  exampleSentence: string | null
  partOfSpeech: string | null
  topicId: number
  topic?: Topic | null
}

export type VocabularyPayload = {
  word: string
  meaning: string
  pronunciation?: string | null
  exampleSentence?: string | null
  partOfSpeech?: string | null
  topicId: number
}

type DictionaryEntry = {
  phonetics?: Array<{
    audio?: string
  }>
}

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
).replace(/\/$/, '')

const VOCABULARY_URL = `${API_BASE_URL}/api/vocabulary`
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

function toRequestBody(vocabulary: VocabularyPayload): string {
  return JSON.stringify({
    ...vocabulary,
    topic: {
      id: vocabulary.topicId,
    },
  })
}

export function getVocabulary(): Promise<Vocabulary[]> {
  return request<Vocabulary[]>(VOCABULARY_URL)
}

export function getVocabularyById(id: number): Promise<Vocabulary> {
  return request<Vocabulary>(`${VOCABULARY_URL}/${id}`)
}

export function searchVocabulary(keyword?: string): Promise<Vocabulary[]> {
  const params = new URLSearchParams()

  if (keyword?.trim()) {
    params.set('keyword', keyword.trim())
  }

  const query = params.toString()
  return request<Vocabulary[]>(
    `${VOCABULARY_URL}/search${query ? `?${query}` : ''}`,
  )
}

export function getVocabularyByTopicId(
  topicId: number,
): Promise<Vocabulary[]> {
  return request<Vocabulary[]>(`${VOCABULARY_URL}/topic/${topicId}`)
}

export function createVocabulary(
  vocabulary: VocabularyPayload,
): Promise<Vocabulary> {
  return request<Vocabulary>(VOCABULARY_URL, {
    method: 'POST',
    body: toRequestBody(vocabulary),
  })
}

export function updateVocabulary(
  id: number,
  vocabulary: VocabularyPayload,
): Promise<Vocabulary> {
  return request<Vocabulary>(`${VOCABULARY_URL}/${id}`, {
    method: 'PUT',
    body: toRequestBody(vocabulary),
  })
}

export function deleteVocabulary(id: number): Promise<void> {
  return request<void>(`${VOCABULARY_URL}/${id}`, {
    method: 'DELETE',
  })
}

export async function getDictionaryAudioUrl(
  word: string,
): Promise<string | null> {
  const normalizedWord = word.trim().toLowerCase()

  if (!normalizedWord) {
    return null
  }

  const response = await fetch(
    `${DICTIONARY_API_URL}/${encodeURIComponent(normalizedWord)}`,
  )

  if (!response.ok) {
    return null
  }

  const entries = (await response.json()) as DictionaryEntry[]
  const audioUrls = entries
    .flatMap((entry) => entry.phonetics ?? [])
    .map((phonetic) => phonetic.audio?.trim() ?? '')
    .filter(Boolean)

  return (
    audioUrls.find((audioUrl) => audioUrl.includes('-us.')) ||
    audioUrls.find((audioUrl) => audioUrl.includes('/us/')) ||
    audioUrls[0] ||
    null
  )
}
