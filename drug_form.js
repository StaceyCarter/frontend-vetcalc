import React from "react";


export default class LiqOrTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drugForm: "liq"
    };

    this.changeForm = this.changeForm.bind(this);
  }

  changeForm(evt) {
    this.setState(
      {
        drugForm: evt.target.value
      },
      () => this.props.setForm(this.state.drugForm)
    );
  }

  handleClick(form){
    this.setState(
      {
        drugForm: form
      },
      () => this.props.setForm(this.state.drugForm)
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className={"liquid col-md-2 offset-md-4 " + (this.state.drugForm === "liq"? "active" : "inactive") }>
            <i className="fas fa-flask drugform-icon" onClick={() => this.handleClick("liq")}/>
            <label id="liquid-label">Liquid</label>
          </div>
          <div className={"tablet col-md-2 " + (this.state.drugForm === "tab"? "active" : "inactive")}>
            <i className="fas fa-pills drugform-icon" onClick={() => this.handleClick("tab")}/>
            <label id="tab-label">Tablets</label>
          </div>
        </div>
        
      </div>
    );
  }
}
