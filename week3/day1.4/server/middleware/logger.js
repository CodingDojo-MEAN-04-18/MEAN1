const color = require('colors');
/**
* Create middleware that reports information about the incoming http request
* Certain elements will be objects(body), display the key value pairs
* Items to report iff they have value, use colors (an external module):
*                 method
*                 hostname
*                 ip
*                 body
*                 cookies
*                 parameters
*                 protocol
*                 route
*                 path
*/

module.exports = function(request, response, next) {
  console.log('logger middleware');

  // if (request.method) {
  //   console.log(request.method);
  // }
  //
  // if (request.hostname) {
  //   console.log(request.hostname);
  // }
  //
  // if (request.body) {
  //   console.log(request.body);
  // }

  const keys = ['method', 'hostname', 'ip', 'body', 'cookies', 'parameters', 'path', 'protocol', 'route'];

  keys.forEach(key => {
    const data = request[key];

    if (data) {
      if (typeof data === 'object') {
        // object based things'=
        if (Object.keys(data).length) {
          console.log(color.red(`The request ${key} object has these properties: `));

          // for (const prop in data) {
          //   console.log(color.blue(`\t${prop} => ${ data[prop] }`));
          // }

          for (const [k, v] of Object.entries(data)) {
            console.log(color.blue(`\t${ k } => ${ v }`));
          }
        }
      } else {
        console.log(color.gray(`The request ${ key } is ${ data }`));
      }
    }
  });

  next();
};
