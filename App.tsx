import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { item, itemAdderProps } from './types';
import List from './components/List';
import ItemAdder from './components/ItemAdder';

export default function App() {
  const [list, setList] = useState<item[]>([{id: 0, text: 'Hello, World!', done: false}, {id: 1, text: 'Hello, you!', done: true}])

  function addItem(text: string): void {
    const ids = list.map(i => i.id)
    const id = Math.max(...ids) + 1
    const item: item = {id: id, text: text, done: false}
    setList([...list, item])
  }
  const itemAdderProps: itemAdderProps = {add: addItem}

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ItemAdder props={{...itemAdderProps}} />
        <List list={list}/>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  
});
