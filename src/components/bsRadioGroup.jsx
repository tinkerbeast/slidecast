import React from "react";
import TransparentBg from "../assets/transparent.png";

class RadioGroup extends React.Component {
  render() {

    console.debug(this.props.values);

    const items = this.props.values.map((vals) => {
      const idref = this.props.formId + '-' + this.props.name + '-' + vals['value'];
      return <label key={vals['value']} htmlFor={idref} className="btn btn-secondary">
        <input type="radio" name={this.props.name} value={vals['value']} id={idref} autoComplete="off"></input>
          {vals['text']}
        </label>;
      });

    return items;
  }
}

export default RadioGroup;


class ColourRadioGroup extends React.Component {
  render() {

    console.debug(this.props.values);

    const items = this.props.values.map((vals) => {

      const idref = this.props.formId + '-' + this.props.name + '-' + vals;

      let inner = undefined;
      if (vals != 'transparent') {
        const bgcolour = '#' + vals;
        return <label key={vals} htmlFor={idref} className="btn" style={{backgroundColor: bgcolour}}>
          <input type="radio" name={this.props.name} value={bgcolour} id={idref} autoComplete="off"></input>
          </label>;
      } else {
        return <label key="transparent" htmlFor={idref} className="btn" style={{backgroundImage: "url(" + TransparentBg + ")"}}>
          <input type="radio" name={this.props.name} value="transparent" id={idref} autoComplete="off"></input>
          </label>;
      }

    });

    return (
        <div className={'btn-group btn-group-toggle ' + this.props.layout} id={this.props.formId + '-strokecolour'} data-toggle="buttons">
          {items}
        </div>
      );
  }
}

export {ColourRadioGroup};


class SelectOptions extends React.Component {
  render() {

    console.debug(this.props.values);

    const items = this.props.values.map((vals) => {
      return <option key={vals} value={vals}>{vals}</option>
    });

    return (
      <select name={this.props.name} className={'form-control ' + this.props.layout} id={this.props.id}>
        {items}
      </select>
    );
  }
}

export {SelectOptions};



