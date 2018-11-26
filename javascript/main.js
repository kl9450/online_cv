window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYoffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky")
  }
}

// Image slider object
(function () {
 
  const sliderModel = {
    quantity: 5,
    images: [],

    init: function () {
      for (let i = 0; i < this.quantity; i++) {
        this.images.push({ id: `img${i}`, state: i });
      }
      this.last = `img${this.quantity - 1}`;
    },

    sortImages: function () {
      function compare (a, b) {
        if (a.state < b.state) {
          return -1;
        }
        if (a.state > b.state) {
          return 1;
        }
        return 0;
      }
      this.images.sort(compare);
    },

    stateUp: function () {
      for (let i = 0; i < this.quantity; i++) {
        if (this.images[i].state < this.quantity - 1) {
          this.images[i].state = this.images[i].state + 1;
        } else {
          this.images[i].state = 0;
        }
      }
    },
    stateDown: function () {
      for (let i = 0; i < this.quantity; i++) {
        if (this.images[i].state > 0) {
          this.images[i].state = this.images[i].state - 1;
        } else {
          this.images[i].state = this.quantity - 1;
        }
      }
    }
  };

  const sliderView = {
    DOMStrings: {
      left: document.querySelector('.left'),
      right: document.querySelector('.right')
    },
    cacheImages: function (q) {
      for (let i = 0; i < q; i++) {
        this.DOMStrings[`img${i}`] = document.getElementById(`img${i}`);
      }
    },

    initialRender: function (arr) {
      this.DOMStrings[arr[0].id].classList.add('current');
      this.DOMStrings[arr[arr.length - 2].id].classList.add('hide');
      this.DOMStrings[arr[arr.length - 1].id].classList.add('prev');
      for (let i = 1; i < arr.length - 1; i++) {
        this.DOMStrings[arr[i].id].classList.add('queue');
      }
    },

    forwardRender: function (arr) {
      this.DOMStrings[arr[arr.length - 1].id].classList.remove('current');
      this.DOMStrings[arr[arr.length - 1].id].classList.add('prev');
      this.DOMStrings[arr[0].id].classList.remove('hide');
      this.DOMStrings[arr[0].id].classList.remove('queue');
      this.DOMStrings[arr[0].id].classList.add('current');
      this.DOMStrings[arr[arr.length - 2].id].classList.add('hide');
      this.DOMStrings[arr[arr.length - 2].id].classList.remove('prev');
      this.DOMStrings[arr[arr.length - 2].id].classList.add('queue');
    },

    backwardRender: function (arr) {
      this.DOMStrings[arr[1].id].classList.remove('current');
      this.DOMStrings[arr[1].id].classList.add('queue');
      this.DOMStrings[arr[arr.length - 1].id].classList.add('hide');
      this.DOMStrings[arr[arr.length - 1].id].classList.remove('queue');
      this.DOMStrings[arr[arr.length - 1].id].classList.add('prev');
      this.DOMStrings[arr[0].id].classList.remove('hide');
      this.DOMStrings[arr[0].id].classList.remove('prev');
      this.DOMStrings[arr[0].id].classList.add('current');
    }
  };

  const sliderController = {
    DOMStrings: sliderView.DOMStrings,

    bindEvents: function () {
      this.DOMStrings.right.addEventListener('click', () => this.forward());
      this.DOMStrings.left.addEventListener('click', () => this.backward());
    },

    init: function () {
      sliderView.cacheImages(sliderModel.quantity);
      this.bindEvents();
      sliderModel.init();
      sliderView.initialRender(sliderModel.images);
    },

    forward: function () {
      sliderModel.stateDown();
      sliderModel.sortImages();
      sliderView.forwardRender(sliderModel.images);
    },

    backward: function () {
      sliderModel.stateUp();
      sliderModel.sortImages();
      sliderView.backwardRender(sliderModel.images);
    }
  };

  sliderController.init();
  
})()
