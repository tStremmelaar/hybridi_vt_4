import { RefObject } from "react"
import { FlatList } from "react-native"

export type item = {
  id: number
  text: string
  done: boolean
}

export type listState = {
  list: item[]
  save: boolean
}

export type itemAdderProps = {
  add: (text: string) => void
}

export type listProps = {
  list: item[]
  listRef: RefObject<FlatList<any> | null>
  toggleDone: (id: number) => void
}
