const baseUrl = process.env.REACT_APP_API_URL

const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`

  if (method === 'GET') {
    return fetch(url) // eslint-disable-line
  } else {
    return fetch(url, { // eslint-disable-line
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
  const token = localStorage.getItem('token') || '' // eslint-disable-line

  if (method === 'GET') {
    return fetch(url, { // eslint-disable-line
      method,
      headers: {
        'x-token': token
      }
    })
  } else {
    return fetch(url, { // eslint-disable-line
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    })
  }
}

export {
  fetchSinToken,
  fetchConToken
}
