import { AbstractControl } from '@angular/forms';

/** Validador de email*/
export function CustomEmailValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) {
        return null;
    } else {
        if (! /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,99}$/.test(value)) {
            return { email: true }
        }
    }
}



