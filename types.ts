export type item = {
  id: number
  text: string
  done: boolean
}

export type itemAdderProps = {
  add: (text: string) => void
}