import { SendEmail } from "./send_email.js";

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
            width: 15rem;
            margin-top: 2rem;
            margin-left: 2rem;
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
            height: .3rem;
            background: #93DEFF;
            opacity: 100;
            padding: 0;
            margin-top: -2rem   ;
            width: 15rem;
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
        footer{
            background-color: rgb(78, 78, 78);
            margin-top: 16.5rem;
            height: 3rem;
        }
        .img{
            width: 30rem;
            float: right;
            margin-top: -5.5rem;
        }
        .codec{
            font-size: 5rem;
        }
    </style>
  </head>
  <body> 
    <div class="fondo"><img class="icon" src="https://media.discordapp.net/attachments/825146450232213505/999324633478205560/Demantur_Imagotype-3.png?width=1025&height=414" alt="">
      <h1 class="title">Codigo de verificacion</h1>
      <hr />
        <div class="title2">
          <p>Tu codigo de verificacion para finalizar la creacion de tu cuenta es:</p>
        </div>
        <br><br><br><br>
        <p class="subtitles"><strong class="codec">${verify_code}</strong></p>
        <img class="img" src="https://cdn.discordapp.com/attachments/861438024659501087/1014409038102007848/Imagen1.png" alt=""><br><br><br><br><br><br><br>
        <footer>
          <center>
            <span class="copyright">
              Todos los derechos reservados. © 2022 Demantur
            </span>
          </center>
        </footer>
    </div>
  </body>
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


export { create_code, send_verify_code_email }
