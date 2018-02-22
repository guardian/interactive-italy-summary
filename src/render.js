import templateHTML from "./src/templates/main.html!text"
import chamberTemplate from "./src/templates/chamberTemplate.html!text"
import axios from 'axios'
import fs from 'fs'
import mustache from 'mustache'
import config from './../config.json'

var partials = {
	chamber: chamberTemplate
}

export async function render() {
	var data = (await(axios.get(config.docDataUrl))).data.sheets;
	
	var outputhtml = mustache.render(templateHTML,data,partials);
	console.log(data);
    return outputhtml;
}