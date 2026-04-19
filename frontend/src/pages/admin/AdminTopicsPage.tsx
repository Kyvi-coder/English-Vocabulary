import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  createTopic,
  deleteTopic,
  getTopics,
  updateTopic,
  type Topic,
  type TopicPayload,
} from '../../api/topics'
import './AdminTopicsPage.css'

const emptyForm: TopicPayload = {
  name: '',
  description: '',
}

export default function AdminTopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [form, setForm] = useState<TopicPayload>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadTopics()
  }, [])

  const filteredTopics = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword) {
      return topics
    }

    return topics.filter((topic) => {
      const description = topic.description ?? ''

      return (
        topic.name.toLowerCase().includes(keyword) ||
        description.toLowerCase().includes(keyword)
      )
    })
  }, [search, topics])

  async function loadTopics() {
    try {
      setLoading(true)
      setError(null)
      setTopics(await getTopics())
    } catch (exception) {
      setError(getErrorMessage(exception))
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const payload: TopicPayload = {
      name: form.name.trim(),
      description: form.description?.trim() || null,
    }

    if (!payload.name) {
      setError('Ten chu de khong duoc de trong.')
      return
    }

    try {
      setLoading(true)
      setError(null)

      if (editingId === null) {
        await createTopic(payload)
      } else {
        await updateTopic(editingId, payload)
      }

      resetForm()
      await loadTopics()
    } catch (exception) {
      setError(getErrorMessage(exception))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Ban chac chan muon xoa chu de nay?')) {
      return
    }

    try {
      setLoading(true)
      setError(null)
      await deleteTopic(id)
      await loadTopics()
    } catch (exception) {
      setError(getErrorMessage(exception))
    } finally {
      setLoading(false)
    }
  }

  function startEdit(topic: Topic) {
    setEditingId(topic.id)
    setForm({
      name: topic.name,
      description: topic.description ?? '',
    })
    setError(null)
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  return (
    <section className="admin-card">
      <header className="admin-card-header">
        <h1>Danh sach chu de</h1>
        <span>{topics.length} chu de</span>
      </header>

      <div className="admin-toolbar">
        <label className="admin-search">
          <span aria-hidden="true">⌕</span>
          <input
            value={search}
            placeholder="Tìm kiếm chủ đề..."
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <button
          className="admin-button admin-button-light"
          disabled={loading}
          onClick={() => void loadTopics()}
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

      <form className="admin-form admin-form-topics" onSubmit={handleSubmit}>
        <input
          value={form.name}
          placeholder="Ten chu de"
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
        />
        <input
          value={form.description ?? ''}
          placeholder="Mo ta"
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
        />
        <button className="admin-button admin-button-primary" disabled={loading}>
          {editingId === null ? 'Them moi' : 'Luu'}
        </button>
        {editingId !== null && (
          <button
            className="admin-button admin-button-light"
            type="button"
            onClick={resetForm}
          >
            Huy
          </button>
        )}
      </form>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table admin-topics-table">
          <thead>
            <tr>
              <th>Chu de</th>
              <th>Mo ta</th>
              <th>Chinh sua</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.map((topic) => (
              <tr key={topic.id} className="admin-data-row">
                <td>
                  <strong>{topic.name}</strong>
                  <small>Ma chu de #{topic.id}</small>
                </td>
                <td>{topic.description || 'Khong co mo ta'}</td>
                <td>
                  <div className="admin-row-actions">
                    <button
                      className="admin-button admin-button-light"
                      onClick={() => startEdit(topic)}
                    >
                      Sua
                    </button>
                    <button
                      className="admin-button admin-button-danger"
                      onClick={() => void handleDelete(topic.id)}
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

      {!loading && filteredTopics.length === 0 && (
        <p className="admin-empty">Khong co chu de nao.</p>
      )}
    </section>
  )
}

function getErrorMessage(exception: unknown) {
  if (exception instanceof Error) {
    return exception.message
  }

  return 'Da co loi xay ra.'
}
