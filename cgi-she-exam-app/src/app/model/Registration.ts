import {Address} from './Address';
import {RegistrationStart} from './RegistrationStart';

export class Registration extends RegistrationStart {  
  public firstName: string = '';
  public lastName: string = '';
  public phone: string = '';
  public phoneId: string;
  public dobMonth: number;
  public dobDay: number;
  public dobYear: number;
  public countryCode: string = '';
  public nationality: string = '';
  public gender: string = '';
  public address: Address = new Address();
  
  constructor() { super();}
}