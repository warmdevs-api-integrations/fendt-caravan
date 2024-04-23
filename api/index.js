const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


export default async (request, result) => {
  const { body } = request;

  try {
    let resultData = await lib.http.request['@1.1.7'].get({
      url: `https://api.zipcodestack.com/v1/distance`,
      headers: {
        'apikey': `01HS1BJ74CVQY0XY5C5HV59NH2`,
        'Accept': `application/json`
      },
      queryParams: {
        'code': body.postcode,
        'compare': body.compare,
        'country': body.country,
        'unit': `km`
      }
    });

    const recivedData = resultData.data.results;

    if (Object.keys(recivedData).length > 0) {
      let key = Object.keys(recivedData).reduce((key, v) => recivedData[v] < recivedData[key] ? v : key);
      return new Response(key);
    } else {
      return new Response('');
    }
  } catch (error) {
    return new Response('NOT FOUND')
  }
}
