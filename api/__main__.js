const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


export default async function (request, result) {

  const patametersString = new URL(request.url).search;
  const paramEntries = new URLSearchParams(patametersString).entries();
  const params = Object.fromEntries(paramEntries)

  let resultData = await lib.http.request['@1.1.7'].get({
    url: `https://api.zipcodestack.com/v1/distance`,
    headers: {
      'apikey': `01HS1BJ74CVQY0XY5C5HV59NH2`,
      'Accept': `application/json`
    },
    queryParams: {
      'code': `${params.postcode}`,
      'compare': `${params.compare}`,
      'country': `${params.country}`,
      'unit': `km`
    }
  });

  const recivedData = resultData.data.results;

  if (Object.keys(recivedData).length > 0) {
    let key = Object.keys(recivedData).reduce((key, v) => recivedData[v] < recivedData[key] ? v : key);
    return result.send(key);
  } else {
    return result.send('');
  }
}

