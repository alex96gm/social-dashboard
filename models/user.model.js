
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
    birthdate: {
        type: String,
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

