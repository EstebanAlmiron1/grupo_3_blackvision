window.onload = function (){
    let form = document.querySelector('.form-productEdit');

    form.addEventListener('submit', function(e){
        e.preventDefault();

        let errors = [];

        if(form.name.value == ''){
            errors.push('*El nombre es un campo obligatorio')
        } else if (form.name.value.length < 5){
            errors.push('*El nombre debe tener minimo 5 caracteres');
        }
        
        if(form.description.value == ''){
            errors.push('*La descripción es un campo obligatorio')
        } else if (form.description.value.length < 20){
            errors.push('*La descripción debe tener minimo 20 caracteres');
        }

        if(form.color.value == ''){
            errors.push('*El color debe ser obligatorio')
        }

        if(form.size.value == ''){
            errors.push('*El talle es un campo obligatorio')
        }

        if(form.category.value == ''){
            errors.push('*La categoria es obligatoria')
        }

        if(form.brand.value == ''){
            errors.push('*La marca del producto es obligatoria')
        }

        if(form.price.value == ''){
            errors.push('*El precio es un campo obligatorio')
        }
        
        let ul = document.querySelector('.ul-errors');

        if(errors.length != 0){
            ul.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                const e = errors[i];
                ul.innerHTML += `<li> ${e} </li>`
                Swal.fire(
                    {icon : 'Error',
                    title : 'Hubo un error!',
                    text : 'Revisar los errores!'
                })
            }
        } else {
            ul.innerHTML = '';
            Swal.fire(
                'Bien hecho!',
                'Se editó el producto!',
                'Success'
            ).then(() => {form.submit();})
        }
    })
}