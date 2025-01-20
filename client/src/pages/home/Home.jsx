import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createData, getAllData } from '../../utils/api';

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

	try {
		const data = await createData(userData);
		setUsers(data);
	} catch (error) {
		console.log(error);
	}
};

const getAllUsers = async setUsers => {
	try {
		const data = await getAllData();
		setUsers(data);
	} catch (error) {
		console.log(error);
	}
};

export default Home;
