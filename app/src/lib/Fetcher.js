const apiBaseUrl = import.meta.env.VITE_API_URL

export const apiPost = async (suffix, body) => {
  const url = `${apiBaseUrl}/${suffix}`
  const headers = { 'Content-Type': 'application/json' } 

  return await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
  .then(handleResponse)
}

const parseResponseMessage = text => {
  if (!text) return "Error"
  let parsed = null
  try {
    parsed = JSON.parse(text)
  } catch (e) {
    parsed = text
  }
  return parsed 
}

const handleResponse = response => {
  return response.text()
  .then(text => {
      const data = parseResponseMessage(text)
        if (!response.ok) {
            const resError = (data && data.message) || response?.statusText;
            return Promise.reject(data ?? resError);
        }
        return data
    })
}
