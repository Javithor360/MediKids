import { config_env } from "./dotenv_conf.js";
import { SendEmail } from "./send_email.js";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

//* 1 - CREATE EMAIL VERIFY CODE
const create_code = () => {
  let code = Math.random() * (900000 - 100000);
  code = code + 100000;
  code = Math.trunc(code);
  return code;
};

//* 2 - SEND EMAIL TO VERIFY CODE
const send_verify_code_email = async (verify_code, Email, res) => {
  // MESSAGE HTML
  const message_1 = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
    <style>
        body{
            font-family: 'Poppins', sans-serif;
        }
        .fondo{
            margin: 0 auto;
            height: 57rem;
            width: 60rem;
            border: solid;
            border-color: rgba(0, 0, 0, 0.068);
        }
        .icon{
            width: 35rem;
            margin-top: 2rem;
            margin-left: 12rem;
            margin-bottom: 2rem;
        }
        .subtitles{
            text-align: center;
            margin: 1rem auto 0 auto;
            font-size: 1.8rem;
        }
        .title{
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
        }
        hr{
            border: 0;
            height: .7rem;
            background: #A375ff;
            border-radius: 1em;
            opacity: 100;
            padding: 0;
            margin-top: -2rem   ;
            width: 25rem;
            font-weight: bold;
        }

        .title2 p{
            text-align: center;
            margin: 2rem auto 0 auto;
            font-size: 2.5rem;
        }
        .subs{
            text-align: center;
            font-size: 2rem;
            margin-left: 5rem;
            margin-right: 5rem;
        }
        .copyright{
            font-size: 1.5rem;
          padding: 0.625rem 0;
            color: #ffffff;
        }
        .a{
            text-align: center;
            font-size: 2rem;
        }
        footer img{
            margin-top: 0.5rem;
            height: 7rem;
            width: 60em;
        }
        .img{
            width: 30rem;
            float: right;
            margin-top: -5.5rem;
        }
        .codec{
            font-size: 3rem;
        }
    </style>
  </head>
  <body> 
    <div class="fondo"><img class="icon" src="https://media.discordapp.net/attachments/842483463972978698/1113118592016339004/Horizontal_Imagotype_Black_Text.png?width=1440&height=342" alt="">
      <h1 class="title">Codigo de <span style="color:#d58c8c;">verificacion</span></h1>
      <hr />
        <div class="title2">
          <p>Tu codigo de verificacion para finalizar la creacion de tu cuenta es:</p>
        </div>
        <br><br><br><br>
        <p class="subtitles"><strong class="codec">${verify_code}</strong></p>
        <img class="img" src="https://cdn.discordapp.com/attachments/842483463972978698/1113138952254259260/ihhcTQQxAfX0ycPa5HQTt-transformed-removebg-preview.png" alt=""><br><br><br><br><br><br><br>
        <footer>
          <img src="https://cdn.discordapp.com/attachments/842483463972978698/1113152523851792554/footer-waves-08.png" alt="">
        </footer>
    </div>
  </body>
</html>
  `;

  // SEND EMAIL
  try {
    await SendEmail({
      to: Email,
      subject: 'Codigo de verificación',
      text: message_1
    })
  } catch (error) {
    return res.status(500).json({error});
  }
}

//* 3 - CREATE TOKEN TO RESET THE PASSWORD
const create_reset_code = () => {
  // CREATE THE TOKEN FOR THE VALIDATION
  const reset_pass_code = create_code().toString();
  // CREATE THE TOKEN FOR THE USER
  const db_reset_token = crypto.createHash('sha256').update(reset_pass_code).digest('hex');
  // SET IN HOW LONG IT WILL EXPIRE
  let db_reset_expire = new Date();
  db_reset_expire.setMinutes(db_reset_expire.getMinutes() + 25);

  // RETURN THE VALUES
  return {
    reset_pass_code,
    db_reset_token,
    db_reset_expire,
  }
}

//* 4 - SEND EMAIL TO FORGOT PASSWORD

const send_forgot_pass_email = async (reset_token, Email, res) => {
  // MESSAGE HTML
  const reset_url = `//${reset_token}`;

  const message_2 = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
    <style>
        body{
            font-family: 'Poppins', sans-serif;
        }
        .fondo{
            margin: 0 auto;
            height: 57rem;
            width: 60rem;
            border: solid;
            border-color: rgba(0, 0, 0, 0.068);
        }
        .icon{
            width: 35rem;
            margin-top: 2rem;
            margin-left: 12rem;
            margin-bottom: 2rem;
        }
        .subtitles{
            text-align: center;
            margin: 1rem auto 0 auto;
            font-size: 1.8rem;
        }
        .title{
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
        }
        hr{
            border: 0;
            height: .7rem;
            background: #A375ff;
            border-radius: 1em;
            opacity: 100;
            padding: 0;
            margin-top: -2rem   ;
            width: 25rem;
            font-weight: bold;
        }

        .title2 p{
            text-align: center;
            margin: 2rem auto 0 auto;
            font-size: 2.5rem;
        }
        .subs{
            text-align: center;
            font-size: 2rem;
            margin-left: 5rem;
            margin-right: 5rem;
        }
        .copyright{
            font-size: 1.5rem;
          padding: 0.625rem 0;
            color: #ffffff;
        }
        .a{
            text-align: center;
            font-size: 2rem;
        }
        footer img{
            margin-top: 0.5rem;
            height: 7rem;
            width: 60em;
        }
        .img{
            width: 35rem;
            float: right;
            margin-bottom: -1em;
            margin-right: -8em;
        }
        .codec{
            font-size: 3rem;
        }
    </style>
  </head>
  <body> 
    <div class="fondo"><img class="icon" src="https://media.discordapp.net/attachments/842483463972978698/1113118592016339004/Horizontal_Imagotype_Black_Text.png?width=1440&height=342" alt="">
      <h1 class="title">Cambio de <span style="color:#d58c8c;">contraseña</span></h1>
      <hr />
        <div class="title2">
          <p>Solicitud para cambio de contrseña, porfavor procura no compartir con nadie el enlace:</p>
        </div>
        <br><br><br><br>
        <p class="subtitles"><a href="${reset_url}"><p class="a">${reset_url}</p></a></p>
        <img class="img" src="https://media.discordapp.net/attachments/861438024659501087/1129529003947077642/R-removebg-preview.png" alt=""><br><br><br><br><br><br><br>
        <footer>
          <img src="https://cdn.discordapp.com/attachments/842483463972978698/1113152523851792554/footer-waves-08.png" alt="">
        </footer>
    </div>
  </body>
</html>
  `;

  // SEND EMAIL
  try {
    await SendEmail({
      to: Email,
      subject: 'Solicitud de cambio de contraseña',
      text: message_2
    })
  } catch (error) {
    return res.status(500).json({error});
  }
}

//* 5 - Create the Json Web Token to Login
const create_jwt = (query_user) => {
  // SET THE CONFIGS TO THE TOKEN
  return jwt.sign({
    user:{
      id: query_user[0].id,
      Email: query_user[0].Email,
      DUI: query_user[0].DUI
    }
  }, config_env.JWT_SECRET, { expiresIn: config_env.JWT_EXPIRE })
}

//* 6 - SEND EMAIL OF THE USER INFO
const send_verify_web_page = async (Message, Email, res) => {
  // MESSAGE HTML
  const message_1 = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
    <style>
        body{
            font-family: 'Poppins', sans-serif;
        }
        .fondo{
            margin: 0 auto;
            height: 57rem;
            width: 60rem;
            border: solid;
            border-color: rgba(0, 0, 0, 0.068);
        }
        .icon{
            width: 35rem;
            margin-top: 2rem;
            margin-left: 12rem;
            margin-bottom: 2rem;
        }
        .subtitles{
            text-align: center;
            margin: 1rem auto 0 auto;
            font-size: 1.8rem;
        }
        .title{
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
        }
        hr{
            border: 0;
            height: .7rem;
            background: #A375ff;
            border-radius: 1em;
            opacity: 100;
            padding: 0;
            margin-top: -2rem   ;
            width: 25rem;
            font-weight: bold;
        }

        .title2 p{
            text-align: center;
            margin: 2rem auto 0 auto;
            font-size: 2.5rem;
        }
        .subs{
            text-align: center;
            font-size: 2rem;
            margin-left: 5rem;
            margin-right: 5rem;
        }
        .copyright{
            font-size: 1.5rem;
          padding: 0.625rem 0;
            color: #ffffff;
        }
        .a{
            text-align: center;
            font-size: 2rem;
        }
        footer img{
            margin-top: 0.5rem;
            height: 7rem;
            width: 60em;
        }
        .img{
            width: 30rem;
            float: right;
            margin-top: -5.5rem;
        }
        .codec{
            font-size: 3rem;
        }
    </style>
  </head>
  <body> 
    <div class="fondo"><img class="icon" src="https://media.discordapp.net/attachments/842483463972978698/1113118592016339004/Horizontal_Imagotype_Black_Text.png?width=1440&height=342" alt="">
      <h1 class="title">Codigo de <span style="color:#d58c8c;">verificacion</span></h1>
      <hr />
        <div class="title2">
          <p>Mensaje del usuario: ${Email}</p>
        </div>
        <br><br><br><br>
        <p class="subtitles"><strong class="codec">${Message}</strong></p>
        <img class="img" src="https://cdn.discordapp.com/attachments/842483463972978698/1113138952254259260/ihhcTQQxAfX0ycPa5HQTt-transformed-removebg-preview.png" alt=""><br><br><br><br><br><br><br>
        <footer>
          <img src="https://cdn.discordapp.com/attachments/842483463972978698/1113152523851792554/footer-waves-08.png" alt="">
        </footer>
    </div>
  </body>
</html>
  `;

  // SEND EMAIL
  try {
    await SendEmail({
      to: 'medikidsclinica@gmail.com',
      subject: 'Correo de Contacto',
      text: message_1
    })
  } catch (error) {
    return res.status(500).json({error});
  }
}

//* - Generate the patient code
const patientCode = () => {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let codigo = '';

  // Generar las 2 letras mayúsculas
  for (let i = 0; i < 2; i++) {
    const indice = Math.floor(Math.random() * letras.length);
    codigo += letras.charAt(indice);
  }

  // Generar los 5 números
  for (let i = 0; i < 5; i++) {
    const numero = Math.floor(Math.random() * 10);
    codigo += numero;
  }

  return codigo;
}

export { create_code, send_verify_code_email, create_reset_code, send_forgot_pass_email, create_jwt, patientCode, send_verify_web_page };
