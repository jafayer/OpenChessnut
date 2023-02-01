import { ChessNut } from './ChessNut/ChessNut';
import { connectHID } from './server/connect';
import {distinctUntilChanged} from "rxjs/operators";

const device = connectHID();
const cn = new ChessNut(device);
cn.listen();

cn.state
.pipe(distinctUntilChanged((prev, curr) => prev.toString() === curr.toString()))
.subscribe({next: (e) => {
  console.log(e);
}});