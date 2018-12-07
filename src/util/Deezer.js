const app_id = 315924;
const secret_key = '134ec8012ab13d2968f70f79a942e79d';
const app_name = 'jammming';
const redirect_uri = 'http://www.jamaraimfedming.surge.sh';
const perms = 'basic_access,manage_library,delete_library,offline_access';
const deezerUrl = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/';
let accessToken;
let userId;
let expires;
let newPlayListId;

function appInit(){
    console.log('appinit');
    Deezer.getAccessToken();

    if(accessToken){
        Deezer.getUserID();

    }
}

const Deezer = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
  }
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresMatch = window.location.href.match(/expires=([^&]*)/);
  if(accessTokenMatch){
           accessToken = accessTokenMatch[1];
           expires = expiresMatch[1];
            return accessToken;
        } else {
            const accessUrl = `https://connect.deezer.com/oauth/auth.php?app_id=${app_id}&redirect_uri=${redirect_uri}&perms=${perms}&response_type=token`;
            window.location = accessUrl;
        }
},

search(term){
      return fetch(deezerUrl + 'search?limit=8&q='+term).then( response => {
           return response.json();
       }).then( data => {
           if(data.length === 0){
               return [];
           }else{
              return data;
           }
       })
   },

   savePlaylist(plName, plTracks){
        if(( plName !== "") || (plName !== undefined) && (plTracks !== undefined) || (plTracks.length !== 0) ){
            let _accessToken = Deezer.getAccessToken();
            console.log('sp ' + _accessToken);
            let _userId = Deezer.getUserID();
           console.log('un ' + _userId);
            // create  a playList

           //check the playListName does not already exist, if yes return id, if no create
           fetch(deezerUrl + 'user/'+ _userId + '/playlists/' + '&access_token=' + accessToken).then(response => response.json() ).then(
               data => {
                   console.log('fetch1');
                    if(data.length > 0 ){
                        //use some to test for first truthy, return boolean
                       for (var i=0; i<= data.length; i++){
                           if(data[i].title === plName){
                            newPlayListId = data[i].id;
                            console.log('npid '+newPlayListId);
                            break;
                           }
                       }
                    }

                    return data;
               }
           ).then( () => {
                 if(newPlayListId === undefined){
                    fetch(deezerUrl + 'user/'+ _userId + '/playlists?&request_method=POST' + '&access_token=' + accessToken + '&title=' + plName).then( response => {
                        return response.json();
                    }).then(data => {
                        console.log('fetch2');
                        newPlayListId = data.id;
                        console.log('npid2 '+newPlayListId);
                        return data.id;
                    }).then( () => {

                //add tracks to the playlist
                    let trackIdsAsString = plTracks.join();
                    console.log('tid 3' +trackIdsAsString);
                     console.log('plid 3' +newPlayListId);

                    fetch(deezerUrl + 'playlist/'+ newPlayListId + '/tracks?&access_token=' + accessToken + '&request_method=POST&songs=' + trackIdsAsString).then( response => {
                        return response.json();
                    }).then(data => {
                         console.log('fetch3');
                        return data;
                    });
                });
                }
           });

        }
    },

    getUserID(){
        if(!userId){
            fetch(deezerUrl+ 'user/me' + '&access_token=' + accessToken).then(response => {
                return response.json();
            }).then( data => {
                if(data.length === 0){
                    return undefined;
                }else{
                   userId = data.id;
                   return userId;
                }
            });
        }else{
            return userId;
        }

    }

}

appInit();

export default Deezer
