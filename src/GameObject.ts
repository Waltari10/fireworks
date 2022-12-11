import Victor from 'victor'

export default abstract class GameObject {
  abstract location: Victor
  abstract id: string
  abstract direction: number
  abstract render: () => void
  abstract update: () => void
}
