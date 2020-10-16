const { Board, Proximity } = require("johnny-five");
const board = new Board();

board.on("ready", () => {
  const proximity = new Proximity({
    controller: "HC-SR04",
    pin: 13
  });

  proximity.on("data", () => {
    const {centimeters, inches} = proximity;
    console.log("Proximity: ", this);
    console.log("  cm  : ", centimeters);
    console.log("  in  : ", inches);
    console.log("-----------------");
  });
});

