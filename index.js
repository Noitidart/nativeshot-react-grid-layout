// ACTIONS
const RESEED_LOG = 'RESEED_LOG';
const ADD_LOG_ENTRY = 'ADD_LOG_ENTRY';
const REMOVE_LOG_ENTRY = 'REMOVE_LOG_ENTRY';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const SHOW_TYPE = 'SHOW_TYPE';
const SHOW_ALL = 'SHOW_ALL';

// ACTION CREATORS

// REDUCERS
/*
const initialState = {
	visibilityFilter: SHOW_ALL,
	log: []
};
*/

const appGallery = Redux.combineReducers({
	visibilityFilter,
	log
});

// STORE
var store = Redux.createStore(todoApp);

var unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)

// REACT COMPONENTS - PRESENTATIONAL
var AppGallery = React.createClass({
	render() {
		return (
			React.createClass('div', { className:'gallery' },
				React.createClass(Summary),
				React.createClass(Filter),
				React.createClass(Gallery),
			)
		);
	}
});

var BasicLayout = React.createClass({
	getDefaultProps() {
		return {
			pGridProps: {
				isDraggable:false,
				isResizable:false,
				layouts,
				rowHeight:30,
				breakpoints:{ lg:1200, md:996, sm:768, xs:480, xxs:0 },
				cols:{ lg:5, md:4, sm:3, xs:2, xxs:1 }
			},
			pCats: { // categories with array of subcategories - each subcat must be unique, as it is used in pSubCatsNoAssocImg
				'Save': ['Browse', 'Quick'],
				'Upload': ['Imgur - Anonymous', 'Imgur', 'Dropbox', 'Google Drive'],
				'Text Recognition': ['GOCR', 'OCRAD', 'Tesseract'],
				'Share': ['Twitter'],
				'Search': ['Tineye', 'Google'],
				'Print': ['Print'],
				'Copy': ['Copy']
			},
			pSubCatsNoAssocImg: ['Copy', 'Print', 'GOCR', 'OCRAD', 'Tesseract', 'Tineye', 'Google'] // categories with no associated images
		}
	};
	render() {
		// layout is an array of objects, see the demo for more complete usage
		var {pGridProps, pCats, pSubCatsNoAssocImg} = this.props;

		var layouts = {
			lg: [
				{i:'a', x:0, y:0, w:1, h:1},
				{i:'b', x:1, y:0, w:1, h:1},
				{i:'c', x:4, y:0, w:1, h:1}
			]
		};

		var cChildren = [
			React.createElement('div', { key:'a' }, 'a'),
			React.createElement('div', { key:'b' }, 'b'),
			React.createElement('div', { key:'c' }, 'c')
		];

		return(
			React.createElement(ReactGridLayout.WidthProvider(ReactGridLayout.Responsive), pGridProps,
				cChildren
			)
		);
	}
});

// REACT COMPONENTS - CONTAINER

window.addEventListener('DOMContentLoaded', function() {

	ReactDOM.render(
		React.createElement(ReactRedux.Provider, { store },
			React.createElement(AppGallery)
		),
		document.getElementById('root')
	);

}, false);
