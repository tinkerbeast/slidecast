import React from "react";
import {Switch} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Slider} from '@material-ui/core';
import $ from "jquery";

import CanvasDraw from "react-canvas-draw";
import {SliderPicker} from 'react-color';

import * as bs from "../components/bsRadioGroup"

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
      zidx: props.zidx,
      brushColor: '#444',
      brushRadius: 12
    };

    this.canvasRef = React.createRef();
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
            ref={this.canvasRef}
            id={this.props.id} 
            canvasWidth={this.state.width} 
            canvasHeight={this.state.height}
            hideGrid={true}
            brushColor={this.state.brushColor}
            brushRadius={this.state.brushRadius}
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

  setColour(hexColour) {
    this.setState({brushColor: hexColour});
  }

  getBrushRadius() {
    return this.state.brushRadius;
  }

  setBrushRadius(val) {
    this.setState({brushRadius: val});
  }

  doUndo() {
    this.canvasRef.current.undo();
  }

  doClear() {
    this.canvasRef.current.clear();
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
    props.pad.setChecked(!checked);
    setChecked((prev) => !prev);
  };

  const [colour, setColor] = React.useState();
  const colourChange = (colourx, event) => {
    setColor(colourx);
    props.pad.setColour(colourx['hex']);
  };

  const [brush, setBrush] = React.useState(props.pad.getBrushRadius());
  const handleBrush = (event, newValue) => {
    setBrush(newValue);
    props.pad.setBrushRadius(newValue);
  };

  const padUndo = () => {
    props.pad.doUndo();
  };
  
  const padClear = () => {
    props.pad.doClear();
  };

  return (
    <div>
      <Switch checked={checked} onChange={toggleChecked} />
      <SliderPicker color={colour} onChangeComplete={colourChange} />
      <br />
      <Slider value={brush} step={1} marks min={1} max={25} valueLabelDisplay="auto" onChange={handleBrush} />
      <Button variant="contained" onClick={padUndo} >Undo</Button>
      <Button variant="contained" onClick={padClear} >Clear</Button>
    </div>
  );
}


export class ShapeControl extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const formLayout = 'card-body'
    const formGrouping = 'form-group';
    const formGroupingLayout = 'row';
    const formGroupEleLayout = 'col';

    return (  
      <form id={this.props.formId} className={formLayout}>
        
        <h5>Shape Control</h5>

        <div className={formGrouping + ' ' + formGroupingLayout}>
          <label htmlFor={this.props.formId + '-shape'} className={formGroupEleLayout}>shape</label>
          <bs.SelectOptions id={this.props.formId + '-shape'} name="shape" values={this.props.pad.getShapeNames()} layout={formGroupEleLayout}/>
        </div>

        <div className={formGrouping + ' ' + formGroupingLayout}>
          <label htmlFor={this.props.formId + '-size'} className={formGroupEleLayout}>size</label>
          <input type="range" name="size" className={'form-control-range ' + formGroupEleLayout} id={this.props.formId + '-size'} min="1" max="50" step="1" />
        </div>

        <div className={formGrouping + ' ' + formGroupingLayout}>
          <label htmlFor={this.props.formId + '-fillcolour'} className={formGroupEleLayout}>fill colour</label>
          <bs.ColourRadioGroup formId={this.props.formId} name='fillcolour' values={this.props.colours} layout={formGroupEleLayout} />
        </div>
        
        <div className={formGrouping + ' ' + formGroupingLayout}>
          <label htmlFor={this.props.formId + '-stroke'} className={formGroupEleLayout}>stroke</label>
          <input type="range" name="stroke" className={'form-control-range ' + formGroupEleLayout} id={this.props.formId + '-stroke'} min="1" max="100" step="5" defaultValue="1" />
        </div>

        <div className={formGrouping + ' ' + formGroupingLayout}>
          <label htmlFor={this.props.formId + '-strokecolour'} className={formGroupEleLayout}>stroke colour</label>
          <bs.ColourRadioGroup formId={this.props.formId} name='strokecolour' values={this.props.colours} layout={formGroupEleLayout} />
        </div>

        <button type="submit" className="btn btn-primary">Add shape</button>
      </form>
    );
  }

  componentDidMount() {

    const shapePad = this.props.pad; // needed for closure

    $('#' + this.props.formId).submit( function(e) {
        // do not submit this form
        e.preventDefault();
        // get an associative array of just the values.
        var values = {};
        $(this).serializeArray()
            .forEach(function(val, idx) {
              values[val.name] = val.value;
            });
        console.debug(JSON.stringify(values));
        // add to shapePad
        // TODO: associate names here with form input names
        shapePad.addShape(values['shape'], values['size'], values['fillcolour'], values['stroke'], values['strokecolour']);
    });
  }

}



import hljs from "highlight.js";
import { TextareaAutosize } from '@material-ui/core';

export class CodeControl extends React.Component {

  render() {
    return (
      <form id={this.props.formId}>
        <textarea className="form-control" name="code" rows="10"></textarea>
        <button type="submit" className="btn btn-primary">Render</button>
        <pre className="lead" style={{lineHeight: '200%'}}><code className="hljs">to be replaced</code></pre>
      </form>
    );
  }



  componentDidMount() {

    const lang = this.props.lang;

    $('#' + this.props.formId).submit( function(e) {
        // do not submit this form
        e.preventDefault();
        // get an associative array of just the values.
        var values = {};
        $(this).serializeArray()
            .forEach(function(val, idx) {
              values[val.name] = val.value;
            });

        console.debug(JSON.stringify(values));

        let pcode = hljs.highlightAuto(values['code']);

        console.debug(pcode);

        let hcode = pcode.value
          .split('\r\n')
          .map(val => '<div>' + val + '</div>')
          .join('');

        console.debug(hcode);

        $(this).find('pre code').html(hcode);

        
    });
  }
    
}
