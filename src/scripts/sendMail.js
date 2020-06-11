import logger from '../helpers/logger'
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'trwip.contato@gmail.com',
    pass: 'Mtur2018'
  }
})

async function sendWelcomeMail (user) {
  const html = generateHTMLWelcome(user)
  const mailOptions = {
    from: 'trwip.contato@gmail.com',
    to: user.email,
    subject: 'Bem vindo à trwip',
    html: html
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    logger.error(error)
  }
}

async function sendInviteMail (email, trwip, user, host) {
  const html = generateHTMLInvite(trwip, user, host)
  const mailOptions = {
    from: 'trwip.contato@gmail.com',
    to: email,
    subject: `Você foi convidado por ${user.name} para a Trwip: ${trwip.title}.`,
    html: html
  }
  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    logger.error(error)
  }
}

async function sendForgotPasswordMail (user, host) {
  const html = generateHTMLForgotPassword(user, host)

  const mailOptions = {
    from: 'trwip.contato@gmail.com',
    to: user.email,
    subject: `TRWIP - Recuperar senha`,
    html: html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    logger.error(error)
  }
}

async function sendUserJoinMail (user, userWhoJoined, trwip, host) {
  const html = generateHTMLUserHasClickedJoined(userWhoJoined, trwip, host)

  const mailOptions = {
    from: 'trwip.contato@gmail.com',
    to: user.email,
    subject: `O usuário ${userWhoJoined.name} deu join na sua trwip ${trwip.title}`,
    html: html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    logger.error(err)
  }
}

async function sendAcceptedInviteMail (user, userWhoAccepted, trwip, host) {
  const html = generateHTMLAcepptedInvite(userWhoAccepted, trwip, host)

  const mailOptions = {
    from: 'trwip.contato@gmail.com',
    to: user.email,
    subject: `O usuário ${userWhoAccepted.name} aceitou seu convite na trwip ${trwip.title}`,
    html: html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    logger.error(err)
  }
}

async function sendAcceptedJoinMail (user, userWhoAccepted, trwip, host) {
  const html = generateHTMLAcepptedJoin(userWhoAccepted, trwip, host)

  const mailOptions = {
    from: 'trwip.contato@gmail.com',
    to: user.email,
    subject: `Você foi aceito na trwip ${trwip.title}`,
    html: html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err) {
    logger.error(err)
  }
}

export {
  sendWelcomeMail,
  sendInviteMail,
  sendForgotPasswordMail,
  sendUserJoinMail,
  sendAcceptedInviteMail,
  sendAcceptedJoinMail
}

// pass this point it's just functions that return HTML strings

function generateHTMLWelcome (user) {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Convite Trwip</title>

      <style type="text/css">

      img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
      a img { border: none; }
      table { border-collapse: collapse !important; }
      #outlook a { padding:0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass {width:100%;}
      .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
      table td {border-collapse: collapse;}
      .ExternalClass * {line-height: 115%;}

      td {
        font-family: Arial, sans-serif;
      }

      body {
        -webkit-font-smoothing:antialiased;
        -webkit-text-size-adjust:none;
        width: 100%;
        height: 100%;
        color: #6f6f6f;
        font-weight: 400;
        font-size: 18px;
      }

      h1 {
        margin: 10px 0;
      }

      a {
        color: #27aa90;
        text-decoration: none;
      }

      .force-full-width {
        width: 100% !important;
      }

      .body-padding {
        padding: 0 75px;
      }

      .force-width-80 {
        width: 80% !important;
      }

      </style>

      <style type="text/css" media="screen">
          @media screen {
            @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
            * {
              font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
            }
            .w280 {
              width: 280px !important;
            }
          }
      </style>

      <style type="text/css" media="only screen and (max-width: 480px)">
        /* Mobile styles */
        @media only screen and (max-width: 480px) {
          table[class*="w320"] {
            width: 320px !important;
          }
          td[class*="w320"] {
            width: 280px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          img[class*="w320"] {
            width: 250px !important;
            height: 67px !important;
          }
          td[class*="mobile-spacing"] {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
          }
          *[class*="mobile-hide"] {
            display: none !important;
          }
          *[class*="mobile-br"] {
            font-size: 12px !important;
          }
          td[class*="mobile-w20"] {
            width: 20px !important;
          }
          img[class*="mobile-w20"] {
            width: 20px !important;
          }
          td[class*="mobile-center"] {
            text-align: center !important;
          }
          table[class*="w100p"] {
            width: 100% !important;
          }
          td[class*="activate-now"] {
            padding-right: 0 !important;
            padding-top: 20px !important;
          }
          td[class*="mobile-resize"] {
            font-size: 22px !important;
            padding-left: 15px !important;
          }

        }
      </style>
    </head>

    <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
    <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
      <tr>
        <td align="center" valign="top" style="background-color:#ffffff" width="100%">

        <center>

          <table cellspacing="0" cellpadding="0" width="600" class="w320">
            <tr>
              <td align="center" valign="top">


              <table style="margin:0 auto;" cellspacing="10" cellpadding="10" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <a href="#"><img class="w320" width="175" height="63" src="https://i.imgur.com/XUsFwbP.png" alt="company logo" ></a>
                  </td>
                </tr>
              </table>


              <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#0E72BA;">
                <tr>
                  <td style="background-color:#0E72BA;">

                    <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                        <div class="mobile-br">&nbsp;</div>
                          Bem vindo à Trwip, ${user.name}!
                        <br>
                        </td>
                      </tr>
                      <tr>
                        <!--td style="font-size:24px; text-align:center; padding-top: 15px; padding-bottom: 15px; color:#fafafa;" class="w320 mobile-spacing; ">
                            Viajando em boa companhia!
                        </td-->
                      </tr>
                    </table>

                    <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td>
                          <img src="https://i.imgur.com/YAGDxV4.png" style="max-width:100%; display:block;">
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
                <tr>
                  <td style="background-color:#ffffff;">
                  <br>

                  <center>

                  <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                    <tr>
                      <td style="text-align:left; color: #6f6f6f;">
                      <br>
                      Olá, ${user.name},<br><br>
                      Somos uma  <a href="#">comunidade</a> de turismo compartilhado, baseada na confiabilidade de nossos membros. <br><br>
                      Com a Trwip, você pode se conectar com diversas pessoas que compartilham de suas viagens (Trwips), e pode também criar sua própria Trwip, convidando seus amigos ou qualquer membro da comunidade.<br>
                      <br>
                    </tr>
                  </table>
                  </center>


                  <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                    <tr>
                      <td style="text-align:center; margin:0 auto;">
                      <br>
                        <div>
                            <a href="http://www.trwip.com/"
                            style="background-color:#f5774e;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;">Acesse</a>
                        </div>
                        <br>
                      </td>
                    </tr>
                  </table>


                  <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">
                    <tr>
                      <td style="background-color:#363636; text-align:center;">
                      <br>
                      <br>
                        <a style="padding: 12px;" href="https://www.linkedin.com/in/trwip-oficial-7bb307143/"><img width="50" height="50" src="https://i.imgur.com/8KBZ3pL.png"></a>
                        <a style="padding: 12px;" href="https://www.instagram.com/trwip_oficial/"><img width="50" height="50" src="https://i.imgur.com/vhkJN90.png"></a>
                        <a style="padding: 12px;" href="https://www.facebook.com/trwip/"><img width="28" height="50" src="https://i.imgur.com/DvSlymf.png"></a>
                      <br>
                      <br
                      </td>
                    </tr>
                    <tr>
                      <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                        © 2018 Todos os Direitos Reservados
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td style="font-size:12px;">
                        &nbsp;
                      </td>
                    </tr>
                  </table>

                  </td>
                </tr>
              </table>

              </td>
            </tr>
          </table>

        </center>

        </td>
      </tr>
    </table>
    </body>
  </html>`
}

function generateHTMLInvite (trwip, user, host) {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <title>Convite Trwip</title>

   <style type="text/css">

   img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
   a img { border: none; }
   table { border-collapse: collapse !important; }
   #outlook a { padding:0; }
   .ReadMsgBody { width: 100%; }
   .ExternalClass {width:100%;}
   .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
   table td {border-collapse: collapse;}
   .ExternalClass * {line-height: 115%;}

   td {
     font-family: Arial, sans-serif;
   }

   body {
     -webkit-font-smoothing:antialiased;
     -webkit-text-size-adjust:none;
     width: 100%;
     height: 100%;
     color: #6f6f6f;
     font-weight: 400;
     font-size: 18px;
   }

   h1 {
     margin: 10px 0;
   }

   a {
     color: #27aa90;
     text-decoration: none;
   }

   .force-full-width {
     width: 100% !important;
   }

   .body-padding {
     padding: 0 75px;
   }

   .force-width-80 {
     width: 80% !important;
   }

   </style>

   <style type="text/css" media="screen">
       @media screen {
         @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
         * {
           font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
         }
         .w280 {
           width: 280px !important;
         }
       }
   </style>

   <style type="text/css" media="only screen and (max-width: 480px)">
     /* Mobile styles */
     @media only screen and (max-width: 480px) {
       table[class*="w320"] {
         width: 320px !important;
       }
       td[class*="w320"] {
         width: 280px !important;
         padding-left: 20px !important;
         padding-right: 20px !important;
       }
       img[class*="w320"] {
         width: 250px !important;
         height: 67px !important;
       }
       td[class*="mobile-spacing"] {
         padding-top: 10px !important;
         padding-bottom: 10px !important;
       }
       *[class*="mobile-hide"] {
         display: none !important;
       }
       *[class*="mobile-br"] {
         font-size: 12px !important;
       }
       td[class*="mobile-w20"] {
         width: 20px !important;
       }
       img[class*="mobile-w20"] {
         width: 20px !important;
       }
       td[class*="mobile-center"] {
         text-align: center !important;
       }
       table[class*="w100p"] {
         width: 100% !important;
       }
       td[class*="activate-now"] {
         padding-right: 0 !important;
         padding-top: 20px !important;
       }
       td[class*="mobile-resize"] {
         font-size: 22px !important;
         padding-left: 15px !important;
       }

     }
   </style>
 </head>

 <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
 <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
   <tr>
     <td align="center" valign="top" style="background-color:#ffffff" width="100%">

     <center>

       <table cellspacing="0" cellpadding="0" width="600" class="w320">
         <tr>
           <td align="center" valign="top">


           <table style="margin:0 auto;" cellspacing="10" cellpadding="10" width="100%">
             <tr>
               <td style="text-align: center;">
                 <a href="#"><img class="w320" width="175" height="63" src="https://i.imgur.com/XUsFwbP.png" alt="Trwip" ></a>
               </td>
             </tr>
           </table>


           <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#0E72BA;">
             <tr>
               <td style="background-color:#0E72BA;">

                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                     <div class="mobile-br">&nbsp;</div>
                       Você foi convidado para uma Trwip: ${trwip.title}
                     <br>
                     </td>
                   </tr>
                   <tr>
                   <td style="font-size:18px; text-align:center; padding: 12 75px; padding-bottom: 10px; padding-top: 10px; color:#fafafa;" class="w320 mobile-spacing; ">
                   por ${user.name}
                     </td>
                   </tr>
                 </table>

                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td>
                       <img src="https://i.imgur.com/YAGDxV4.png" style="max-width:100%; display:block;">
                     </td>
                   </tr>
                 </table>

               </td>
             </tr>
           </table>

           <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
             <tr>
               <td style="background-color:#ffffff;">
               <br>

               <center>

               <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
               <tr>
                 <td style="text-align:left; color: #6f6f6f;">
                 <br>
                 ${user.name} te convidou para participar de uma Trwip: ${trwip.title}<br><br>
                 Com a Trwip, você pode se conectar com diversas pessoas para que compartilhem de suas viagens ou experiências (Trwips), e pode, também, criar sua própria Trwip, convidando seus amigos ou qualquer membro da comunidade.<br><br><br>
                 Dê seu JoinTrwip e embarque e nessa!
                 <br>
               </tr>
             </table>
             </center>

               <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                 <tr>
                   <td style="text-align:center; margin:0 auto;">
                   <br>
                     <div>
                         <a href="${host + '/trwip/' + trwip.id}"
                         style="background-color:#f5774e;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;">Acesse</a>
                     </div>
                     <br>
                   </td>
                 </tr>
               </table>


               <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">
                 <tr>
                   <td style="background-color:#363636; text-align:center;">
                   <br>
                   <br>
                     <a style="padding: 12px;" href="https://www.linkedin.com/in/trwip-oficial-7bb307143/"><img width="50" height="50" src="https://i.imgur.com/8KBZ3pL.png"></a>
                     <a style="padding: 12px;" href="https://www.instagram.com/trwip_oficial/"><img width="50" height="50" src="https://i.imgur.com/vhkJN90.png"></a>
                     <a style="padding: 12px;" href="https://www.facebook.com/trwip/"><img width="28" height="50" src="https://i.imgur.com/DvSlymf.png"></a>
                   <br>
                   <br
                   </td>
                 </tr>
                 <tr>
                   <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                     © 2018 Todos os Direitos Reservados
                   </td>
                 </tr>
                 <tr>
                 </tr>
                 <tr>
                   <td style="font-size:12px;">
                     &nbsp;
                   </td>
                 </tr>
               </table>

               </td>
             </tr>
           </table>

           </td>
         </tr>
       </table>

     </center>

     </td>
   </tr>
 </table>
 </body>
  </html>`
}

function generateHTMLForgotPassword (user, host) {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   <title>Convite Trwip</title>

   <style type="text/css">

   img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
   a img { border: none; }
   table { border-collapse: collapse !important; }
   #outlook a { padding:0; }
   .ReadMsgBody { width: 100%; }
   .ExternalClass {width:100%;}
   .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
   table td {border-collapse: collapse;}
   .ExternalClass * {line-height: 115%;}

   td {
     font-family: Arial, sans-serif;
   }

   body {
     -webkit-font-smoothing:antialiased;
     -webkit-text-size-adjust:none;
     width: 100%;
     height: 100%;
     color: #6f6f6f;
     font-weight: 400;
     font-size: 18px;
   }

   h1 {
     margin: 10px 0;
   }

   a {
     color: #27aa90;
     text-decoration: none;
   }

   .force-full-width {
     width: 100% !important;
   }

   .body-padding {
     padding: 0 75px;
   }

   .force-width-80 {
     width: 80% !important;
   }

   </style>

   <style type="text/css" media="screen">
       @media screen {
         @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
         * {
           font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
         }
         .w280 {
           width: 280px !important;
         }
       }
   </style>

   <style type="text/css" media="only screen and (max-width: 480px)">
     /* Mobile styles */
     @media only screen and (max-width: 480px) {
       table[class*="w320"] {
         width: 320px !important;
       }
       td[class*="w320"] {
         width: 280px !important;
         padding-left: 20px !important;
         padding-right: 20px !important;
       }
       img[class*="w320"] {
         width: 250px !important;
         height: 67px !important;
       }
       td[class*="mobile-spacing"] {
         padding-top: 10px !important;
         padding-bottom: 10px !important;
       }
       *[class*="mobile-hide"] {
         display: none !important;
       }
       *[class*="mobile-br"] {
         font-size: 12px !important;
       }
       td[class*="mobile-w20"] {
         width: 20px !important;
       }
       img[class*="mobile-w20"] {
         width: 20px !important;
       }
       td[class*="mobile-center"] {
         text-align: center !important;
       }
       table[class*="w100p"] {
         width: 100% !important;
       }
       td[class*="activate-now"] {
         padding-right: 0 !important;
         padding-top: 20px !important;
       }
       td[class*="mobile-resize"] {
         font-size: 22px !important;
         padding-left: 15px !important;
       }

     }
   </style>
 </head>

 <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
 <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
   <tr>
     <td align="center" valign="top" style="background-color:#ffffff" width="100%">

     <center>

       <table cellspacing="0" cellpadding="0" width="600" class="w320">
         <tr>
           <td align="center" valign="top">


           <table style="margin:0 auto;" cellspacing="10" cellpadding="10" width="100%">
             <tr>
               <td style="text-align: center;">
                 <a href="#"><img class="w320" width="175" height="63" src="https://i.imgur.com/XUsFwbP.png" alt="company logo" ></a>
               </td>
             </tr>
           </table>


           <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#0E72BA;">
             <tr>
               <td style="background-color:#0E72BA;">

                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center; padding-bottom: 20px;" class="mobile-spacing">
                     <div class="mobile-br">&nbsp;</div>
                       ${user.name}, você esqueceu sua senha?
                     <br>
                     </td>
                   </tr>
                   <tr>

                   </tr>
                 </table>

                 <table cellspacing="0" cellpadding="0" width="100%">
                   <tr>
                     <td>
                       <img src="https://i.imgur.com/YAGDxV4.png" style="max-width:100%; display:block;">
                     </td>
                   </tr>
                 </table>

               </td>
             </tr>
           </table>

           <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
             <tr>
               <td style="background-color:#ffffff;">
               <br>

               <center>

               <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                 <tr>
                   <td style="text-align:left; color: #6f6f6f;">
                   <br>
                    Para trocar de senha e voltar a ter acesso a sua conta, basta acessar o link.<br>

                   <br>
                 </tr>
               </table>
               </center>


               <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                 <tr>
                   <td style="text-align:center; margin:0 auto;">
                   <br>
                     <div>
                         <a href="${host + '/recover_password/' + user.id}"
                         style="background-color:#f5774e;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;">Trocar minha senha</a>
                     </div>
                     <br>
                   </td>
                 </tr>
               </table>


               <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">
                 <tr>
                   <td style="background-color:#363636; text-align:center;">
                   <br>
                   <br>
                     <a style="padding: 12px;" href="https://www.linkedin.com/in/trwip-oficial-7bb307143/"><img width="50" height="50" src="https://i.imgur.com/8KBZ3pL.png"></a>
                     <a style="padding: 12px;" href="https://www.instagram.com/trwip_oficial/"><img width="50" height="50" src="https://i.imgur.com/vhkJN90.png"></a>
                     <a style="padding: 12px;" href="https://www.facebook.com/trwip/"><img width="28" height="50" src="https://i.imgur.com/DvSlymf.png"></a>
                   <br>
                   <br
                   </td>
                 </tr>
                 <tr>
                   <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                     © 2018 Todos os Direitos Reservados
                   </td>
                 </tr>
                 <tr>
                 </tr>
                 <tr>
                   <td style="font-size:12px;">
                     &nbsp;
                   </td>
                 </tr>
               </table>

               </td>
             </tr>
           </table>

           </td>
         </tr>
       </table>

     </center>

     </td>
   </tr>
 </table>
 </body>
</html>
  `
}

function generateHTMLUserHasClickedJoined (user, trwip, host) {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Convite Trwip</title>

    <style type="text/css">

    img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
    a img { border: none; }
    table { border-collapse: collapse !important; }
    #outlook a { padding:0; }
    .ReadMsgBody { width: 100%; }
    .ExternalClass {width:100%;}
    .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
    table td {border-collapse: collapse;}
    .ExternalClass * {line-height: 115%;}

    td {
      font-family: Arial, sans-serif;
    }

    body {
      -webkit-font-smoothing:antialiased;
      -webkit-text-size-adjust:none;
      width: 100%;
      height: 100%;
      color: #6f6f6f;
      font-weight: 400;
      font-size: 18px;
    }

    h1 {
      margin: 10px 0;
    }

    a {
      color: #27aa90;
      text-decoration: none;
    }

    .force-full-width {
      width: 100% !important;
    }

    .body-padding {
      padding: 0 75px;
    }

    .force-width-80 {
      width: 80% !important;
    }

    </style>

    <style type="text/css" media="screen">
        @media screen {
          @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
          * {
            font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
          }
          .w280 {
            width: 280px !important;
          }
        }
    </style>

    <style type="text/css" media="only screen and (max-width: 480px)">
      /* Mobile styles */
      @media only screen and (max-width: 480px) {
        table[class*="w320"] {
          width: 320px !important;
        }
        td[class*="w320"] {
          width: 280px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        img[class*="w320"] {
          width: 250px !important;
          height: 67px !important;
        }
        td[class*="mobile-spacing"] {
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
        *[class*="mobile-hide"] {
          display: none !important;
        }
        *[class*="mobile-br"] {
          font-size: 12px !important;
        }
        td[class*="mobile-w20"] {
          width: 20px !important;
        }
        img[class*="mobile-w20"] {
          width: 20px !important;
        }
        td[class*="mobile-center"] {
          text-align: center !important;
        }
        table[class*="w100p"] {
          width: 100% !important;
        }
        td[class*="activate-now"] {
          padding-right: 0 !important;
          padding-top: 20px !important;
        }
        td[class*="mobile-resize"] {
          font-size: 22px !important;
          padding-left: 15px !important;
        }

      }
    </style>
  </head>

  <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
    <tr>
      <td align="center" valign="top" style="background-color:#ffffff" width="100%">

      <center>

        <table cellspacing="0" cellpadding="0" width="600" class="w320">
          <tr>
            <td align="center" valign="top">


            <table style="margin:0 auto;" cellspacing="10" cellpadding="10" width="100%">
              <tr>
                <td style="text-align: center;">
                  <a href="#"><img class="w320" width="175" height="63" src="https://i.imgur.com/XUsFwbP.png" alt="company logo" ></a>
                </td>
              </tr>
            </table>


            <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#0E72BA;">
              <tr>
                <td style="background-color:#0E72BA;">

                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                      <div class="mobile-br">&nbsp;</div>
                        ${user.name} deu JoinTrwip na sua trwip
                      <br>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:18px; text-align:center; padding: 12 75px; padding-bottom: 10px; padding-top: 10px; color:#fafafa;" class="w320 mobile-spacing; ">
                          ${trwip.title}
                      </td>
                    </tr>
                  </table>

                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td>
                        <img src="https://i.imgur.com/YAGDxV4.png" style="max-width:100%; display:block;">
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
              <tr>
                <td style="background-color:#ffffff;">
                <br>

                <center>

                <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                  <tr>
                    <td style="text-align:left; color: #6f6f6f;">
                    <br>
                     A Trwip é uma plataforma onde você pode se conectar com pessoas que desejam viajar para um destino em comum. Entre na Trwip, converse com o ${user.name}, e caso deseje, aceite o JoinTrwip dele<br><br>
                    Com a Trwip, você pode se conectar com diversas pessoas que compartilham de suas viagens (Trwips), e pode também criar sua própria Trwip, convidando seus amigos ou qualquer membro da comunidade.<br><br><br>
                    <br>
                  </tr>
                </table>
                </center>


                <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                  <tr>
                    <td style="text-align:center; margin:0 auto;">
                    <br>
                      <div>
                          <a href="${host + '/trwip/' + trwip.id + '/join'}"
                          style="background-color:#f5774e;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;">Acesse</a>
                      </div>
                      <br>
                    </td>
                  </tr>
                </table>


                <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">
                  <tr>
                    <td style="background-color:#363636; text-align:center;">
                    <br>
                    <br>
                      <a style="padding: 12px;" href="https://www.linkedin.com/in/trwip-oficial-7bb307143/"><img width="50" height="50" src="https://i.imgur.com/8KBZ3pL.png"></a>
                      <a style="padding: 12px;" href="https://www.instagram.com/trwip_oficial/"><img width="50" height="50" src="https://i.imgur.com/vhkJN90.png"></a>
                      <a style="padding: 12px;" href="https://www.facebook.com/trwip/"><img width="28" height="50" src="https://i.imgur.com/DvSlymf.png"></a>
                    <br>
                    <br
                    </td>
                  </tr>
                  <tr>
                    <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                      © 2017 Todos os Direitos Reservados
                    </td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <td style="font-size:12px;">
                      &nbsp;
                    </td>
                  </tr>
                </table>

                </td>
              </tr>
            </table>

            </td>
          </tr>
        </table>

      </center>

      </td>
    </tr>
  </table>
  </body>
</html>
`
}

function generateHTMLAcepptedJoin (user, trwip, host) {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Convite Trwip</title>

    <style type="text/css">

    img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
    a img { border: none; }
    table { border-collapse: collapse !important; }
    #outlook a { padding:0; }
    .ReadMsgBody { width: 100%; }
    .ExternalClass {width:100%;}
    .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
    table td {border-collapse: collapse;}
    .ExternalClass * {line-height: 115%;}

    td {
      font-family: Arial, sans-serif;
    }

    body {
      -webkit-font-smoothing:antialiased;
      -webkit-text-size-adjust:none;
      width: 100%;
      height: 100%;
      color: #6f6f6f;
      font-weight: 400;
      font-size: 18px;
    }

    h1 {
      margin: 10px 0;
    }

    a {
      color: #27aa90;
      text-decoration: none;
    }

    .force-full-width {
      width: 100% !important;
    }

    .body-padding {
      padding: 0 75px;
    }

    .force-width-80 {
      width: 80% !important;
    }

    </style>

    <style type="text/css" media="screen">
        @media screen {
          @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
          * {
            font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
          }
          .w280 {
            width: 280px !important;
          }
        }
    </style>

    <style type="text/css" media="only screen and (max-width: 480px)">
      /* Mobile styles */
      @media only screen and (max-width: 480px) {
        table[class*="w320"] {
          width: 320px !important;
        }
        td[class*="w320"] {
          width: 280px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        img[class*="w320"] {
          width: 250px !important;
          height: 67px !important;
        }
        td[class*="mobile-spacing"] {
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
        *[class*="mobile-hide"] {
          display: none !important;
        }
        *[class*="mobile-br"] {
          font-size: 12px !important;
        }
        td[class*="mobile-w20"] {
          width: 20px !important;
        }
        img[class*="mobile-w20"] {
          width: 20px !important;
        }
        td[class*="mobile-center"] {
          text-align: center !important;
        }
        table[class*="w100p"] {
          width: 100% !important;
        }
        td[class*="activate-now"] {
          padding-right: 0 !important;
          padding-top: 20px !important;
        }
        td[class*="mobile-resize"] {
          font-size: 22px !important;
          padding-left: 15px !important;
        }

      }
    </style>
  </head>

  <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
    <tr>
      <td align="center" valign="top" style="background-color:#ffffff" width="100%">

      <center>

        <table cellspacing="0" cellpadding="0" width="600" class="w320">
          <tr>
            <td align="center" valign="top">


            <table style="margin:0 auto;" cellspacing="10" cellpadding="10" width="100%">
              <tr>
                <td style="text-align: center;">
                  <a href="#"><img class="w320" width="175" height="63" src="https://i.imgur.com/XUsFwbP.png" alt="company logo" ></a>
                </td>
              </tr>
            </table>


            <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#0E72BA;">
              <tr>
                <td style="background-color:#0E72BA;">

                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                      <div class="mobile-br">&nbsp;</div>
                        Você foi aceito na trwip: ${trwip.title}
                      <br>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:18px; text-align:center; padding: 12 75px; padding-bottom: 10px; padding-top: 10px; color:#fafafa;" class="w320 mobile-spacing; ">
                          por ${user.name}
                      </td>
                    </tr>
                  </table>

                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td>
                        <img src="https://i.imgur.com/YAGDxV4.png" style="max-width:100%; display:block;">
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
              <tr>
                <td style="background-color:#ffffff;">
                <br>

                <center>

                <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                  <tr>
                    <td style="text-align:left; color: #6f6f6f;">
                    <br> A Trwip é uma plataforma onde você pode se conectar com pessoas que desejam viajar para um destino em comum. Acesse aqui a Trwip como membro, interaja com todos os participantes, e aproveite essa experiência
                     <br>
                    <br>
                  </tr>
                </table>
                </center>


                <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                  <tr>
                    <td style="text-align:center; margin:0 auto;">
                    <br>
                      <div>
                          <a href="${host + '/trwip/' + trwip.id}"
                          style="background-color:#f5774e;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;">Acesse</a>
                      </div>
                      <br>
                    </td>
                  </tr>
                </table>


                <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">
                  <tr>
                    <td style="background-color:#363636; text-align:center;">
                    <br>
                    <br>
                      <a style="padding: 12px;" href="https://www.linkedin.com/in/trwip-oficial-7bb307143/"><img width="50" height="50" src="https://i.imgur.com/8KBZ3pL.png"></a>
                      <a style="padding: 12px;" href="https://www.instagram.com/trwip_oficial/"><img width="50" height="50" src="https://i.imgur.com/vhkJN90.png"></a>
                      <a style="padding: 12px;" href="https://www.facebook.com/trwip/"><img width="28" height="50" src="https://i.imgur.com/DvSlymf.png"></a>
                    <br>
                    <br
                    </td>
                  </tr>
                  <tr>
                    <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                      © 2017 Todos os Direitos Reservados
                    </td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <td style="font-size:12px;">
                      &nbsp;
                    </td>
                  </tr>
                </table>

                </td>
              </tr>
            </table>

            </td>
          </tr>
        </table>

      </center>

      </td>
    </tr>
  </table>
  </body>
</html>
`
}

function generateHTMLAcepptedInvite (user, trwip, host) {
  return `<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Convite Trwip</title>

    <style type="text/css">

    img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
    a img { border: none; }
    table { border-collapse: collapse !important; }
    #outlook a { padding:0; }
    .ReadMsgBody { width: 100%; }
    .ExternalClass {width:100%;}
    .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
    table td {border-collapse: collapse;}
    .ExternalClass * {line-height: 115%;}

    td {
      font-family: Arial, sans-serif;
    }

    body {
      -webkit-font-smoothing:antialiased;
      -webkit-text-size-adjust:none;
      width: 100%;
      height: 100%;
      color: #6f6f6f;
      font-weight: 400;
      font-size: 18px;
    }

    h1 {
      margin: 10px 0;
    }

    a {
      color: #27aa90;
      text-decoration: none;
    }

    .force-full-width {
      width: 100% !important;
    }

    .body-padding {
      padding: 0 75px;
    }

    .force-width-80 {
      width: 80% !important;
    }

    </style>

    <style type="text/css" media="screen">
        @media screen {
          @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
          * {
            font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
          }
          .w280 {
            width: 280px !important;
          }
        }
    </style>

    <style type="text/css" media="only screen and (max-width: 480px)">
      /* Mobile styles */
      @media only screen and (max-width: 480px) {
        table[class*="w320"] {
          width: 320px !important;
        }
        td[class*="w320"] {
          width: 280px !important;
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        img[class*="w320"] {
          width: 250px !important;
          height: 67px !important;
        }
        td[class*="mobile-spacing"] {
          padding-top: 10px !important;
          padding-bottom: 10px !important;
        }
        *[class*="mobile-hide"] {
          display: none !important;
        }
        *[class*="mobile-br"] {
          font-size: 12px !important;
        }
        td[class*="mobile-w20"] {
          width: 20px !important;
        }
        img[class*="mobile-w20"] {
          width: 20px !important;
        }
        td[class*="mobile-center"] {
          text-align: center !important;
        }
        table[class*="w100p"] {
          width: 100% !important;
        }
        td[class*="activate-now"] {
          padding-right: 0 !important;
          padding-top: 20px !important;
        }
        td[class*="mobile-resize"] {
          font-size: 22px !important;
          padding-left: 15px !important;
        }

      }
    </style>
  </head>

  <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
    <tr>
      <td align="center" valign="top" style="background-color:#ffffff" width="100%">

      <center>

        <table cellspacing="0" cellpadding="0" width="600" class="w320">
          <tr>
            <td align="center" valign="top">


            <table style="margin:0 auto;" cellspacing="10" cellpadding="10" width="100%">
              <tr>
                <td style="text-align: center;">
                  <a href="#"><img class="w320" width="175" height="63" src="https://i.imgur.com/XUsFwbP.png" alt="company logo" ></a>
                </td>
              </tr>
            </table>


            <table cellspacing="0" cellpadding="0" width="100%" style="background-color:#0E72BA;">
              <tr>
                <td style="background-color:#0E72BA;">

                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                      <div class="mobile-br">&nbsp;</div>
                        O usuário ${user.name} aceitou seu convite na trwip: ${trwip.title}
                      <br>
                      </td>
                    </tr>
                  </table>

                  <table cellspacing="0" cellpadding="0" width="100%">
                    <tr>
                      <td>
                        <img src="https://i.imgur.com/YAGDxV4.png" style="max-width:100%; display:block;">
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>

            <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
              <tr>
                <td style="background-color:#ffffff;">
                <br>

                <center>

                <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                  <tr>
                    <td style="text-align:left; color: #6f6f6f;">
                    <br> A Trwip é uma plataforma onde você pode se conectar com pessoas que desejam viajar para um destino em comum. Acesse aqui a Trwip como membro, interaja com todos os participantes, e aproveite essa experiência
                     <br>
                    <br>
                  </tr>
                </table>
                </center>


                <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                  <tr>
                    <td style="text-align:center; margin:0 auto;">
                    <br>
                      <div>
                          <a href="${host + '/trwip/' + trwip.id}"
                          style="background-color:#f5774e;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:220px;-webkit-text-size-adjust:none;">Acesse</a>
                      </div>
                      <br>
                    </td>
                  </tr>
                </table>


                <table cellspacing="0" cellpadding="0" bgcolor="#363636"  class="force-full-width">
                  <tr>
                    <td style="background-color:#363636; text-align:center;">
                    <br>
                    <br>
                      <a style="padding: 12px;" href="https://www.linkedin.com/in/trwip-oficial-7bb307143/"><img width="50" height="50" src="https://i.imgur.com/8KBZ3pL.png"></a>
                      <a style="padding: 12px;" href="https://www.instagram.com/trwip_oficial/"><img width="50" height="50" src="https://i.imgur.com/vhkJN90.png"></a>
                      <a style="padding: 12px;" href="https://www.facebook.com/trwip/"><img width="28" height="50" src="https://i.imgur.com/DvSlymf.png"></a>
                    <br>
                    <br
                    </td>
                  </tr>
                  <tr>
                    <td style="color:#f0f0f0; font-size: 14px; text-align:center; padding-bottom:4px;">
                      © 2017 Todos os Direitos Reservados
                    </td>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <td style="font-size:12px;">
                      &nbsp;
                    </td>
                  </tr>
                </table>

                </td>
              </tr>
            </table>

            </td>
          </tr>
        </table>

      </center>

      </td>
    </tr>
  </table>
  </body>
</html>
`
}
