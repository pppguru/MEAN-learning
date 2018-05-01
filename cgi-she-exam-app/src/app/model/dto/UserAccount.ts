import {UserRegistration} from './UserRegistration';
import {Registration} from './../Registration';
import {Telephone} from './../Telephone';
var _ = require('lodash');

export class UserAccount extends UserRegistration{    
    public id: string;
    
    constructor() {
        super();

        this.addresses = new Array();
        this.telephones = new Array();
    }

    setPayload(registration: Registration):this {

        if (registration.dobYear != null && 
            registration.dobDay != null &&
            registration.dobDay != null) {
            this.dateOfBirth = registration.dobYear + '/' + registration.dobMonth+
                '/' + registration.dobDay;
        }

        this.email = registration.email;
        this.gender = registration.gender;
        this.firstName = registration.firstName;
        this.lastName = registration.lastName;
        this.password = registration.password;
        this.passwordConfirmation = registration.passwordConfirmation;
        this.addresses.push(registration.address);
        
        let areaCode = null;
        let phNumber = null;
        if (registration.phone.length == 10) {
            areaCode = registration.phone.substring(0,3);
            phNumber = registration.phone.substring(3,10);

            let phone = new Telephone(registration.countryCode,areaCode,phNumber,null);
            phone.id = registration.phoneId;
            this.telephones.push(phone);
        }

        this.nationalityId = registration.nationality;
        return this;
    }
    
    getPayload():any {
        var payload = _.cloneDeep(this);
        
        if (payload.password == null || payload.password.length == 0) {
            delete payload.password;
            delete payload.passwordConfirmation;
        }
        
        if (payload.id == null || payload.id.length == 0)
            delete payload.id;

        if (payload.gender == '')
            delete payload.gender;

        if (payload.nationalityId == '')
            delete payload.nationalityId;

        if (payload.dateOfBirth == null)
            delete payload.dateOfBirth;

        if (payload.telephones.length == 0)
            delete payload.telephones;

        if (payload.addresses.length == 0)
            delete payload.addresses;
        
        return payload;
    }
}