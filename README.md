# Sevn

A lightweight module to manipulate a 7-Segment-Display with Raspberry Pi.

## Contents

 * [Installation](#installation)
 * [Usage](#usage)
   * [A simple 7-Segment Display](#A-simple 7-Segment-Display)
 * [API](#api)
 * [Additional Information](#additional-information)

## Installation

```
npm install sevn
```

Note that although it's possible to install Sevn on non-Linux systems the
functionality offered by the dependency "onoff" is only available on Linux systems.

## Usage

#### A simple 7-Segment Display
Assume that a 7-Segment Display is connected to the GPIO pins: 6, 5, 13, 19, 26, 21, 20 and 16 in the alphabetical order: a, b, c, d, e, f, g, dp:

<img src="https://raw.githubusercontent.com/melvinidema/sevn/master/examples/sevn-example.png">

When the script is executed we want to display a 2 on the display:

```js
const Sevn = require('sevn');
                        // a  b  c   d   e   f   g   dp
const mySegment = new Sevn(6, 5, 13, 19, 26, 21, 20, 16);

mySegment.write(2);
```

Here we require the sevn module and create a new segment where we pass in the respected GPIO pins in alphabetical order.  

After everything has been setup. One can just call the write method with a value of 2 to write to the 7-Segment Display.

The above program will quit after running the code. However, it doesn't free its resources. Here's a slightly modified variant of the program that only quits on ctrl-c. It works by setting an interval that will fire approximately every 12 days to simulate a process. The resources used by the 7-Segment Display are released by invoking their unexport method and by setting their OUTPUT to low on pressing ctrl-c.

```js
const Sevn = require('sevn');
                        // a  b  c   d   e   f   g   dp
const mySegment = new Sevn(6, 5, 13, 19, 26, 21, 20, 16);

mySegment.write(2);

// Keep application running
setInterval(() => {}, 1 << 30);

process.on('SIGINT', () => {

  mySegment.unexport();
  process.exit();

});
```

The unexport() method has to be used to make sure the used resources are freed when finishing the process.

## API

##### write(value)
Write a value between 0 and 9 to the 7-Segment Display.

Sevn does not yet support alphanumerical letters.

##### unexport()
Sets GPIO output to low and unexports all used GPIO pins.

## Additional Information

Sevn makes use of the "onoff" module.
