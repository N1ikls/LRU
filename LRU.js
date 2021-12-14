(function (window) {
  class LRU {
    constructor(len) {
      this.len = len;
      this.mas = [];
      this.map = {};

      this.mas_key = [];

      this.count = {};
      this.n = [];
      this.min = 0;
    }

    get(key) {
      if (!this.map[key]) {
        return -1;
      }

      const value = this.map[key].value;

      this.mas_key.push(key);
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
      if (this.mas.length == this.len) {
        this.count = this.mas_key.reduce(
          (acc, n) => ((acc[n] = (acc[n] || 0) + 1), acc),
          {}
        );

        for (let i in this.count) {
          this.n.push(this.count[i]);
        }
        function equal(a) {
          // проверка если все элеементы вызывались одинаковоее количество раз
          return [...new Set(a)].length == 1;
        }

        if (equal(this.n) == false) {
          function min(mas) {
            let min = mas[0];
            for (let i in mas) {
              if (mas[i] < min) {
                min = mas[i];
              }
            }
            return min;
          }
          function key(min, count) {
            for (let i in count) {
              if (count[i] == min) {
                return i;
              }
            }
          }

          this.min = min(this.n);

          this.mas.splice(
            this.mas.findIndex(
              (i) => i === this.map[key(this.min, this.count)]
            ),
            1
          );
          this.map[key(this.min, this.count)] = null;
        }
      }
    }
  }
  if (typeof window.LRU === "undefined") {
    window.LRU = LRU;
  }
})(window);
