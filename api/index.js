const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


export const GET = async (request, result) => {
  const patametersString = new URL(request.url).search;
  const paramEntries = new URLSearchParams(patametersString).entries();
  const params = Object.fromEntries(paramEntries);

  console.log(request.url);
  console.log(params);

  try {
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
      console.log('key --->', key);
      return new Request(key);
    } else {
      return new Request('');
    }
  } catch (error) {
    console.log(error);
    return new Request('NOT FOUND')
  }
}
