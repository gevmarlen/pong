export abstract class GameObject {
  x: number
  y: number
  xSpeed: number = 0
  ySpeed: number = 0
  width: number
  height: number
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  abstract render(): void
  abstract move(x: number, y: number): void
}
