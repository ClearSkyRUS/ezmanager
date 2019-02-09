import ClientsPage from '../../components/pages/ClientsPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as setClients  from '../../actions/clients';

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

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);