/*
 * constants
 */

const JWT = {
  SECRET: "myjwtsecret",
  ADMIN_SECRET: "myjwtadminsecret",
  CLIENT_SECRET: "myjwtclientsecret",
  EXPIRES_IN: 10000,
};

const USER_ROLE = {
  Admin: 1,
  Owner: 2,
  Sub_Owner: 3,
  Chiropractor: 4,
  Staff: 5,
  Patient: 6,
  Nurse: 7,
};

const ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  PATIENT: "PATIENT",
  SUB_OWNER: "SUB_OWNER",
  OWNER: "OWNER",
  CHIROPRACTOR: "CHIROPRACTOR",
  STAFF: "STAFF",
  NURSE: "NURSE",
};
const SECRET_ENCRYPTION = "snaphealthseceret";

const MASTER = {
  MASTER_OTP: 123456,
  MASTER_PASSWORD: 12345678,
};
const PLATFORM = {
  ADMIN: 1,
  CLIENT: 4,
};

const BRAND_NAME = "Snap Crack";
const CMD_CANCEL = "cancel";

const EMAIL_SUBJECT = {
  RESET_PASSWORD_LINK: "RESET_PASSWORD_LINK",
  PASSWORD_CONFIRMATION_CHANGES: "PASSWORD_CONFIRMATION_CHANGES",
  EMAIL_VERIFICATION_LINK: "Welcome to Snap Crack, Verify your email address",
  PASSWORD_EMAIL: "PASSWORD_EMAIL",
  NEW_UPCOMING_EVENT: "NEW_UPCOMING_EVENT",
  LOGIN_SUCCESSFULLY: "Successfully Logged In",
  LOGIN_LINK_SMS: "LOGIN_LINK",
};

let LOGIN_ACCESS = {
  [USER_ROLE.User]: [PLATFORM.ADMIN, PLATFORM.CLIENT],
  [USER_ROLE.Admin]: [PLATFORM.ADMIN, PLATFORM.CLIENT],
};
const SLOT_INTERVAL = 30;
const DEFAULT_ROLE = 1;

const TIME_SLOT_TYPE = {
  DAILY: "DAILY",
  TIMESLOT: "TIMESLOT",
};

const SERVICE_TIME_IN_MINUTE = 30;

const BUFFERAVAILABLESLOT = 84;

const ROLE_RIGHTS = {
  [USER_ROLE.User]: [
    "getAllByUserInAdminPlatform",
    "getByUserInAdminPlatform",
    "aggregateByUserInAdminPlatform",
    "getCountByUserInAdminPlatform",
    "createByUserInAdminPlatform",
    "addBulkByUserInAdminPlatform",
    "updateByUserInAdminPlatform",
    "updateBulkByUserInAdminPlatform",
    "partialUpdateByUserInAdminPlatform",
    "deleteByUserInAdminPlatform",
    "softDeleteByUserInAdminPlatform",
    "upsertByUserInAdminPlatform",
    "fileUploadByUserInAdminPlatform",
    "changePasswordByUserInAdminPlatform",
    "getAllByUserInDesktopPlatform",
    "getByUserInDesktopPlatform",
    "aggregateByUserInDesktopPlatform",
    "getCountByUserInDesktopPlatform",
    "createByUserInDesktopPlatform",
    "addBulkByUserInDesktopPlatform",
    "updateByUserInDesktopPlatform",
    "updateBulkByUserInDesktopPlatform",
    "partialUpdateByUserInDesktopPlatform",
    "deleteByUserInDesktopPlatform",
    "softDeleteByUserInDesktopPlatform",
    "upsertByUserInDesktopPlatform",
    "fileUploadByUserInDesktopPlatform",
    "changePasswordByUserInDesktopPlatform",
    "getAllByUserInClientPlatform",
    "getByUserInClientPlatform",
    "aggregateByUserInClientPlatform",
    "getCountByUserInClientPlatform",
    "createByUserInClientPlatform",
    "addBulkByUserInClientPlatform",
    "updateByUserInClientPlatform",
    "updateBulkByUserInClientPlatform",
    "partialUpdateByUserInClientPlatform",
    "deleteByUserInClientPlatform",
    "softDeleteByUserInClientPlatform",
    "upsertByUserInClientPlatform",
    "fileUploadByUserInClientPlatform",
    "changePasswordByUserInClientPlatform",
    "getAllByUserInDevicePlatform",
    "getByUserInDevicePlatform",
    "aggregateByUserInDevicePlatform",
    "getCountByUserInDevicePlatform",
    "createByUserInDevicePlatform",
    "addBulkByUserInDevicePlatform",
    "updateByUserInDevicePlatform",
    "updateBulkByUserInDevicePlatform",
    "partialUpdateByUserInDevicePlatform",
    "deleteByUserInDevicePlatform",
    "softDeleteByUserInDevicePlatform",
    "upsertByUserInDevicePlatform",
    "fileUploadByUserInDevicePlatform",
    "changePasswordByUserInDevicePlatform",
  ],

  [USER_ROLE.Admin]: [
    "getAllByAdminInAdminPlatform",
    "getByAdminInAdminPlatform",
    "aggregateByAdminInAdminPlatform",
    "getCountByAdminInAdminPlatform",
    "createByAdminInAdminPlatform",
    "addBulkByAdminInAdminPlatform",
    "updateByAdminInAdminPlatform",
    "updateBulkByAdminInAdminPlatform",
    "partialUpdateByAdminInAdminPlatform",
    "deleteByAdminInAdminPlatform",
    "softDeleteByAdminInAdminPlatform",
    "upsertByAdminInAdminPlatform",
    "fileUploadByAdminInAdminPlatform",
    "changePasswordByAdminInAdminPlatform",
    "getAllByAdminInDesktopPlatform",
    "getByAdminInDesktopPlatform",
    "aggregateByAdminInDesktopPlatform",
    "getCountByAdminInDesktopPlatform",
    "createByAdminInDesktopPlatform",
    "addBulkByAdminInDesktopPlatform",
    "updateByAdminInDesktopPlatform",
    "updateBulkByAdminInDesktopPlatform",
    "partialUpdateByAdminInDesktopPlatform",
    "deleteByAdminInDesktopPlatform",
    "softDeleteByAdminInDesktopPlatform",
    "upsertByAdminInDesktopPlatform",
    "fileUploadByAdminInDesktopPlatform",
    "changePasswordByAdminInDesktopPlatform",
    "getAllByAdminInClientPlatform",
    "getByAdminInClientPlatform",
    "aggregateByAdminInClientPlatform",
    "getCountByAdminInClientPlatform",
    "createByAdminInClientPlatform",
    "addBulkByAdminInClientPlatform",
    "updateByAdminInClientPlatform",
    "updateBulkByAdminInClientPlatform",
    "partialUpdateByAdminInClientPlatform",
    "deleteByAdminInClientPlatform",
    "softDeleteByAdminInClientPlatform",
    "upsertByAdminInClientPlatform",
    "fileUploadByAdminInClientPlatform",
    "changePasswordByAdminInClientPlatform",
    "getAllByAdminInDevicePlatform",
    "getByAdminInDevicePlatform",
    "aggregateByAdminInDevicePlatform",
    "getCountByAdminInDevicePlatform",
    "createByAdminInDevicePlatform",
    "addBulkByAdminInDevicePlatform",
    "updateByAdminInDevicePlatform",
    "updateBulkByAdminInDevicePlatform",
    "partialUpdateByAdminInDevicePlatform",
    "deleteByAdminInDevicePlatform",
    "softDeleteByAdminInDevicePlatform",
    "upsertByAdminInDevicePlatform",
    "fileUploadByAdminInDevicePlatform",
    "changePasswordByAdminInDevicePlatform",
  ],
};
const MAX_LOGIN_RETRY_LIMIT = 3;

const FORGOT_PASSWORD_WITH = {
  OTP: {
    email: true,
    sms: false,
  },
  EXPIRETIME: 20,
};
const STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
  AWAY: "away",
};

const PLAN = {
  PLAN_ADD_ON: "plan_add_on",
};

const INTERVAL_UNIT = "months";
const INTERVAL_LENGTH = 1;
const CURRENCY = "USD";

const PROFILE_NOTIFICATIONS = {
  NOTIFICATION_CHANGED: "Notification Changed",
  NOTIFICATION_CANCELLED: "Notification Cancelled",
  NOTIFICATION_BOOKED: "Notification Booked",
  NOTIFICATION: "Email Notification",
};

const ITEM = {
  PRODUCT: "product",
  SERVICE: "service",
  CATEGORY: "category",
  EVENT: "event",
};

const ORDER_TYPE = {
  PRODUCT: "product",
  SERVICE: "service",
  EVENT: "event",
  MEMBERSHIP: "membership",
};
const COUNTRY = {
  NAME: "USA",
};
const ADDRESS_OTHER = "OTHER";
const COUNTRY_CODE = "+1";

const POPULATE = [
  {
    path: "addressIds.address",
  },
  {
    path: "locationIds roleId profile_image",
  },
];

module.exports = {
  JWT,
  USER_ROLE,
  DEFAULT_ROLE,
  ROLE_RIGHTS,
  ROLE,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
  SECRET_ENCRYPTION,
  MASTER,
  STATUS,
  CURRENCY,
  BRAND_NAME,
  PLAN,
  PROFILE_NOTIFICATIONS,
  ITEM,
  EMAIL_SUBJECT,
  COUNTRY,
  SLOT_INTERVAL,
  TIME_SLOT_TYPE,
  SERVICE_TIME_IN_MINUTE,
  BUFFERAVAILABLESLOT,
  INTERVAL_UNIT,
  INTERVAL_LENGTH,
  ORDER_TYPE,
  COUNTRY_CODE,
  ADDRESS_OTHER,
  POPULATE,
};
