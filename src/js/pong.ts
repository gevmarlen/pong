import { Game } from './game'
import { Player } from './player'
import { Ball } from './ball'
import { AI } from './ai'

export class Pong extends Game {
  private paddleHeight: number = 80
  private player: Player
  private ai: AI
  private ball: Ball
  private keysDown: boolean[] = []
  private centerX: number
  private centerY: number

  constructor(canvasSelector: string, cellSize: number, n: number, m: number, paddleHeight: number) {
    super(canvasSelector, cellSize, n, m)

    this.centerX = this.width / 2
    this.centerY = this.height / 2

    const xLeft = this.cellSize
    const xRight = this.width - this.cellSize * 2

    const finalScore = 6
    const startSpeed = 8

    this.player = new Player(this.ctx, xLeft, this.centerY, this.paddleHeight, this.cellSize)
    this.ai = new AI(this.ctx, xRight, this.centerY, this.paddleHeight, this.cellSize)
    this.ball = new Ball(this.ctx, startSpeed, cellSize, finalScore)

    document.addEventListener('keydown', event => {
      this.keysDown[event.keyCode] = true
      if (!this.isGameStarted) {
        this.isGameStarted = true
        this.player.score = 0
        this.ai.score = 0
      } else if (this.isGameOver) {
        this.isGameOver = false
        this.player.score = 0
        this.ai.score = 0
        this.player.paddle.y = this.centerY - this.paddleHeight / 2
        this.ai.paddle.y = this.centerY - this.paddleHeight / 2
      }
    })

    document.addEventListener('keyup', event => {
      delete this.keysDown[event.keyCode]
    })

    this.loop()
  }

  private render() {
    this.grid()
    this.player.render()
    this.ai.render()
    this.ball.render()
    this.ctx.font = '28px ArcadeClassic'
    this.ctx.textAlign = 'center'
    if (!this.isGameStarted) {
      this.ctx.fillText('Press any key', this.centerX, this.centerY - 10)
    } else if (this.isGameOver) {
      this.ctx.fillText('Game over', this.centerX, this.centerY - 10)
    }
  }

  private update() {
    this.player.update(this.keysDown)
    this.ai.update(this.ball)
    this.ball.update(this.ai, this.player, () => {
      this.isGameOver = true
    })
  }

  protected loop = () => {
    if (this.isGameStarted && !this.isGameOver) {
      this.update()
    }
    this.render()

    requestAnimationFrame(this.loop)
  }
}
