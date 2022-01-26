<template>
<div class="container">
      <div class="row">
        <div class="fields col-3">
          <label>Upload File</label>
          <br />
          <input class="btn btn-success rounded-1"  type="file" @change="onFileChange" />
        </div>
        <div class="col-3 offset-6 text-center float-end">
          <router-link  class="btn btn-danger btn-lg" to="/back">Back view</router-link>
        </div>
      </div>
      
      <br>
    <div class="row">
      <div class="col-1">
        <input type="color" @change="changeColor" id="color" v-model="color">
        <label for="color">Shape color</label>
      </div>
      <div class="col-2">
        <input type="range" max="7" min="1" @change="changeThikness" id="thikness" v-model="thikness">
        <label for="thikness">Shape thikness</label>
      </div>
      <div class="col-2">
        <input type="range" max="1" min="0" step="0.1" @change="changeOpacity" id="opacity" v-model="opacity">
        <label for="opacity">Shape opacity</label>
      </div>
      <div class="col-3 offset-4">
        <div :class="shape == 'rect' ? 'btn btn-success me-1' : 'btn btn-info me-1'" @click="shape = 'rect'"><i class="la la-stop la-2x"></i></div>
        <div :class="shape == 'circ' ? 'btn btn-success me-1' : 'btn btn-info me-1'" @click="shape = 'circ'"><i class="la la-circle la-2x"></i></div>
        <div :class="shape == 'trian' ? 'btn btn-success me-1' : 'btn btn-info me-1'" @click="shape = 'trian'"><i class="la la-caret-up la-2x"></i></div>
      </div>
    </div>

    
      <div
        id="konva-holder"
        class="konva-holder"
        :style="'background-image: url(' + image + ');'"
      ></div>
</div>
  
</template>

<script>
import Konva from "konva";
import store from '../store'

export default {
  name: "Front",

  data() {
    return {
      image: "",
      stage: null,
      layer: null,
      konva_shape: null,
      isDrawing: false,
      shape: "",
      isDragging : false,
      selectedShape : null,
      color : "",
      thikness : 1,
      opacity : 1
    };
  },
  beforeMount() {
    var vm = this;
    console.log("before Mounted");
    vm.get("imgBack");
  },
  methods: {
    get(key) {
      //this.image = JSON.parse(localStorage.getItem(key));
      this.image = store.state.img_front
    },
    set(key) {
      var vm = this;
      try {
        //localStorage.setItem(key, JSON.stringify(this.image));
        store.setImgFront(this.image)
      } catch (e) {
        console.log(`Storage failed: ${e}`);
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
        vm.set("imgBack");
      };
      reader.readAsDataURL(file);
    },

    mousedownHandler() {
   
      if(!this.isDragging){
        this.isDrawing = true;
      if (this.shape == "rect") {
        this.konva_shape = new Konva.Rect({
          x: this.stage.getPointerPosition().x,
          y: this.stage.getPointerPosition().y,
          width: 0,
          height: 0,
          fill: "red",
          stroke: "black",
          strokeWidth : 1, 
          draggable: true
        
        });
      } else if (this.shape == "circ") {
        this.konva_shape = new Konva.Circle({
          x: this.stage.getPointerPosition().x,
          y: this.stage.getPointerPosition().y,
          radius: 0,
          fill: "blue",
          stroke: "black",
          strokeWidth : 1, 
          draggable: true
        });
      } else if (this.shape == "trian") {
        this.konva_shape = new Konva.RegularPolygon({
          x: this.stage.getPointerPosition().x,
          y: this.stage.getPointerPosition().y,
          sides: 3,
          scaleY: 1,
          radius: 0,
          fill: "yellow",
          stroke: "black",
          strokeWidth : 1, 
          draggable: true
        });
      }
      
      this.layer.add(this.konva_shape).batchDraw();
      this.konva_shape.on("mouseover",this.konvamoveHandler)
      this.konva_shape.on("click",this.konvaselectedHandler)
      
      }
      
    },
    mouseupHandler() {
      this.isDrawing = false;
     
    },
    mousemoveHandler() {
      if (!this.isDrawing) return false;
      if(this.shape == 'rect'){
        const newWidth = this.stage.getPointerPosition().x-this.konva_shape.x();
        const newHeight = this.stage.getPointerPosition().y-this.konva_shape.y();
        this.konva_shape.width(newWidth).height(newHeight);
        this.layer.batchDraw()
      }
        else if(this.shape == 'circ'){
        const rise = Math.pow(this.stage.getPointerPosition().y-this.konva_shape.y(),2);
        const run = Math.pow(this.stage.getPointerPosition().x-this.konva_shape.x(),2);
        const newRadius =Math.sqrt(rise+run)
        this.konva_shape.radius(newRadius)
        this.layer.batchDraw()
      }
        else if(this.shape == 'trian'){
        const newWidth = this.stage.getPointerPosition().x-this.konva_shape.x();
        const newHeight = this.stage.getPointerPosition().y-this.konva_shape.y();
        this.konva_shape.width(newWidth).height(newHeight);
        this.layer.batchDraw()
      }
      
    },
    konvamoveHandler(){
      this.isDragging = true
      setTimeout(() => {
        this.isDragging = false
      },500)
    },
    konvanomoveHandler(){
      this.isDragging = false
      console.log("NOOOOOmoveee")
    },
    konvaselectedHandler(e){
      this.selectedShape = e.target
    },
    changeColor(){
      console.log(this.selectedShape)
      if(this.selectedShape != null){
        this.selectedShape.to({
          fill : this.color
        })
      }
    },
    changeThikness(){
      if(this.selectedShape != null){
        this.selectedShape.to({
          strokeWidth : this.thikness
        })
      }
    },
    changeOpacity(){
          if(this.selectedShape != null){
        this.selectedShape.to({
          opacity : this.opacity
        })
      }
    }
  },
  unmounted(){
    store.setLayerFront(this.layer)
  },
  mounted() {
    this.stage = new Konva.Stage({
      height: 700,
      width: 1115,
      container: "konva-holder",
    });
    if(store.state.layer_front == null){
      this.layer = new Konva.Layer();
    }
    else{
      this.layer = store.state.layer_front;
    }
    
    this.stage.add(this.layer);
    this.stage.on("mousedown", this.mousedownHandler);
    this.stage.on("mousemove", this.mousemoveHandler);
    this.stage.on("mouseup", this.mouseupHandler);
    
    console.log(store);
  },
};
</script>

<style>
.konva-holder {
  transform: scaleX(1);
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>
