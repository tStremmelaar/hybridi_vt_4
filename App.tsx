import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { item, itemAdderProps, listProps, listState } from './types';
import List from './components/List';
import ItemAdder from './components/ItemAdder';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [listState, setListState] = useState<listState>({list: [], save: false})
  const key = 'list-key'
  const list = listState.list

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
  }, [listState])

  function setList(list: item[], save: boolean = true) {
    setListState({list, save})
  }

  function addItem(text: string): void {
    let id = 0
    if (list.length !== 0) {
      const ids = list.map(i => i.id)
      id = Math.max(...ids) + 1
    }
    const item: item = {id: id, text: text, done: false}
    setList([...list, item])
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
  const listProps: listProps = {list, toggleDone}

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text style={styles.title}>Todo list</Text>
        <ItemAdder props={{...itemAdderProps}} />
        <List props={listProps}/>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 30,
  },
});
