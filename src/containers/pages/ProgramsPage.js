import ProgramsPage from 'components/pages/ProgramsPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgramsActions  from 'actions/programs';
import DaysActions from 'actions/days';
import DishsActions from 'actions/dishs';


class ProgramListContainer extends React.Component {
	render() {
		const { programs, dishs, days } = this.props;
		if (!programs){
			const { fetchPrograms } = this.props;
			fetchPrograms();
		}
		if (!days) {
			const { fetchDays } = this.props;
			fetchDays();
		}
		if (!dishs) {
			const { fetchDishs } = this.props;
			fetchDishs();
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

const mapStateToProps = ({ programs, dishs, days, filter }) => ({
  	programs: programs.items && sortBy(programs.items, filter ),
  	dishs: dishs.items,
  	days: days.items,
  	allPrograms: programs.items
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ProgramsActions, dispatch),
  ...bindActionCreators(DaysActions, dispatch),
  ...bindActionCreators(DishsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramListContainer);