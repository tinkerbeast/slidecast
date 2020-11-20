import React from "react";
import {Switch} from '@material-ui/core';
import $ from "jquery";

import CanvasDraw from "react-canvas-draw";

export class SketchPad extends React.Component {
  constructor(props) {
    super(props);

    // TODO atomicity of x and y
    this.effx = () => {
      return props.target.getBoundingClientRect().x - document.body.getBoundingClientRect().x;
    }
    this.effy = () => {
      return props.target.getBoundingClientRect().y - document.body.getBoundingClientRect().y;
    }
    this.effwidth = () => props.target.getBoundingClientRect().width;
    this.effheight = () => props.target.getBoundingClientRect().height;
    this.onoff = (checked) => checked? 'visible': 'hidden';

    this.state = {
      visibility: this.onoff(props.checked),
      width: this.effwidth(),
      height: this.effheight(),
      posx: this.effx(),
      posy: this.effy(),
      zidx: props.zidx
    };
  }

  render() {
    const cstyle = {
      zIndex: this.state.zidx,
      position: 'absolute',
      top: this.state.posy + 'px',
      left: this.state.posx + 'px',
      visibility: this.state.visibility,
      border: '1px solid red',
      background: 'transparent'
    }

    //return <canvas id={this.props.id} width={this.state.width} height={this.state.height} style={cstyle}/>
    return <CanvasDraw
            id={this.props.id} 
            canvasWidth={this.state.width} 
            canvasHeight={this.state.height}
            hideGrid={true}
            style={cstyle}
    />;
  }

  componentDidMount() {
    $(window).on('resize.' + this.props.id, () => {
      this.setState({
        width: this.effwidth(),
        height: this.effheight(),
        posx: this.effx(),
        posy: this.effy()
      });
    });
  }

  componentWillUnmount() {
    $(window).off('resize.' + this.props.id);
  }

  setChecked(checked) {
    this.setState({visibility: this.onoff(checked)});
  }

  test() {
    console.log('test called for SketchPad')
    console.log(this.props.target.getBoundingClientRect());
    console.log(this.state);
  }
}




export function SketchControl(props) {
  const [checked, setChecked] = React.useState(props.checked);

  const toggleChecked = () => {
    console.log(checked);
    props.pad.setChecked(!checked);
    setChecked((prev) => !prev);
  };

  return <Switch checked={checked} onChange={toggleChecked} />;
}

/*
export class SketchControl extends React.Component {
  render() {
    return <SketchControlToggle pad={this.props.pad} checked={this.props.checked}/>;
  }
}
*/


