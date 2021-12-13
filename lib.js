// Это тестовый сюда можно не смотреть
class LRU {
  constructor(len) {
    this.len = len;
    this.mas = [];
    this.map = {};

    this.m = new Map();
    this.p = [];

    this.count = {};
    this.n = [];
    this.min = 0;
  }

  get(key) {
    if (!this.map[key]) {
      return -1;
    }

    const value = this.map[key].value;

    this.p.push(key);
    this.put(key, value);
    return value;
  }
  times() {
    if (this.mas.length == this.len) {
      this.count = this.p.reduce(
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
          this.mas.findIndex((i) => i === this.map[key(this.min, this.count)]),
          1
        );
        this.map[key(this.min, this.count)] = null;
      }
    }
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
const a = new LRU(3);
a.put(1, 1);
a.put(2, 1);
a.get(2);
a.get(1);
a.get(1);
a.put(3, 1);
// a.put(4, 1);
// a.put(5, 1);
// a.put(6, 1);
// a.get(6);
a.times();
console.log(a.mas);
