import {UserRelations} from './dto/UserRelations';
import {Registration} from './Registration';

export class User {
  constructor(public id: string,
               public firstName: string,
               public lastName: string,
               public email: string,
               public gender: string,
               public dateOfBirth: string,
               public relations: UserRelations) { }
               
      getRegistration() {
        var registration: Registration = new Registration();
        
        if (this.relations && 
            this.relations.addresses &&
            this.relations.addresses.length > 0)
          registration.address = this.relations.addresses[0];
          
        if (this.relations && 
            this.relations.telephones &&
            this.relations.telephones.length > 0) {
              registration.countryCode = this.relations.telephones[0].countryCode;
              registration.phone = this.relations.telephones[0].areaCode +
                this.relations.telephones[0].number;
              registration.phoneId = this.relations.telephones[0].id;
            }
            
          registration.firstName = this.firstName;
          registration.lastName = this.lastName;
          registration.gender = this.gender;
          registration.email = this.email;
          
          if (this.relations &&
              this.relations.nationality &&
              this.relations.nationality.hasOwnProperty('id'))
            registration.nationality = this.relations.nationality.id;
            
          if (this.dateOfBirth) {
            let dob = new Date(Date.parse(this.dateOfBirth));
            registration.dobDay = dob.getUTCDate();
            registration.dobMonth = dob.getUTCMonth() + 1;
            registration.dobYear = dob.getUTCFullYear();
          }
          
          return registration;
      }
      
      
}