// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBZATBii4tBWlsJ0r8lcBkhbFugFyfoHbg",
    authDomain: "music-player-3.firebaseapp.com",
    databaseURL: "https://music-player-3.firebaseio.com",
    projectId: "music-player-3",
    storageBucket: "",
    messagingSenderId: "729438783696"
  },
  spotify_client_id: 'a588c1b7c268458f8894cc0c64c0539a'
};
