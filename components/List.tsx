import { FlatList, StyleSheet, Text } from "react-native";
import { item } from "../types";

export default function List({list}: {list: item[]}) {
  return (
    <FlatList
      data={list}
      renderItem={({item}) => 
        <Text style={[styles.item, (item.done) ? styles.done : null]}>
          {item.text}
        </Text>
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
    fontSize: 20,
  },
  done: {
    textDecorationLine: 'line-through'
  }
})