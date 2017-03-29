

function sendEmailToAuthor(toAddress,postName,authorName,commenterName,link ){
  var text = 'Hello '+authorName+' , Your post '+postName+' got a new comment from '+commenterName+'.'
  var html =  '<html><body>Hello '+authorName+',<br> <p> Your post <b>'+postName+'</b> got a new comment from '+commenterName+'. To see the comment click <a href='+link+'>here.</a></p>Thanks,<br>Team SuKatha<br>'
  sendEmail(toAddress,text,html,'Ola! Your post got a new comment')
}

function sendEmailToCommentOwner(toAddress,commentOwner,postName, replierName,link){
  var text = 'Hello '+commentOwner+' , Your comment on '+postName+' got a new reply from '+replierName+'.'
  var html =  '<html><body>Hello '+commentOwner+',<br> <p> Your comment on <b>'+postName+'</b> got a new reply from '+replierName+'. To see the reply click <a href='+link+'>here.</a></p>Thanks,<br>Team SuKatha<br>'
  sendEmail(toAddress,text,html,'Ola! Your comment got a new reply')
}

function sendEmail(toAddress,text,html,subj){

  const nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 465,
      auth: {
          user: 'storyboard@sukatha.com',
          pass: 'Sukatha806*'
      }
  });

  var mailOption = {
      from:  'storyboard@sukatha.com',
      to:   toAddress ,
      subject: subj,
      text: text,
      html: html
  };

  transporter.sendMail(mailOption,function(error, response){

      if(error){
          console.log(error);
      }
      else{
          var successRes = { "status": "success" }
          res.send(successRes,200);
      }
  });

}

const emailClient = {
  sendEmailToAuthor:sendEmailToAuthor,
  sendEmailToCommentOwner:sendEmailToCommentOwner
}
module.exports = emailClient;
