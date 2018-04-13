let express = require('express'); // Express web server framework
let request = require('request'); // "Request" library
let querystring = require('querystring');
require('dotenv').config();

let client_id = process.env.CLIENT_ID || '1234abcd'; // Your client id
let client_secret = process.env.CLIENT_SECRET || '1234abcd'; // Your secret
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/apicallback'; // Your redirect uri

let port = process.env.PORT || '3000';

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/dist'));

app.get('/api/login', function(req, res) {
  // your application requests authorization
  let scope = 'user-read-private streaming user-read-birthdate user-read-email playlist-read-private user-library-modify playlist-read-collaborative playlist-modify-private user-follow-modify user-read-currently-playing user-read-recently-played user-library-read user-top-read playlist-modify-public user-follow-read user-read-playback-state user-modify-playback-state';
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

app.get('*', function(req, res){
  res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port, () => console.log(`Listening to port ${port}`));
