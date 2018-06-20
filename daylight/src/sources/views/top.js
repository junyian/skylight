import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config() {
		var menu_data_multi = [
			//{
			//	id: "upload", icon: "upload", value: "Upload data", data: [
			//		{ id: "uploadxdb", value: "Upload XDB", href: "#!/top/uploadxdb" }]
			//},
			{ id:"designer", icon:"puzzle-piece", value:"Designer"}];
		var ui = {
			rows: [
				{
					view: "toolbar", padding: 3, elements: [
						{
							view: "button", type: "icon", icon: "bars", width: 37, align: "left", css: "app_button",
							click: function () {
								$$("top:sidebar").toggle();
							}
						},
						{ view: "label", label: this.app.config.name }
					]
				},
				{
					cols: [
						{
							view: "sidebar", id:"top:sidebar", width: 300, data: menu_data_multi, on: {
								onAfterSelect: function (id) {
									//webix.message("Selected: " + this.getItem(id).value);
									this.$scope.show("./" + id);
								}
							}
						},
						{ $subview: true }
					]
				}
			]
		};


		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:sidebar");
	}
}