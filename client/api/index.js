import { KEYS } from '@/utils/constant'
import { getToken, LocalStorage } from '@/utils/localStorage'
import routes from '@/utils/routes'
import axios from 'axios'
import qs from 'qs'
import toast from 'react-hot-toast'

const baseUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}/`

const GET = 'GET'
const DELETE = 'DELETE'
const POST = 'POST'
const PUT = 'PUT'
const PATCH = 'PATCH'

let cache = []

const cancel = []

const ACTION_HANDLERS = {
  [GET]: (url, data, header) => {
    let queryUrl = url

    if (data !== undefined) {
      const query = qs.stringify(data)

      queryUrl = `${queryUrl}?${query}`
    }
    return axios.get(baseUrl + queryUrl, {
      // credentials: 'include',
      // withCredentials: false,

      cancelToken: new axios.CancelToken(cToken => {
        cancel.push({ url, cToken })
      }),

      header,
    })
  },

  [DELETE]: (url, data, header) =>
    axios.delete(baseUrl + url, { header, data }),

  [POST]: (url, data, header) =>
    axios.post(baseUrl + url, data, {
      // credentials: 'include',
      // withCredentials: true,
      header,
    }),

  [PATCH]: (url, data, header) =>
    axios.patch(baseUrl + url, data, {
      // credentials: 'include',
      // withCredentials: true,
      header,
    }),

  [PUT]: (url, data, header) =>
    axios.put(baseUrl + url, data, {
      // credentials: 'include',
      // withCredentials: true,
      header,
    }),
}

function setHeaders({
  contentType,
  authToken = true,
  isServer = false,
  userAgent,
  tempToken = '',
}) {
  // set auth token
  if (isServer) {
    delete axios.defaults.headers.common.Authorization
  }

  if (authToken && !isServer) {
    const token = tempToken || getToken()

    if (token) {
      axios.defaults.headers.common.Authorization = `jwt ${token}`
    } else {
      delete axios.defaults.headers.common.Authorization
    }
  }

  axios.defaults.headers.post[KEYS.deviceId] = LocalStorage.get(KEYS.deviceId)

  if (userAgent) {
    axios.defaults.headers.post['User-Agent'] = userAgent
  }

  // set contentType
  if (contentType) {
    axios.defaults.headers.post['Content-Type'] = contentType
    axios.defaults.headers.post.Accept = 'application/json'
  }
}

function handleError(error) {
  cache = []

  const { response = {} } = error || {}
  const UnauthorizedCode = 401
  const UnprocessableEntity = 422
  if (response.status === UnprocessableEntity) {
    const MESSAGE = response.data.DATA
    return toast.error(MESSAGE)
  }
  if (
    response.status === UnauthorizedCode &&
    typeof window !== 'undefined' &&
    !response?.data?.DATA?.hasOwnProperty('confirmed') &&
    window.location.pathname !== routes.sesson.new
  ) {
    LocalStorage.clean()
    fetch('/api/logout')
    window.location.href = '/'

    return 0
  }

  const { MESSAGE } = response.data || {}

  MESSAGE && toast.error(MESSAGE)

  return Promise.reject()
}

const cacheHandler = (url, { shouldRefetch, handleCache = true }) => {
  if (!shouldRefetch && handleCache) {
    cache.push(url)
  }
}

const fetchUrl = ({ type, url, data = {}, config = {} }) => {
  setHeaders(config)
  cacheHandler(url, config)

  const handler = ACTION_HANDLERS[type.toUpperCase()]

  return handler(url, data)
    .then(response => Promise.resolve(response.data))
    .catch(handleError)
}

export default fetchUrl
