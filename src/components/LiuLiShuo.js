import React, {Component} from 'react';
const recorder = window.llsRecorder;
let audioBlob;

const QUESTIONS = [{
  type: 'readaloud',
  reftext: 'I love you.'
}];

class LiuLishuo extends Component {
  constructor() {
    super();

    this.state = {
        questionIndex: 0,
        reupload: false,
        secret: "b01b17",
        appId: "shanghaitech3"
    };
  }

  handleInitApi = () => {
    const {secret, appId} = this.state;
    recorder.init({
      secret,
      appId
    });
  }

  handleStartRecord = () => {
    recorder.startRecord({
      question: QUESTIONS[this.state.questionIndex],
      getResult: this.handleGetResult,
      getAudio: this.handleGetAudio
    });

    this.setState({
      result: null,
      audioUrl: null
    });
  }

  handleStopRecord = () => {
    recorder.stopRecord();
  }

  handleGetAudio = audio => {
    if (!this.state.reupload) {
      audioBlob = audio;
    }

    const audioUrl = window.URL.createObjectURL(audio);
    this.setState({
      audioUrl
    });
  }

  handleGetResult = result => {
    this.setState({
      result
    }, ()=>{this.props.addResult(this.state.result);
           });

    this.setState({
      reupload: true
    });
  }

  handleSwitchQuestion = () => {
    this.setState({
      questionIndex: (this.state.questionIndex + 1) % 2
    });
  }

  handleReupload = () => {
    this.setState({
      result: null,
      reupload: false
    });

    recorder.reupload({
      audioBlob,
      getResult: this.handleGetResult,
      question: QUESTIONS[this.state.questionIndex]
    });
  }

  renderAudio() {
    if (this.state.audioUrl) {
      return (
        <div>
          <a href={this.state.audioUrl} download="record.wav">Her voice</a>
          <audio controls src={this.state.audioUrl}/>
        </div>
      );
    }
  }

  renderResult() {
      if (this.state.result) {
      return (
        <div>
          <h3>Result</h3>
        </div>
      );
    }
  }

    render() {

        let qType = QUESTIONS[this.state.questionIndex].type;
        let qText = QUESTIONS[this.state.questionIndex].reftext;
    return (
      <div className="native-apis-list">
        <button
          className="api-test-btn btn btn-primary"
          onClick={this.handleInitApi}
          >
          init
        </button>
        <button
          className="api-test-btn btn btn-success"
          onClick={this.handleStartRecord}
          >
          Start Record
        </button>
        <button
          className="api-test-btn btn btn-danger"
          onClick={this.handleStopRecord}
          >
          Stop Record
        </button>
        {this.renderResult()}
        {this.renderAudio()}
        <pre>{qType.charAt(0).toUpperCase() + qType.slice(1)}: {qText} </pre>
      </div>
    );
  }
}

export default LiuLishuo;
