import React from "react";

export class Overlay extends React.Component {
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
    this.onoff = (on) => on? 'visible': 'hidden';

    this.state = {
      visibility: this.onoff(props.visible),
      width: this.effwidth(),
      height: this.effheight(),
      posx: this.effx(),
      posy: this.effy(),
      zidx: props.zidx,
    };

    this.overlayRef = React.createRef();
  }

  render() {
    const cstyle = {
      zIndex: this.state.zidx,
      position: 'absolute',
      top: this.state.posy + 'px',
      left: this.state.posx + 'px',
      visibility: this.state.visibility,
      width: this.state.width,
      height: this.state.height,
      border: '1px solid red',
      background: 'transparent'
    }

    return (
      <div ref={this.overlayRef} id={this.props.id} style={cstyle}>
        {this.props.children}
      </div>
    );
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

  setVisible(isVisible) {
    this.setState({visibility: this.onoff(isVisible)});
  }

  getVisibility() {
    return this.state.visibility;
  }

  setZidx(zidxVal) {
    this.setState({zidx: zidxVal});
  }

  getZidx() {
    return this.state.zidx;
  }
}


export function SketchControl(props) {
  
  const [visible, setVisibility] = React.useState(props.pad.getVisibility());
  const handleVisibility = () => {
    props.pad.setVisibility(!visible);
    setVisibility((prev) => !prev);
  };

  const [zidx, setZidx] = React.useState(props.pad.getZidx());
  const handleZidx = (event, newValue) => {
    props.pad.setZidx(newValue);
    setZidx(newValue);
  };

  return (
    <div>
      <Switch visible={visible} onChange={handleVisibility} />
      <Slider value={zidx} step={1} marks min={2} max={10} valueLabelDisplay="auto" onChange={handleZidx} />
    </div>
  );
}


