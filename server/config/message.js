/**
 * Configuration file where you can store error codes for responses
 */
module.exports = {
  MESSAGE: {
    PATIENT_SUBSCRIPTION: {
      code: "OK",
      message: "Prescription fax sent successfully.",
      status: 400,
    },
    BAD_REQUEST: {
      code: "E_BAD_REQUEST",
      message: "The request cannot be fulfilled due to bad syntax",
      status: 400,
    },
    CREATED: {
      code: "CREATED",
      message:
        "The request has been fulfilled and resulted in a new resource being created.",
      status: 201,
    },
    CREATE_FAILED: {
      code: "CREATE_FAILED",
      message: "The request has not been fulfilled, Please try again",
      status: 500,
    },
    IS_REQUIRED: {
      message: "is required.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    IS_DUPLICATE: {
      message: "already exists.",
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
    },
    FORBIDDEN: {
      code: "E_FORBIDDEN",
      message: "User not authorized to perform the operation",
      status: 403,
    },

    RECORD_NOT_FOUND: {
      code: "E_NOT_FOUND",
      message: "Record not found",
      status: 404,
    },
    OK: {
      code: "OK",
      message: "Operation is successfully executed.",
      status: 200,
    },

    SERVER_ERROR: {
      code: "E_INTERNAL_SERVER_ERROR",
      message: "Something bad happened on the server.",
      status: 500,
    },
    UNAUTHORIZED: {
      code: "E_UNAUTHORIZED",
      message: "Missing or invalid authentication token.",
      status: 401,
    },
    USER_NOT_FOUND: {
      code: "E_USER_NOT_FOUND",
      message: "User with specified credentials is not found.",
      status: 401,
    },
    EMAIL_PASS_NOT_MATCHED: {
      code: "E_USER_NOT_FOUND",
      message: "Email address and password doesn't match.",
      status: 401,
    },
    BLOCKED_FOR_WRONG_ATTEMPTS: {
      code: "E_USER_NOT_FOUND",
      message:
        "Your account has been blocked for multiple wrong password attempts. Please try again later.",
      status: 401,
    },

    EMAIL_REGISTERED: {
      code: "E_DUPLICATE",
      message: "This Email Address number is already registered",
      status: 200,
    },
    MOBILE_REGISTERED: {
      code: "E_DUPLICATE",
      message: "This phone number is already registered.",
      status: 200,
    },
    USER_NOT_ACTIVE: {
      code: "E_UNAUTHORIZED",
      message: "Your account is deactivated.",
      status: 200,
    },
    USER_EMAIL_NOT_VERIFIED: {
      code: "E_UNAUTHORIZED",
      message: "Your email is not verified.",
      status: 200,
    },
    USER_MOBILE_NOT_VERIFIED: {
      code: "E_UNAUTHORIZED",
      message: "Your mobile is not verified.",
      status: 200,
    },
    USERNAME_REGISTERED: {
      code: "E_DUPLICATE",
      message: "User is already registered in this system",
      status: 200,
    },
    USER_CONTACT_DETAILS: {
      code: "OK",
      message: "Contact details are successfully retrieved.",
      status: 200,
    },
    USER_CONTACT_DETAILS_UPDATED: {
      code: "OK",
      message: "Contact details are successfully updated.",
      status: 200,
    },
    USER_CONTACT_DETAILS_DELETED: {
      code: "OK",
      message: "Contact details are successfully deleted.",
      status: 200,
    },
    USER_REGISTER_FAILED: {
      code: "E_INTERNAL_SERVER_ERROR",
      message: " Failed to registered user.",
      status: 401,
    },
    LOGIN: {
      code: "OK",
      message: "Successfully login.",
      status: 200,
    },
    INVALID_USERNAME: {
      code: "E_BAD_REQUEST",
      message: "Invalid username.",
      status: 401,
    },
    INVALID_PASSWORD: {
      code: "E_BAD_REQUEST",
      message: "Invalid password.",
      status: 401,
    },
    INVALID_PASSWORD_CURRENT: {
      code: "E_BAD_REQUEST",
      message: "Current password is wrong.",
      status: 401,
    },
    INVALID_TOKEN: {
      code: "E_BAD_REQUEST",
      message: "Invalid token.",
      status: 401,
    },
    INVALID_OTP: {
      code: "E_BAD_REQUEST",
      message: "Entered code is incorrect. Try again",
      status: 401,
    },
    PROFILE_UPDATED: {
      code: "OK",
      message: "Profile updated successfully.",
      status: 200,
    },

    USER_LIST_NOT_FOUND: {
      code: "E_NOT_FOUND",
      message: "User not found.",
      status: 404,
    },
    USER_DELETED: {
      code: "OK",
      message: "User(s) deleted successfully.",
      status: 200,
    },
    USER_PASSWORD_RESET: {
      code: "OK",
      message: "Password changed successfully.",
      status: 200,
    },
    USER_OTP_SENT: {
      code: "OK",
      message: "Password reset otp sent successfully.",
      status: 200,
    },

    OTP_VERIFIED: {
      code: "OK",
      message: "OTP verified successfully.",
      status: 200,
    },

    OTP_SENT: {
      code: "OK",
      message: "OTP sent successfully.",
      status: 200,
    },
    RESET_PASSWORD_LINK_EXPIRE: {
      code: "E_BAD_REQUEST",
      message: "Your reset password link is expired or invalid",
      status: 401,
    },
    OTP_EXPIRE: {
      code: "E_BAD_REQUEST",
      message: "Your OTP has been expired.",
      status: 401,
    },

    MOBILE_VERIFIED: {
      code: "OK",
      message: "Your mobile number has been successfully verified.",
      status: 200,
    },
    USER_MOBILE_NOT_VERIFIED_UPDATE: {
      code: "BAD_REQUEST",
      message: "Verify your mobile number before update.",
      status: 200,
    },
    INVALID_VERIFICATION_TOKEN: {
      code: "E_USER_NOT_FOUND",
      message: "Your token is invalid or expired.",
      status: 401,
    },
    EMAIL_ALREADY_VERIFIED: {
      code: "E_BAD_REQUEST",
      message: "Email is already verified.",
      status: 401,
    },
    MOBILE_ALREADY_VERIFIED: {
      code: "E_BAD_REQUEST",
      message: "Mobile number is already verified.",
      status: 401,
    },
    EMAIL_VERIFICATION: {
      code: "OK",
      message: "Please check your email for verification link.",
      status: 200,
    },
    MOBILE_VERIFICATION: {
      code: "OK",
      message: "OTP has been sent to your mobile number.",
      status: 200,
    },

    RESET_PASSWORD_LINK_MOBILE: {
      code: "OK",
      message: "Please check your mobile to reset your password.",
      status: 200,
    },
    USER_NOT_EXIST_FOR_EMAIL: {
      code: "E_NOT_FOUND",
      message: "This email address is not registered.",
      status: 200,
    },

    NO_RECORD_FOUND: {
      code: "E_NOT_FOUND",
      message: "No record found.",
      status: 402,
    },

    LIST_NOT_FOUND: {
      code: "E_NOT_FOUND",
      message: "List not found.",
      status: 200,
    },
    EMAIL_NOT_REGISTERED: {
      code: "E_DUPLICATE",
      message: "This isn't an email we know.",
      status: 200,
    },
    EMAIL_NOT_FOUND: {
      code: "E_USER_NOT_FOUND",
      message: "Email address does not exist.",
      status: 200,
    },
    EMAIL_CANT_LOGIN_PATIENT: {
      code: "E_USER_NOT_FOUND",
      message: "You can't login as patient with this email.",
      status: 200,
    },
    EMAIL_CANT_LOGIN_PHYSICIAN: {
      code: "E_USER_NOT_FOUND",
      message: "You can't login as physician with this email.",
      status: 200,
    },
    CONTACT_US_CREATED: {
      code: "OK",
      message:
        "Your contact enquiry is submitted. Our support team will contact you soon.",
      status: 200,
    },
    NOTIFICATION_SEND_SUCCESSFULLY: {
      message: "Notification send Successfully",
    },
    SOMETHING_WENT_WRONG: {
      message: "Something went wrong.",
    },
    FAILED_TO_UPDATE_ALL_RECORDS: {
      message: "Failed to update all records",
    },
    ERROR: {
      message: "Error.",
    },
    REQUEST_IS_NOT_VALID_TRY_AGAIN: {
      message: "This request is not valid , Please try again !.",
    },
    SUCCESS: {
      message: "success",
    },
    FILE_UPLOADED_SUCCESSFULLY: {
      message: " file uploaded successfully",
    },
    FILE_DELETED_SUCCESSFULLY: {
      message: " file deleted successfully",
    },
    DELETE_SUCCESSFULLY: {
      message: "deleted successfully.",
    },
    LINK_SHARE_SUCCESSFULLY: {
      message: "Link Shared successfully.",
    },
    CONFIG_NOT_FOUND: {
      code: "E_NOT_FOUND",
      message: "Configuration not found.",
      status: 200,
    },
    CONFIG_UPDATED: {
      code: "OK",
      message: "Configuration is successfully updated.",
      status: 200,
    },
    EMAIL_VERIFICATION_OTP: {
      code: "OK",
      message: "OTP has been sent to your email.",
      status: 200,
    },
    LOGIN_OTP_VERIFIED: {
      code: "OK",
      message: "Your log in OTP has been successfully verified.",
      status: 200,
    },
    UPDATE_PROFILE_OTP_VERIFIED: {
      code: "OK",
      message: "Your mobile verification OTP has been successfully verified.",
      status: 200,
    },
    RECORDS_STATUS_UPDATE: {
      code: "OK",
      message: "Records status updated successfully.",
      status: 200,
    },
    RECORD_DELETED_SUCCESSFULLY: {
      code: "OK",
      message: "Record deleted successfully.",
      status: 200,
    },
    MASTER_NAME_DUPLICATE: {
      code: "E_DUPLICATE",
      message: "Name must not be duplicate.",
    },

    //Appointment

    //Patient
    PATIENT_HAS_UPCOMING_APPOINTMENTS: {
      code: "UNPROCESSABLE_ENTITY",
      message: `Patient has upcoming appointments.`,
      status: 401,
    },

    PATIENT_HAS_ONGOING_APPOINTMENT: {
      code: "BAD_REQUEST",
      message: `Patient has an ongoing appointment. can't deactivate patient.`,
      status: 401,
    },

    //Physician
    PHYSICIAN_HAS_UPCOMING_APPOINTMENTS: {
      code: "UNPROCESSABLE_ENTITY",
      message: `Physician has upcoming appointments.`,
      status: 401,
    },

    PHYSICIAN_HAS_ONGOING_APPOINTMENT: {
      code: "BAD_REQUEST",
      message: `Physician has an ongoing appointment. can't deactivate physician.`,
      status: 401,
    },

    //Specialization
    SPECIALIZATION_NAME: {
      code: "E_DUPLICATE",
      message: "Specialization name must not be a duplicate.",
      status: 200,
    },
    SPECIALIZATION_CREATED: {
      code: "OK",
      message: "Specialization added successfully.",
      status: 200,
    },
    SPECIALIZATION_FAILED: {
      code: "E_INTERNAL_SERVER_ERROR",
      message: "Failed to add Specialization.",
      status: 401,
    },
    SPECIALIZATION_RETRIEVE: {
      code: "OK",
      message: "Specialization retrieve successfully.",
      status: 200,
    },
    SPECIALIZATION_UPDATED: {
      code: "OK",
      message: "Specialization updated successfully.",
      status: 200,
    },
    SPECIALIZATION_DELETED: {
      code: "OK",
      message: "Specialization deleted successfully.",
      status: 200,
    },

    RESET_PASSWORD_OTP_VERIFIED: {
      code: "OK",
      message: "Your reset password OTP has been successfully verified.",
      status: 200,
    },

    RESET_PASSWORD_SUCCESSFULLY: {
      code: "OK",
      message: "Your password has been successfully reset.",
      status: 200,
    },

    EMAIL_NOT_EXISTS: {
      code: "E_NOT_FOUND",
      message: "Entered email does not exists.",
      status: 200,
    },

    //NOTIFICATIONS

    NOTIFICATION_CLEAR_ALL: {
      code: "OK",
      message: "All notifications cleared.",
      status: 200,
    },
    NOTIFICATION_READ_ALL: {
      code: "OK",
      message: "All notifications read.",
      status: 200,
    },
    NOTIFICATION_STATUS_UPDATE: {
      code: "OK",
      message: "Notification status updated successfully.",
      status: 200,
    },

    //CRUD Messages

    PHARMACY_ADDED: {
      code: "OK",
      message: "Pharmacy added successfully.",
      status: 200,
    },
    PHARMACY_UPDATED: {
      code: "OK",
      message: "Pharmacy updated successfully.",
      status: 200,
    },
    PHARMACY_DELETED: {
      code: "OK",
      message: "Pharmacy deleted successfully.",
      status: 200,
    },
    SPECIALIZATION_ADDED: {
      code: "OK",
      message: "Specialization added successfully.",
      status: 200,
    },
    SPECIALIZATION_UPDATED: {
      code: "OK",
      message: "Specialization updated successfully.",
      status: 200,
    },
    SPECIALIZATION_DELETED: {
      code: "OK",
      message: "Specialization deleted successfully.",
      status: 200,
    },
    VERSION_ADDED: {
      code: "OK",
      message: "Version added successfully.",
      status: 200,
    },
    VERSION_UPDATED: {
      code: "OK",
      message: "Version updated successfully.",
      status: 200,
    },
    VERSION_DELETED: {
      code: "OK",
      message: "Version deleted successfully.",
      status: 200,
    },
    FAQ_ADDED: {
      code: "OK",
      message: "FAQs added successfully.",
      status: 200,
    },
    FAQ_UPDATED: {
      code: "OK",
      message: "FAQs updated successfully.",
      status: 200,
    },
    PROMOCODE_DELETED: {
      code: "OK",
      message: "Promocode deleted successfully.",
      status: 200,
    },
    PROMOCODE_ADDED: {
      code: "OK",
      message: "Promocode added successfully.",
      status: 200,
    },
    PROMOCODE_CODE_DUPLICATE: {
      code: "E_DUPLICATE",
      message: "Promocode code must not be a duplicate.",
      status: 200,
    },
    PROMOCODE_UPDATED: {
      code: "OK",
      message: "Promocode updated successfully.",
      status: 200,
    },
    PROMOCODE_DELETED: {
      code: "OK",
      message: "Promocode deleted successfully.",
      status: 200,
    },
    PROMOCODE_INVALID: {
      code: "BAD_REQUEST",
      message: "Promocode is not valid.",
      status: 200,
    },
    PROMOCODE_APPLIED: {
      code: "OK",
      message: "Promocode applied successfully.",
      status: 200,
    },
    PROMO_CODE_LIMIT_REACHED: {
      code: "UNPROCESSABLE_ENTITY",
      message: `Maximum limit reached for the Promo Code.`,
      status: 401,
    },

    MASTER_CREATED: {
      code: "OK",
      message: "Master added successfully.",
      status: 200,
    },
    SUB_MASTER_CREATED: {
      code: "OK",
      message: "Submaster added successfully.",
      status: 200,
    },
    MASTER_UPDATED: {
      code: "OK",
      message: "Master updated successfully.",
      status: 200,
    },
    SUB_MASTER_UPDATED: {
      code: "OK",
      message: "Submaster updated successfully.",
      status: 200,
    },

    STRIPE_CARD_SUCCESS: {
      code: "OK",
      message: "Card added successfully.",
      status: 200,
    },
    STRIPE_CARD_PRIMARY_NOT_REMOVED: {
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
      message: "Primary card cannot be removed.",
    },
    STRIPE_CARD_UPDATED: {
      code: "OK",
      message: "Card updated successfully.",
      status: 200,
    },
    STRIPE_CARD_REMOVED: {
      code: "OK",
      message: "Card removed successfully.",
      status: 200,
    },
    STRIPE_CARD_PRIMARY: {
      code: "OK",
      message: "Card set default successfully.",
      status: 200,
    },
    STRIPE_CUSTOMER_CARD_ALREADY_EXISTS: {
      code: "E_BAD_REQUEST",
      message: "This card already exists in your account.",
      status: 401,
    },
    APPOINTMENT_NOT_FOUND: {
      code: "E_NOT_FOUND",
      message: "Appointment not found.",
      status: 404,
    },
    APPOINTMENT_LIST_NOT_FOUND: {
      code: "E_NOT_FOUND",
      message: "Appointments not found.",
      status: 404,
    },
    APPOINTMENT_ALREADY_PAID: {
      code: "OK",
      message: "Appointment payment already done.",
      status: 200,
    },
    APPOINTMENT_CHARGE_SUCCESS: {
      code: "OK",
      message: "Appointment payment successfull.",
      status: 200,
    },
    APPOINTMENT_CHARGE_FAILED: {
      code: "OK",
      message: "Appointment payment failed.",
      status: 200,
    },
    NOTIFICATIONS: {
      code: "OK",
      message: "Notifications routes are retrieved successfully.",
      status: 200,
    },
    NOTIFICATIONS_UPADTED: {
      code: "OK",
      message: "Notifications routes are updated successfully.",
      status: 200,
    },

    NOT_FOUND: {
      message:
        "The requested resource could not be found but may be available again in the future",
      status: 404,
    },

    // Authorization
    EMAIL_VERIFIED: {
      message: "Your email address has been verified successfully",
      status: 200,
    },
    EMAIL_ALREADY_VERIFIED: {
      message: "Email is already verified.",
    },

    EMAIL_VERIFICATION: {
      message: "Please check your email for verification link.",
    },

    RESET_PASSWORD_LINK: {
      message: "Please check your email to reset your password.",
    },

    USER_PROFILE_GET: {
      message: "User profile fetched Successfully",
    },

    LOGOUT: {
      message: "Successfully logout.",
      status: 200,
    },

    // Address
    ADDRESS_ADDED: {
      message: "Address has been added Successfully",
    },
    ADDRESS_UPDATED: {
      message: "Address has been updated Successfully",
    },
    ADDRESS_DELETED: {
      message: "Address had been deleted Successfully",
    },
    ADDRESS_LIST: {
      message: "Addresses has been fetched Successfully",
    },
    ADDRESS_GET: {
      message: "Address has been fetched Successfully",
    },

    //

    ITEM_ADDED: {
      message: " has been added Successfully",
    },
    ITEM_UPDATED: {
      message: " has been updated Successfully",
    },
    ITEM_DELETED: {
      message: " has been deleted Successfully",
    },
    ITEM_LIST: {
      message: " been fetched Successfully",
    },

    //order Status
    UPDATE_ORDER_STATUS: {
      message: "Your order status has been updated",
    },
    DELETE_OREDR: {
      mesage: "Ypur order is deleted",
    },
    UPDATE_ORDER: {
      message: "Order is updated Successfully",
    },
    FETCH_ORDER_LIST: {
      message: "All Orders are fetched Successfully",
    },
    FETCH_ORDER: {
      message: "Order fetch Successfully",
    },
    ORDER_CREATE: {
      message: "Order is created Successfully",
    },

    //Transaction
    TRANSACTION_CREATE: {
      message: "Transaction is created Successfully",
    },
    TRANSACTION_LIST: {
      message: "All Transactions are fetched Successfully",
    },
    TRANSACTION_FETCH: {
      message: "Transaction is fetched successfully",
    },
    TRANSACTION_UPDATE: {
      message: "Transaction is updated successfully",
    },

    // USER

    USER_REGISTERED: {
      message: " has been registered successfully.",
    },
    USER_ADDED: {
      code: "OK",
      message: "User added successfully.",
      status: 200,
    },
    USER_UPDATED: {
      code: "OK",
      message: " has been updated Successfully.",
      status: 200,
    },

    USER_LIST: {
      message: " have been fetched Successfully",
    },
    USER_DELETED: {
      message: " has been deleted Successfully",
    },
    //PROFILE

    PROFILE_GET: {
      message: "Your profile is fetched Successfully",
    },

    //ROLE
    ROLE_LIST: {
      message: "Roles have been fetched successfully",
    },

    //ROOM
    ROOM_CREATE_ERROR: {
      message: "Room already exists",
    },
    ROOM_EXISTS: {
      message: "ROOM_EXISTS",
    },


    // Alert
    ALERT_ADDED: {
      message: "Alert has been added Successfully",
    },
    ALERT_UPDATED: {
      message: "Alert has been updated Successfully",
    },
    ALERT_DELETED: {
      message: "Alert had been deleted Successfully",
    },
    ALERT_LIST: {
      message: "Alert has been fetched Successfully",
    },
    ALERT_GET: {
      message: "Alert has been fetched Successfully",
    },
  },
};
