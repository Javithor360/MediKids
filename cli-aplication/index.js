#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import clear from 'clear';
import { createSpinner } from 'nanospinner';
import { createPool } from 'mysql2/promise';

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
            console.log(' + Enviar Mensaje a un doctor ');
            console.log('');
            const userName = await inquirer.prompt({
              name: 'Usuario',
              type: 'input',
              message: 'Ingrese el nombre de usuario del doctor:'
            })
            u_n = userName.Usuario;

  
            //! CHECK THE DATABASE.
            const spinner = createSpinner('Verificando Usuario...').start();

            const [drs] = await pool.query('SELECT * FROM doctors WHERE User = ?', [u_n])
  
            if (drs.length != 0) {
              spinner.success({text: ' Usuario Verificado...'});
              await sleep(2000);
              ClearSpace();

              //* SEND THE MESSAGE
              let message;
              do {
                
              } while (condition);

              b1 = true;
            } else {
              spinner.error({text: ' USUARIO INCORRECTO'});
              await sleep(2000);
              console.log('')
            }
          } while (!b1);
          

          break;
      }
      //>> -------------------------------- END SWITCH

    } while (!closeMenu);
    break;



  case 'Cerrar Sistema':
    console.log('no')
    break;
}