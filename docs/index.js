import React from "react";
import ReactDOM from "react-dom";

import Trial from "./new/Trial";
import App from "./lib/App";
// import Chart from "./lib/charts/OHLCChartWithElderRayIndicator";

const ReadME = require("md/MAIN.md");

require("stylesheets/re-stock");

document.getElementById("content").innerHTML = ReadME;

if (!window.Modernizr.fetch || !window.Modernizr.promises) {
	require.ensure(["whatwg-fetch", "es6-promise"], function(require) {
		require("es6-promise");
		require("whatwg-fetch");
		loadPage();
	});
} else {
	loadPage();
}

function loadPage() {
		ReactDOM.render(<App />, document.getElementById("chart"));
		ReactDOM.render(<Trial />, document.getElementById("try"));
}
