import { ClientsApi } from 'utils/api'

const ClientsActions = {
	setClients: (Clients) => ({
		type: 'SET_CLIENTS',
		payload: Clients
	}),
	removeClient: (id) => ({
		type: 'REMOVE_CLIENT',
		payload: id
	}),
	addClient: (Client) => ({
		type: 'ADD_CLIENT',
		payload: Client
	}),
	upClient: (Client) => ({
		type: 'CHANGE_CLIENT',
		payload: Client
	}),
	fetchAddClient: Client => dispatch => {
		dispatch(ClientsActions.addClient(Client));
    	ClientsApi.add(Client);
    },
    fetchUpClient: (Client, id) => dispatch => {
		dispatch(ClientsActions.upClient(Client));
    	ClientsApi.up(Client);
    },
	fetchRemoveClient: id => dispatch => {
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(ClientsActions.removeClient(id));
	      	ClientsApi.remove(id);
	    }
  	},
  	fetchClients: () => dispatch => {
    	ClientsApi.get().then(({ data }) => {
      		dispatch(ClientsActions.setClients(data));
    	});
  	},
};


export default ClientsActions;