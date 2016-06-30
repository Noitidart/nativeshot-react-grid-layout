var hydrant = {
	log: [{
		"category": "uploads_imgur",
		"n": "vQ4VQ4v",
		"x": "evOV8555YmTaNHY",
		"d": 2,
		"noWriteObj": {
			"src": "http://i.imgur.com/vQ4VQ4v.png"
		}
	}, {
		"category": "uploads_imguranon",
		"n": "7H0iz0I",
		"x": "jhxlcLtDMbdLoBH",
		"d": 3,
		"noWriteObj": {
			"src": "http://i.imgur.com/7H0iz0I.png"
		}
	}, {
		"category": "uploads_imgur",
		"n": "awwAepC",
		"x": "dhAtuittmBiBV0O",
		"d": 4,
		"noWriteObj": {
			"src": "http://i.imgur.com/awwAepC.png"
		}
	}, {
		"category": "uploads_imgur",
		"n": "XUFm2HH",
		"x": "2Ut1RwfTobzvqdQ",
		"d": 5,
		"noWriteObj": {
			"src": "http://i.imgur.com/XUFm2HH.png"
		}
	}, {
		"category": "uploads_imguranon",
		"n": "eDFg0n4",
		"x": "rnSbu8jI60q5eJC",
		"d": 6,
		"noWriteObj": {
			"src": "http://i.imgur.com/eDFg0n4.png"
		}
	}, {
		"category": "uploads_imgur",
		"n": "GxwEcxy",
		"x": "spb1x0NBL27pIB1",
		"d": 7,
		"noWriteObj": {
			"src": "http://i.imgur.com/GxwEcxy.png"
		}
	}, {
		"category": "uploads_imgur",
		"n": "tYXDHm1",
		"x": "209fv8VAxMhbkNO",
		"d": 8,
		"noWriteObj": {
			"src": "http://i.imgur.com/tYXDHm1.png"
		}
	}, {
		"category": "uploads_imgur",
		"n": "Klvzkpz",
		"x": "MiPMMq3skdrpaWS",
		"d": 10,
		"noWriteObj": {
			"src": "http://i.imgur.com/Klvzkpz.png"
		}
	}, {
		"category": "uploads_imgur",
		"n": "8uu9KJR",
		"x": "icES25ACihOntkp",
		"d": 11,
		"noWriteObj": {
			"src": "http://i.imgur.com/8uu9KJR.png"
		}
	}, {
		"category": "uploads_imguranon",
		"n": "FO3tzAI",
		"x": "6XV78vfE3itb85t",
		"d": 12,
		"noWriteObj": {
			"src": "http://i.imgur.com/FO3tzAI.png"
		}
	}],
	filters: ['all', 'noimgs', 'uploads', 'saved', 'social', 'social_twitter', 'social_facebbok', 'saved_disk', 'saved_quick', 'uploads_dropbox', 'uploads_imgur', 'uploads_imguranon']
};

// ACTIONS
const ADD_COUNTER = 'ADD_COUNTER';
const REMOVE_COUNTER = 'REMOVE_COUNTER';
const TRANSITION_COUNTER = 'TRANSITION_COUNTER';

const SET_FILTER = 'SET_FILTER';

// ACTION CREATORS
var next_counterid = 0;
function addCounter(transition, duration, end, mountval=50) {
	return {
		type: ADD_COUNTER,
		counterid: next_counterid++,
		transition,
		mountval,
		end,
		duration
	}
}

function removeCounter(counterid) {
	return {
		type: REMOVE_COUNTER,
		counterid
	}
}

function transCounter(counterid, end) {
	return {
		type: TRANSITION_COUNTER,
		counterid,
		end
	}
}

function setFilter(filter) {
	return {
		type: SET_FILTER,
		filter
	}
}
// REDUCERS
/* state shape
	const initialState = {
				counters: [
					{
						mountval - integer
						duration - integer(ms)
						end - integer
						transition - array of 4 or string linear/ease/ease-in/ease-out/ease-in-out
					}
				],
				filters: ['all', 'noimgs', 'uploads', 'saved', 'social', 'social_twitter', 'social_facebbok', 'saved_disk', 'saved_quick', 'uploads_dropbox', 'uploads_imgur', 'uploads_imguranon'],
				active_filter: enum filters,
				log: [
					{ filter:'uploads_dropbox' }
				]
			}
*/
function counters(state=[], action) {
	switch (action.type) {
		case ADD_COUNTER:
			var { transition, mountval, end, duration, counterid } = action;
			return [
				...state,
				{ transition, mountval, end, duration, counterid }
			];
		case REMOVE_COUNTER:
			return state.filter(counter => counter.counterid !== action.counterid);
		case TRANSITION_COUNTER:
			return state.map(counter => {
				if (counter.counterid === action.counterid) {
					return Object.assign({}, counter, {
						end: action.end
					});
				} else {
					return counter;
				}
			});
		default:
			return state;
	}
}

function log(state=hydrant.log, action) {
	switch (action.type) {
		default:
			return state;
	}
}

function filters(state=hydrant.filters, action) {
	switch (action.type) {
		default:
			return state;
	}
}

function active_filter(state='all', action) {
	switch (action.type) {
		case SET_FILTER:
			return action.filter;
		default:
			return state;
	}
}

const app = Redux.combineReducers({
	log,
	filters,
	active_filter
});
// STORE
var store;
// moved to startup

// REACT COMPONENTS - PRESENTATIONAL
var App = () => {
	return React.createElement('div', null,
		// React.createElement('div', undefined,
		// 	React.createElement('a', { href:'javascript:void(0)', onClick:function(){store.dispatch(addCounter([.68,-0.68,.58,1.72], 5000, 200))} }, 'Add Counter')
		// ),
		// React.createElement(CountersContainer),
		React.createElement(Header),
		React.createElement(BarsContainer),
		React.createElement(FiltersContainer),
		React.createElement(GalleryContainer)
	);
};

var Header = React.createClass({
	render: function() {
		return React.createElement('div', { className:'header' },
			React.createElement('h1', undefined,
				'Header'
			)
		)
	}
});

var Bars = React.createClass({
	render: function() {
		return React.createElement('div', { className:'bars' })
	}
});

var Filters = React.createClass({
	render: function() {
		var { filters, active_filter } = this.props; // redux

		return React.createElement('div', { className:'filters' },
			filters.map( filter => {
				if (active_filter == 'all') {
					if (filter.includes('_')) {
						return;
					}
				} else if (!active_filter.includes('_')) {
					if (filter != 'all' && !filter.startsWith(active_filter)) {
						return;
					}
				} else if (active_filter.includes('_')) {
					var group = active_filter.substr(0, active_filter.indexOf('_'));
					if (filter != 'all' && !filter.startsWith(group)) {
						return;
					}
				}
				if (filter == active_filter) {
					return React.createElement('span', { style:{fontWeight:'bold'} },
						filter
					)
				} else {
					return React.createElement('a', { href:'#', onClick:setFilterTo[filter] },
						filter
					)
				}
			})
		)
	}
});

var Gallery = React.createClass({
	componentDidMount: function() {
		this.recalcGridWidth();
		window.addEventListener('resize', this.recalcGridWidth, false);
	},
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.recalcGridWidth, false);
	},
	recalcGridWidth: function() {
		this.grid_width = ReactDOM.findDOMNode(this).offsetWidth;
		// console.log('this.grid_width:', this.grid_width);
	},
	getLayouts: function() {
		var { images, breakpoints, cols } = this.props;
		var ws = {lg:4, md:3, sm:3, xs:2, xxs:2};

		console.log({ images, cols, breakpoints });

		var layouts = {};
		for (var breakpoint in breakpoints) {
			layouts[breakpoint] = images.map( (image, i) => {
				var w = ws[breakpoint];
				var col = cols[breakpoint];
				var grid_width = breakpoints[breakpoint];

				// get height
				var h;
				switch (image.status) {
					case 'LOADED':
							// var actual_item_width = grid_width / w;
							// console.log('actual_item_width:', actual_item_width);
							var actual_width = Math.round((this.grid_width / col) * w);
							// console.log('actual_width:', actual_width);
							var scale_factor = actual_width / image.naturalWidth;
							console.log('scale_factor:', scale_factor);
							h = Math.round(image.naturalHeight * scale_factor);
						break;
					case 'LOADING':
							h = 150;
						break;
					default:
						h = 50;
				}

				return { x:i*w%col, y:Math.floor(i*w/col), w, h, i:image.d.toString() };
			} )
		}
		console.log('layouts:', layouts);

		return layouts;
	},
	getDefaultProps: function() {
		return {
			breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
			cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
			rowHeight: 1,
			margin: [0,0],
			isDraggable: false,
			isResizable: false
		}
	},
	// onWidthChange: function(aContainerWidth, aMargin, aCols) {
	// 	console.log('width change:', {aContainerWidth, aMargin, aCols});
	// 	// cant use this as it only triggers on breakpoint change - https://github.com/STRML/react-grid-layout/issues/276
	// },
	render: function() {
		var { images } = this.props;

		var attr = Object.assign({}, this.props, {
			layouts: this.getLayouts(),
			measureBeforeMount: false,
			useCSSTransforms: true
			// onWidthChange: this.onWidthChange
		});

		return React.createElement(ReactGridLayout.WidthProvider(ReactGridLayout.Responsive), attr,
			images.map(image => {

				var grid_item_content;
				switch (image.status) {
					case 'LOADED':
							grid_item_content = React.createElement('img', { src:image.noWriteObj.src });
						break;
					case 'LOADING':
							grid_item_content = Loading(); // React.createElement(Loading);
						break;
					default:
						grid_item_content = 'Unknown content for image status: ' + image.status;
				}

				return React.createElement('div', { key:image.d.toString() },
					// React.createElement('span', undefined,
					// 	image.d
					// )
					// React.createElement('img', { src:image.noWriteObj.src, style:{width:'100%'} })
					// React.createElement(Loading)
					grid_item_content
				)
			})
		);
	}
});

var Counters = React.createClass({
	remove: function(counterid) {
		store.dispatch(removeCounter(counterid));
	},
	trans: function(counterid, val) {
		store.dispatch(transCounter(counterid, val));
	},
	render: function() {
		var { counters } = this.props; // redux

		return React.createElement('ul', {  },
			counters.map(counter => {
				var { transition, duration, mountval, end, counterid } = counter;
				return React.createElement('li', { key:counterid },
					React.createElement('div', { style:{float:'right'} },
						React.createElement('a', { href:'javascript:void(0)', onClick:this.remove.bind(this, counterid) }, 'Remove'),
						' ',
						React.createElement('a', { href:'javascript:void(0)', onClick:this.trans.bind(this, counterid, 50) }, 'Trans 50'),
						' ',
						React.createElement('a', { href:'javascript:void(0)', onClick:this.trans.bind(this, counterid, 200) }, 'Trans 200'),
						' ',
						React.createElement('a', { href:'javascript:void(0)', onClick:this.trans.bind(this, counterid, 300) }, 'Trans 300'),
						' ',
						React.createElement('a', { href:'javascript:void(0)', onClick:this.trans.bind(this, counterid, 400) }, 'Trans 400')
					),
					React.createElement(CountTo, { transition, duration, mountval, end, counterid })
				);
			})
		);
	}
});

var Loading = () => React.createElement('div', { className:'uil-default-css', style:{transform:'scale(0.66)'} },
	[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map( deg => React.createElement('div', {style:{transform:'rotate('+deg+'deg) translate(0,-60px)'}}) )
);

// REACT COMPONENTS - CONTAINER
var CountersContainer = ReactRedux.connect(
	function mapStateToProps(state) {
		return {
			counters: state.counters
		}
	}
)(Counters);

var preload = {};
var GalleryContainer = ReactRedux.connect(
	function mapStateToProps(state) {
		var { active_filter, log } = state;

		var images;
		if (active_filter == 'all') {
			images = log;
		} else if (active_filter == 'noimgs') {
			images = [];
		} else {
			if (active_filter.includes('_')) {
				images = log.filter(entry => entry.category == active_filter);
			} else {
				images = log.filter(entry => entry.category.startsWith(active_filter+'_'));
			}
		}

		// preload the images
		images.forEach(image => {
			var preload_entry = preload[image.noWriteObj.src];
			if (preload_entry) {
				if (preload_entry.status == 'LOADED') {
					image.naturalHeight = preload_entry.img.naturalHeight;
					image.naturalWidth = preload_entry.img.naturalWidth;
				}
				console.log('preload_entry:', preload_entry);
			} else {
				preload[image.noWriteObj.src] = {};
				preload_entry = preload[image.noWriteObj.src];

				preload[image.noWriteObj.src].img = new Image();
				preload[image.noWriteObj.src].status = 'LOADING';
				preload[image.noWriteObj.src].img.onerror = function() {
					preload[image.noWriteObj.src].status = 'ERROR';
				};
				preload[image.noWriteObj.src].img.onabort = function() {
					preload[image.noWriteObj.src].status = 'ABORTED';
				};
				preload[image.noWriteObj.src].img.onload = function() {
					preload[image.noWriteObj.src].status = 'LOADED';
				};
				preload[image.noWriteObj.src].img.src = image.noWriteObj.src;
			}
			image.status = preload_entry.status;
		});

		return {
			images,
			items: images.length
		}
	}
)(Gallery);

var FiltersContainer = ReactRedux.connect(
	function mapStateToProps(state) {
		return {
			filters: state.filters,
			active_filter: state.active_filter
		}
	}
)(Filters);

var BarsContainer = ReactRedux.connect(
	function mapStateToProps(state) {
		return {
			active_filter: state.active_filter
		}
	}
)(Bars);

// startup
var setFilterTo = {};

window.addEventListener('DOMContentLoaded', function() {


	for (var filter of hydrant.filters) {
		setFilterTo[filter] = function(f, e) {
			e.preventDefault();
			e.stopPropagation();
			store.dispatch(setFilter(f));
		}.bind(null, filter);
	}

	// if (aArg.hydrant) {
	// 	// dont update hydrant if its undefined, otherwise it will screw up all default values for redux
	// 	hydrant = aArg.hydrant;
	// }

	hydrant.log.sort( (a,b) => a.d < b.d );

	store = Redux.createStore(app);

	// if (hydrant) {
	// 	store.subscribe(shouldUpdateHydrant);
	// }

	var unsubscribe = store.subscribe(() =>
		console.log(store.getState())
	);

	ReactDOM.render(
		React.createElement(ReactRedux.Provider, { store },
			React.createElement(App)
		),
		document.getElementById('root')
	);
}, false);
