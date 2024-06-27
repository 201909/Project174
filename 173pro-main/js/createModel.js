AFRAME.registerComponent("createmodels", {
//create init function 
init: async function () {
  
  //Get the compund details of the element
  var city = await this.getModels();

  var barcodes = Object.keys(city);

  barcodes.map(barcode => {
    var model = city[barcode];

    //Call the function
    this.createModel(city);
  });

},
  getModels: function() {
    return fetch("js/models.json")
      .then(res => res.json())
      .then(data => data);
  },
  createModel: function(model) {
    var modelName = model.model_name;
      var barcodeValue = model.barcode_value;
      var modelUrl = model.model_url;
    
      var scene = document.querySelector("main-scene")
      var marker = document.createElement("a-marker")

      marker.setAttribute("id", `marker-${modelName}`)
      marker.setAttribute("type", "barcode")
      marker.setAttribute("model_name", modelName)
      marker.setAttribute("value", barcodeValue)
      marker.setAttribute("markerhandler", {})
      scene.appendChild(marker)

      if (barcodeValue === 0) {
        var modelEL = document.createElement("a-entity")
        modelEL.setAttribute("id", `${modelName}`)
        modelEL.setAttribute("geometry",{
          primitive: "box",
          width:model.width,
          height:model.height
        })
        modelEL.setAttribute("position", model.position)
        modelEL.setAttribute("gltf-model", `url(${modelUrl})`)
        modelEL.setAttribute("scale", model.scale)
        modelEL.setAttribute("position", model.position)
        modelEL.setAttribute("rotation", model.rotation)
        marker.appendChild(modelEL)
      }
  }
   //add the code


});
