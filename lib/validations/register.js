import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if(!Validator.isEmail(data.email)) {
        errors.email = 'This is not an email'
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'This field is required'
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'This field is required'
    }

    if(!Validator.equals(data.password , data.comfirmpassword )){
        errors.comfirmpassword = 'Invalid Comparison'
    }
    

    return {
        errors,
        isValid: isEmpty(errors),
    }
}
