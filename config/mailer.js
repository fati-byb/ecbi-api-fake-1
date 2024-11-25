const Mailgun = require('mailgun-js'); 

const mailer = {}
const api_key = process.env.API_KEY_MAILGUN;
const domain = process.env.DOMAIN_MAILGUN;
const from_who = process.env.EMAIL_SENDER;
 
const mailgun = new Mailgun({apiKey: api_key, domain: domain});


mailer.sendConfirmationMail = (user, next) => {
    const data = {
      from: from_who,
      to: user.email,  
      subject: 'Bound - Activating your account',
      html: `Hi,
      There is only one step left. To complete your registration, copy and paste the activation code directly into your Bound space.
      Activation Code :  ${user.activationCode} `
    }
    mailgun.messages().send(data, function (err, body) { 
      if (err) {
        console.log("got an error: ", err);
        return next(err, false);
      } else {
          console.log(body);
          return next(null, true);
      }
    });
 }

mailer.sendInformationCreateUserByAdminMail = (user, password, next) => {
    const data = {
      from: from_who,
      to: user.email,  
      subject: 'Bound - Account Registration ',
      html: `Hi,
      Your user account with the e-mail address ${user.email} has been created by our administration.
      Your provisional password is :  ${password} `
    }
    mailgun.messages().send(data, function (err, body) { 
      if (err) {
        console.log("got an error: ", err);
        return next(err, false);
      } else {
          console.log(body);
          return next(null, true);
      }
    });
 }

mailer.sendInformationAccountDisabledByAdminMail = (user, next) => {
    const data = {
      from: from_who,
      to: user.email,  
      subject: 'Bound - Account Restricted ',
      html: `Hi,
      Your user account with the e-mail address ${user.email} has been restricted by our administration.
      Contact our administration for more information`
    }
    mailgun.messages().send(data, function (err, body) { 
      if (err) {
        console.log("got an error: ", err);
        return next(err, false);
      } else {
          console.log(body);
          return next(null, true);
      }
    });
 }


 mailer.sendPasswordAccountRegistrationFacebookMail = (user, password, next) => {

    const data = {
      from: from_who,
      to: user.email,  
      subject: 'BouBound - Account Registration',
      html: `Hi,
      Your user account with the e-mail address ${user.email} has been created.
      Your provisional password is :  ${password} `
    }
    mailgun.messages().send(data, function (err, body) { 
      if (err) {
        console.log("got an error: ", err);
        return next(err, false);
      } else {
          console.log(body);
          return next(null, true);
      }
    });
 }


 mailer.sendForgotPasswordMail = (user, next ) => {

    // generate URL 
    const linkResetPassword = 'https://bound-reset-password.herokuapp.com/reset-password/' + user._id +'/'+ user.resetPasswordToken;
    
    const data = {
      from: from_who,
      to: user.email,  
      subject: 'Password Reset for Bound',
      html: `<b>
      Hi,
      You requested to reset your password for Bound (your email is '${user.email}').
      Click here to reset it: 
      
      ${linkResetPassword}
       
       </b>`
    }
    mailgun.messages().send(data, function (err, body) { 
      if (err) {
        if(err) return next(err, false);
        console.log("got an error: ", err);
      } else {
          return next(null, true);
          console.log(body);
      }
    });
 }

 mailer.sendEmailInvitation  = (user, email, next ) => {

    const data = {
      from: from_who,
      to: email,  
      subject: 'Invitation to joind Bound',
      html: `Hi,
      ${user.email} has invited you to join our program
      Click here to download the app :  
      LINK  `
    }
    mailgun.messages().send(data, function (err, body) { 
      if (err) { 
        console.log("got an error: ", err);
        if(err) return next(err, false);
      } else {
          console.log(body);
          return next(null, true);
      }
    }); 
 }

 mailer.sendSimpleEmail = async (email, subject, body, next) => {
  try {
    const data = {
      from: from_who,
      to: email,  
      subject,
      html: body
    }
    const mail = await mailgun.messages().send(data);
    return mail;
  } catch (e) {
    next(e)
  }
 
}


module.exports = mailer;
