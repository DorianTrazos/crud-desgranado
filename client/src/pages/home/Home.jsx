import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllUsers(setUsers);
	}, []);

	return (
		<>
			<h1>ALL USERS</h1>
			<form onSubmit={event => createUser(event, setUsers)}>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' name='name' id='name' />
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='text' name='email' id='email' />
				</div>
				<input type='submit' value='Create User' />
			</form>

			{users.length === 0 && <h2>No hay usuarios</h2>}
			{users.map(user => (
				<div key={user.userId}>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<Link to={`/user/${user.userId}`}>
						<button>Ver Detalles</button>
					</Link>
				</div>
			))}
		</>
	);
};

const createUser = async (event, setUsers) => {
	event.preventDefault();
	const userData = {
		name: event.target.name.value,
		email: event.target.email.value
	};

	const response = await fetch('http://localhost:3000/api/users', {
		method: 'POST',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();
	setUsers(data);
};

const getAllUsers = async setUsers => {
	// Pide los datos y espera hasta tenerlos disponibles
	const response = await fetch('http://localhost:3000/api/users');
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();
	setUsers(data);
};

export default Home;
