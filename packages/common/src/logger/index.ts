import chalk from 'chalk';

export const info = (message) => {
    return chalk.blueBright(`zephra: ${message}`);
};

export const warn = (message) => {
    return chalk.yellowBright(`zephra: ${message}`);
};

export const error = (message) => {
    return chalk.redBright(`zephra: ${message}`);
};

export const logo = chalk.yellowBright(
    `
 oooooooooooo 
d'""""""d888' 
      .888P   
     d888'    
   .888P      
  d888'    .P 
.8888888888P
`
);

export const separator = `================================\n`;
