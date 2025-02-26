const urlParametros = new URLSearchParams(window.location.search);
const idEvento = urlParametros.get("id");
const idReserva = urlParametros.get("idReserva");
const formDeletarReserva = document.querySelector("#formDeletarReserva");
const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";
const conteudoResultado = document.querySelector("#lista-eventos");
const inputIngresso = document.querySelector("#ingressos");

const retornarIngressos = async () => {
	const requestOptions = {
		method: "GET",
		redirect: "follow",
		headers: {
			"Content-type": "application/json;",
		},
	};

	const reservas = await (
		await fetch(`${BASE_URL}/bookings/event/${idEvento}`, requestOptions)
	).json();

	reservas.forEach((evento) => {
		ingressosTotal = evento.event.number_tickets;
	});
};

formDeletarReserva.onsubmit = async (event) => {
	try {
		event.preventDefault();

		const requestOptionsGet = {
			method: "GET",
			redirect: "follow",
			headers: {
				"Content-type": "application/json;",
			},
		};

		const reserva = await (
			await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptionsGet)
		).json();
		const ingressosDisponiveis = reserva.number_tickets + ingressosTotal;

		const requestOptions = {
			method: "DELETE",
			redirect: "follow",
			headers: {
				"Content-type": "application/json;",
			},
		};

		await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptions);

		const data = {
			name: reserva.event.name,
			poster: reserva.event.poster,
			attractions: reserva.event.attractions,
			description: reserva.event.description,
			scheduled: reserva.event.scheduled,
			number_tickets: Number(ingressosDisponiveis),
		};

		const options = {
			method: "PUT",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};
		const requisicao = await fetch(`${BASE_URL}/events/${idEvento}`, options);
		const conteudorequisicao = await requisicao.json(data);

		alert("Evento excluído com sucesso!");
		location.replace(document.referrer);
	} catch {
		alert("ID Não encontrado!");
	}
};

const exibirReserva = async () => {
	try {
		const requestOptionsGet = {
			method: "GET",
			redirect: "follow",
			headers: {
				"Content-type": "application/json;",
			},
		};

		const reserva = await (
			await fetch(`${BASE_URL}/bookings/${idReserva}`, requestOptionsGet)
		).json();

		document.querySelector("#nome").value = reserva.owner_name;
		document.querySelector("#email").value = reserva.owner_email;
		document.querySelector("#ingressos").value = reserva.number_tickets;
	} catch {
		alert("ID Não encontrado!");
	}
};

retornarIngressos();
exibirReserva();