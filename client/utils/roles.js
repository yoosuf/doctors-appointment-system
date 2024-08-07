const { USER_ROLE_TYPE } = require('./constant')

const ADMIN_DROPDOWN = [
  {
    label: 'Owner',
    value: USER_ROLE_TYPE.OWNER,
  },
  {
    label: 'Sub Owner',
    value: USER_ROLE_TYPE.SUB_OWNER,
  },
  {
    label: 'Chiropractor',
    value: USER_ROLE_TYPE.CHIROPRACTOR,
  },
  {
    label: 'Staff',
    value: USER_ROLE_TYPE.STAFF,
  },
  {
    label: 'Nurse',
    value: USER_ROLE_TYPE.NURSE,
  },
]

const OWNER_DROPDOWN = [
  {
    label: 'Sub Owner',
    value: USER_ROLE_TYPE.SUB_OWNER,
  },
  {
    label: 'Chiropractor',
    value: USER_ROLE_TYPE.CHIROPRACTOR,
  },
  {
    label: 'Staff',
    value: USER_ROLE_TYPE.STAFF,
  },
  {
    label: 'Nurse',
    value: USER_ROLE_TYPE.NURSE,
  },
  {
    label: 'Patient',
    value: USER_ROLE_TYPE.PATIENT,
  },
]

const SUB_OWNER_DROPDOWN = [
  {
    label: 'Chiropractor',
    value: USER_ROLE_TYPE.CHIROPRACTOR,
  },
  {
    label: 'Staff',
    value: USER_ROLE_TYPE.STAFF,
  },
  {
    label: 'Nurse',
    value: USER_ROLE_TYPE.NURSE,
  },
  {
    label: 'Patient',
    value: USER_ROLE_TYPE.PATIENT,
  },
]

const CHIROPRACTOR_DROPDOWN = [
  {
    label: 'Staff',
    value: USER_ROLE_TYPE.STAFF,
  },
  {
    label: 'Nurse',
    value: USER_ROLE_TYPE.NURSE,
  },
  {
    label: 'Patient',
    value: USER_ROLE_TYPE.PATIENT,
  },
]

const STAFF_DROPDOWN = [
  {
    label: 'Patient',
    value: USER_ROLE_TYPE.PATIENT,
  },
]
const NURSE_DROPDOWN = [
  {
    label: 'Patient',
    value: USER_ROLE_TYPE.PATIENT,
  },
]

const ROLE_WISE_USER = {
  SUPER_ADMIN: [
    USER_ROLE_TYPE.OWNER,
    USER_ROLE_TYPE.SUB_OWNER,
    USER_ROLE_TYPE.CHIROPRACTOR,
    USER_ROLE_TYPE.STAFF,
    USER_ROLE_TYPE.NURSE,
  ],
  OWNER: [
    USER_ROLE_TYPE.SUB_OWNER,
    USER_ROLE_TYPE.CHIROPRACTOR,
    USER_ROLE_TYPE.STAFF,
    USER_ROLE_TYPE.PATIENT,
    USER_ROLE_TYPE.NURSE,
  ],
  SUB_OWNER: [
    USER_ROLE_TYPE.CHIROPRACTOR,
    USER_ROLE_TYPE.STAFF,
    USER_ROLE_TYPE.PATIENT,
    USER_ROLE_TYPE.NURSE,
  ],
  CHIROPRACTOR: [
    USER_ROLE_TYPE.STAFF,
    USER_ROLE_TYPE.PATIENT,
    USER_ROLE_TYPE.NURSE,
  ],
  STAFF: [USER_ROLE_TYPE.PATIENT],
  NURSE: [
    USER_ROLE_TYPE.STAFF,
    USER_ROLE_TYPE.PATIENT,
    USER_ROLE_TYPE.NURSE,
  ],
}

const ROOM_TYPES = {
  GROUP: 'GROUP',
  SINGLE: 'SINGLE',
}
const VERIFY_UN_VERIFY_FILTER = [
  {
    id: 1,
    value: true,
    checked: true,
    label: 'Verify',
  },
  {
    id: 2,
    value: false,
    checked: true,
    label: 'Not Verify',
  },
]
const ROLE_WISE_CHECKBOX = {
  SUPER_ADMIN: [
    {
      id: 1,
      value: 'OWNER',
      checked: true,
      label: 'Owner',
    },
    {
      id: 2,
      value: 'SUB_OWNER',
      checked: true,
      label: 'Sub Owner',
    },
    {
      id: 3,
      value: 'CHIROPRACTOR',
      checked: true,
      label: 'Chiropractor',
    },
    {
      id: 4,
      value: 'STAFF',
      checked: true,
      label: 'Staff',
    },
    {
      id: 5,
      value: 'NURSE',
      checked: true,
      label: 'Nurse',
    },
  ],
  OWNER: [
    {
      id: 1,
      value: 'SUB_OWNER',
      checked: true,
      label: 'Sub Owner',
    },
    {
      id: 2,
      value: 'CHIROPRACTOR',
      checked: true,
      label: 'Chiropractor',
    },
    {
      id: 3,
      value: 'STAFF',
      checked: true,
      label: 'Staff',
    },
    {
      id: 4,
      value: 'NURSE',
      checked: true,
      label: 'Nurse',
    },
  ],
  SUB_OWNER: [
    {
      id: 1,
      value: 'CHIROPRACTOR',
      checked: true,
      label: 'Chiropractor',
    },
    {
      id: 2,
      value: 'STAFF',
      checked: true,
      label: 'Staff',
    },
    {
      id: 3,
      value: 'NURSE',
      checked: true,
      label: 'Nurse',
    },
  ],
  CHIROPRACTOR: [
    {
      id: 1,
      value: 'STAFF',
      checked: true,
      label: 'Staff',
    },
    {
      id: 2,
      value: 'NURSE',
      checked: true,
      label: 'Nurse',
    },
  ],
  NURSE: [
    {
      id: 1,
      value: 'STAFF',
      checked: true,
      label: 'Staff',
    },
  ],
}

module.exports = {
  ADMIN_DROPDOWN,
  OWNER_DROPDOWN,
  SUB_OWNER_DROPDOWN,
  CHIROPRACTOR_DROPDOWN,
  STAFF_DROPDOWN,
  NURSE_DROPDOWN,
  ROLE_WISE_USER,
  ROOM_TYPES,
  ROLE_WISE_CHECKBOX,
  VERIFY_UN_VERIFY_FILTER,
}
