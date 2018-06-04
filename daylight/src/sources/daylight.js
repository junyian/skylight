import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class DaylightApp extends JetApp{
	constructor(config){
		const defaults = {
            id: APPNAME,
            name: "Daylight",
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/start"
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => new DaylightApp().render() );
}