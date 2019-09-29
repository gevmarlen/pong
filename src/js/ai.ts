import { GameSubject } from './gamesubject'
import { Ball } from './ball'

export class AI extends GameSubject {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    super(ctx, x, y, width, height)
  }

  update(ball: Ball): void {
    const yPos = ball.y
    let diff = -(this.paddle.y + this.paddle.height / 2 - yPos)
    if (diff < 0 && diff < -4) {
      diff = -5
    } else if (diff > 0 && diff > 4) {
      diff = 5
    }
    this.paddle.move(0, diff)
    if (this.paddle.y < 0) {
      this.paddle.y = 0
    } else if (this.paddle.y + this.paddle.height > this.ctx.canvas.height) {
      this.paddle.y = this.ctx.canvas.height - this.paddle.height
    }
  }
}
