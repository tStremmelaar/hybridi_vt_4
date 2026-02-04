import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import { listProps } from "../types";
import { useRef } from "react";

export default function List({props}: {props: listProps}) {
  const list = props.list

  return (
    <FlatList
    ref={props.listRef}
      data={list}
      renderItem={({item}) =>
        <Pressable onPress={() => props.toggleDone(item.id)}>
          <Text style={[styles.item, (item.done) ? styles.done : null]}>
            {item.text}
          </Text>
        </Pressable>
      }
    />
  )
}

const styles = StyleSheet.create({
  item: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 18,
  },
  done: {
    textDecorationLine: 'line-through'
  }
})
