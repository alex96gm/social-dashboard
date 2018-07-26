
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    email: {
        type: String,
      required: 'Email is required',
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      unique: true
    },
    password: {
      type: String,
      required: 'Password is required',
    },
    country: {
        type: String,
    },
    display_name: {
        type: String,
    },
    user_url:{ 
        type: String,
    },
    followers: {
        type: String,
    },
    id_spotify: {
        type: String,
    },
    user_name: {
        type: String,
    },
    images: {
        type: Array
    },
    product: {
        type: String
    },
    type: {
        type: String
    },
    uri: {
        type: String
    },
    accessToken:{
        type: String
    },
    refreshToken:{
        type: String
    }   
  });

module.exports = mongoose.model('User', userSchema);

// {
//     "birthdate": "1937-06-01",
//     "country": "SE",
//     "display_name": "JM Wizzler",
//     "email": "email@example.com",
//     "external_urls": {
//       "spotify": "https://open.spotify.com/user/wizzler"
//     },
//     "followers" : {
//       "href" : null,
//       "total" : 3829
//     },
//     "href": "https://api.spotify.com/v1/users/wizzler",
//     "id": "wizzler",
//     "images": [
//       {
//         "height": null,
//         "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
//         "width": null
//       }
//     ],
//     "product": "premium",
//     "type": "user",
//     "uri": "spotify:user:wizzler"
//   }

// {
//       "album": {
//         "album_type": "ALBUM",
//         "artists": [
//           {
//             "external_urls": {
//               "spotify": "https://open.spotify.com/artist/0SfsnGyD8FpIN4U4WCkBZ5"
//             },
//             "href": "https://api.spotify.com/v1/artists/0SfsnGyD8FpIN4U4WCkBZ5",
//             "id": "0SfsnGyD8FpIN4U4WCkBZ5",
//             "name": "Armin van Buuren",
//             "type": "artist",
//             "uri": "spotify:artist:0SfsnGyD8FpIN4U4WCkBZ5"
//           }
//         ],
//         "external_urls": {
//           "spotify": "https://open.spotify.com/album/1WEVdCa5YAK8tep9xOs2hS"
//         },
//         "href": "https://api.spotify.com/v1/albums/1WEVdCa5YAK8tep9xOs2hS",
//         "id": "1WEVdCa5YAK8tep9xOs2hS",
//         "images": [
//           {
//             "height": 640,
//             "url": "https://i.scdn.co/image/56db51912e491140ec6351e499874239fef11cd9",
//             "width": 640
//           },
//           {
//             "height": 300,
//             "url": "https://i.scdn.co/image/19520da73e9285121333cab6807fcffe4f196077",
//             "width": 300
//           },
//           {
//             "height": 64,
//             "url": "https://i.scdn.co/image/7d8f75a28ca874969890e79292a19e59e4f03f13",
//             "width": 64
//           }
//         ],
//         "name": "The Best Of Armin Only",
//         "release_date": "2017-05-13",
//         "release_date_precision": "day",
//         "type": "album",
//         "uri": "spotify:album:1WEVdCa5YAK8tep9xOs2hS"
//       },
//       "artists": [
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/0SfsnGyD8FpIN4U4WCkBZ5"
//           },
//           "href": "https://api.spotify.com/v1/artists/0SfsnGyD8FpIN4U4WCkBZ5",
//           "id": "0SfsnGyD8FpIN4U4WCkBZ5",
//           "name": "Armin van Buuren",
//           "type": "artist",
//           "uri": "spotify:artist:0SfsnGyD8FpIN4U4WCkBZ5"
//         },
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/5T8x61HRsjZo0CwH1rs6Kf"
//           },
//           "href": "https://api.spotify.com/v1/artists/5T8x61HRsjZo0CwH1rs6Kf",
//           "id": "5T8x61HRsjZo0CwH1rs6Kf",
//           "name": "Susana",
//           "type": "artist",
//           "uri": "spotify:artist:5T8x61HRsjZo0CwH1rs6Kf"
//         },
//         {
//           "external_urls": {
//             "spotify": "https://open.spotify.com/artist/478tAnskSff0wa0XxnpwmW"
//           },
//           "href": "https://api.spotify.com/v1/artists/478tAnskSff0wa0XxnpwmW",
//           "id": "478tAnskSff0wa0XxnpwmW",
//           "name": "Alex M.O.R.P.H.",
//           "type": "artist",
//           "uri": "spotify:artist:478tAnskSff0wa0XxnpwmW"
//         }
//       ],
//       "disc_number": 2,
//       "duration_ms": 239653,
//       "explicit": false,
//       "external_ids": {
//         "isrc": "NLF711002197"
//       },
//       "external_urls": {
//         "spotify": "https://open.spotify.com/track/5A5PfOuPQO2xlGTLMFgtZ0"
//       },
//       "href": "https://api.spotify.com/v1/tracks/5A5PfOuPQO2xlGTLMFgtZ0",
//       "id": "5A5PfOuPQO2xlGTLMFgtZ0",
//       "is_local": false,
//       "is_playable": true,
//       "name": "Shivers - Alex M.O.R.P.H. Red Light Dub",
//       "popularity": 37,
//       "preview_url": "https://p.scdn.co/mp3-preview/18d9a4d56b25fc91f574de30b9434166904053b6?cid=null",
//       "track_number": 14,
//       "type": "track",
//       "uri": "spotify:track:5A5PfOuPQO2xlGTLMFgtZ0"
//     }

