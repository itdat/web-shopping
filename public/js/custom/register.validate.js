var password = document.getElementById("register-password"),
  confirm_password = document.getElementById("register-confirm-password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Mật khẩu xác nhận không trùng khớp");
  } else {
    confirm_password.setCustomValidity("");
  }
}

var fullname = document.getElementById("register-fullname");
function validateFullname() {
  if (fullname.value == "") {
    fullname.setCustomValidity("Không được để trống họ và tên");
  } else {
    fullname.setCustomValidity("");
  }
}

var email = document.getElementById("register-email");
function validateEmail() {
  if (!validator.isEmail(email.value)) {
    email.setCustomValidity("Email nhập sai");
  } else {
    email.setCustomValidity("");
  }
}

var phone = document.getElementById("register-phone");
function validatePhone() {
  if (!validator.isMobilePhone(phone.value)) {
    phone.setCustomValidity("Số điện thoại nhập sai");
  } else {
    phone.setCustomValidity("");
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;
fullname.onchange = validateFullname;
email.onchange = validateEmail;
phone.onchange = validatePhone;

// $("#register-form").submit(function(e) {
//   e.preventDefault();
//   validateFullname;
//   validateEmail();
//   validatePhone();
//   validatePassword();
// });
