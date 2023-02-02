# Open ChessNut

An open source API for connecting to and interacting with the ChessNut Boards.

*NOTE: Currently limited to USB connection only.*

## Usage

The API exposes connection logic both for server and web applications using the [Web HID API](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API).

First, import the connection logic for your app:

`import {connect} from "@jafayer/chessnut/server"`;

or

`import {connect} from "@jafayer/chessnut/web"`;

These functions optinally take a callback, or just return the HID reference synchronously. Most of the time, you'll want to immediately wrap the HID device in the ChessNut class:

```javascript
import {ChessNut} from "@jafayer/chessnut";
const device = connect();
const chessnut = new ChessNut(device);
chessnut.listen();
```

Calling `chessnut.listen` begins the flow of board data. The data is pushed into an Rxjs BehaviorSubject. You can subscribe to the stream of board data by calling

`chessnut.state.subscribe({next: callbackFn})`.

This subscription will get a new value several times per second. You may want to limit the stream to only update when the value changes. To do this, install [Rxjs](https://rxjs.dev/) as a codependency, and import the `distinctUntilChanged` operator to compare the previous state to the current state:

```javascript
import {distinctUntilChanged} from "rxjs/operators";

chessnut.state
.pipe(distinctUntilChanged((prev, curr) => prev.toString() === curr.toString()))
.subscribe({
    next: (e) => console.log(e),
});
```

This will ensure the state only updates when the board state changes.

## ChessNut API

### .listen()

Puts the board into "realtime mode" and begins the flow of board data into the `state` observable.

### state

An [Rxjs BehaviorSubject](https://rxjs.dev/guide/subject#behaviorsubject) containing the current board state. You can subscribe to the state (see Usage) to read board state live from the board.