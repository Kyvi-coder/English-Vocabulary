export type Topic = {
  id: number
  name: string
  description: string | null
}

export type TopicPayload = {
  name: string
  description?: string | null
}

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'
).replace(/\/$/, '')

const TOPICS_URL = `${API_BASE_URL}/api/topics`

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

export function getTopics(): Promise<Topic[]> {
  return request<Topic[]>(TOPICS_URL)
}

export function getTopicById(id: number): Promise<Topic> {
  return request<Topic>(`${TOPICS_URL}/${id}`)
}

export function searchTopics(keyword?: string): Promise<Topic[]> {
  const params = new URLSearchParams()

  if (keyword?.trim()) {
    params.set('keyword', keyword.trim())
  }

  const query = params.toString()
  return request<Topic[]>(`${TOPICS_URL}/search${query ? `?${query}` : ''}`)
}

export function createTopic(topic: TopicPayload): Promise<Topic> {
  return request<Topic>(TOPICS_URL, {
    method: 'POST',
    body: JSON.stringify(topic),
  })
}

export function updateTopic(id: number, topic: TopicPayload): Promise<Topic> {
  return request<Topic>(`${TOPICS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(topic),
  })
}

export function deleteTopic(id: number): Promise<void> {
  return request<void>(`${TOPICS_URL}/${id}`, {
    method: 'DELETE',
  })
}
