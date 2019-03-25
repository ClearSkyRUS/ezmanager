import { ProductsApi } from 'utils/api'


const ProductsActions = {
	setProducts: (products) => ({
		type: 'SET_PRODUCTS',
		payload: products
	}),
	removeProduct: (id) => ({
		type: 'REMOVE_PRODUCT',
		payload: id
	}),
	addProduct: (product) => ({
		type: 'ADD_PRODUCT',
		payload: product
	}),
	upProduct: (product) => ({
		type: 'CHANGE_PRODUCT',
		payload: product
	}),
	fetchAddProduct: product => dispatch => {
		dispatch(ProductsActions.addProduct(product));
    	ProductsApi.add(product);
    },
    fetchUpProduct: (product, id) => dispatch => {
		dispatch(ProductsActions.upProduct(product));
    	ProductsApi.up(product);
    },
	fetchRemoveProduct: id => dispatch => {
	    if (global.confirm('Вы действительно хотите удалить?')) {
	      	dispatch(ProductsActions.removeProduct(id));
	      	ProductsApi.remove(id);
	    }
  	},
  	fetchProducts: () => dispatch => {
    	ProductsApi.get().then(({ data }) => {
      		dispatch(ProductsActions.setProducts(data));
    	});
  	},
};


export default ProductsActions;