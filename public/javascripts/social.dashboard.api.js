

class SocialDashboardApi {
    constructor() {
      //this.API_URL = 'http://localhost:3000/api/';
      this.API_URL = 'https://social-dashboard.onrender.com/api/';
      this.api = axios.create({
        baseURL: this.API_URL
      });
      this.headers = {
        headers: {
          'Accept': 'application/json'
        }
      }
    }

    getStatsArtists() {
      return this.api.get('stats/top-artist-genres', this.headers)
      .then(response => {
          return Promise.resolve(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getStatsSongs() {
      return this.api.get('stats/top-songs', this.headers)
      .then(response => {
          return Promise.resolve(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getGlobalSongsData() {
      return this.api.get('stats/global-songs-albumes', this.headers)
      .then(response => {
          return Promise.resolve(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getGlobalSongsDataArtists() {
      return this.api.get('stats/global-songs-artists', this.headers)
      .then(response => {
          return Promise.resolve(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getGlobalArtistsGenres() {
      return this.api.get('stats/global-artists-genres', this.headers)
      .then(response => {
          return Promise.resolve(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }

}