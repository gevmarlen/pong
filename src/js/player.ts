import { GameSubject } from './gamesubject'

export class Player extends GameSubject {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    super(ctx, x, y, width, height)
  }

  update(keysDown: boolean[]): void {
    for (var key in keysDown) {
      var value = Number(key)
      if (value == 38) {
        this.paddle.move(0, -4)
      } else if (value == 40) {
        this.paddle.move(0, 4)
      } else {
        this.paddle.move(0, 0)
      }
    }
  }
}
