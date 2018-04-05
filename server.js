let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library
let querystring = require('querystring');

let client_id = 'a588c1b7c268458f8894cc0c64c0539a'; // Your client id
let client_secret = 'ac7422aa85dc41a09b4fab5418ee079c'; // Your secret
let redirect_uri = 'http://localhost:3000/api/callback'; // Your redirect uri

let port = process.env.PORT || 3000;

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/dist'));

app.get('/api/login', function(req, res) {
  // your application requests authorization
  let scope = 'user-read-private user-read-birthdate user-read-email playlist-read-private user-library-modify playlist-read-collaborative playlist-modify-private user-follow-modify user-read-currently-playing user-read-recently-played user-library-read user-top-read playlist-modify-public user-follow-read user-read-playback-state user-modify-playback-state';
  console.log("Hello");
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri
    }));
});

app.get('/api/callback', function(req, res) {

  let code = req.query.code || null;

  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    console.log(body);
    if (!error && response.statusCode === 200) {

      let access_token = body.access_token,
        refresh_token = body.refresh_token;

      let options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, function(error, response, body) {
        console.log(body);
      });

      // we can also pass the token to the browser to make requests from there
      res.redirect('/?' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } else {
      res.redirect('/?' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log(`Listening on ${port}`);
app.listen(port);

// let express = require('express'); // Express web server framework
// let request = require('request'); // "Request" library
// let querystring = require('querystring');
// let cookieParser = require('cookie-parser');
//
// let client_id = 'a588c1b7c268458f8894cc0c64c0539a'; // Your client id
// let client_secret = 'ac7422aa85dc41a09b4fab5418ee079c'; // Your secret
// let redirect_uri = 'http://localhost:3000/api/callback'; // Your redirect uri
//
// let app = express();
//
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
//
// app.use(express.static(__dirname + '/dist'));
//
// app.get('/api/login', (req, res) => {
//   let scope = 'user-read-private user-read-birthdate user-read-email playlist-read-private user-library-modify playlist-read-collaborative playlist-modify-private user-follow-modify user-read-currently-playing user-read-recently-played user-library-read user-top-read playlist-modify-public user-follow-read user-read-playback-state user-modify-playback-state';
//
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri
//     }));
// });
//
// app.get('/api/callback', (req, res) => {
//
//   // let code = null;
//   //
//   // let authOptions = {
//   //   url: 'https://accounts.spotify.com/api/token',
//   //   form: {
//   //     code: code,
//   //     redirect_uri: redirect_uri,
//   //     grant_type: 'authorization_code'
//   //   },
//   //   headers: {
//   //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   //   },
//   //   json: true
//   // };
//   //
//   // request.post(authOptions, function(error, response, body) {
//   //   console.log(body);
//   //   if (!error && response.statusCode === 200) {
//   //
//   //     let access_token = body.access_token,
//   //       refresh_token = body.refresh_token;
//   //
//   //     let options = {
//   //       url: 'https://api.spotify.com/v1/me',
//   //       headers: { 'Authorization': 'Bearer ' + access_token },
//   //       json: true
//   //     };
//   //
//   //     // use the access token to access the Spotify Web API
//   //     request.get(options, function(error, response, body) {
//   //       console.log(body);
//   //     });
//   //
//   //   } else {
//   //     res.send(error);
//   //   }
//   // });
// });
//
// console.log('Listening on 3000');
// app.listen(3000);

//
// const express = require('express');
// const path = require('path');
// const http = require('http');
// const request = require('request');
// const bodyParser = require('body-parser');
//
// // const api = require('./server/routes/api');
// const client_id = 'a588c1b7c268458f8894cc0c64c0539a'; // Your client id
// const client_secret = 'ac7422aa85dc41a09b4fab5418ee079c';
// const redirect_uri = 'http://localhost:3000/callback';
//
// const app = express();
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//
//
// // app.use(express.static(path.join(__dirname, 'dist')));
//
// // app.use('/api', api);
//
// app.get('/login', (req, res) => {
//   let options = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: 'AQBeObIka5LjuVlXxi1B9dfp82udm7HWT_e6adMlk2-YBXXlSxy3dPsvPcbwR1K_JWsQZ-elJ6_k9AvFUsNxqfgMJGrZ9P4AOjUkSYgrzybwzB5PVsT1dkiz4fFwBsXUUMImKVQJRdBV3Bs7FBc5m47Egv6Jnwnz_j21cyzJM_7-rhE3ln9YKelKyyBEDkMWN7il3nIndo2aXrUNtYOnys7jQaeZ9ji4-xVNWC0mREi7CrYTh_dBB0J1yI4Tm7mjDRE0OYPG6IEmx8sSQe54S_wLQgyJWKEaiQ_2A_PRGqeycSqB95IH4bipG-BWjbdBt3SgW1_SnK_bk6rxStlMjWKTsgwDp2rzcBGZpZyQrwrnLv5KhybXBOWD53opiYO_ZxD1TDFTTPdmI5WrTcp70TbMquW1Vi5qEUmr1wgURMcyMkAH3bQtT0zdzKj9Hj3l9hQ5i8Cq1JgRy_aaLZrAVK3_Bo6BI3xgP2bDJaXK_87u9A0P6ZW_MVc5k8L0JmGuuOUour-tI0JYQR4ArhuebM1vFWXpZc87GeytBmAkxkTmq-TlmgVXgLH6Ohdciq-6MJgoL5wZa0rqhnj6hS3ZjZgea6YersL5CIrsI2iYKkovBJeklxEScMfLaxT7GtwLyzm5kVCKvVITxetIy_w45yMhad6u',
//       redirect_uri: redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     json: true
//   };
//   request.post(options, (error, res, body) => {
//     console.log(body);
//   })
// });
//
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });
//
// const port = process.env.PORT || '3000';
// app.set('port', port);
//
// const server = http.createServer(app);
//
// server.listen(port, () => console.log(`API running on localhost:${port}`));
