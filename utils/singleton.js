

class Singleton {
    static _instance = null;
    constructor() {
      this.data = "Hello";
      if (!Singleton._instance) {
        Singleton._instance = this;
      }
      return Singleton._instance;
    }
  
    getInstance() {
      return this._instance;
    }
  
    getData() {
        return this.data ;
    }
  
    setData(data) {
        this.data = data;
    }
}

export default Singleton;