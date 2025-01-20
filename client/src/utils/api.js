const URL = 'http://localhost:3000';
const API_URL = '/api/users/';

const getAllData = async () => {
	// Pide los datos y espera hasta tenerlos disponibles
	const response = await fetch(URL + API_URL);
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();
	return data;
};

const getDataById = async id => {
	// Pide los datos y espera hasta tenerlos disponibles
	const response = await fetch(URL + API_URL + id);
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();
	return data;
};

const createData = async newData => {
	const response = await fetch(URL + API_URL, {
		method: 'POST',
		body: JSON.stringify(newData),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	// Convierte los datos a un formato JS y depués imprimes
	const data = await response.json();

	return data;
};

const updateDataById = async (id, newData) => {
	const response = await fetch(URL + API_URL + id, {
		method: 'PATCH',
		body: JSON.stringify(newData),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const data = await response.json();

	return data;
};

const deleteDataById = async id => {
	// Pide los datos y espera hasta tenerlos disponibles
	await fetch(URL + API_URL + id, {
		method: 'DELETE'
	});
};

export { getAllData, getDataById, createData, updateDataById, deleteDataById };
