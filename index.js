window.onload = () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, positionError);
		alert('Necesitas activar la ubicación para ver y subir tu confesion');
		

	} else { 
		alert('Este navegador no acepta Geolocalizacion, acualiza el navegador');
	}

	function showPosition(position) {	
		document.getElementById("task-geo").innerHTML = position.coords.latitude + " " + position.coords.longitude;				
		document.body.style.display = ""; // ocultar

	}


	document.body.style.display = "none"; // ocultar
            
};


function positionError(error) {
    alert('Para ver las confesiones es necesario que aceptes la ubicación, este permiso es necesario para evitar SPAM');
    location.reload();
    document.body.style.display = "none"; // ocultar
    
}