#target photoshop

var PSLayerUtil = function() {
  this._colorRef = new ActionReference();
  this._colorRef.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
}
PSLayerUtil.LayerColors = {
  Red: 'Rd  ',
  Orange: 'Orng',
  Yellow: 'Ylw ',
  Green: 'Grn ',
  Blue: 'Bl  ',
  Violet: 'Vlt ',
  Gray: 'Gry ',
  None: 'None',
};
PSLayerUtil.prototype = {
  _colorRef: null,
  setLayerColor: function(layerColor) {
    var colorDescriptor = new ActionDescriptor();
    colorDescriptor.putEnumerated(charIDToTypeID('Clr '), charIDToTypeID('Clr '), charIDToTypeID(layerColor));
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID('null'), this._colorRef);
    desc.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), colorDescriptor);
    executeAction(charIDToTypeID('setd'), desc, DialogModes.NO);
    return this.layerColor();
  },
  layerColor: function() {
    var desc = executeActionGet(this._colorRef);
    var charID = typeIDToCharID(desc.getEnumerationValue(charIDToTypeID('Clr ')));
    for(var key in PSLayerUtil.LayerColors) {
      var value = PSLayerUtil.LayerColors[key];
      if(value === charID) return key;
    }
    return 'None';
  },
}

