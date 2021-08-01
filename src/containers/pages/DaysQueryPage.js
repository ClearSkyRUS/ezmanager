import DaysQueryPage from 'components/pages/DaysQueryPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';

const ApiPath = 'daysquery';

class DayQueryContainer extends React.Component {
	render() {
		const { daysQuery } = this.props;
		if (!daysQuery) {
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <DaysQueryPage {...this.props} />
	}
}; 

const mapStateToProps = ({ daysQuery }) => ({
	daysQuery: daysQuery.items,
	ApiPath: ApiPath
});

 
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DayQueryContainer);