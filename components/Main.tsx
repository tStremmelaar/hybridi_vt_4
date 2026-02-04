import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useRef, useState } from "react"
import { item, itemAdderProps, listProps, listState } from "../types"
import { FlatList, StyleSheet, Text, View } from "react-native"
import ItemAdder from "./ItemAdder"
import List from "./List"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function Main() {
  const insets = useSafeAreaInsets()
  const [listState, setListState] = useState<listState>({list: [], save: false, added: false})
  const key = 'list-key'
  const list = listState.list
  const listRef = useRef<FlatList>(null)

  useEffect(() => {
    async function retrieveList() {
      try {
        const jsonList = await AsyncStorage.getItem(key)
        let newList: item[]
        if (jsonList != null) {
          newList = await JSON.parse(jsonList)
        } else {
          newList = []
        }
        setList(newList, false)
      } catch (e) {
        console.error('could not load list: ' + e)
      }
    }
    retrieveList()
  }, [])

  useEffect(() => {
    async function storeList() {
      try {
        const jsonList = JSON.stringify(list)
        await AsyncStorage.setItem(key, jsonList)
      } catch (e) {
        console.error('could not save list: ' + e)
      }
    }
    if (listState.save) {
      storeList()
    }
    if (listState.added) {
      if (listRef.current) {
        listRef.current.scrollToEnd()
      }
    }
  }, [listState])

  function setList(list: item[], save: boolean = true, added: boolean = false) {
    setListState({list, save, added})
  }

  function addItem(text: string) {
    let id = 0
    if (list.length !== 0) {
      const ids = list.map(i => i.id)
      id = Math.max(...ids) + 1
    }
    const item: item = {id: id, text: text, done: false}
    setList([...list, item], true, true)
  }
  const itemAdderProps: itemAdderProps = {add: addItem}

  function toggleDone(id: number): void {
    const newList = list.map((item) => {
      if (item.id === id) {
        return {id, text: item.text, done: !(item.done)}
      } else {
        return item
      }
    })
    setList(newList)
  }
  const listProps: listProps = {list, toggleDone, listRef}
  return (
    <View style={styles.container}>
      <View style={[{paddingTop: insets.top}, styles.top]}>
        <Text style={styles.title}>Todo list</Text>
        <ItemAdder props={{...itemAdderProps}} />
      </View>
      <List props={listProps} />
      <View style={[{height: insets.bottom}, styles.bottom]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'hidden',
  },
  top: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
  },
  bottom: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
