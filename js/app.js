document.addEventListener('DOMContentLoaded', function () {
    const pinForm = document.getElementById('pin-form');

    const user = {
        name: "Ash Ketchum",
        pin: "1234",
        account: "0987654321",
        balance: "$500.00"
    };

    function checkPIN(pin) {
        return pin === user.pin;
    }

    pinForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const pin = document.getElementById('pin').value;

        const constraints = {
            from: {
                presence: { allowEmpty: false },
                numericality: { onlyInteger: true, greaterThan: 0 }
            }
        };

        const validationResult = validate({from: pin}, constraints);
        if (validationResult) {
            Swal.fire({
                icon: 'error',
                title: 'PIN Inválido',
                text: 'Por favor, ingrese un PIN válido.',
                confirmButtonText: 'OK'
            });
        } else if (checkPIN(pin)) {
            localStorage.setItem('user', JSON.stringify(user)); // Guardar datos del usuario en LocalStorage
            Swal.fire({
                icon: 'success',
                title: 'Acceso Concedido',
                text: '¡PIN correcto! Redirigiendo...',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    window.location.href = 'index.html'; // Redirige a la página index.html
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'PIN Incorrecto',
                text: 'PIN incorrecto. Por favor, inténtelo de nuevo.',
                confirmButtonText: 'OK'
            });
        }
    });
});
