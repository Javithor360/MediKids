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
    const user = await inquirer.prompt({
      name: 'username',
      type: 'input',
      message: 'Digite su usuario'
    })
    const password = await inquirer.prompt({
      name: 'pass',
      type: 'password',
      message: 'Digite su Contraseña'
    })

    clear(); // Limpia la pantalla
    console.log('=========================');
    console.log('= BIENVENIDO A MEDI' + chalk.magenta('KIDS') + '=');
    console.log('=========================');
    console.log((''))
    console.log('Bienvenido Dr ' + user.username + ' que desea hacer?')

    const answers = await inquirer.prompt({
      name: 'question1',
      type: 'list',
      message: 'Que deseas hacer?',
      choices: [
        'Registrar a un doctor',
        'Enviar mensaje a un doctor',
        'Administrar doctores',
      ]
    });

    switch (answers.question1) {
      case 'Registrar a un doctor':
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
          do{
            console.clear();
            if(wordpas != conf){
              console.log(chalk.red('Las contraseñas no son iguales'))
            }
            const Password = await inquirer.prompt({
              name:'pass',
              type:'input',
              message:'Digite una contraseña:'
            })
            const Pass = await inquirer.prompt({
              name:'word',
              type:'input',
              message:'confirme contraseña:'
            })
            wordpas = Password.pass;
            conf = Pass.word;
          }
  
          while(wordpas !== conf )

          console.log(chalk.green('Usuario registrado con exito'));
          await delay(2000);
          function delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
          }
        } while (Us.length < 4);


        break;

      case 'Enviar mensaje a un doctor':
        console.log('hi');
        break;

      case 'Administrar doctores':
        console.log('hola');
        break;

      default:
        console.log('Opción no válida');
        break;
    }

    break;

  case 'Cerrar sistema':
    console.log('Cerrando consola');
    break;
}
