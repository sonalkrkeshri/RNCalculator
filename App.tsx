/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const buttons = [
  ['C', '(', ')', '%'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['+/-', '0', '.', '+'],
  ['='],
];

function App() {
  const [input, setInput] = useState('');
const [result, setResult] = useState('');

useEffect(() => {
    try {
        if (input) {
            let finalInput = input.replace(/×/g, '*').replace(/÷/g, '/');
            const evalResult = eval(finalInput);
            setResult(evalResult.toString());
        } else {
            setResult('');
        }
    } catch (e) {
        setResult('');
    }
}, [input]); 

  const handlePress = (btn) => {
    if (btn === 'C') {
        setInput('');
        setResult('');
    } else if (btn === '=') {
    } else if (btn === '+/-') {
        if (input.startsWith('-')) setInput(input.substring(1));
        else setInput('-' + input);
    } else {
        setInput((prev) => prev + btn);
    }
  }
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.inputText}>{input + "  "}</Text>
          <Text style={styles.resultText}>{result + " "}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {buttons.map((row, rowIndex)=> (
            <View key={rowIndex} style={styles.row}>
           { row.map((btn, colIndex) => (
              <TouchableOpacity
            key={colIndex}
            style={[
              styles.button,
              btn === '=' ? styles.equalsButton : null, 
            ]}
            onPress={() => handlePress(btn)}
          ><Text style={[styles.buttonText, btn === '=' && { fontSize: 28 }]}>
              {btn} 
            </Text>
          </TouchableOpacity>
            ))}
            </View>
          ))}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    justifyContent: 'space-between',
  },
  resultContainer: {
    padding: 50,
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 36,
    color: '#AFAFAF',
  },
  resultText: {
    fontSize: 40, 
    color: '#fff', 
    marginTop: 10, 
  },
  buttonsContainer: {
    padding: 10, 
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 6, 
  },
  button: {
    backgroundColor: '#1c1c1c', 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: 5, 
    height: 70,
    borderRadius: 35, 
  },
  equalsButton: {
    backgroundColor: '#1FD660',
    flex: 4, 
  },
  buttonText: {
    fontSize: 24,
    color: '#fff', 
  }
});

export default App;
