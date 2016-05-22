// INITIAL STATE SEEDS
var gILog; // async request sent to worker, and then on respond, it redux store is created, then react app

// var gLogTypesN2I = { // name to integer // crossfile-link110300043949 - i need to give each serviceName in gLogTypesN2I a title in app_main.properties, it should be in format `'title_' + serviceName`
var gSubcatDict = [ // manually maintain in sync with gLogTypesN2I crossfile-link110300043949
	'imguranon':		{ t:0,	cat:'upload', imgs:true  },
	'twitter':			{ t:1,	cat:'share',  imgs:true  },
	'copy':				{ t:2,	cat:'copy',   imgs:false },
	'print':			{ t:3,	cat:'print',  imgs:false },
	'save-quick':		{ t:4,	cat:'save',   imgs:true  },
	'save-browse':		{ t:5,	cat:'save',   imgs:true  },
	'tineye':			{ t:7,	cat:'search', imgs:false },
	'google-images':	{ t:8,	cat:'search', imgs:false },
	'dropbox':			{ t:9,	cat:'upload', imgs:true  },
	'imgur':			{ t:10,	cat:'upload', imgs:true  },
	'gdrive':			{ t:11,	cat:'upload', imgs:true  },
	'gocr':				{ t:12,	cat:'ocr',    imgs:false },
	'ocrad':			{ t:13,	cat:'ocr',    imgs:false },
	'tesseract':		{ t:14,	cat:'ocr',    imgs:false }
];

// ACTIONS
const RESEED_LOG = 'RESEED_LOG';
const ADD_LOG_ENTRY = 'ADD_LOG_ENTRY';
const REMOVE_LOG_ENTRY = 'REMOVE_LOG_ENTRY';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const SHOW_ALL = 'SHOW_ALL'; // filter value is this, else a string for type

// ACTION CREATORS
function addEntry(entry) {
	return {
		type: ADD_LOG_ENTRY,
		entry
	}
}
function removeEntry(entry) {
	return {
		type: REMOVE_LOG_ENTRY,
		entry
	}
}
function resetLog(log) {
	return {
		type: RESEED_LOG,
		log
	}
}

function setVisibilityFilter(alias) {
	return {
		type: SET_VISIBILITY_FILTER,
		alias
	}
}


// REDUCERS
/*
const initialState = {
	visibilityFilter: SHOW_ALL,
	log: [] // is sorted from lowest to highest dateid
};
*/

function log(state, action) {
	if (!state) {
		state = gILog;
		gILog = null;
	}
	switch (action.type) {
		case RESEED_LOG:

			var staten = []; // new state
			var l = state.length; // length old
			var ln = action.log.length; // length new

			var ids = []; // ids old
			for (var i=0; i<l; i++) {
				ids.push(state[i].)
			}
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			]

		case ADD_LOG_ENTRY:

			return state.map((todo) => {
				if (todo.id === action.id) {
					return Object.assign({}, todo, {
						completed: !todo.completed
					})
				}
				return todo
			})

		case REMOVE_LOG_ENTRY:

			return state.map((todo) => {
				if (todo.id === action.id) {
					return Object.assign({}, todo, {
						completed: !todo.completed
					})
				}
				return todo
			})

		default:

			return state
	}
}

function visibilityFilter(state = SHOW_ALL, action) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:

			return action.filter;

		default:

			return state
	}
}

const appGallery = Redux.combineReducers({
	visibilityFilter,
	log
});

// STORE
var store;

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

		// pCats
		var pCats = {};
		var l = gSubcatDict.length;
		for (var i=0; i<l; i++) {

		};

		// return
		return {
			pGridProps: {
				isDraggable:false,
				isResizable:false,
				layouts,
				rowHeight:30,
				breakpoints:{ lg:1200, md:996, sm:768, xs:480, xxs:0 },
				cols:{ lg:5, md:4, sm:3, xs:2, xxs:1 }
			},
			pCats,
			// pCats: { // categories with array of subcategories - each subcat must be unique, as it is used in pSubCatsNoAssocImg
			// 	'Save': ['Browse', 'Quick'],
			// 	'Upload': ['Imgur - Anonymous', 'Imgur', 'Dropbox', 'Google Drive'],
			// 	'Text Recognition': ['GOCR', 'OCRAD', 'Tesseract'],
			// 	'Share': ['Twitter'],
			// 	'Search': ['Tineye', 'Google'],
			// 	'Print': ['Print'],
			// 	'Copy': ['Copy']
			// },
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

	setTimeout(function() {

		iLog = [{"n":"Screenshot - May 22, 2016 2.06 AM.png","f":"C:\\Users\\Mercurius\\Pictures","d":1463908008081,"t":4},{"n":"Screenshot - May 22, 2016 2.06 AM - #2.png","f":"C:\\Users\\Mercurius\\Pictures","d":1463908017736,"t":4}];
		store = Redux.createStore(appGallery);

		ReactDOM.render(
			React.createElement(ReactRedux.Provider, { store },
				React.createElement(AppGallery)
			),
			document.getElementById('root')
		);
	}, 2000;

}, false);
