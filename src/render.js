import templateHTML from "./src/templates/main.html!text"
import chamberTemplate from "./src/templates/chamberTemplate.html!text"
import keyTemplate from "./src/templates/key.html!text"
import partyTable from "./src/templates/partyTable.html!text"
import analysis from "./src/templates/analysis.html!text"

import axios from 'axios'
import fs from 'fs'
import mustache from 'mustache'
import config from './../config.json'

import AWS from 'aws-sdk'

var s3 = new AWS.S3();
    var s3params = {
        ACL: "public-read",
        Body: 'test',
        Bucket: "gdn-cdn/2018/03/embed/italy",
        Key: 'widget.html',
        ContentType: "text/html"
    };

var partials = {
	chamber: chamberTemplate,
	key: keyTemplate,
	partyTable: partyTable,
	analysis : analysis
}


function mustachify(input) {
    var mustached = {}
	for (var i = 0; i < input.length; ++i)
	{
		mustached[input[i].id] = input[i].text;
	}
    return mustached;
}

export async function render() {
	var data = (await(axios.get(config.docDataUrl))).data.sheets;
	data.mustacheCopy = mustachify(data.copy);
	var outputhtml = mustache.render(templateHTML,data,partials);
	// s3.putObject(s3params, function(err, data) {
	// 	if (err) console.log(err, err.stack); 
	// 	else     console.log(data);
	// });
    return outputhtml;
}