const Gpio = require('onoff').Gpio;

class Segment {
  constructor(aP, bP, cP, dP, eP, fP, gP, dpP) {
    this.a = new Gpio(aP, 'out');
    this.b = new Gpio(bP, 'out');
    this.c = new Gpio(cP, 'out');
    this.d = new Gpio(dP, 'out');
    this.e = new Gpio(eP, 'out');
    this.f = new Gpio(fP, 'out');
    this.g = new Gpio(gP, 'out');
    this.dp = new Gpio(dpP, 'out');

    this.segments = [this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.dp];

    this.segmentNumbers = {
      //   a  b  c  d  e  f  g  dp
      0: [ 1, 1, 1, 1, 1, 1, 0, 0],
      1: [ 0, 1, 1, 0, 0, 0, 0, 0],
      2: [ 1, 1, 0, 1, 1, 0, 1, 0],
      3: [ 1, 1, 1, 1, 0, 0, 1, 0],
      4: [ 0, 1, 1, 0, 0, 1, 1, 0],
      5: [ 1, 0, 1, 1, 0, 1, 1, 0],
      6: [ 1, 0, 1, 1, 1, 1, 1, 0],
      7: [ 1, 1, 1, 0, 0, 0, 0, 0],
      8: [ 1, 1, 1, 1, 1, 1, 1, 0],
      9: [ 1, 1, 1, 1, 0, 1, 1, 0],
      dp: [ 0, 0, 0, 0, 0, 0, 0, 1]
    };

  }

  write(number) {
    this.segmentNumbers[number].forEach((number, index) => {
      this.segments[index].writeSync(number);
    });
  };

  unexport() {
    this.segments.forEach((segment, index) => {
      segment.writeSync(0);
      segment.unexport();
    });
  }

}

module.exports = Segment;
