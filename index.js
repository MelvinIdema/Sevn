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

    this.segmentCharacters = {
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
      dp:[ 0, 0, 0, 0, 0, 0, 0, 1],
      a: [ 1, 1, 1, 0, 1, 1, 1, 0],
      b: [ 0, 0, 1, 1, 1, 1, 1, 0],
      c: [ 1, 0, 0, 1, 1, 1, 0, 0],
      d: [ 0, 1, 1, 1, 1, 0, 1, 0],
      e: [ 1, 0, 0, 1, 1, 1, 1, 0],
      f: [ 1, 0, 0, 0, 1, 1, 1, 0],
      h: [ 0, 1, 1, 0, 1, 1, 1, 0],
      i: [ 0, 0, 0, 0, 1, 1, 0, 0],
      j: [ 0, 1, 1, 1, 0, 0, 0, 0],
      l: [ 0, 0, 0, 1, 1, 1, 0, 0],
      n: [ 0, 0, 1, 0, 1, 0, 1, 0],
      o: [ 0, 0, 1, 1, 1, 0, 1, 0],
      p: [ 1, 1, 0, 0, 1, 1, 1, 0],
      q: [ 1, 1, 1, 0, 0, 1, 1, 0],
      r: [ 0, 0, 0, 0, 1, 0, 1, 0],
      s: [ 1, 0, 1, 1, 0, 1, 1, 0],
      u: [ 0, 1, 1, 1, 1, 1, 0, 0],
      y: [ 0, 1, 1, 1, 0, 1, 1, 0],
      z: [ 1, 1, 0, 1, 1, 0, 1, 0]
    };

  }

  write(character) {
    if(typeof character === "string") {
      character = character.toLowerCase();
    }

    if(!this.segmentCharacters.hasOwnProperty(character)) {
      throw new Error(`The character ${character} is not supported.`);
    }

    this.segmentCharacters[character].forEach((number, index) => {
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
