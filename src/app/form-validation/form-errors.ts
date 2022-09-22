export const VALIDATION_MESSAGES = {
  first_name: {
    required: `Please enter first name`,
  },
  last_name: {
    required: `Please enter last name`,
  },
  email: {
    required: `Please enter email`,
    email: `Please enter valid email`,
    validateEmail: `Please enter valid email`,
  },
  phone_number: {
    required: `Please enter phone number`,
    minlength: `Please enter at least 8 digits`,
    maxlength: `Please enter at least 18 digits`
  },
  password: {
    required: `Please enter password`,
    pattern: `Password must contains at least 6 characters`,
  },
  confirm_password: {
    required: `Please enter confirm password`,
    validatePassword: `Your Password is not matched`,
  },

  tree_level_name: {
    required: `Please enter tree level name`,
  },
  max_node: {
    required: `Please enter max node`,
  },
  tree_order: {
    required: `Please enter tree order`,
  },

  tree_name: {
    required: `Please enter tree name`,
  },
  tree_level_id: {
    required: `Please enter tree level`,
  },
  user_type: {
    required: `Please enter user type`,
  },

  wallet_name: {
    required: `Please enter wallet name`,
  },
  currency_id: {
    required: `Please select currency`,
  },
  wallet_type: {
    required: `Please select wallet type`,
  },
  otp: {
    required: `Please enter OTP`,
  },
  login_pin: {
    required: `Please enter PIN`,
    maxlength: `Pin Max 4 Digit`,
    minlength: `Please enter at least 4 digits`,
  },
  bank_name: {
    required: `Please enter bank name`,
  },
  cvv: {
    required: `Please enter code`,
    max: `Code Max 4 Digit`,
    min: `Please enter at least 4 digits`,
  },
  amount: {
    required: `Please enter amount`,
    max: `amount max balance`,
  },

  sms: {
    required: `Please enter content`,
  },
  webhook: {
    required: `Please enter content`,
  },

  device_number: {
    required: `Please enter device number`,
  },
  name: {
    required: `Please enter name`,
  },
  location: {
    required: `Please enter location`,
  },
  group_id: {
    required: `Please select group`,
  }

};
