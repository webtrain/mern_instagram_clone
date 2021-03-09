export const validate = (data) => {
  const { fullname, username, email, password, cf_password } = data;

  const err = {};


  if (!fullname) {
    err.fullname = 'Please add your full name';
  } else if (fullname.length > 25) {
    err.fullname = 'Full name must be under 25 char';
  }

  if (!username) {
    err.username = 'Please add your user name';
  } else if (username.replace(/ /g, '').length > 25) {
    err.username = 'Username must be under 25 character';
  }

  if (!email) {
    err.email = 'Please add your email address';
  } else if (!validateEmail(email)) {
    err.email = 'Email format is incorrect';
  }

  if (!password) {
    err.password = 'Please add your password';
  } else if (password.length < 6) {
    err.password = 'Password must beat least 6 characters';
  }

   if (!cf_password) {
     err.cf_password = 'Please add your confirm password';
   } else if (cf_password !== password) {
     err.cf_password = 'Confirm Password didn\'t match';
   }

   return {
     errMsg: err,
     errLength: Object.keys(err).length
   }
};

function validateEmail(email) {
  const re = /[a-z0-9!#$%&'*+/=?^`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
}
