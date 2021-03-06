import React, { Component } from 'react';
import { connect } from 'react-redux';
import ABCJS from 'abcjs/midi';
import AudioButton from './AudioButton';
import ClefButton from './ClefButton';
import TimeSignatureButton from './TimeSignatureButton'
import { saveUserNotation } from '../actions/users';
import { saveDemoNotation } from '../actions/index';
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import './css/SheetMusic.css';

export class SheetMusic extends Component {

	saveNotation(e) {
		e.preventDefault();
		let titleText;
		let title = prompt('What would you like to title your composition?');
		if (title === null || title === '') {
			titleText = 'Composition';
		}
		else {
			titleText = title;
		}

		let date = new Date();
    	let dateString = date.toString();
    	let truncatedDateString = dateString.substring(0, dateString.length - 36);

    	let justNotationString = this.props.sheetMusic.substring(this.props.sheetMusic.indexOf('|') + 1);

    	justNotationString = `|${justNotationString}|`;

    	if (this.props.demo === true) {

    		let demoPiece = {
    			title: titleText,
				music: justNotationString,
				clef: this.props.clef,
				timeSignature: this.props.timeSignature,
				baseNoteValue: this.props.baseNoteValue,
				key: this.props.key
    		}
    		this.props.dispatch(saveDemoNotation(demoPiece));
    	}

    	else {
			const userInfoWithNotationString = {
				username: this.props.currentUser.username,
				title: titleText,
				music: justNotationString,
				clef: this.props.clef,
				timeSignature: this.props.timeSignature,
				baseNoteValue: this.props.baseNoteValue,
				key: this.props.key,
				creation: truncatedDateString
			}
			this.props.dispatch(saveUserNotation(userInfoWithNotationString));
		}
	}

 	componentDidMount() {

 		const abcDiv = document.querySelector('.sheetMusicDiv > .sheetMusic');

 		ABCJS.renderAbc(abcDiv, this.props.sheetMusic, {
 			responsive: 'resize'
		});
		if (ABCJS.midi.deviceSupportsMidi() && this.props.writtenNotes !== undefined && this.props.writtenNotes.length > 1) {
			let abcString = this.props.sheetMusic;
		   const abcMidiDiv = document.querySelector('.sheetMusicDiv > .sheetMusicMidi');
			ABCJS.renderMidi(abcMidiDiv, abcString, { 
				generateDownload: true, 
				generateInline: true,
				responsive: 'resize'
			});
		}
		// remove the download/playback
		else {
		   let abcString = this.props.sheetMusic;
		   const abcMidiDiv = document.querySelector('.sheetMusicDiv > .sheetMusicMidi');
		   ABCJS.renderMidi(abcMidiDiv, abcString, { 
			   generateDownload: false, 
			   generateInline: false
		   });
		}
 	}

 	componentDidUpdate() {

 		const abcDiv = document.querySelector('.sheetMusicDiv > .sheetMusic');

 		ABCJS.renderAbc(abcDiv, this.props.sheetMusic, {
 			responsive: 'resize'
 		});


 		if (ABCJS.midi.deviceSupportsMidi() && this.props.writtenNotes !== undefined && this.props.writtenNotes.length > 1) {
 			let abcString = this.props.sheetMusic;
			const abcMidiDiv = document.querySelector('.sheetMusicDiv > .sheetMusicMidi');
 			ABCJS.renderMidi(abcMidiDiv, abcString, { 
 				generateDownload: true, 
 				generateInline: true,
 				responsive: 'resize'
 			});
		 }
		 // remove the download/playback
		 else {
			let abcString = this.props.sheetMusic;
			const abcMidiDiv = document.querySelector('.sheetMusicDiv > .sheetMusicMidi');
			ABCJS.renderMidi(abcMidiDiv, abcString, { 
				generateDownload: false, 
				generateInline: false
			});
		 }
	 }
		
	render() {
		if (this.props.writtenNotes.length > 1 && this.props.authToken !== null) {
			return (<div className="sheetMusicDiv">
						<button className="save-link" onClick={(e) => this.saveNotation(e)}>Save</button>
						<div className="sheetMusic"></div>
						<div className="sheetMusicMidi"></div>
					</div>)
		}
		else if (this.props.writtenNotes.length > 1 && this.props.demo === true) {
			return (<div className="sheetMusicDiv">
						<button className="save-link" onClick={(e) => this.saveNotation(e)}>Save</button>
						<div className="sheetMusic"></div>
						<div className="sheetMusicMidi"></div>
					</div>)
		}
		else {
			return (<div className="sheetMusicDiv">
						<div className="control-buttons-div">
							<AudioButton />
							<ClefButton />
							<TimeSignatureButton />
						</div>
						<div className="sheetMusic"></div>
						<div className="sheetMusicMidi"></div>
					</div>)
		}
	}
}

const mapStateToProps = state => ({
	sheetMusic: state.notator.sheetMusic,
	keyCode: state.notator.keyCode,
	augmentationDotPressed: state.notator.augmentationDotPressed,
	writtenNotes: state.notator.writtenNotes,
	sixteenthNoteCount: state.notator.sixteenthNoteCount,
	clef: state.notator.clef,
	timeSignature: state.notator.timeSignature,
	baseNoteValue: state.notator.baseNoteValue,
	keySignature: state.notator.keySignature,
	authToken: state.auth.authToken,
	currentUser: state.auth.currentUser,
	demo: state.auth.demo
});

export default connect(mapStateToProps)(SheetMusic);
