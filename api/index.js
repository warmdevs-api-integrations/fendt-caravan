const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


export default async (request, result) => {
  const { body } = request;
  let key;

  try {
    let resultData = await lib.http.request['@1.1.7'].get({
      url: `https://api.zipcodestack.com/v1/distance`,
      headers: {
        'apikey': '01HS1BJ74CVQY0XY5C5HV59NH2',
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
      key = Object.keys(recivedData).reduce((key, v) => recivedData[v] < recivedData[key] ? v : key);
    } else {
      key = '';
    }
  } catch (error) {
    return result.json('no key');
  }

  return result.json(key);
}
