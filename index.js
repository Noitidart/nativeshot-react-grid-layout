var PureRenderMixin = React.addons.PureRenderMixin;
var WidthProvider = ReactGridLayout.WidthProvider;
var Responsive = ReactGridLayout.Responsive;
var ResponsiveReactGridLayout = WidthProvider(Responsive);

var BasicLayout = React.createClass({
	render() {
		// layout is an array of objects, see the demo for more complete usage
		var layouts = {
			lg: [
				{i:'a', x:0, y:0, w:1, h:2, static:true},
				{i:'b', x:1, y:0, w:3, h:2, minW:2, maxW:4},
				{i:'c', x:4, y:0, w:1, h:2}
			]
		};

		var cChildren = [
			React.createElement('div', { key:'a' }, 'a'),
			React.createElement('div', { key:'b' }, 'b'),
			React.createElement('div', { key:'c' }, 'c')
		];

		return(
			React.createElement(ResponsiveReactGridLayout, { isDraggable:false, isResizable:false, layouts, rowHeight:30, breakpoints:{lg:1200, md:996, sm:768, xs:480, xxs:0}, cols:{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2} },
				cChildren
			)
		);
	}
});

window.addEventListener('DOMContentLoaded', function() {
	var izotopes = React.createElement(BasicLayout);

	ReactDOM.render(
		izotopes,
		document.getElementById('izotopes_wrap')
	);
}, false);