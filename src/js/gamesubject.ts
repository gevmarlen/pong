import { Paddle } from './paddle'

export class GameSubject {
  public score: number = 0
  public paddle: Paddle

  protected ctx: CanvasRenderingContext2D
  protected x: number

  constructor(ctx: CanvasRenderingContext2D, x: number, center: number, paddleHeight: number, cellSize: number) {
    this.ctx = ctx
    this.paddle = new Paddle(ctx, x, center - paddleHeight / 2, cellSize, paddleHeight)
    this.x = x
  }

  render(): void {
    this.paddle.render()
    this.ctx.font = '22px ArcadeClassic'
    this.ctx.textAlign = 'center'
    this.ctx.fillText(this.score.toString(), this.x + 5, 20)
  }
}
