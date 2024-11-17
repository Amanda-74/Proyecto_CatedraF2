document.addEventListener('DOMContentLoaded', function () {
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const accountNumber = document.getElementById('account-number');
    const initialBalance = document.getElementById('initial-balance');

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        userName.textContent = user.name;
        accountNumber.textContent = user.account;
        initialBalance.textContent = user.balance;
        userInfo.style.display = 'block';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'No Autenticado',
            text: 'No hay información de usuario. Por favor, inicie sesión.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'login.html'; // Redirige a la página de inicio de sesión si no hay datos de usuario
        });
    }

    window.selectTransaction = function () {
        // Función para manejar la selección de transacción
        Swal.fire({
            icon: 'info',
            title: 'Transacción',
            text: 'Función de selección de transacción no implementada.',
            confirmButtonText: 'OK'
        });
    };

    window.logout = function () {
        Swal.fire({
            title: '¿Está seguro?',
            text: "¿Desea cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user'); // Eliminar datos del usuario de LocalStorage
                Swal.fire(
                    'Cerrado',
                    'La sesión ha sido cerrada.',
                    'success'
                ).then(() => {
                    window.location.href = 'login.html'; // Redirigir a la página de inicio de sesión
                });
            }
        });
    };
});
