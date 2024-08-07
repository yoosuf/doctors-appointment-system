const KEYS = {
  user: 'USER',
  authToken: 'AUTH_TOKEN',
  tempData: 'TEMP_DATA',
  companyData: 'COMPANY_DATA',
  deviceId: 'x-device-id',
  email: 'EMAIL',
  phone: 'PHONE',
  adminPermission: 'ADMIN_PERMISSION',
  userId: 'USER_ID',
  appointment: 'APPOINTMENT',
  appointmentId: 'APPOINTMENT_ID',
  rememberMe: 'REMEMBER_ME',
  checkinMessage: 'CHECKIN_MESSAGE',
  tempToken: 'TEMP_TOKEN',
  onBoardingId: 'ONBOARDING_ID',
}

const USER_ROLE_TYPE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  SUB_OWNER: 'SUB_OWNER',
  CHIROPRACTOR: 'CHIROPRACTOR',
  STAFF: 'STAFF',
  PATIENT: 'PATIENT',
  NURSE: 'NURSE',
}

const ROUTE_ACCESS = {
  OWNER: 'owner',
  SUB_OWNER: 'subOwner',
  CHIROPRACTOR: 'chiropractor',
  NURSE: 'nurse',
  STAFF: 'staff',
  USER: 'user',
  PATIENT: 'patient',
  LOCATION: 'location',
  PRODUCT: 'product',
  SERVICE: 'service',
  ADDRESS: 'address',
  MEMBERSHIP: 'membership',
  MASTER: 'master',
  CITY: 'city',
  PROVINCE: 'province',
  COUNTRY: 'country',
  POSTAL_CODE: 'postalCode',
  CATEGORY: 'category',
  APPOINTMENT: 'appointment',
  FILE: 'docFile',
}

const COMPONENT_ACCESS = {
  create: 'create',
  findall: 'findall',
  findAll: 'findAll',
  update: 'update',
  partialUpdate: 'partialUpdate',
  softDelete: 'softDelete',
  delete: 'delete',
  getOwner: 'getOwner',
  getSubOwner: 'getsubowner',
  getChiropractor: 'getchiropractor',
  getStaff: 'getstaff',
  getNurse: 'getnurse',
  getUser: 'getUser',
  getLocation: 'getLocation',
  getProduct: 'getProduct',
  getMembership: 'getMembership',
  getMaster: 'getMaster',
  getCity: 'getCity',
  getProvince: 'getProvince',
  getCountry: 'getCountry',
  getPostalCode: 'getPostalCode',
}

const REQUIRED_FIELD = 'This field is required'
const REQUIRED_IMAGE_TYPE =
  ' Acceptable format, jpg, png, jfif, pjpeg, webp, gif, pjp only'

const PASSWORD_VALIDATION = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

const EMAIL_VALIDATION = /^(([^<>()?*#%&='|`~_\[\]\\.,;:\s@"]+(\.[^<>()?*#%&+='|`~_\[\]\\.,;:\s@"]+)*)|(".+"))@([a-z]+([.][a-zA-Z]{2,}))$/

const SUPER_ADMIN_FILTER = [
  {
    id: 1,
    value: 'OWNER',
    checked: false,
    label: 'Owner',
  },
  {
    id: 2,
    value: 'SUB_OWNER',
    checked: false,
    label: 'Sub Owner',
  },
  {
    id: 3,
    value: 'CHIROPRACTOR',
    checked: false,
    label: 'Chiropractor',
  },
  {
    id: 4,
    value: 'STAFF',
    checked: false,
    label: 'Staff',
  },
  {
    id: 5,
    value: 'NURSE',
    checked: false,
    label: 'Nurse',
  },
]

const OWNER_FILTER = [
  {
    id: 1,
    value: 'SUB_OWNER',
    checked: false,
    label: 'Sub Owner',
  },
  {
    id: 2,
    value: 'CHIROPRACTOR',
    checked: false,
    label: 'Chiropractor',
  },
  {
    id: 3,
    value: 'STAFF',
    checked: false,
    label: 'Staff',
  },
  {
    id: 4,
    value: 'NURSE',
    checked: false,
    label: 'Nurse',
  },
]

const SUB_OWNER_FILTER = [
  {
    id: 1,
    value: 'CHIROPRACTOR',
    checked: false,
    label: 'Chiropractor',
  },
  {
    id: 2,
    value: 'STAFF',
    checked: false,
    label: 'Staff',
  },
  {
    id: 3,
    value: 'NURSE',
    checked: false,
    label: 'Nurse',
  },
]

const CHIROPRACTOR_FILTER = [
  {
    id: 1,
    value: 'STAFF',
    checked: false,
    label: 'Staff',
  },
  {
    id: 2,
    value: 'NURSE',
    checked: false,
    label: 'Nurse',
  },
]

const SERVICES_TYPE = {
  IV_THERAPHIES: 'iV Therapies',
  ADJUSTMENT: 'Adjustment',
  VITAMIN_INJECTION: 'Vitamins Injection',
}

const IV_TIME_DURATION_OPTIONS_DATA = [
  { value: '30', label: '30 Min' },
  { value: '60', label: '60 Min' },
  { value: '90', label: '90 Min' },
]

const TIME_DURATION_OPTIONS_DATA = [{ value: '30', label: '30 Min' }]

const DAILY = 'DAILY'
const TIMESLOT = 'TIMESLOT'

const MASTER_CODE = {
  GENDER: 'GENDER',
  DURATION: 'DURATION',
  MEMBERSHIP_DURATION: 'MEMBERSHIP_DURATION', 
  PREFIX: 'PREFIX',
  SERVICE_TYPE: 'SERVICE_TYPE',
  EVENT_TYPES: 'EVENT_TYPES',
  FILE_CATEGORY: 'FILE_CATEGORY',
  PRODUCT_CATEGORY: 'PRODUCT_CATEGORY',
  REFERRAL: 'REFERRAL',
  VISIT_REASON: 'VISIT_REASON',
  DISCOMFORT: 'DISCOMFORT',
  AGGRAVATES: 'AGGRAVATES',
}

const APPOINTMENT_CHART_TYPE = {
  SOAP: 'SOAP',
  DAILY_INTAKE: 'DAILY_INTAKE',
  DAILY_INTAKE_NURSE: 'DAILY_INTAKE_NURSE',
  SOAP_NURSE: 'SOAP_NURSE',
}

const CHART_VIEWABLE = {
  EVERYONE: 'EVERYONE',
  CHIRO: 'CHIRO',
}

const CUSTOMER_ORDER_TYPE = {
  EVENT: 'event',
  SERVICE: 'service',
}

const TABLE_LENGTH = 10

const ONBOARDING_STEPS = {
  TOTALONBOARDSTEPS: 5,
  ONBOARDING: 1,
  REFERRAL: 2,
  MEDICAL: 3,
  LOCATION: 4,
  SIGNATURE: 5,
}

const REDIRECT_ONBOARDING = [
  'onBoarding',
  'onbardReferralInfo',
  'onbardMedicalHistory',
  'onbardLocation', 
  'onbardSign',
]

const FRONT_PART = [
  { point: 22, pointStyle: 'absolute bottom-5 left-12' },
  { point: 23, pointStyle: 'absolute bottom-5 right-12' },
  { point: 15, pointStyle: 'absolute top-13 left-6' },
  { point: 16, pointStyle: 'absolute top-14 left-14' },
  { point: 17, pointStyle: 'absolute top-13 right-6' },
  { point: 21, pointStyle: 'absolute top-34 right-3' },
  { point: 20, pointStyle: 'absolute top-34 left-3' },
  { point: 19, pointStyle: 'absolute top-32 right-9' },
  { point: 18, pointStyle: 'absolute top-32 left-9' },
]

const BACK_PART = [
  { point: 13, pointStyle: 'absolute bottom-6 left-12' },
  { point: 14, pointStyle: 'absolute bottom-6 right-12' },
  { point: 0, pointStyle: 'absolute top-10 left-8' },
  { point: 1, pointStyle: 'absolute top-8 left-13' },
  { point: 2, pointStyle: 'absolute top-10 right-8' },
  { point: 3, pointStyle: 'absolute top-14 left-13' },
  { point: 4, pointStyle: 'absolute top-20 left-9' },
  { point: 5, pointStyle: 'absolute top-20 left-13' },
  { point: 6, pointStyle: 'absolute top-20 right-9' },
  { point: 7, pointStyle: 'absolute top-26 left-13' },
  { point: 8, pointStyle: 'absolute top-30 left-9' },
  { point: 9, pointStyle: 'absolute top-30 left-13' },
  { point: 10, pointStyle: 'absolute top-30 right-9' },
  { point: 12, pointStyle: 'absolute top-36 right-2' },
  { point: 11, pointStyle: 'absolute top-36 left-2' },
  //  {point: , pointStyle: },
]

const CHECKOUT_TYPES = { PATIENT: 'PATIENT', USER: 'USER' }

const SHORT_CUT_KEYS = {
  addOwner: 'q+1,q+num_1',
  addSubOwner: 'q+2,q+num_2',
  addSubChiro: 'q+3,q+num_3',
  addStaff: 'q+4,q+num_4',
  addCustomer: 'q+5,q+num_5',
  addAppointment: 'q+6,q+num_6',
  addLocation: 'q+7,q+num_7',
  addProduct: 'q+8,q+num_8',
  addService: 'q+9,q+num_9',
}

const IDENTIFY_TYPE = {
  chiro: 'CHIROPRACTOR',
  nurse: 'NURSE',
}

const CHECK = 'Other'

const UNIQUE = null

const links = [
  { href: '#', label: 'Vitamin B12' },
  { href: '#', label: 'Vitamin C' },
  { href: '#', label: 'Zinc' },
  { href: '#', label: 'Glutathione' },
  { href: '#', label: 'Biotin' },
  { href: '#', label: 'Vitamin B12 & Glutathione' },
  { href: '#', label: 'NAD+' },
  { href: '#', label: 'Vitamin D' },
]

const MINUTES = 'Minutes'

const WAITING = 'WAITING'

module.exports = {
  KEYS,
  ROUTE_ACCESS,
  COMPONENT_ACCESS,
  REQUIRED_FIELD,
  PASSWORD_VALIDATION,
  SUPER_ADMIN_FILTER,
  OWNER_FILTER,
  SUB_OWNER_FILTER,
  CHIROPRACTOR_FILTER,
  SERVICES_TYPE,
  IV_TIME_DURATION_OPTIONS_DATA,
  TIME_DURATION_OPTIONS_DATA,
  EMAIL_VALIDATION,
  DAILY,
  TIMESLOT,
  MASTER_CODE,
  APPOINTMENT_CHART_TYPE,
  CHART_VIEWABLE,
  TABLE_LENGTH,
  USER_ROLE_TYPE,
  CHECKOUT_TYPES,
  SHORT_CUT_KEYS,
  ONBOARDING_STEPS,
  FRONT_PART,
  BACK_PART,
  REDIRECT_ONBOARDING,
  REQUIRED_IMAGE_TYPE,
  IDENTIFY_TYPE,
  CHECK,
  UNIQUE,
  CUSTOMER_ORDER_TYPE,
  links,
  MINUTES,
  WAITING,
}
