export const config = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  header: {
    deviceId: "1",
    deviceType: "3",
  },
  version: {
    environment: "",
    build: "1.0.0(2)",
  },
  environment: "",
  changeLogs: `bugFix/login-page-body-tabTitle-favicon`,
};

export const ERROR_CODES = {
  1003: {
    module: "LOGIN",
    code: "PASSWORD_MISMATCH",
    message: "Login Failed",
    description: "username or password is not correct",
  },
  1000: {
    module: "MANIFEST",
    code: "SESSION_NOT_FOUND",
    message: "Session Expired",
    description: "Please logout your account and login again.",
  },

  2604: {
    module: "EDIT",
    code: "USER_NAME_EXIST",
    message: "Username has already been taken",
    description: "Please choose another username.",
  },
  2605: {
    module: "EDIT",
    code: "SAME_OLD_PASSWORD",
    message: "Same Old Password",
    description: "New password cannot be the same as your old password",
  },
  2606: {
    module: "EDIT",
    code: "INCORRECT_OLD_PASSWORD",
    message: "Incorrect Password",
    description: "Old password mismatch",
  },
};
