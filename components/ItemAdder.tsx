import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { itemAdderProps } from "../types";
import { Ref, useRef, useState } from "react";

export default function ItemAdder({props}: {props: itemAdderProps}) {
  const [text, setText] = useState<string>('')
  const inputRef = useRef<TextInput>(null)

  function submit() {
    if (text && text.trim()) {
      props.add(text)
      setText('')
    }
  }

  return(
    <View style={styles.line}>
      <TextInput
        ref={inputRef}
        maxLength={300}
        multiline={true}
        onChangeText={setText}
        onSubmitEditing={submit}
        placeholder="Enter task"
        returnKeyType="done"
        value={text}
        style={styles.input}
        submitBehavior="blurAndSubmit"
      />
      <Pressable onPress={() => {
        submit()
        inputRef.current?.blur()
      }}>
        <Text style={styles.button}>Save</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
  },
  input: {
    flex: 3,
    margin: 10,
    fontSize: 20,
  },
  button: {
    flex: 1,
    margin: 10,
    color: "#08f",
    fontSize: 24
  },
})