import { hasAccessOf, hasAccessTo } from '@knovator/can'
import { getPermission, getUser, LocalStorage } from './localStorage'
import routes from './routes'
import _ from 'lodash'
import { USER_ROLE_TYPE } from '@/utils/constant'
import moment from 'moment'

const { KEYS } = require('./constant')

const setDeviceId = () => {
  // eslint-disable-next-line no-magic-numbers
  const uuid = Math.floor(Math.random() * 1000000000000)
  const date = new Date()
  const timestamp = date.getTime()

  LocalStorage.set(KEYS.deviceId, `${uuid}-${timestamp}`)
}

const logout = async router => {
  LocalStorage.clean(KEYS.user)
  LocalStorage.clean(KEYS.authToken)
  LocalStorage.clean(KEYS.adminPermission)
  LocalStorage.clean(KEYS.userId)
  LocalStorage.clean(KEYS.appointmentId)
  setDeviceId()

  await fetch('/api/logout')

  router.push(routes.sesson.new)
  // window.location.href = '/auth/login'
}

const copy = e => {
  e.preventDefault()
}

const phoneValidation = e => {
  if (e.key === 'e' || e.key === '+' || e.key === '-') {
    e.preventDefault()
  }
  if (e.target.value.length === 15) {
    e.preventDefault()
  }
}

const getRole = () => {
  const { id, roleId = {}, locationIds = [] } = getUser()

  if ((roleId.code === USER_ROLE_TYPE.CHIROPRACTOR) || (roleId.code === USER_ROLE_TYPE.NURSE)) {

    return {
      creatorId: id,
    }
  }
  else if (roleId.code === USER_ROLE_TYPE.CHIROPRACTOR) {
    return {
      chiroId: id,
    }
  } else if (roleId.code === USER_ROLE_TYPE.NURSE) {
    return {
      nurseId: id,
    }
  } else if (roleId.code === USER_ROLE_TYPE.STAFF) {
    if (locationIds.length) {
      return {
        locationId: locationIds[0]._id,
      }
    }
  }
}

const getLocationQuery = () => {
  const { roleId = {}, locationIds = [] } = getUser()
  if (roleId.code !== USER_ROLE_TYPE.SUPER_ADMIN) {
    return {
      locationIds: locationIds.map((l = {}) => l._id),
    }
  }
}

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color:
      state.isSelected && state.isDisabled
        ? 'black'
        : state.isDisabled
        ? 'gray'
        : state.isSelected
        ? 'black'
        : 'white',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
    backgroundColor: state.isSelected ? '#FBD63c' : 'transparent',
    '&:hover': {
      // Overwrittes the different states of border
      backgroundColor: state.isDisabled
        ? 'black'
        : state.isFocused && '#aea2211f',
      color: state.isDisabled ? 'gray' : state.isFocused && '#FBD63c',
    },
  }),
  menu: base => ({
    ...base,
    backgroundColor: 'transparent',
  }),
  multiValue: (base, state) => ({
    ...base,
    backgroundColor: '#27272a',
    div: {
      color: 'white',
    },
    svg: {
      color: 'white',
    },
    ' div:hover:nth-of-type(2)': {
      backgroundColor: '#FBD63c',
      color: 'black',
    },
  }),
  multiValueRemove: (base, state) => ({
    ...base,
    cursor: 'pointer',
    '&hover': {
      backgroundColor: '#FBD63c',
      color: 'black',
    },
  }),
  menuList: base => ({
    ...base,
    backgroundColor: '#010101',
    borderRadius: '3px',
    '::-webkit-scrollbar': {
      width: '3px',
      background: '#313131',
      // borderRight: '1px solid #6b7280',
      // borderLeft: '1px solid #6b7280'
    },

    '::-webkit-scrollbar-thumb': {
      background: '#3f3f46',
      borderRadius: '3px',
      maxWidth: '2px',
    },
  }),
  input: styles => ({ ...styles, color: 'white' }),
}

const baseUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}`

const sidebarLogoUrl = '/images/sidebar/sidebar-logo.svg'

const getProfileImage = values => {
  if (values.profile_image !== '') {
    return {
      profile_image: values.profile_image,
    }
  }
}

const isObjectEmpty = objectName => {
  return Object.keys(objectName).length === 0
}

const routeAccess = route => {
  const access = hasAccessOf(getPermission(), route)
  return access
}

const componentAccess = (route, task) => {
  const access = hasAccessTo(getPermission(), route, task)
  return access
}

const getImageUrl = uri => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_END_POINT}`
  return baseUrl + uri
}

// const formatDate = (date, format) => {
//   if (typeof date === 'object') return date.map(t => moment(t).format(format))
//   else return moment(date).format(format)
// }

const dateDisplay = (date, format = 'YYYY-MM-DD') => {
  if (date) return moment(date).format(format)
  else return moment().format('YYYY-MM-DD')
}

const timeDisplay = (time, format = 'h:mm:a') => {
  if (typeof time === 'object')
    return time.map(t => moment(t?.startTime).utc().format(format))
  else return moment(time).utc().format(format)
}

const fetchData = async (url, data) => {
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export {
  setDeviceId,
  logout,
  copy,
  baseUrl,
  customStyles,
  phoneValidation,
  routeAccess,
  componentAccess,
  getRole,
  sidebarLogoUrl,
  getProfileImage,
  getLocationQuery,
  getImageUrl,
  // formatDate,
  isObjectEmpty,
  dateDisplay,
  timeDisplay,
  fetchData,
}
