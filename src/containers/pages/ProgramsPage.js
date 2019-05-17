import ProgramsPage from 'components/pages/ProgramsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';

const ApiPath = 'programs';

class ProgramListContainer extends React.Component {
	render() {
		const { programs } = this.props;
		if (!programs){
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <ProgramsPage {...this.props} />
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
		o.type.toLowerCase().indexOf(filter.serchQuery.toLowerCase()) >= 0,
	);
}

const mapStateToProps = ({ programs, filter }) => ({
  	programs: programs.items,
  	settings: programs.settings,
  	ApiPath: ApiPath
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramListContainer);