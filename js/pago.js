document.addEventListener('DOMContentLoaded', function () {
    const paymentForm = document.getElementById('payment-form');

    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const service = document.getElementById('service').value;
        const accountNumber = document.getElementById('accountNumber').value;
        const amount = document.getElementById('amount').value;

        if (!accountNumber || !amount) {
            Swal.fire({
                icon: 'error',
                title: 'Datos Incompletos',
                text: 'Por favor, complete todos los campos antes de continuar.',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: 'Confirmar Pago',
            html: `
                <p>Servicio: ${service}</p>
                <p>Número de Cuenta: ${accountNumber}</p>
                <p>Monto a Pagar: $${amount}</p>
            `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Pago Exitoso',
                    text: `El pago de $${amount} para ${service} ha sido realizado exitosamente.`,
                    confirmButtonText: 'Imprimir Comprobante'
                }).then(() => {
                    generatePDF(service, accountNumber, amount);
                    paymentForm.reset();
                });
            }
        });
    });

    function generatePDF(service, accountNumber, amount) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text('Comprobante de Pago', 20, 20);
        doc.text(`Servicio: ${service}`, 20, 30);
        doc.text(`Número de Cuenta: ${accountNumber}`, 20, 40);
        doc.text(`Monto a Pagar: $${amount}`, 20, 50);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 60);

        doc.save('comprobante_pago.pdf');
    }
});
