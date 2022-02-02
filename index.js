const db = firebase.firestore()

const form = document.querySelector('#task-form')
const taskContainer = document.querySelector('#tasks-container')

let editStatus = false
let id = ''

const saveTask = (title, description) =>
	db.collection('tasks').doc().set({
		title,
		description,
	})

const getTasks = () => db.collection('tasks').get()

// obtinen las tareas cada vez que se actualice
const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback)

const deleteTask = (id) => db.collection('tasks').doc(id).delete()

const getTask = (id) => db.collection('tasks').doc(id).get()

const updateTask = (id, updateTask) =>
	db.collection('tasks').doc(id).update(updateTask)

window.addEventListener('DOMContentLoaded', async (e) => {
	//const querySnapshot = await getTasks()

	// esto se ejecuta cada vez que suceda algo en la db
	onGetTasks((querySnapshot) => {
		taskContainer.innerHTML = ''

		querySnapshot.forEach((doc) => {
			const task = doc.data()
			task.id = doc.id

			taskContainer.innerHTML += `
				<div class="col-12 col-sm-5 card card-body mt-2 mx-2 border-success">
					<h3 class="text-primary">${task.title}</h3>
					<p>${task.description}</p>
	

				</div>
			`
		})
	})
})

form.addEventListener('submit', async (e) => {
	e.preventDefault()

	const title = form['task-title']
	const description = form['task-description']

	if (!editStatus) {
		if (title.value === '' || description.value === '') {
			swal('Hey!', 'Completa todos los datos.', 'warning')
		} else {
			await saveTask(title.value, description.value)
			swal('Listo!', 'Se subio tu confesión', 'success')
		}
	} 
	

	form.reset()
	title.focus()
})
