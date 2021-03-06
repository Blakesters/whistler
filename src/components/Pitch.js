import React, { Component } from 'react';
import {connect} from 'react-redux';
import './css/pitch.css';

export class Pitch extends Component {
	render() {
		return (
			<p className="pitch">{this.props.pitch}</p>
		);
	}
}

Pitch.defaultProps = ({
	pitch: '0'
});

const mapStateToProps = state => ({
	pitch: state.notator.pitch
});

export default connect(mapStateToProps)(Pitch);