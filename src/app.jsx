import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import {ColourRadioGroup} from "./components/bsRadioGroup"
import {SelectOptions} from "./components/bsRadioGroup"
import {D3Canvas} from "./components/d3Canvas"

import {SketchPad} from "./iface/Sketcher" 
import {SketchControl} from "./iface/Sketcher" 
import {ShapeControl} from "./iface/Sketcher" 




const colours = ['8e44ad', '9b59b6', '2980b9', '3498db', 
    '27ae60', '2ecc71', '16a085', '1abc9c', 
    'f39c12', 'f1c40f', 'd35400', 'e67e22', 
    'c0392b', 'e74c3c', 'bdc3c7', 'ecf0f1', 
    '7f8c8d', '95a5a6', '2c3e50', '34495e', 'transparent'
];


function ReactDOM_replaceDiv(element, reactComponent) {
  const parent = document.createElement('div');
  return ReactDOM.render(reactComponent, parent, () => {
    element.replaceWith(...Array.from(parent.childNodes));
  });
}


$(document).ready(function() {


    const shapePad = ReactDOM.render(
        React.createElement(D3Canvas, {
            target: document.getElementById('showarea'), 
            zidx: 5,
            id: 'myShapePad'
        }, null),
        document.body.appendChild(document.createElement('div'))
    );


    const sketchOn = true;
    const sketchPad = ReactDOM.render(
        React.createElement(SketchPad, {
            target: document.getElementById('holder'), 
            checked: sketchOn,
            zidx: 10,
            id: 'mySketchPad'
        }, null),
        document.body.appendChild(document.createElement('div'))
    );
    ReactDOM.render(
        React.createElement(SketchControl, {
            checked: sketchOn,
            pad: sketchPad 
        }, null), 
        document.getElementById('mySketchControl')
    );

    
    ReactDOM.render(
        React.createElement(ShapeControl, {
            formId: 'myShapeControl',
            'colours': colours,
            pad: shapePad 
        }, null), 
        document.getElementById('contextForm')
    );


});


