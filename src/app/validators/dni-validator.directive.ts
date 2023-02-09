import { ValidatorFn, AbstractControl } from "@angular/forms";

/** Tipos de identificadores aceptados */
export enum tipoIdentificador {
    NIF = "nif",
    NIE = "nie",
    CIF = "cif"
}

export function DniValidator(tipoId?: tipoIdentificador[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const value: string = control.value;
        if (!value) {
            return null;
        }

        let parsedValue: string = String(value);
        parsedValue = parsedValue.toUpperCase().replace(/\s/, '');

        /** Los patrones para el revisado de si es correcto el identificador */
        const NIF_REGEX: RegExp = /^(\d{8})([TRWAGMYFPDXBNJZSQVHLCKE])$/;
        const NIE_REGEX: RegExp = /^[XYZ]\d{7,8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
        const CIF_REGEX: RegExp = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;

        let valido: boolean = false;
        let validado: boolean = false;

        /** Si no se ha declarado el tipo de identificador, la aplicación se encargara de revisar de que tipo de identificador se trata y lo valida */
        if (!tipoId) {
            tipoDni(parsedValue);
        } else {
            tipoId.forEach(tipo => {
                if (!validado) {
                    switch (tipo) {
                        case 'nif':
                            valido = validNIF(parsedValue);
                            if (valido) validado = true;
                            break;
                        case 'nie':
                            valido = validNIE(parsedValue);
                            if (valido) validado = true;
                            break;
                        case 'cif':
                            valido = validCIF(parsedValue);
                            if (valido) validado = true;
                            break;
                        default:
                            valido = false;
                    }
                }
            });
        }

        function tipoDni(value: string) {
            if (value.match(NIF_REGEX)) {
                valido = validNIF(parsedValue);
            }
            if (value.match(NIE_REGEX)) {
                valido = validNIE(parsedValue);
            }
            if (value.match(CIF_REGEX)) {
                valido = validCIF(parsedValue);
            }
        }

        if (!valido) return { invalidDni: true };
        return null;

        function validNIF(nif): boolean {
            const letras: string = "TRWAGMYFPDXBNJZSQVHLCKE";
            const letraFinal: string = letras.charAt(parseInt(nif, 10) % 23);

            return letraFinal == nif.charAt(8);
        };

        function validNIE(nie): boolean {
            let primerNumero: any = nie.charAt(0);

            switch (primerNumero) {
                case 'X': primerNumero = 0; break;
                case 'Y': primerNumero = 1; break;
                case 'Z': primerNumero = 2; break;
            }

            return validNIF(primerNumero + nie.substr(1));
        };

        function validCIF(cif): boolean {
            if (cif.match(CIF_REGEX)) {
                const match: any = cif.match(CIF_REGEX);

                const letra: string = match[1],
                    numeros: string = match[2],
                    control: any = match[3];

                let even_sum: number = 0;
                let odd_sum: number = 0;
                let n: number;

                for (let i: number = 0; i < numeros.length; i++) {
                    n = parseInt(numeros[i], 10);
                    if (i % 2 === 0) {
                        n *= 2;
                        odd_sum += n < 10 ? n : n - 9;
                    } else {
                        even_sum += n;
                    }
                }

                const digitoControl: number = (10 - <any>(even_sum + odd_sum).toString().substr(-1));
                const letraControl: string = 'JABCDEFGHI'.substr(digitoControl, 1);

                // El control es un dígito
                if (letra.match(/[ABEH]/)) {
                    return control == digitoControl;
                // El control es una letra
                } else if (letra.match(/[KPQS]/)) {
                    return control == letraControl;
                } else {
                    return control == digitoControl || control == letraControl;
                }
            } else {
                return false;
            }
        };
    };
}


