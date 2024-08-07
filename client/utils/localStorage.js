import SimpleCrypto from 'simple-crypto-js'
import { KEYS } from './constant'

const _secretKey = 'snapcrack_unique'

export const Crypto = new SimpleCrypto(_secretKey)

const LocalStorage = {
  get: key => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
    return false
  },

  getJSON: key => {
    if (typeof localStorage !== 'undefined') {
      const data = LocalStorage.get(key)

      return data && data !== 'undefined' ? JSON.parse(data) : ''
    }

    return false
  },

  set: (...rest) => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.setItem(...rest)
    }

    return false
  },

  setJSON: (key, value) => {
    if (typeof localStorage !== 'undefined') {
      const data = JSON.stringify(value)

      return LocalStorage.set(key, data)
    }

    return false
  },

  setToken: token => {
    // Iron.seal(token).then(encryptedToken =>
    //   LocalStorage.set(KEYS.authToken, encryptedToken)
    // )
    LocalStorage.set(KEYS.authToken, token)
  },

  setUser: user => {
    // Iron.seal(user).then(encryptedUser =>
    //   LocalStorage.set(KEYS.user, encryptedUser)
    // )
    LocalStorage.set(KEYS.user, Crypto.encrypt(JSON.stringify(user)))
  },

  setPermission: permissions => {
    LocalStorage.set(
      KEYS.adminPermission,
      Crypto.encrypt(JSON.stringify(permissions))
    )
  },

  remove: key => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem(key)
    }

    return false
  },

  clean: key => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.clear(key)
    }

    return false
  },
}

const getToken = () => {
  // checking if localStorage exits in case we're using ssr
  if (typeof localStorage !== 'undefined') {
    return LocalStorage.get(KEYS.authToken) || ''

    // try {
    //   if (typeof encryptedToekn === 'string' && encryptedToekn) {
    //     const token = Iron.unseal(encryptedToekn)

    //     return Promise.resolve(token)
    //   }

    //   return ''
    // } catch (error) {
    //   throw new Error(error)
    // }
  }

  return ''
}

const getTempToken = () => {
  if (typeof localStorage !== 'undefined') {
    return LocalStorage.get(KEYS.tempToken) || ''
  }
  return ''
}

const getUser = () => {
  try {
    // checking if localStorage exists in case we're using SSR
    if (typeof localStorage !== 'undefined') {
      const encryptedUser = localStorage.getItem(KEYS.user); // Assuming KEYS.user is defined somewhere
      
      // If encryptedUser is null or undefined, the below condition will be false.
      if (encryptedUser) {
        // Assuming Crypto.decrypt is a synchronous function that can throw
        const decryptedUser = Crypto.decrypt(encryptedUser);
        return decryptedUser;
      }
    }
  } catch (error) {
    // Handle the error
    console.error('Failed to get or decrypt user:', error);
    // Depending on your error handling policy, you might want to rethrow the error or return a fallback value.
    // Rethrow the error
    // throw error;

    // or return a fallback value, e.g., an empty object or null
    // return {};
  }

  // Return a default value if localStorage is undefined or there's no user data
  return {};
}


const getPermission = () => {
  if (
    typeof localStorage !== 'undefined' &&
    LocalStorage.get(KEYS.adminPermission)
  ) {
    const permission = LocalStorage.get(KEYS.adminPermission)
    return Crypto.decrypt(permission)
  }
  return {}
}

const getSessionUser = () => {
  if (typeof sessionStorage !== 'undefined') {
    const encryptedUser = sessionStorage[KEYS.user]

    return JSON.parse(encryptedUser)

    // try {
    //   if (typeof encryptedUser === 'string' && encryptedUser) {
    //     const user = Iron.unseal(encryptedUser)

    //     return Promise.resolve(user)
    //   }

    //   return {}
    // } catch (error) {
    //   throw new Error(error)
    // }
  }

  return {}
}

export {
  LocalStorage,
  getUser,
  getToken,
  getSessionUser,
  getPermission,
  getTempToken,
}
