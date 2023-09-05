import { FormControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}




export class PasswordValidator {

    public static Uppercase(control: FormControl) {
        let hasUpper = /[A-Z]/.test(control.value);
        const valid = hasUpper;
        if (!valid) {
            // return what´s not valid
            return { Uppercase: true };
        }
        return null
    }

    public static Lowercase(control: FormControl) {

        let hasLower = /[a-z]/.test(control.value);
        const valid = hasLower;
        if (!valid) {
            return { Lowercase: true };
        }
        return null
    }

    public static Number(control: FormControl) {
        let hasNumber = /\d/.test(control.value);
        const valid = hasNumber;
        if (!valid) {
            return { Number: true };
        }
        return null
    }

    public static Speacialchar(control: FormControl) {
        var format = /[!@#$%^&*]+/;

        if (format.test(control.value)) {
            return null
        }
        else {
            return { Speacial: true };
        }
    }





}