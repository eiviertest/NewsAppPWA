//Checar disponibilidad de SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("./sw.js")
        .then(reg => console.log("Registro de SW Exitoso", reg))
        .catch(err => console.log("Error al tratar de registrar SW", err))
}

//Enviar notificacion
if (window.Notification) {
    Notification.requestPermission().then(estatus => {
        console.log(estatus);
        if (estatus == "granted") {
            let notificacion = new Notification("Más noticias, favor refresca la página", {
                body: "Genial! Gracias por refrescarla, ahora ya estás al día.",
                icon: "./img/icons/newicon256.png",
                image: "./img/NewsApp.png"
            });
        }
    })
}