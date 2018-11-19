import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    searchResults: [
      {
         "name": "New Light",
         "artist": "John Mayer",
         "album": "New Light",
         "id": "NLJM"
      },
       {
         "name": "Only Man",
         "artist": "Audio Bullys",
         "album": "EP",
         "id": "OMAB"
       },
       {
         "name": "Heartland",
         "artist": "Tom Walker",
         "album": "Heartland",
         "id": "HTW"
       }],

   playlistName: "Zero",

   playlistTracks: [
       {
          "name": "Name Of The Game",
          "artist": "Hannah King",
          "album": "Stomp Clap",
          "id": "NOTGSC"
       },
        {
          "name": "Piece Of Me",
          "artist": "Britney Spears",
          "album": "Blackout",
          "id": "POMBS"
        },
        {
          "name": "Mil Pasos",
          "artist": "Soha",
          "album": "D'ici et d'ailleurs",
          "id": "MPS"
        }],

  }

this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);

  }

addTrack(track) {
  let tracks = this.state.playlistTracks;
  if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return tracks.push(track);
  this.setState({ playlistTracks: tracks });
}}

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    if(this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)) {
    this.setState({ playlistTracks: tracks });
  }}

updatePlaylistName(name) {
  this.setState({ playlistName: name });
}

savePlaylist() {
  const trackURIs = this.state.playlistTracks.map(track => track.uri);
}

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults onAdd={this.props.onAdd.addTrack} searchResults={this.state.searchResults}/>
      <Playlist
      onNameChange={this.state.updatePlaylistName}
      onRemove={this.props.onRemove.removeTrack}
      playlistName={this.state.playlistName}
      playlistTracks={this.state.playlistTracks}
      onSave={this.state.savePlaylist}
      />
    </div>
  </div>
</div>
      );
  }
}

export default App
