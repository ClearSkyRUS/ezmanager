import ClientsPage from 'components/pages/ClientsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import setClients from 'actions/clients';

class ClientsListContainer extends React.Component {
	render() {
		const { clients } = this.props;
		if (!clients) {
			const { fetchClients } = this.props;
			fetchClients();
		}
		return <ClientsPage {...this.props} />
	}

}

const sortBy = (items, filter) => {
	if(filter.filterBy === 'Все')
		return sortBySerch(items, filter);

	return sortBySerch(items, filter).filter(
	o => 
		o.type === filter.filterBy
	);
}

const sortBySerch = (items, filter) => {
	return items.filter(
	o => 
		(o.name.toLowerCase().indexOf(filter.serchQuery.toLowerCase()) >= 0 ||
		o.key.toLowerCase().indexOf(filter.serchQuery.toLowerCase()) >= 0)
	);
}

const mapStateToProps = ({ clients, filter}) => ({
	clients: clients.items && sortBy(clients.items, filter ),
  	allClients: clients.items
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(setClients, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientsListContainer);
