import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);

    this.renderAction = this.renderAction.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction(isRemoval) {
    if (isRemoval) {
      return <input onClick={this.removeTrack}></input>;
    }
    return <input onClick={this.addTrack}></input>;
  }

  render() {
    return(
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.name}</h3>
    <p>{this.props.track.artist} | {this.props.track.album}</p>
  </div>
  <a className="Track-action">{this.renderAction(this.props.track.isRemoval)}</a>
</div>
    )

  }
}

export default Track
