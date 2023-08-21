#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation'; import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
console.log(chalk.bgBlue('========================='))
console.log(chalk.bgBlue('= BIENVENIDO A MEDIKIDS ='))
console.log(chalk.bgBlue('========================='))
console.log((''))
console.log((''))
const answers = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'Que deseas hacer?',
    choices:[
            'Registrar a un doctor',
            'Enviar mensaje a un doctor',
            'Administrar doctores',
    ]
    });
     if(answers !== 'Registrar a un doctor'){
       const docname = await inquirer.prompt({
        name:'name',
        type:'input',
        message:'Digita el nombre completo del doctor',
       })
       const docesp = await inquirer.prompt({
        name:'Area',
        type:'list',
        message:'Digite el numero de la especialidad de el doctor',
        
       });
       const password = await inquirer.prompt({
        name:'pass',
        type:'input',
        message:'digite una contraseña segura'
       })
       const confirm = await inquirer.prompt({
        name:'passc',
        type:'input',
        message:'confirme la contraseña'
       })
       if(password == confirm){
        console.log('El doctor a sido registrado con exito')
       }
     }
    
