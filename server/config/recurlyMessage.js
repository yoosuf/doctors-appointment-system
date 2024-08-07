/**
 * Configuration file where you can store error codes for responses
 */
module.exports = {
  MESSAGE: {
    SERVER_ERROR: {
      code: "SERVER_ERROR",
      message: "Server error!!",
      status: 500,
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
    NOT_FOUND: {
      code: "E_NOT_FOUND",
      message:
        "The requested resource could not be found but may be available again in the future",
      status: 404,
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
    NO_RECORD_FOUND: {
      code: "E_NOT_FOUND",
      message: "No record found.",
      status: 402,
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
      message: "This request is not valid, Please try again !.",
    },
    SUCCESS: {
      message: "success",
    },
    CARD_SUCCESS: {
      code: "OK",
      message: "Card added successfully.",
      status: 200,
    },
    CARD_PRIMARY_NOT_REMOVED: {
      code: "UNPROCESSABLE_ENTITY",
      status: 422,
      message: "Primary card cannot be removed.",
    },
    CARD_UPDATED: {
      code: "OK",
      message: "Card updated successfully.",
      status: 200,
    },
    TOKEN_GENERATED: {
      code: "OK",
      message: "stripe token generated successfully.",
      status: 200,
    },
    CARD_REMOVED: {
      code: "OK",
      message: "Card removed successfully.",
      status: 200,
    },
    CARD_PRIMARY: {
      code: "OK",
      message: "Card set default successfully.",
      status: 200,
    },
    CUSTOMER_CARD_ALREADY_EXISTS: {
      code: "E_BAD_REQUEST",
      message: "This card already exists in your account.",
      status: 401,
    },
  },
};
