import { GameObject } from './gameobject'

export class Paddle extends GameObject {
  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    super(ctx, x, y, width, height)
  }

  render() {
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  move(x: number, y: number) {
    this.x += x
    this.y += y
    this.xSpeed = x
    this.ySpeed = y

    if (this.y < 0) {
      this.y = 0
      this.ySpeed = 0
    } else if (this.y + this.height > this.ctx.canvas.height) {
      this.y = this.ctx.canvas.height - this.height
      this.ySpeed = 0
    }
  }
}
