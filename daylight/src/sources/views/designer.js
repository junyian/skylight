import { JetView } from "webix-jet";
import * as widgets from "./widgets";

webix.protoUI({
	name: "goldenlayout",
	$init: function () {
		this.$ready.push(this._init);
	},
	_init: function () {
		this.goldenlayout = new GoldenLayout(this.config.layout, this.$view);
		this.goldenlayout.init();
		this.addComponents();
	},
	addComponents: function () {
		this.goldenlayout.registerComponent('grid', widgets.gridComponent);

		this.goldenlayout.createDragSource($$("top:designer:list").getItemNode("top:designer:list:grid"),
			{ type: "component", componentName: "grid", title: "Grid" });

		this.goldenlayout.on('stackCreated', function (stack) {
			var cog = $('<li><i class="fa fa-cog"></i></li>');
			cog.on("click", function () {
				var title = prompt("please enter new name for widget:");
				if (title !== null && title !== "") {
					stack.getActiveContentItem().setTitle(title);
				}
			});
			stack.header.controlsContainer.prepend(cog);
		});
		return;
	},
	$setSize: function (x, y) {
		webix.ui.view.prototype.$setSize.call(this, x, y);
		if (this.goldenlayout && this.$height !== undefined && this.$width !== undefined) {
			this.goldenlayout.updateSize(x, y);
		}
		this.resize(); // ensures the window doesn't shrink each time a component is modified
	},
	defaults: {
		layout: { content: [] }
	}
}, webix.EventSystem, webix.ui.view);

export default class DesignerView extends JetView {
	config() {
		var list_data = [
			{ id:"top:designer:list:grid", icon:"table", value:"Grid" }
		];

		var ui = {
			id: "top:designer",
			cols: [
				{
					rows: [
						{ header: "Widgets", body: { view: "list", id: "top:designer:list", data: list_data, borderless: true, scroll: false } },
						{ view: "resizer" },
						{
							header: "Data tree",
							body: {
								view: "tree",
								autoheight: true,
								autowidth: true
							}
						}
				],
					gravity: 0.3
				},
				{ view: "resizer" },
				{ view: "goldenlayout", id: "top:designer:gl" }
			]
		};

		return ui;
	}
};
