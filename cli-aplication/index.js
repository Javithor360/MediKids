#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import clear from 'clear';
import { createSpinner } from 'nanospinner';
import { createPool } from 'mysql2/promise';
import datePicker from 'inquirer-datepicker-prompt';

//>> DABASE CONNECT
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: "12345",
    port: "3306",
    database: 'medikids_db',
})

// SLEEPER
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ClearSpace = () => {
  clear();
  console.log('');
}

//! PRINCIPAL MENU
clear();
console.log('=======================================');
console.log('= Ingresar Panel Admin - MEDI' + chalk.magenta('KIDS') + ' =');
console.log('=======================================');
console.log((''))
console.log('Que desea hacer?')
console.log(('------------------------------------'))
console.log((''))

// STARTING QUESTION
const index = await inquirer.prompt({
  name: 'Empezar',
  type: 'list',
  choices: [
    'Iniciar Sesión',
    'Cerrar Sistema',
  ],
})

//\\ CHOOSE OPTION.
switch (index.Empezar) {
  //>> LOGIN IN THE SYSTEM
  case 'Iniciar Sesión':
    let username, password;

    //\\ GET THE USER
    ClearSpace();
    do {
      const user = await inquirer.prompt({
        name: 'Usuario',
        type: 'input',
        message: 'Digite el Usuario Administrador:',
      })
      username = user.Usuario;
      const spinner = createSpinner('Verificando Usuario...').start();
      await sleep(2000);

      if (username != 'MediAdmin#1') {
        spinner.error({text: ' USUARIO INCORRECTO.'});
        await sleep(2000);
        ClearSpace();
      } else {
        spinner.success({text: ' Usuario Correcto...'});
        await sleep(2000);
        ClearSpace();
      }
    } while (username != 'MediAdmin#1');

    //\\ GET THE PASSWORD
    ClearSpace();
    do {
      const pass = await inquirer.prompt({
        name: 'Password',
        type: 'password',
        message: 'Ingrese la Contraseña:',
        mask: '*',
      })
      password = pass.Password;
      const spinner = createSpinner('Verificando Contraseña...').start();
      await sleep(2000);
      
      if (password != 'MKD-AD-1'){
        spinner.error({text: ' CONTRASEÑA INCORRECTA'});
        await sleep(2000);
        ClearSpace();
      } else {
        spinner.success({text: ' Contraseña Correcta...'});
        await sleep(2000);
        ClearSpace();
      }
    } while (password != 'MKD-AD-1');

    //\\ ADMIN MENU.
    let closeMenu = false;
    do {
      clear();
      console.log('=========================');
      console.log('= BIENVENIDO A MEDI' + chalk.magenta('KIDS') + '=');
      console.log('=========================');
      console.log((''))
      console.log('---------------------------------------------------------');
      console.log(`Bienvenido "${username}" ¿qué desea hacer?`);
      console.log('---------------------------------------------------------');
      const adminMenuIndex = await inquirer.prompt({
        name: 'Opciones',
        type: 'list',
        choices: [
          'Enviar Mensaje a un doctor.',
          'Registrar nuevo DUI.',
          'Modificar Fecha y Hora de una Cita',
          'Cerrar Sesión.',
        ]
      })

      //>> -------------------------------- START SWITCH
      switch (adminMenuIndex.Opciones) {
        case 'Enviar Mensaje a un doctor.':
          let u_n;
          let b1 = false;
          clear();
          //\\ GET THE USER.
          do {
            clear();
            console.log(' + Enviar Mensaje a un doctor ');
            console.log('');
            console.log(' - Ingrese "cancelar" para salir. ');
            console.log('');
            const userName = await inquirer.prompt({
              name: 'Usuario',
              type: 'input',
              message: 'Ingrese el nombre de usuario del doctor:'
            })
            u_n = userName.Usuario;

            if (u_n != 'cancelar' && u_n != 'Cancelar') {
              //! CHECK THE DATABASE.
              const spinnerUser = createSpinner('Verificando Usuario...').start();
              const [drs] = await pool.query('SELECT * FROM doctors WHERE User = ?', [u_n])
              await sleep(5000);
    
              if (drs.length != 0) {
                spinnerUser.success({text: ' Usuario Verificado...'});
                await sleep(2000);
                ClearSpace();

                //* SEND THE MESSAGE
                let message;
                let b3 = false;
                let f_n = drs[0].First_Names.split(' ');
                let l_n = drs[0].Last_Names.split(' ');

                do {
                  const UserMessage = await inquirer.prompt({
                    name: 'Mensaje',
                    type: 'input',
                    message: `Ingrese el mensaje para el doctor ${f_n[0]} ${l_n[0]}:`
                  });
                  message = UserMessage.Mensaje;
                  const spinnerMsg = createSpinner('Validando Mensaje...').start();
                  await sleep(3000);

                  if (message.length == 0) {
                    spinnerMsg.error({text: ' MENSAJE INVALIDO'});
                    await sleep(2000);
                    ClearSpace();
                  } else {
                    spinnerMsg.success({text: ' Mensaje Verificado...'});
                    await sleep(2000);
                    ClearSpace();
                    b3 = true;
                  }

                } while (!b3);

                // UPLOAD TO THE DB.
                const spinnerUM = createSpinner('Enviando Mensaje...').start();
                await sleep(3000);
                await pool.query('INSERT INTO notices SET ?', {
                  Doctor_id: drs[0].id,
                  Description: message,
                  Date_Time: new Date()
                })
                spinnerUM.success({text: ' ¡Mensaje enviado correctamente! '});
                await sleep(2500);
                ClearSpace();
                b1 = true;
              } else {
                spinnerUser.error({text: ' USUARIO INCORRECTO'});
                await sleep(2000);
                console.log('')
              }
            } else {
              const s_c = createSpinner('Cancelando Operación...').start();
              await sleep(3000);
          
              s_c.success({text: ' Operación Cancelada.'});
              await sleep(2000);
              ClearSpace();
              b1 = true;
            }
          } while (!b1);
          break;

        case 'Registrar nuevo DUI.':
          let DUI;
          let b4 = false;
          let b5 = false;
          clear()
          //\\ ADD A NEW DUI TO THE DABASE
          do {
            clear();
            console.log(' + Registrar un nuevo numero de DUI ');
            console.log(' - Ingrese "cancelar" para salir. ');
            console.log('');

            //! GET THE DUI NUMBER
            const userDUI = await inquirer.prompt({
              name: 'DUI',
              type: 'input',
              message: 'Ingrese el Numero de DUI (con Guíon):'
            })
            DUI = userDUI.DUI;

            if (DUI != 'cancelar' && DUI != 'Cancelar') {
              const spinnerDUI = createSpinner('Validando DUI...').start();
              const [DuiMatch] = await pool.query('SELECT * FROM documents_dui WHERE DUI = ?', [DUI])
              await sleep(4500);
  
              if (!/^[0-9]{8}-[0-9]{1}$/.test(DUI) || DuiMatch.length != 0) {
                spinnerDUI.error({text: ' DUI INVALIDO'});
                await sleep(2000);
                ClearSpace();
              } else {
                spinnerDUI.success({text: ' DUI Verificado...'});
                await sleep(2000);
                ClearSpace();

                // CONFIRM THE DATA
                console.log(' * DATOS A CONFIRMAR: ');
                console.log(` DUI: ${DUI}`);
                console.log('');
                const confirmData = await inquirer.prompt({
                  name: 'Confirmar',
                  type: 'confirm',
                  message: '¿Desea Confirmar?',
                })
    
                if (confirmData.Confirmar) {
                  const spinnerUD = createSpinner('Guardando Información...').start();
                  await sleep(4500);
    
                  //! SAVE THE INFO IN THE DB
                  await pool.query('INSERT INTO documents_dui SET ?',{ DUI });
    
                  spinnerUD.success({text: ' ¡Información Guardada Correctamente!'});
                  await sleep(2000);
                  ClearSpace();
                } else {
                  const spinnerCancel = createSpinner('Cancelando...').start();
                  await sleep(3000);
    
                  spinnerCancel.success({text: ' Operación Finalizada.'});
                  await sleep(2000);
                  ClearSpace();
                }
                b4 = true;
              }  
            } else {
              const s_c = createSpinner('Cancelando Operación...').start();
              await sleep(3000);
              s_c.success({text: ' Operación Cancelada.'});
              await sleep(2000);
              ClearSpace();
              b4 = true;
            }
          } while (!b4);
          break;
         
          case 'Cerrar Sesión.':
            const spinnerClose = createSpinner('Cerrando Sistema...').start();
            await sleep(3000);

            spinnerClose.success({text: ' Sistema cerrado, BYE!.'});
            await sleep(2000);
            ClearSpace();
            closeMenu = true;
            break;


          case 'Modificar Fecha y Hora de una Cita':
            let idApp, AppDatTime;
            let bApp = true;
            let bApp2 = true;
            do {
              clear();
              console.log(' + Modificar Fecha y Hora de una Cita ');
              console.log(' - Ingrese "cancelar" para salir. ');
              console.log('');

              //! GET THE ID NUMBER
              const appmtId = await inquirer.prompt({
                name: 'id',
                type: 'input',
                message: 'Ingrese el Numero de ID de la cita:'
              })

              idApp = appmtId.id;
              if (idApp != 'cancelar' && idApp != 'Cancelar') {
                const spinnerID = createSpinner('Validando Id...').start();
                const [idMatch] = await pool.query('SELECT * FROM medical_appointment WHERE id = ?', [idApp])
                await sleep(4500);

                if (!idMatch.length != 0){
                  spinnerID.error({text: ' ID INVALIDA'});
                  await sleep(2000);
                  ClearSpace();
                } else {
                  spinnerID.success({text: ' ID Verificado...'});
                  await sleep(2000);
                  ClearSpace();

                  //! GET THE DUI NUMBER
                  ClearSpace();
                  inquirer.registerPrompt('datePicker',datePicker);
                  const dateQ = [
                    {
                      type: 'datePicker',
                      name: 'fechaHora',
                      message: 'Seleccione la fecha y la hora nueva de la cita:'
                    }
                  ]

                  const dateAws = await inquirer.prompt(dateQ);
                  const spinnerSaveApp = createSpinner('Guardando Información...').start();
                  await sleep(4500);

                  //! GET THE TIME
                  const fecha = new Date(dateAws.fechaHora);
                  const hours = new Date(dateAws.fechaHora).getHours();
                  const minutes = new Date(dateAws.fechaHora).getMinutes();
                  const seconds = new Date(dateAws.fechaHora).getSeconds();
                  const formattedHour = `${hours}:${minutes}:${seconds}`;


                  //! SAVE THE INFO IN THE DB
                  await pool.query('UPDATE medical_appointment SET Date = ?, Hour = ? WHERE id = ?',[fecha, formattedHour, idApp]);

                  spinnerSaveApp.success({text: ' ¡Información Guardada Correctamente!'});
                  await sleep(2000);
                  ClearSpace();
                  bApp = false;
                }
              }
            } while (bApp);
            break;
      }
      //>> -------------------------------- END SWITCH

    } while (!closeMenu);
    break;

  case 'Cerrar Sistema':
    const spinnerClose = createSpinner('Cerrando Sistema...').start();
    await sleep(3000);

    spinnerClose.success({text: ' Sistema cerrado, BYE!.'});
    await sleep(2000);
    ClearSpace();
    break;
}