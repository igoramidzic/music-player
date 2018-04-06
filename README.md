# MusicPlayer

A simple music player web application using Spotify API.

## My progress

#### Done:
    - Created home page.
    - Connected Spotify API.
    - Authenticate user with Spotify & pull user data.

#### In Progress:
    - Connect Spotify PlaybackSDK to allow user to play music from his or her Spotify account, or control music on other apps

## Install

`npm install`


## Spotify Developer Credentials

Add Spotify developer credentials to the express server

#### option 1 (recommended)

1. create a `.env` file in root folder
2. add:
    ```
    REDIRECT_URI="http://localhost:3000/api/callback"
    CLIENT_ID="your_spotify_client_id"
    CLIENT_SECRET="your_spotify_client_secred"
    PORT=3000
    ```
  
### OR

#### option 2

1. Add client_id & client_secret in `/server.js`
2. update:
    ```
    let client_id = process.env.CLIENT_ID || 'your_spotify_client_id'; // Your client id
    let client_secret = process.env.CLIENT_SECRET || 'your_spotify_client_secred'; // Your secret
    let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback'; // Your redirect uri
    ```


## Spotify Developer Redirect URIs

You must add the `redirect_uri` url to your Spotify Developer Application settings

1. https://beta.developer.spotify.com/dashboard/applications
2. Choose your application
3. Edit settings
4. Under Redirect URIs, add your `redirect_uri` from /server.js or .env

   
## Run server

`node server`
