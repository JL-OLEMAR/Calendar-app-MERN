const baseUrl = import.meta.env.VITE_APP_API_URL

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`

  if (method === 'GET') {
    return window.fetch(url)
  } else {
    return window.fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  const token = window.localStorage.getItem('token') || ''

  if (method === 'GET') {
    return window.fetch(url, {
      method,
      headers: {
        'x-token': token
      }
    })
  } else {
    return window.fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    })
  }
}

export { fetchSinToken, fetchConToken }
