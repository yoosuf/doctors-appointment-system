const { method } = require('lodash')

const apiList = {
  // Auth0 Token API
  auth0Token: {
    url: () => 'client/auth/loginAuth0',
    method: 'post',
  },
  //onboarding APIs
  onboardingAdd: {
    url: () => 'client/api/v1/user-details/add',
    method: 'post',
  },
  onboardingUpdate: {
    url: id => `client/api/v1/user-details/update/${id}`,
    method: 'put',
  },
  onBoardingGet: {
    url: id => `client/api/v1/user-details/${id}`,
    method: 'get',
  },

  onBoardingQuestionGet: {
    url: () => `client/api/v1/question/list`,
    method: 'post',
  },

  onBoardingAnswerSubmit: {
    url: () => `client/api/v1/question/answer/submit`,
    method: 'post',
  },

  onBoardingAnswerget: {
    url: () => `client/api/v1/question/answer/list`,
    method: 'post',
  },

  onBoardingUserDetail: {
    url: id => `admin/user-details/${id}`,
    method: 'get',
  },

  onBoardingUserAnswer: {
    url: () => `admin/question/answer/list`,
    method: 'post',
  },

  // Auth APIs
  login: {
    url: () => 'admin/auth/login',
    method: 'post',
  },

  loginWithPhone: {
    url: () => 'admin/auth/emailOrMobileLinkLogin',
    method: 'post',
  },

  signup: {
    url: () => 'client/auth/register',
    method: 'post',
  },

  emailResendVerifyLink: {
    url: () => 'admin/auth/resend-email-verification',
    method: 'post',
  },

  updateClient: {
    url: id => `client/api/v1/user/update/${id}`,
    method: 'put',
  },

  forgotPassword: {
    url: () => 'admin/auth/forgot-password',
    method: 'post',
  },

  changePassword: {
    url: () => 'admin/auth/recover-password',
    method: 'post',
  },

  patientChangePassword: {
    url: () => 'change-password',
    method: 'post',
  },

  // List of Appointment
  findAppointment: {
    url: () => 'admin/appointment/list',
    method: 'post',
  },

  sendAppointmentAlert: {
    url: id => `admin/appointment/send-alert/${id}`,
    method: 'post',
  },

  appointmentDetail: {
    url: id => `admin/appointment/detail/${id}`,
    method: 'post',
  },

  appointmentHistory: {
    url: id => `admin/appointment/visit-history/${id}`,
    method: 'post',
  },

  userActivity: {
    url: () => 'admin/useractivity/list',
    method: 'post',
  },

  serveCustomer: {
    url: id => `admin/appointment/serve/${id}`,
    method: 'post',
  },

  partiallyUpdateAppointment: {
    url: id => `admin/appointment/partial-update/${id}`,
    method: 'put',
  },

  noShow: {
    url: id => `admin/appointment/no-show/${id}`,
    method: 'post',
  },

  // Address API
  createAddress: {
    url: () => 'admin/addresses/create',
    method: 'post',
  },

  // Add Owner
  addOwner: {
    url: () => 'admin/owners/create',
    method: 'post',
  },

  findOwner: {
    url: () => 'admin/owners/list',
    method: 'post',
  },

  // Add Sub Owner
  addSubOwner: {
    url: () => 'admin/subowners/create',
    method: 'post',
  },

  findSubOwner: {
    url: () => 'admin/subowners/list',
    method: 'post',
  },

  // Add Customer
  addCustomer: {
    url: () => 'admin/patients/create',
    method: 'post',
  },
  roleList: {
    url: data => `admin/roles/list?${data}`,
    method: 'get',
  },

  // Add Staff
  addStaff: {
    url: () => 'admin/staffs/create',
    method: 'post',
  },

  // Add Chiro
  addChiro: {
    url: () => 'admin/chiropractors/create',
    method: 'post',
  },

  findChiro: {
    url: () => 'admin/chiropractors/list',
    method: 'post',
  },

  // Add Location
  addLocation: {
    url: () => 'admin/locations/create',
    method: 'post',
  },

  findLocation: {
    url: () => 'admin/locations/list',
    method: 'post',
  },
  findAllLocation: {
    url: () => 'client/api/v1/locations/list',
    method: 'post',
  },

  updateLocation: {
    url: id => `admin/locations/update/${id}`,
    method: 'put',
  },

  deleteLocation: {
    url: id => `admin/locations/softDelete/${id}`,
    method: 'put',
  },

  // Find User
  findUser: {
    url: () => 'admin/users/list',
    method: 'post',
  },

  getUser: {
    url: id => `admin/users/${id}`,
    method: 'post',
  },

  updateUser: {
    url: id => `admin/users/update/${id}`,
    method: 'put',
  },

  deleteUser: {
    url: id => `admin/users/softDelete/${id}`,
    method: 'put',
  },

  // Find Patient Category

  getPatientObject: {
    url: () => 'client/api/v1/me',
    method: 'get',
  },

  findAllServicesOfPatient: {
    url: () => 'client/api/v1/services',
    method: 'get',
  },

  findCustomerServiceCategory: {
    url: () => 'client/api/v1/category/list',
    method: 'post',
  },

  findCustomerService: {
    url: () => 'client/api/v1/services/list',
    method: 'post',
  },

  // Find Category
  findCategory: {
    url: () => 'admin/categories/list',
    method: 'post',
  },

  addCategory: {
    url: () => 'admin/categories/create',
    method: 'post',
  },

  getCategory: {
    url: id => `admin/categories/${id}`,
    method: 'get',
  },

  updateCategory: {
    url: id => `admin/categories/update/${id}`,
    method: 'put',
  },

  deleteCategory: {
    url: id => `/admin/categories/softDelete/${id}`,
    method: 'put',
  },



  // Filter Service
  filterService: {
    url: () => 'admin/services/flter',
    method: 'post',
  },

  // Add Service
  addService: {
    url: () => 'admin/services/create',
    method: 'post',
  },

  findService: {
    url: () => 'admin/services/list',
    method: 'post',
  },

  updateService: {
    url: id => `admin/services/update/${id}`,
    method: 'put',
  },

  // Add Membership
  addMembership: {
    url: () => 'admin/memberships/create',
    method: 'post',
  },

  updateMembership: {
    url: id => `admin/memberships/update/${id}`,
    method: 'put',
  },

  findMembership: {
    url: () => 'admin/memberships/list',
    method: 'post',
  },

  deleteMembership: {
    url: id => `admin/memberships/softDelete/${id}`,
    method: 'put',
  },

  // Add Files
  addFile: {
    url: () => 'admin/docfiles/create',
    method: 'post',
  },

  updateFile: {
    url: id => `admin/docfiles/update/${id}`,
    method: 'put',
  },

  findFile: {
    url: () => 'admin/docfiles/list',
    method: 'post',
  },

  // Master APIs
  addMaster: {
    url: () => 'admin/masters/create',
    method: 'post',
  },

  findMaster: {
    url: () => 'admin/masters/list',
    method: 'post',
  },

  getMaster: {
    url: id => `admin/masters/${id}`,
    method: 'get',
  },

  updateMaster: {
    url: id => `admin/masters/update/${id}`,
    method: 'put',
  },

  deleteMaster: {
    url: id => `admin/masters/delete/${id}`,
    method: 'delete',
  },

  partiallyUpdateMaster: {
    url: id => `admin/masters/partial-update/${id}`,
    method: 'put',
  },

  // Image Upload API
  imgUpload: {
    url: () => 'file-upload',
    method: 'post',
  },

  // Patient
  getMe: {
    url: () => 'client/api/v1/me',
    method: 'post',
  },

  getPatient: {
    url: () => 'client/api/v1/patient/get-profile',
    method: 'post',
  },

  getPatientUser: {
    url: id => `client/api/v1/user/${id}`,
    method: 'post',
  },

  // Clent Side Appoitment
  createAppointment: {
    url: () => 'client/api/v1/appointment',
    method: 'post',
  },

  updateAppointment: {
    url: id => `client/api/v1/appointment/${id}`,
    method: 'put',
  },

  getAppointment: {
    url: id => `client/api/v1/appointment/${id}`,
    method: 'post',
  },

  // Patient Book Appointment
  bookAppointment: {
    url: id => `client/api/v1/appointment/book-appointment/${id}`,
    method: 'post',
  },

  // Client Side Location
  findClientLocation: {
    url: () => 'client/api/v1/locations/list',
    method: 'post',
  },

  // Admin Side Patient List
  getPatientSearch: {
    url: () => 'admin/patients/search',
    method: 'post',
  },

  getPatientList: {
    url: () => 'admin/patients/list',
    method: 'post',
  },

  getAdminPatient: {
    url: id => `admin/patients/${id}`,
    method: 'post',
  },

  updateAdminPatient: {
    url: id => `admin/patients/update/${id}`,
    method: 'put',
  },

  // Appointment
  addAppointment: {
    url: () => 'admin/appointment',
    method: 'post',
  },

  editAppointment: {
    url: id => `admin/appointment/${id}`,
    method: 'put',
  },

  deleteAppointment: {
    url: id => `admin/appointment/softDelete/${id}`,
    method: 'put',
  },

  getAllIPDevices: {
    url: () => 'admin/ip-address/list',
    method: 'post',
  },

  addIPAddress: {
    url: () => 'admin/ip-address/create',
    method: 'post',
  },

  // Patient Side Files API
  findPatientFile: {
    url: () => 'client/api/v1/docfiles/list',
    method: 'post',
  },

  addPatientFile: {
    url: () => 'client/api/v1/docfiles/create',
    method: 'post',
  },

  getPatientFile: {
    url: id => `client/api/v1/docfiles/${id}`,
    method: 'get',
  },

  updatePatientFile: {
    url: id => `client/api/v1/docfiles/update/${id}`,
    method: 'put',
  },

  deletePatientFile: {
    url: id => `client/api/v1/docfiles/softDelete/${id}`,
    method: 'put',
  },

  getIpAddress: {
    url: id => `admin/ip-address/${id}`,
    method: 'get',
  },

  updateIpAddress: {
    url: id => `admin/ip-address/update/${id}`,
    method: 'put',
  },

  checkIpValid: {
    url: () => 'checkip',
    method: 'post',
  },

  checkInRequest: {
    url: () => 'checkin-request',
    method: 'post',
  },

  // Card API
  addCard: {
    url: () => 'client/api/v1/cards/add-card',
    method: 'post',
  },

  cardList: {
    url: () => 'client/api/v1/cards/cards-list',
    method: 'get',
  },

  deleteCard: {
    url: () => 'client/api/v1/cards/remove-card',
    method: 'post',
  },

  // Patient Memebership list
  patientMembershipList: {
    url: () => 'client/api/v1/memberships/list',
    method: 'post',
  },

  // Buy MemberShip
  buyMembership: {
    url: () => 'client/api/v1/payment/create-payment',
    method: 'post',
  },

  siwtchMembership: {
    url: () => 'client/api/v1/payment/update-membership',
    method: 'post',
  },

  // Cancel Membership
  cancelMembership: {
    url: () => 'client/api/v1/payment/cancel-subscription',
    method: 'post',
  },

  findChartTemplate: {
    url: () => 'admin/charttemplate/list',
    method: 'post',
  },

  addDailyIntakeChart: {
    url: () => 'admin/appoinmentchart/create',
    method: 'post',
  },

  updateDailyIntakeChart: {
    url: id => `admin/appoinmentchart/update/${id}`,
    method: 'put',
  },

  // for nurse update

  updateAppointmentChartNurse: {
    url: id => `admin/appoinmentchart/updateDailyIntake/${id}`,
    method: 'put',
  },

  // for nurse delete

  deleteNurse: {
    url: id => `admin/appoinmentchart/delete/${id}`,
    method: 'delete',
  },

  // for nurse duplicate

  duplicateNurse: {
    url: id => `admin/appoinmentchart/copyDailyIntake/${id}`,
    method: 'post',
  },

  archieveChart: {
    url: id => `admin/appoinmentchart/archive/${id}`,
    method: 'put',
  },

  // getAllChiro list

  chiroList: {
    url: () => 'admin/staffs/list',
    method: 'post',
  },

  postNurseData: {
    url: id => `admin/appoinmentchart/changeAuthor/${id}`,
    method: 'put',
  },

  patientList: {
    url: () => `admin/patients/list`,
    method: 'post',
  },

  // /admin/appoinmentchart/delete/

  findAllAppointmentChart: {
    url: () => 'admin/appoinmentchart/list',
    method: 'post',
  },

  partialUpdateAppointmentChart: {
    url: id => `admin/appoinmentchart/partial-update/${id}`,
    method: 'put',
  },

  // Patient Appoint Chart List
  findPatientAppointmentChart: {
    url: () => 'client/api/v1/appointmentchart/list',
    method: 'post',
  },

  findPatientAppointmentList: {
    url: () => 'client/api/v1/appointment/list',
    method: 'post',
  },

  // Add Note
  addOrUpdateNote: {
    url: () => 'admin/note/create-or-update',
    method: 'post',
  },

  noteList: {
    url: () => 'admin/note/list',
    method: 'post',
  },

  // Invoice List patient
  customerInvoiceList: {
    url: () => 'client/api/v1/invoices/list',
    method: 'post',
  },

  customerInvoiceItem: {
    url: id => `client/api/v1/invoices/${id}`,
    method: 'get',
  },

  customerInvoicePDF: {
    url: () => 'client/api/v1/invoice/getRecurlyInvoicePdf',
    method: 'post',
  },

  invoicePDF: {
    url: () => 'admin/invoice/list',
    method: 'post',
  },

  patientEventCheckout: {
    url: () => 'client/api/v1/checkout/event',
    method: 'post',
  },

  // Find All Patient Order
  findPatientOrder: {
    url: () => 'client/api/v1/orders/list',
    method: 'post',
  },

  findOrder: {
    url: () => 'admin/order/list',
    method: 'post',
  },

  // Export Chart
  exportChart: {
    url: () => 'admin/appoinmentchart/export',
    method: 'post',
  },

  exportPatientChart: {
    url: () => 'client/api/v1/appointmentchart/export',
    method: 'post',
  },

  // Cancel Event
  cancelEvent: {
    url: () => 'admin/event/cancel-allUser',
    method: 'post',
  },
  // global search
  globalSearch: {
    url: () => 'admin/dashboard/search',
    method: 'post',
  },

  //Dashboard
  dashboardCount: {
    url: () => 'admin/dashboard/report',
    method: 'post',
  },
  // customer dashboard upcoming events
  customerUpComingEvents: {
    url: () => 'client/api/v1/appointment/dashboard-event-list',
    method: 'post',
  },
  // customer membership plans
  customerMembershipPlans: {
    url: id => `admin/patients/purchased-plan/${id}`,
    method: 'get',
  },

  // List Alert
  listAlertListByPatient: {
    url: id => `admin/alerts/${id}/getAll`,
    method: 'post',
  },

  // Add alert
  addAlertListByPatient: {
    url: id => `admin/alerts/${id}`,
    method: 'post',
  },
  // patient visit histry by patient ID
  patientVisithistory: {
    url: patientId => `admin/appointment/patient-history/${patientId}`,
    method: 'post',
  },

  // Pages
  adminPageList: {
    url: () => 'admin/page/list',
    method: 'post',
  },

  addAdminPage: {
    url: () => 'admin/page/create',
    method: 'post',
  },

  findAdminPage: {
    url: id => `admin/page/${id}`,
    method: 'post',
  },

  updateAdminPage: {
    url: id => `admin/page/update/${id}`,
    method: 'put',
  },

  partialUpdateAdminPage: {
    url: id => `admin/page/partial-update/${id}`,
    method: 'put',
  },

  deleteAdminPage: {
    url: id => `admin/page/softDelete/${id}`,
    method: 'put',
  },

  findTosPageByLocation: {
    url: id => `client/api/v1/page/${id}`,
    method: 'post',
  },

  customerAppointment: {
    url: () => `client/api/v1/appointments`,
    method: 'get',
  },

  customerRegisterDevice: {
    url: () => `client/api/v1/add-device`,
    method: 'post',
  },

  getTenantUserProfile: {
    url: () => `admin/tenant/test`,
    method: 'get',
  },

  getTenantServices: {
    url: () => `admin/tenant/services`,
    method: 'get',
  },

  searchTenantSearch: {
    url: () => 'admin/tenant/search',
    method: 'get',
  },

  

  /**
   * Invitations related routes
   */
  customerInvitationCreate: {
    url: () => 'client/api/v1/invitations',
    method: 'post',
  },

  customerGetAllInvitations: {
    url: () => `client/api/v1/invitations`,
    method: 'get',
  },
  
  // customerCheckEmailExistance: {
  //   url: () => `client/api/v1/invitations/email-availability/`,
  //   method: 'post',
  // },



  getPatientById: {
    url: id => `admin/patients/${id}`,
    method: 'post',
  },
  

}

module.exports = apiList
