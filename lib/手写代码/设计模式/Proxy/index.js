const Flower = function () {};
const xiaoming = {
  sendFlower: function (target) {
    const flower = new Flower();
    target.receiveFlower(flower);
  },
};

const B = {
  receiveFlower: function (flower) {
    A.receiveFlower(flower);
  },
};

const A = {
  receiveFlower: function (flower) {
    console.log("收到花" + flower);
  },
};
xiaoming.sendFlower(B);
