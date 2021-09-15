function cambiarNombre() {
    var nombre = document.getElementById('nombre').value;
    var nuevoMensaje = `Hola ${nombre}, el valor de tu liquidación es el siguiente:`
    document.getElementById('mensajeInicial').innerHTML = nuevoMensaje;
}

function calcPrestaciones(salario, diasTrabajados) {
    var salarioMinimo = 908526;
    var auxTransporte = 106454;    
    var salarioBase = salario < 2*salarioMinimo ? salario + auxTransporte : salario;
    var primaServicios = salarioBase*diasTrabajados/360;
    var cesantias = salarioBase*diasTrabajados/360;
    var interesesCesantias = 0.12*cesantias;
    var vacaciones = salarioBase*diasTrabajados/720;
    return primaServicios + cesantias + interesesCesantias + vacaciones;
}

function segSocial(salario, diasTrabajados) {
    var baseDia = salario/30;
    var salud =  0.085 * baseDia * diasTrabajados;
    var pension = 0.12 * baseDia * diasTrabajados;
    var riesgos = 0.00522 * baseDia * diasTrabajados;
    return salud + pension + riesgos;
}

function calcNomina(salario, diasTrabajados) {
    var devengado = (salario/30)*diasTrabajados;
    var salud = devengado *0.04;
    var pension = devengado *0.04;
    var deTotal = salud + pension;
    var nomina = devengado - deTotal;

    if (salario <= (908526*2)){
        var transporte = 106454.00/30 * diasTrabajados;
        nomina += transporte;
    }

    return nomina;
}

function calcParafiscales(salario,diasTrabajados) {
    var baseDia = salario/30;
    var aporteCaja = baseDia * 0.04 * diasTrabajados;
    var aporteICBF = baseDia * 0.03 * diasTrabajados;
    var aporteSena = baseDia * 0.02 * diasTrabajados;
    return aporteCaja + aporteICBF + aporteSena;
}

function obtenerValores() {
    var salario = parseInt(document.getElementById('salario').value);
    var fecha1 = document.getElementById('date1').value;
    var fecha2 = document.getElementById('date2').value;

    var date1 = new Date(fecha1.slice(0,4),parseInt(fecha1.slice(5,7))-1,fecha1.slice(8,));
    var date2 = new Date(fecha2.slice(0,4),parseInt(fecha2.slice(5,7))-1,fecha2.slice(8,));

    var diffTime = date2.getTime() - date1.getTime();
    var diasTrabajados = diffTime / (1000 * 3600 * 24);

    var valorPrestaciones = Math.round(calcPrestaciones(salario, diasTrabajados));
    var valorSeguridad = Math.round(segSocial(salario, diasTrabajados));
    var valorNomina = Math.round(calcNomina(salario, diasTrabajados));
    var valorParafiscales = Math.round(calcParafiscales(salario, diasTrabajados));
    var valorTodo = valorPrestaciones + valorSeguridad + valorNomina + valorParafiscales;

    document.getElementById('valPrestaciones').innerHTML = `<strong>Prestaciones:</strong>  ${valorPrestaciones} COP`
    document.getElementById('valSeguridad').innerHTML = `<strong>Seguridad social:</strong>  ${valorSeguridad} COP`
    document.getElementById('valNomina').innerHTML = `<strong>Nómina:</strong>  ${valorNomina} COP`
    document.getElementById('valParaf').innerHTML = `<strong>Aportes parafiscales:</strong>  ${valorParafiscales} COP`
    document.getElementById('valTotal').innerHTML = `<strong>Pago total:</strong> ${valorTodo} COP`;
}

function ocultarImagen() {
    var x = document.getElementById("pending");
    if (x.style.display !== "none") {
        x.style.display = "none";
    }
}

function actualizarPagina() {
    cambiarNombre();
    ocultarImagen();
    obtenerValores();
}
