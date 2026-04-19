import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { getTopics, type Topic } from '../../api/topics'
import {
  createVocabulary,
  deleteVocabulary,
  getDictionaryAudioUrl,
  getVocabulary,
  updateVocabulary,
  type Vocabulary,
  type VocabularyPayload,
} from '../../api/vocabulary'
import './AdminVocabularyPage.css'

const emptyForm: VocabularyPayload = {
  word: '',
  meaning: '',
  pronunciation: '',
  exampleSentence: '',
  partOfSpeech: '',
  topicId: 0,
}

type AudioState = Record<string, string | null | undefined>

export default function AdminVocabularyPage() {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [form, setForm] = useState<VocabularyPayload>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [topicFilter, setTopicFilter] = useState('all')
  const [audioUrls, setAudioUrls] = useState<AudioState>({})
  const [loadingAudioWord, setLoadingAudioWord] = useState<string | null>(null)
  const [playingAudioWord, setPlayingAudioWord] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadData()
  }, [])

  const filteredVocabulary = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    const selectedTopicId = topicFilter === 'all' ? null : Number(topicFilter)

    return vocabularies.filter((item) => {
      const matchesTopic =
        selectedTopicId === null || item.topicId === selectedTopicId
      const example = item.exampleSentence ?? ''
      const pronunciation = item.pronunciation ?? ''
      const partOfSpeech = item.partOfSpeech ?? ''
      const topicName = getTopicName(item, topics)
      const matchesKeyword =
        !keyword ||
        String(item.id).includes(keyword) ||
        String(item.topicId).includes(keyword) ||
        item.word.toLowerCase().includes(keyword) ||
        item.meaning.toLowerCase().includes(keyword) ||
        pronunciation.toLowerCase().includes(keyword) ||
        example.toLowerCase().includes(keyword) ||
        partOfSpeech.toLowerCase().includes(keyword) ||
        topicName.toLowerCase().includes(keyword)

      return matchesTopic && matchesKeyword
    })
  }, [search, topicFilter, topics, vocabularies])

  async function loadData() {
    try {
      setLoading(true)
      setError(null)
      const [vocabularyData, topicData] = await Promise.all([
        getVocabulary(),
        getTopics(),
      ])

      setVocabularies(vocabularyData)
      setTopics(topicData)
      setForm((current) => ({
        ...current,
        topicId: current.topicId || topicData[0]?.id || 0,
      }))
    } catch (exception) {
      setError(getErrorMessage(exception))
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload: VocabularyPayload = {
      word: form.word.trim(),
      meaning: form.meaning.trim(),
      pronunciation: form.pronunciation?.trim() || null,
      exampleSentence: form.exampleSentence?.trim() || null,
      partOfSpeech: form.partOfSpeech?.trim() || null,
      topicId: Number(form.topicId),
    }

    if (!payload.word || !payload.meaning || !payload.topicId) {
      setError('word, meaning va topic_id khong duoc de trong.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (editingId === null) {
        await createVocabulary(payload)
      } else {
        await updateVocabulary(editingId, payload)
      }

      resetForm(topics)
      await loadData()
    } catch (exception) {
      setError(getErrorMessage(exception))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Ban chac chan muon xoa tu vung nay?')) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      await deleteVocabulary(id)
      await loadData()
    } catch (exception) {
      setError(getErrorMessage(exception))
    } finally {
      setLoading(false)
    }
  }

  function startEdit(vocabulary: Vocabulary) {
    setEditingId(vocabulary.id)
    setForm({
      word: vocabulary.word,
      meaning: vocabulary.meaning,
      pronunciation: vocabulary.pronunciation ?? '',
      exampleSentence: vocabulary.exampleSentence ?? '',
      partOfSpeech: vocabulary.partOfSpeech ?? '',
      topicId: vocabulary.topicId,
    })
    setError(null)
  }

  function resetForm(topicData = topics) {
    setEditingId(null)
    setForm({
      ...emptyForm,
      topicId: topicData[0]?.id || 0,
    })
  }

  async function playVoice(word: string) {
    const wordKey = word.trim().toLowerCase()

    if (!wordKey || loadingAudioWord === wordKey) {
      return
    }

    let audioUrl = audioUrls[wordKey]

    if (audioUrl === undefined) {
      setLoadingAudioWord(wordKey)

      try {
        audioUrl = await getDictionaryAudioUrl(wordKey)
        setAudioUrls((current) => ({ ...current, [wordKey]: audioUrl }))
      } catch {
        audioUrl = null
        setAudioUrls((current) => ({ ...current, [wordKey]: null }))
      } finally {
        setLoadingAudioWord(null)
      }
    }

    if (!audioUrl) {
      setError(`Khong tim thay audio cho tu "${word}".`)
      return
    }

    setError(null)
    setPlayingAudioWord(wordKey)

    const audio = new Audio(audioUrl)
    audio.addEventListener('ended', () => setPlayingAudioWord(null), {
      once: true,
    })
    audio.addEventListener('error', () => setPlayingAudioWord(null), {
      once: true,
    })
    void audio.play().catch(() => {
      setPlayingAudioWord(null)
      setError(`Khong phat duoc audio cho tu "${word}".`)
    })
  }

  return (
    <section className="admin-card">
      <header className="admin-card-header">
        <h1>Vocabulary</h1>
        <span>{vocabularies.length} rows</span>
      </header>

      <div className="admin-toolbar">
        <label className="admin-search">
          <span aria-hidden="true">#</span>
          <input
            value={search}
            placeholder="Tim theo id, word, meaning, pronunciation, loai tu, topic_id..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <select
          className="admin-filter"
          value={topicFilter}
          onChange={(event) => setTopicFilter(event.target.value)}
        >
          <option value="all">Tat ca topic_id</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.id} - {topic.name}
            </option>
          ))}
        </select>
      </div>

      <form className="admin-form admin-form-vocabulary" onSubmit={handleSubmit}>
        <input
          value={form.word}
          placeholder="word"
          onChange={(event) =>
            setForm((current) => ({ ...current, word: event.target.value }))
          }
        />
        <input
          value={form.meaning}
          placeholder="meaning"
          onChange={(event) =>
            setForm((current) => ({ ...current, meaning: event.target.value }))
          }
        />
        <input
          value={form.pronunciation ?? ''}
          placeholder="pronunciation"
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              pronunciation: event.target.value,
            }))
          }
        />
        <input
          value={form.exampleSentence ?? ''}
          placeholder="example_sentence"
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              exampleSentence: event.target.value,
            }))
          }
        />
        <input
          value={form.partOfSpeech ?? ''}
          placeholder="part_of_speech"
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              partOfSpeech: event.target.value,
            }))
          }
        />
        <select
          value={form.topicId}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              topicId: Number(event.target.value),
            }))
          }
        >
          <option value={0}>topic_id</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.id} - {topic.name}
            </option>
          ))}
        </select>
        <button className="admin-button admin-button-primary" disabled={loading}>
          {editingId === null ? 'Them moi' : `Luu #${editingId}`}
        </button>
        {editingId !== null && (
          <button
            className="admin-button admin-button-light"
            type="button"
            onClick={() => resetForm()}
          >
            Huy
          </button>
        )}
      </form>

      <div className="admin-refresh-row">
        <button
          className="admin-button admin-button-light"
          disabled={loading}
          onClick={() => void loadData()}
        >
          {loading ? (
            <>
              <span className="admin-spinner" aria-hidden="true" />
              Dang tai
            </>
          ) : (
            'Tai lai'
          )}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table admin-vocabulary-table">
          <thead>
            <tr>
              <th>Tu vung</th>
              <th>Nghia</th>
              <th>Loai tu</th>
              <th>Vi du</th>
              <th>Topic</th>
              <th>Chinh sua</th>
            </tr>
          </thead>
          <tbody>
            {filteredVocabulary.map((item) => (
              <tr key={item.id} className="admin-data-row">
                <td>
                  <div className="admin-word-cell">
                    <button
                      className="admin-audio-button"
                      type="button"
                      aria-label={`Nghe phat am tu ${item.word}`}
                      title={`Nghe phat am: ${item.word}`}
                      disabled={
                        loadingAudioWord === item.word.trim().toLowerCase()
                      }
                      onClick={() => void playVoice(item.word)}
                    >
                      {loadingAudioWord === item.word.trim().toLowerCase()
                        ? '...'
                        : playingAudioWord === item.word.trim().toLowerCase()
                          ? '||'
                          : '♪'}
                    </button>
                    <strong>{item.word}</strong>
                  </div>
                  <small>{item.pronunciation || '-'}</small>
                </td>
                <td>{item.meaning}</td>
                <td>
                  <span className="admin-part-of-speech">
                    {item.partOfSpeech || '-'}
                  </span>
                </td>
                <td>{truncateText(item.exampleSentence || '-')}</td>
                <td>
                  <span className="admin-pill">
                    {item.topicId} - {getTopicName(item, topics)}
                  </span>
                </td>
                <td>
                  <div className="admin-row-actions">
                    <button
                      className="admin-button admin-button-light"
                      onClick={() => startEdit(item)}
                    >
                      Sua
                    </button>
                    <button
                      className="admin-button admin-button-danger"
                      onClick={() => void handleDelete(item.id)}
                    >
                      Xoa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && filteredVocabulary.length === 0 && (
        <p className="admin-empty">Khong co tu vung nao.</p>
      )}
    </section>
  )
}

function truncateText(text: string) {
  if (text.length <= 90) {
    return text
  }

  return `${text.slice(0, 90)}...`
}

function getTopicName(vocabulary: Vocabulary, topics: Topic[]) {
  return (
    vocabulary.topic?.name ||
    topics.find((topic) => topic.id === vocabulary.topicId)?.name ||
    `Chu de #${vocabulary.topicId}`
  )
}

function getErrorMessage(exception: unknown) {
  if (exception instanceof Error) {
    return exception.message
  }

  return 'Da co loi xay ra.'
}
