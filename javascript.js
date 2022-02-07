	var firebaseConfig = {
		apiKey: "AIzaSyB9s0IY1sQyd3jS96PdPc3KBCSl7VFaTK4",
		authDomain: "jr-arguelles.firebaseapp.com",
		databaseURL: "https://jr-arguelles-default-rtdb.firebaseio.com",
		projectId: "jr-arguelles",
		storageBucket: "jr-arguelles.appspot.com",
		messagingSenderId: "46118742765",
		appId: "1:46118742765:web:8924cd1e42dca81b607ae4",
		measurementId: "G-2NJYLW57JT"
	}

	firebase.initializeApp(firebaseConfig)
	
	const db = firebase.firestore()
	const form = document.querySelector('#task-form')
	const taskContainer = document.querySelector('#tasks-container')

	let editStatus = false
	let id = ''
	let time = new Date().toISOString()
	db.collection("febrero7a14").orderBy("title", "desc")






	// let db = firebase.firestore();


	const SaveUser = (title,phonex,description,coordenads,fecha) => {
		db.collection("febrero7a14").doc().set({
			title,
			phonex,
			description,
			coordenads,
			fecha			
		})

		.then (function (docRef) {
			MJSOK();

		})

		.catch(function(error) {
			MSJERROR();

		});
	}

	const MJSOK =()=>{
		swal('Listo!', 'Se subio tu confesión', 'success')
	}


	const MSJERROR =()=>{
		swal('Ops!', 'No se subio tu confesion', 'error')
	}


	const getTasks = () => db.collection('febrero7a14').get()
	const onGetTasks = (callback) => db.collection('febrero7a14').onSnapshot(callback)
	const getTask = (id) => db.collection('febrero7a14').doc(id).get()
	const updateTask = (id, updateTask) => db.collection('febrero7a14').doc(id).update(updateTask)

	// esto se ejecuta cada vez que suceda algo en la db
	window.addEventListener('DOMContentLoaded', async (e) => {
		db.collection("febrero7a14").orderBy("title", "desc")
		onGetTasks((querySnapshot) => {
			taskContainer.innerHTML = ''

			querySnapshot.forEach((doc) => {
				const task = doc.data()
				task.id = doc.id

				taskContainer.innerHTML += `
					<div class=".col-12 .col-md-8 card card-body mt-2 mx-2 border-success">
						<h3 class="text-primary">${task.title}</h3>
						<p>${task.description}</p>
					</div>
				`
			})
		})
	})


$("#btnsave").on('click',()=>{
	let title = $("#task-title").val();
	let phonex = $("#task-phone").val();
	let description = $("#task-description").val();
	let coordenads = $("#task-geo").text();
	let fecha = new Date();


	// const userX = {
	// 	title,
	// 	phonex,
	// 	description,
	// 	coordenads,
	// 	fecha

	// }

	SaveUser(title,phonex,description,coordenads,fecha);
	document.getElementById("task-form").reset();
	db.collection("febrero7a14").orderBy("title", "desc")

})





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
	db.collection("febrero7a14").orderBy("title", "desc")
            
};


function positionError(error) {
    alert('Para ver las confesiones es necesario que aceptes la ubicación, este permiso es necesario para evitar SPAM');
    location.reload();
    document.body.style.display = "none"; // ocultar
    
}