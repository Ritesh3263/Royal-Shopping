export const APP_NAME = window.localStorage['__royal_shopping__cmp_nm'] ? window.localStorage['__royal_shopping__cmp_nm'] : 'Royal Shopping';

export const DATEFORMAT = 'd-m-Y';
export const TIMEFORMAT = 'h:i K';

export const DATE_TIME_FORMAT = {
  dateFormat: DATEFORMAT + ' ' + TIMEFORMAT,
  enableTime: true,
  // minDate: null
};

export const DATE_FORMAT = {
  dateFormat: DATEFORMAT,
  enableTime: false,
  // minDate: null
};

export const DATERANGE_FORMAT = {
  dateFormat: DATEFORMAT,
  mode: 'range'
};

export const TIME_FORMAT = {
  dateFormat: TIMEFORMAT,
  time_24hr: false,
  enableTime: true,
  noCalendar: true,
  defaultDate: new Date()
};

export const pageTitles = {
  login: `Log In | ${APP_NAME}`,
  signup: `Sign Up with ${APP_NAME}`,
  otp: `OTP | ${APP_NAME}`,
  forgot_password: `Forgot Password | ${APP_NAME}`,
  reset_password: `Reset Password | ${APP_NAME}`,
  change_password: `Change Password | ${APP_NAME}`,
  view_profile: `Profile | ${APP_NAME}`,
  edit_profile: `Edit Profile | ${APP_NAME}`,
  home: `${APP_NAME}`,
  dashboard: `${APP_NAME}`,

  company_list: `Company List | ${APP_NAME}`,
  add_company: `Add Company | ${APP_NAME}`,
  edit_company: `Edit Company | ${APP_NAME}`,

  agent_list: `Agent List | ${APP_NAME}`,
  add_agent: `Add Agent | ${APP_NAME}`,
  edit_agent: `Edit Agent | ${APP_NAME}`,
  view_agent: `Agent Details | ${APP_NAME}`,
  agent_documents: `Agent Documents | ${APP_NAME}`,
  // agent_documents: `View Agent Documents | ${APP_NAME}`,

  document_type: `Document Type List | ${APP_NAME}`,
  add_document_type: `Add Document Type | ${APP_NAME}`,
  edit_document_type: `Edit Document Type | ${APP_NAME}`,

  charges: `Charges List | ${APP_NAME}`,
  add_charges: `Add Charges | ${APP_NAME}`,
  edit_charges: `Edit Charges | ${APP_NAME}`,

  commission: `Commission List | ${APP_NAME}`,
  add_commission: `Add Commission | ${APP_NAME}`,
  edit_commission: `Edit Commission | ${APP_NAME}`,

  extrafield: `Extrafield List | ${APP_NAME}`,
  add_extrafield: `Add Extrafield | ${APP_NAME}`,
  edit_extrafield: `Edit Extrafield | ${APP_NAME}`,

  customer_list: `Customer List | ${APP_NAME}`,
  add_customer: `Add Customer | ${APP_NAME}`,
  edit_customer: `Edit Customer | ${APP_NAME}`,
  view_customer: `View Customer | ${APP_NAME}`,
  // customer_documents: `View Customer Documents | ${APP_NAME}`,

  merchant_list: `Merchant List | ${APP_NAME}`,
  add_merchant: `Add Merchant | ${APP_NAME}`,
  edit_merchant: `Edit Merchant | ${APP_NAME}`,
  view_merchant: `View Merchant | ${APP_NAME}`,
  // merchant_documents: `View Merchant Documents | ${APP_NAME}`,



  product: `Product List | ${APP_NAME}`,
  add_product: `Add Product | ${APP_NAME}`,
  edit_product: `Edit Product | ${APP_NAME}`,

  productmap: `ProductMap List | ${APP_NAME}`,
  add_productmap: `Add ProductMap | ${APP_NAME}`,
  edit_productmap: `Edit ProductMap | ${APP_NAME}`,

  category: `Category List | ${APP_NAME}`,
  add_category: `Add Category | ${APP_NAME}`,
  edit_category: `Edit Category | ${APP_NAME}`,



  country: `Country List | ${APP_NAME}`,
  add_country: `Add Country | ${APP_NAME}`,
  edit_country: `Edit Country | ${APP_NAME}`,

  state: `State List | ${APP_NAME}`,
  add_state: `Add State | ${APP_NAME}`,
  edit_state: `Edit State | ${APP_NAME}`,

  city: `City List | ${APP_NAME}`,
  add_city: `Add City | ${APP_NAME}`,
  edit_city: `Edit City | ${APP_NAME}`,

  currency: `Currency List | ${APP_NAME}`,
  add_currency: `Add Currency | ${APP_NAME}`,
  edit_currency: `Edit Currency | ${APP_NAME}`,

  password_policy: `Password Policy | ${APP_NAME}`,

  edit_company_config: `Edit Configuration | ${APP_NAME}`,
  view_company_config: `View Configuration | ${APP_NAME}`,

  staff_list: `Staff List | ${APP_NAME}`,
  add_staff: `Add Staff | ${APP_NAME}`,
  edit_staff: `Edit Staff | ${APP_NAME}`,

  settlement_list: `Settlement List | ${APP_NAME}`,
  add_settlement: `Add Settlement | ${APP_NAME}`,
  edit_settlement: `Edit Ssettlement | ${APP_NAME}`,
  view_settlement: `View Ssettlement | ${APP_NAME}`,


  tree_level_list: `Tree Level List | ${APP_NAME}`,
  add_tree_level: `Add Tree level | ${APP_NAME}`,
  edit_tree_level: `Edit Tree level | ${APP_NAME}`,

  tree_list: `Tree List | ${APP_NAME}`,
  add_tree: `Add Tree | ${APP_NAME}`,
  edit_tree: `Edit Tree | ${APP_NAME}`,

  vendor_product_list: `Vendor Product List | ${APP_NAME}`,
  add_vendor_product: `Add Vendor Product | ${APP_NAME}`,
  edit_vendor_product: `Edit Vendor Product | ${APP_NAME}`,

  vendorcategory_list: `Vendor Category List | ${APP_NAME}`,
  add_vendorcategory: `Add Vendor Category | ${APP_NAME}`,
  edit_vendorcategory: `Edit Vendor Category | ${APP_NAME}`,

  vendor: `Vendor List | ${APP_NAME}`,
  add_vendor: `Add Vendor | ${APP_NAME}`,
  edit_vendor: `Edit Vendor | ${APP_NAME}`,


  notifications: `Notifications List | ${APP_NAME}`,
  edit_notifications: `Edit Notifications | ${APP_NAME}`,


  vendor_discount_rules_list: `Vendor Discount Rules List | ${APP_NAME}`,
  add_vendor_discount_rules: `Add Vendor Discount Rules | ${APP_NAME}`,
  edit_vendor_discount_rules: `Edit Vendor Discount Rules | ${APP_NAME}`,

  tree_commission_rules_list: `Tree Commission Config List | ${APP_NAME}`,
  add_tree_commission_rules: `Add Tree Commission Config | ${APP_NAME}`,
  edit_tree_commission_rules: `Edit Tree Commission Config | ${APP_NAME}`,

  threshold: `Threshold | ${APP_NAME}`,
  add_threshold: `Add Threshold | ${APP_NAME}`,
  edit_threshold: `Edit Threshold | ${APP_NAME}`,

  discount: `Discount | ${APP_NAME}`,
  add_discount: `Add Discount | ${APP_NAME}`,
  edit_discount: `Edit Discount | ${APP_NAME}`,

  tax: `Tax | ${APP_NAME}`,
  add_tax: `Add Tax | ${APP_NAME}`,
  edit_tax: `Edit Tax | ${APP_NAME}`,

  user_profile_list: `User Profile List | ${APP_NAME}`,
  add_user_profile: `Add User Profile | ${APP_NAME}`,
  edit_user_profile: `Edit User Profile | ${APP_NAME}`,

  branch: `Branch | ${APP_NAME}`,
  add_branch: `Add Branch | ${APP_NAME}`,
  edit_branch: `Edit Branch | ${APP_NAME}`,

  wallet_list: `Wallet | ${APP_NAME}`,


  role_list: `Roles | ${APP_NAME}`,
  add_role: `Add Role | ${APP_NAME}`,
  edit_role: `Edit Role | ${APP_NAME}`,
  role_update: `Update Roles | ${APP_NAME}`,

  auth_item_list: `Auth Items | ${APP_NAME}`,
  add_auth_item: `Add Auth Items | ${APP_NAME}`,
  edit_auth_item: `Edit Auth Items | ${APP_NAME}`,

  kyc_settings: `KYC Settings | ${APP_NAME}`,
  topup: `Topup | ${APP_NAME}`,
  set_pin: `Set Pin | ${APP_NAME}`,

  user_document: `Documents | ${APP_NAME}`,
  customer_documents: `Customer Documents | ${APP_NAME}`,
  merchant_documents: `Merchant Documents | ${APP_NAME}`,


  bank_list: `Banks | ${APP_NAME}`,
  add_bank: `Add Bank | ${APP_NAME}`,
  edit_bank: `Edit Bank | ${APP_NAME}`,

  device_list: `Devices | ${APP_NAME}`,
  add_device: `Add Device | ${APP_NAME}`,
  edit_device: `Edit Device | ${APP_NAME}`,

  device_group_list: `Device Groups | ${APP_NAME}`,
  add_device_group: `Add Device Group | ${APP_NAME}`,
  edit_device_group: `Edit Device Group | ${APP_NAME}`,



  transaction_list: `Transaction | ${APP_NAME}`,
  user_role: `User Rule | ${APP_NAME}`,

  merchant_statistics: `Merchant Statistics | ${APP_NAME}`,
  commission_charges: `Commission Charges | ${APP_NAME}`,
  authorization: `Authorization settings | ${APP_NAME}`,
};


export const errorMessage = {
  delete_dialogue_type: 'error',
  delete_header_text: 'Are you sure you want to delete?',
  delete_confirm_button: 'Yes, Delete it!',
  delete_cancel_button: 'No, Keep it',
  delete_smalll_text: 'You will not be able to recover this!',

  not_delete_dialogue_type: 'error',
  not_delete_header_text: `You can't delete this`,
  not_delete_confirm_button: 'Yes, Delete it!',
  not_delete_cancel_button: 'No, Keep it',
  not_delete_smalll_text: ' This Threshold Attached With Profile',


  unassign_dialogue_type: 'error',
  unassign_header_text: 'Are you sure want to un-assign?',
  unassign_confirm_button: 'Yes, Un-Assign it!',
  unassign_cancel_button: 'No, Keep it',
  unassign_smalll_text: 'You will not be able to recover this!',

  accept_installment_request_dialogue_type: 'success',
  accept_installment_request_header_text: 'Are you sure want to Accept?',
  accept_installment_request_confirm_button: 'Yes, Accept it!',
  accept_installment_request_cancel_button: 'No, Keep it',
  accept_installment_request_smalll_text: 'You will not be able to recover this!',

  reject_installment_request_dialogue_type: 'success',
  reject_installment_request_header_text: 'Are you sure want to Reject?',
  reject_installment_request_confirm_button: 'Yes, Reject it!',
  reject_installment_request_cancel_button: 'No, Keep it',
  reject_installment_request_smalll_text: 'You will not be able to recover this!',

  status_change_dialogue_type: 'warning',
  status_change_header_text: 'Are you sure want to change?',
  status_change_confirm_button: 'Yes',
  status_change_cancel_button: 'No, Keep it',
  status_change_smalll_text: '',


};
