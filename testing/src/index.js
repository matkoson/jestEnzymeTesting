import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import {createStore} from "redux";
import reducers from "reducers";
import Root from "Root";

import App from "components/App";

ReactDOM.render(
	<Root> 
		<BrowserRouter>
			<Route path="/" component={App} />
		</BrowserRouter>
	</Root>,
	document.querySelector(".root")
);
