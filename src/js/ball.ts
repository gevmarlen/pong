import { GameSubject } from './gamesubject'

export class Ball {
  private ctx: CanvasRenderingContext2D
  private x: number
  private _y: number
  private startSpeed: number
  private cellSize: number
  private xSpeed: number
  private ySpeed: number
  private radius: number
  private boxHeight: number
  private boxWidth: number
  private centerX: number
  private centerY: number
  private finalScore: number

  constructor(ctx: CanvasRenderingContext2D, startSpeed: number, cellSize: number, finalScore: number) {
    this.ctx = ctx

    this.boxWidth = this.ctx.canvas.width
    this.boxHeight = this.ctx.canvas.height

    this.centerX = this.boxWidth / 2
    this.centerY = this.boxHeight / 2

    this.x = this.centerX
    this._y = this.centerY
    this.startSpeed = startSpeed
    this.cellSize = cellSize
    this.xSpeed = this.startSpeed
    this.ySpeed = 0
    this.radius = this.cellSize / 2

    this.finalScore = finalScore
  }

  get y() {
    return this._y
  }

  render(): void {
    this.ctx.beginPath()
    this.ctx.fillStyle = 'black'
    this.ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, 0)
    this.ctx.fill()
  }

  update(player1: GameSubject, player2: GameSubject, gameOverCallback: Function): void {
    this.x += this.xSpeed
    this._y += this.ySpeed

    const topX = this.x - this.cellSize / 2
    const topY = this._y - this.cellSize / 2
    const bottomX = this.x + this.cellSize / 2
    const bottomY = this._y + this.cellSize / 2

    // Check border collapse
    if (this._y - this.cellSize / 2 < 0) {
      this._y = this.cellSize / 2
      this.ySpeed = -this.ySpeed
    } else if (this._y + this.cellSize / 2 > this.boxHeight) {
      this._y = this.boxHeight - this.cellSize / 2
      this.ySpeed = -this.ySpeed
    }

    // Check player collapse
    if (topX > this.centerX) {
      if (topX < player1.paddle.x + player1.paddle.width && bottomX > player1.paddle.x && topY < player1.paddle.y + player1.paddle.height && bottomY > player1.paddle.y) {
        this.xSpeed = -this.startSpeed
        this.ySpeed += -Math.round(player1.paddle.y + player1.paddle.height / 2 - this.y) / 10
        this.x += this.xSpeed
      }
    } else {
      if (topX < player2.paddle.x + player2.paddle.width && bottomX > player2.paddle.x && topY < player2.paddle.y + player2.paddle.height && bottomY > player2.paddle.y) {
        this.xSpeed = this.startSpeed
        this.ySpeed += -Math.round(player2.paddle.y + player2.paddle.height / 2 - this.y) / 10
        this.x += this.xSpeed
      }
    }

    // Check score
    if (this.x < 0 || this.x > this.boxWidth) {
      if (this.x < 0) {
        player1.score++
        this.xSpeed = this.startSpeed
      } else {
        player2.score++
        this.xSpeed = -this.startSpeed
      }

      if (player1.score >= this.finalScore || player2.score >= this.finalScore) {
        gameOverCallback()
      }

      this.ySpeed = Math.round(Math.random() * 2) - 1
      this.x = this.centerX
      this._y = this.centerY
    }
  }
}
