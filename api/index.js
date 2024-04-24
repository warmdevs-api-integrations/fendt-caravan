const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


const handler = async (request, result) => {
  const { body } = request;
  let key;

  const queryParams = JSON.parse(body);

  try {
    let resultData = await lib.http.request['@1.1.7'].get({
      url: `https://api.zipcodestack.com/v1/distance`,
      headers: {
        'apikey': '01HS1BJ74CVQY0XY5C5HV59NH2',
        'Accept': `application/json`
      },
      queryParams: {
        'code': queryParams.postcode,
        'compare': queryParams.compare,
        'country': queryParams.country,
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


const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  return await fn(req, res)
}

module.exports = allowCors(handler)
