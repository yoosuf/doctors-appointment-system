const routes = {
  sesson: {
    new: '/auth/login',
    verify: '/auth/check',
    phone: '/auth/phone', // this route is not required, change the phone state and email state
  },
  account: {
    create: '/auth/register',
    firstStep: '/auth/register-tell-more',
    secondStep: '/auth/register-identity-docs',
    lastStep: '/auth/register-upload-profile',
    verify: '/auth/verify',
  },
  password: {
    recover: '/auth/password/recover',
    recoverPhone: '/auth/password/phone-recover', // this route is not required, change the phone state and email state
    forgotPasswordMail: '/auth/check-forgot-mail', // no need of this route
    success: '/auth/success-forgot', // no need of this route
  },

  // Me
  myAccount: '/profile-setting',
  staffPermission: '/profile-setting/staff-permission', // not sure why this exist
  ratingAndReview: '/profile-setting/rating-and-review', // not sure why this exist
  setting: '/profile-setting',

  // Staff Dashboard
  deskWaitlist: '/desk/dashboard',
  deskCustomers: '/desk/customers',

  // Admin Dashboard
  dashboard: '/admin/dashboard',
  eventAndAppointmentList: '/admin/appointments',
  calendarView: '/admin/appointments/calendar-view', // not sure why this exist
  eventManagement: '/admin/appointments/calendar', // not sure why this exist
  manageCustomer: '/admin/users/customers',
  manageOwner: '/admin/users/staff',
  manageSubOwner: '/admin/users/manage-sub-owner', // not sure why this exist

  clinicInfo: '/admin/settings/clinics',
  profileServices: '/admin/settings/services',
  profileMembership: '/admin/settings/membership',
  adminPages: '/admin/settings/pages', // does this required?
  masterAdmin: '/admin/settings/system',

  // Customer
  customerDashboard: '/',
  selfCheckin: '/self-checkin',
  checkin: '/checkin',

  onBoarding: '/onboard',
  onbardReferralInfo: '/onboard/referral',
  onbardMedicalHistory: '/onboard/medical',
  onbardLocation: '/onboard/location',
  onbardSign: '/onboard/informed',

  customer: {
    appointments: '/appointments',
    appointmentNew: '/appointments/new',
    appointmentConfirm: '/appointments/confirm',
    dashboard: '/',
  },
}

module.exports = routes
