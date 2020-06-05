
const bizSdk = require('facebook-nodejs-business-sdk');
const Ad = bizSdk.Ad;
const AdAccount = bizSdk.AdAccount;
const Business = bizSdk.Business;
const Campaign = bizSdk.Campaign;
const accountId = 'act_242962135751624';
const accessToken = 'EAAD5a9nITfIBAKNqJv50wJpNs8Vs03eMJ4q5Btl9xCgUZCa5OHF3xazoGwBkcqlMmrQQvDDncGLUDSPxspUDNNAWY5vtzMsF5raD0sqBM7Uo0HAqWDBpuA9uYVYIGIrIhFeHMiZBKpkMkz1oGgkEgaH4qcpopYbT92O624S3XXOUI3URjuAPOb5IINddJt2oOQhoF1MgZDZD';

const api = bizSdk.FacebookAdsApi.init(accessToken);
// const account = new AdAccount('2905334616181016');
const showDebugingInfo = true;
if (showDebugingInfo) {
  api.setDebug(true);
}

const errorFunction = scenarioName => {
  let returnFunction = error => {
    console.log('An error occurred while processing, ' + scenarioName);
    console.log('Error Message:' + error);
    console.log('Error Stack:' + error.stack);
  };
  return returnFunction;
};

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  // console.log('Data:' + JSON.stringify(data));
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};


exports.getData = (req, res, next) => {
	let scene1 = "calling root node: " + req.params.rootid;
	let account = new AdAccount(req.params.rootid);
	let fields, params;
	fields = [
	  'name',
	];
	params = {
	};
	var sample_code = account.get(
	  fields,
	  params
	)
	.then(sample =>{
		logApiCallResult('sample_code api call complete.', sample._data);
		return res.json(sample._data);	
	})
	.catch(errorFunction(scene1)/*, res.sendStatus(404)*/);
}


// exports.