window.onload = function (){
    let form = document.querySelector('.form-editUser');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        let errors = [];

        if(form.nameus.value == ''){
            errors.push('*El nombre es un campo obligatorio')
        } 
        
        if(form.lastnameus.value == ''){
            errors.push('*El apellido es un campo obligatorio')
        } 

        if(form.birthday.value == ''){
            errors.push('*La fecha es un campo obligatorio')
        }

        if(form.adressus.value == ''){
            errors.push('*El domicilio es un campo obligatorio')
        }

        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;
        if(form.emailus.value == ''){
            errors.push('*El email es un campo obligatorio')
        }
        
        else if(emailRegex.test(form.email.value) == false) {
            errors.push('*Email con formato invalido');
        }

        /*if(form.passus.value == ''){
            errors.push('*La password es un campo obligatorio')
        }else if (form.passus.value.length > 8) {
            errors.push('*La password debe tener minimo 8 caracteres')
        }*/
        
        let ul = document.querySelector('.register-errors');

        if(errors.length != 0){
            ul.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                const e = errors[i];
                ul.innerHTML += `<li> ${e} </li>`
                Swal.fire(
                    {icon : 'error',
                    title : 'Hubo un error!',
                    text : 'Revisar los errores!'
                })
            }
        } else {
            ul.innerHTML = '';
            Swal.fire(
                'Bien hecho!',
                'Se editó el usuario!',
                'Success'
            ).then(() => {form.submit();})
        }
    })
}