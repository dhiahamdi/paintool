import {reactive} from 'vue'
const store = {
    debug: true,
  
    state: reactive({
      layer_front : null,
      layer_back : null,
      img_front : "",
      img_back : ""
    }),
  
    setImgFront(newValue) {
        if (this.debug) {
          console.log('setImgFront triggered with', newValue)
        }
    
        this.state.img_front = newValue
      },
      setImgBack(newValue) {
        if (this.debug) {
          console.log('setImgBack triggered with', newValue)
        }
    
        this.state.img_back = newValue
      },
    setLayerFront(newValue) {
      if (this.debug) {
        console.log('setLayerFront triggered with', newValue)
      }
  
      this.state.layer_front = newValue
    },

    setLayerBack(newValue) {
        if (this.debug) {
          console.log('setLayerBack triggered with', newValue)
        }
    
        this.state.layer_back = newValue
      },
  
      clearLayersAction() {
      if (this.debug) {
        console.log('clearLayersAction triggered')
      }
  
      this.state.layer_back = null
      this.state.layer_front = null
    }
  }
  export default store