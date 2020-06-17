//index.js
import './index.less';
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');
console.log('aaabbbbccc')

document.getElementById('btn').onclick = function() {
    import('./handle').then(fn => fn.default());
}

if(module && module.hot) {
  module.hot.accept()
}

// fetch("user")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

