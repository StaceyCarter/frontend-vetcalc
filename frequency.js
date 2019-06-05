import React from "react";

export default class Frequency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      freq: jinja.frequency
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const value = parseInt(evt.target.value);
    const newValue = Number.isNaN(value) ? "" : value;
    this.setState(
      {
        freq: newValue
      },
      () => this.props.setFrequency(this.state.freq)
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <label className="freq-label" for="frequency-drop">
            How often would you like to give it?
          </label>
        </div>
        <div className="row">
        <div className="col-2">
          <div className="form-inline" style={{ paddingTop: '9px' }}>
            
              <select
                className="form-control"
                value={this.state.freq}
                onChange={this.handleChange}
                id="frequency-drop"
              >
                <option value={24}>SID</option>
                <option value={12}>BID</option>
                <option value={8}>TID</option>
                <option value={6}>QID</option>
                <option value={48}>EOD</option>
                <option value={this.state.freq}>Custom</option>
              </select>
            </div>
          </div>
          <div className="col-10">
            <div className="form-inline">
              <span className="q-freq">q</span>
              <input
                className="form-control"
                type="number"
                id="frequency-hours"
                value={this.state.freq}
                onChange={this.handleChange}
              />
              <span className="q-freq">hrs </span>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
