// Это тестовый сюда можно не смотреть

export default(function () {
  class LRU {
    constructor(len) {
      this.len = len;
      this.mas = [];
      this.map = {};
    }
    get(key) {
      if (!this.map[key]) {
        return -1;
      }
      const value = this.map[key].value;
      this.put(key, value);
      return value;
    }
    put(key, value) {
      if (this.map[key]) {
        this.mas.splice(
          this.mas.findIndex((i) => i === this.map[key]),
          1
        );
        this.map[key] = null;
      }
      this.mas.push({ key, value });
      this.map[key] = this.mas[this.mas.length - 1];
      if (this.mas.length > this.len) {
        this.map[this.mas.shift().key] = null;
      }
    }
  }
})();


