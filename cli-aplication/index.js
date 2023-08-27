#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import clear from 'clear';

console.log('=======================================');
console.log('= PANEL DE ADMINISTRACION DE MEDI' + chalk.magenta('KIDS') + ' =');
console.log('=======================================');
console.log((''))
console.log('Que desea hacer?')
console.log(('------------------------------------'))
console.log((''))
const index = await inquirer.prompt({
  name: 'question1',
  type: 'list',
  message: 'Que deseas hacer?',
  choices: [
    'Iniciar sesion',
    'Cerrar sistema'
  ]
})

switch (index.question1) {
  case 'Iniciar sesion':
    let usern, variable;
    do {
      console.clear();
      if (usern != variable) {
        console.log(chalk.red('Usuario incorrecto'))
      }
      const user = await inquirer.prompt({
        name: 'username',
        type: 'input',
        message: 'Digite su usuario'
      })
      usern = user.username;
      variable = 'doc001'
    }
    while (usern !== variable)
    let word, pas;
    do {
      console.clear();
      if (word != pas) {
        console.log(chalk.red('Contraseña incorrecta'))
      }
      const password = await inquirer.prompt({
        name: 'pas',
        type: 'password',
        message: 'Digite su Contraseña'
      })
      word = password.pas;
      pas = 'medidoc001';
    }
    while (word !== pas)
    clear();
    let menu;
    menu = true;
    do {
      console.log('=========================');
      console.log('= BIENVENIDO A MEDI' + chalk.magenta('KIDS') + '=');
      console.log('=========================');
      console.log((''))
      console.log('---------------------------------------------------------');
      console.log('Bienvenido Dr Latex ¿qué desea hacer?');
      console.log('---------------------------------------------------------');
      const answers = await inquirer.prompt({
        name: 'question1',
        type: 'list',
        message: 'Que deseas hacer?',
        choices: [
          'Registrar a un doctor',
          'Enviar mensaje a un doctor',
          'Administrar doctores',
          'Registrar DUI',
          'Cerrar sesion'
        ]
      });

      switch (answers.question1) {
        case 'Registrar a un doctor':
          console.clear();
          const Name = await inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'Digite los nombres del doctor'
          });
          console.clear();
          const Last = await inquirer.prompt({
            name: 'last',
            type: 'input',
            message: 'Digite los Apellidos del doctor'
          });
          console.clear();
          let Us;

          do {
            console.clear();

            if (Us && Us.length < 4) {
              console.log(chalk.red('Usuario no válido'));
            }

            const Username = await inquirer.prompt({
              name: 'user',
              type: 'input',
              message: 'Asigne un usuario para el doctor'
            });

            Us = Username.user;

            if (Us.length < 4) {
              continue;
            }
            let wordpas, conf;
            do {
              console.clear();
              if (wordpas != conf) {
                console.log(chalk.red('Las contraseñas no son iguales'))
              }
              const Password = await inquirer.prompt({
                name: 'pass',
                type: 'input',
                message: 'Digite una contraseña:'
              })
              const Pass = await inquirer.prompt({
                name: 'word',
                type: 'input',
                message: 'confirme contraseña:'
              })
              wordpas = Password.pass;
              conf = Pass.word;
            }

            while (wordpas !== conf)

            console.log(chalk.green('Usuario registrado con exito'));
            await delay(2000);
            function delay(ms) {
              return new Promise(resolve => setTimeout(resolve, ms));
            }
          } while (Us.length < 4);
          break;

        case 'Enviar mensaje a un doctor':
          let docs, variable;
          do {
            console.clear();
            if (docs != variable) {
              console.log(chalk.red('Usuario inexistente'))
            }
            const docin = await inquirer.prompt({
              name: 'us',
              type: 'input',
              message: 'Digite el usuario del doctor al que desea enviar un mensaje:'
            })
            docs = docin.us
            variable = 'doc001'
          }
          while (docs !== variable)
          console.clear();
          const tittle = await inquirer.prompt({
            name: 'tittle',
            type: 'label',
            message: 'Ingresa el titulo del mensaje'
          })
          console.clear();
          const mensaje = await inquirer.prompt({
            name: 'mensaje',
            type: 'label',
            message: 'Ingresa el mensaje que desea enviar'
          })
          console.log(chalk.green('Mensaje enviado con exito'));
          await delay(2000);
          function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }
          break;
          case 'Administrar doctores':
          console.log('docs')
          break;

        case 'Registrar DUI':
          console.log('Duis')
          break;

        case 'Cerrar sesion':
          menu = false;
          break;
        default:
          console.log('Opción no válida');
          break;
      }
    } while (menu)
    break;

  case 'Cerrar sistema':
    console.log('Cerrando consola');
    break;
}
