import DishTypesPage from 'components/pages/DishTypesPage'

import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemsActions  from 'actions/items';

const ApiPath = 'dishTypes'

class DishTypesListContainer extends React.Component {
	render() {
		const { dishTypes } = this.props;
		if (!dishTypes) { 
			const { fetchItems } = this.props;
			fetchItems(ApiPath);
		}
		return <DishTypesPage {...this.props} />
	}

}


const mapStateToProps = ({ dishTypes}) => ({
  	dishTypes: dishTypes.items,
  	ApiPath: ApiPath
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(ItemsActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DishTypesListContainer);