import React from "react";
import * as d3 from "d3";

function dragHandlerClass() {

  function dragstarted(event, d) {
    d3.select(this).raise();
  }

  function dragged(event, d) {
    d3.select(this)
      .attr("transform", "translate(" + event.x + "," + event.y + ")");
  }

  function dragended(event, d) {
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

class D3Canvas extends React.Component {
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

    // immutable + render invariant mutable state
    this.shapes = {
      'circle': d3.symbolCircle,
      'cross': d3.symbolCross,
      'diamond': d3.symbolDiamond,
      'square': d3.symbolSquare,
      'star': d3.symbolStar,
      'triangle': d3.symbolTriangle,
      'wye': d3.symbolWye
    };
    
    this.svgRef = React.createRef();
    this.pointer = [100, 100];
    this.dragHandler = dragHandlerClass();
    
    // mutable state
    this.state = {
      width: this.effwidth(),
      height: this.effheight(),
      posx: this.effx(),
      posy: this.effy(),
      zidx: props.zidx,
    };
  }

  render() {
    const cstyle = {
      zIndex: this.state.zidx,
      position: 'absolute',
      top: this.state.posy + 'px',
      left: this.state.posx + 'px',
      backgroundColor: 'black'
    };
    
    // TODO: remove unnecessary id
    return <svg ref={this.svgRef} id={this.props.id} width={this.state.width} height={this.state.height} style={cstyle}/>
  }


  componentDidMount() {

    //console.log(this.svgRef.current.constructor.name);
    //console.log(this.svgRef.current);
    
    this.svg = d3.select(this.svgRef.current);
    this.svg.on("click", (event, count) => {
      this.pointer = d3.pointer(event);
    });
    
  }

  getShapeNames() {
    return Object.keys(this.shapes);
  }

  addShape(type, size, colour, stroke, scolour) {
      const shape = d3.symbol()
        .type(this.shapes[type])
        .size(size * 1000);

      this.svg.append("path")
          .attr("d", shape)
          .attr("fill", colour)
          .attr("stroke-width", stroke)
          .attr("stroke", scolour)
          .attr("transform", "translate(" + this.pointer[0] + "," + this.pointer[1] + ")")
          .call(this.dragHandler)
          .on("contextmenu", function (event) {
            event.preventDefault();
            d3.select(this).remove();
          });
  }

}

export {D3Canvas};
