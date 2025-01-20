import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const User = () => {
	const [user, setUser] = useState();
	const [isEditing, setIsEditing] = useState(false);
	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		getUserById(id, setUser);
	}, [id]);

	if (!user) return <h2>No User</h2>;

	return (
		<>
			<h1>User</h1>
			{!isEditing && (
				<div>
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					<div>
						<button onClick={() => setIsEditing(true)}>Editar Usuario</button>
						<button onClick={() => deleteUserById(id, navigate)}>
							Borrar Usuario
						</button>
					</div>
					<Link to='/'>
						<button>Volver al home</button>
					</Link>
				</div>
			)}
			{isEditing && (
				<>
					<form
						onSubmit={event =>
							updateUser(event, id, user, setUser, setIsEditing)
						}
					>
						<div>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								name='name'
								id='name'
								defaultValue={user.name}
							/>
						</div>
						<div>
							<label htmlFor='email'>Email</label>
							<input
								type='text'
								name='email'
								id='email'
								defaultValue={user.email}
							/>
						</div>
						<input type='submit' value='Update User' />
					</form>
					<button onClick={() => setIsEditing(false)}>Cancelar</button>
				</>
			)}
		</>
	);
};

const getUserById = async (id, setUser) => {
	// Pide los datos y espera hasta tenerlos disponibles
	const response = await fetch(`http://localhost:3000/api/users/${id}`);
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();
	setUser(data);
};

const deleteUserById = async (id, navigate) => {
	// Pide los datos y espera hasta tenerlos disponibles
	await fetch(`http://localhost:3000/api/users/${id}`, {
		method: 'DELETE'
	});

	//navigate('ruta')
	navigate('/');
};

const updateUser = async (event, id, user, setUser, setIsEditing) => {
	event.preventDefault();
	const userData = {
		name: event.target.name.value || user.name,
		email: event.target.email.value || user.email
	};

	const response = await fetch(`http://localhost:3000/api/users/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();
	setUser(data);
	setIsEditing(false);
};

export default User;
