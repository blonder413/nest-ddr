export class EmailConfig {
  from: string;
  password: string;
  service: SERVICES;
  port?: number = 25; // ? significa que no es obligatorio
  secure?: boolean = false;
}

export enum SERVICES {
  GMAIL = 'gmail',
  OUTLOOK = 'outlook',
}
