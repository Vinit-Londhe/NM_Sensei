import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const ResultScreen = ({ route }) => {
  const { result } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { backgroundColor: '#001524' }]}>{item.iteration}</Text>
      <Text style={[styles.cell, { backgroundColor: 'black' }]}>{item.a}</Text>
      <Text style={[styles.cell, { backgroundColor: '#001524' }]}>{item.b}</Text>
      <Text style={[styles.cell, { backgroundColor: 'black' }]}>{item.c}</Text>
      <Text style={[styles.cell, { backgroundColor: '#001524' }]}>{item.fc}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.resultText}>Result</Text>
      <Text style={styles.msg}>{result.message}</Text>

      <FlatList
        data={result.results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { backgroundColor: '#001524' }]}>iteration</Text>
            <Text style={[styles.headerCell, { backgroundColor: 'black' }]}>a</Text>
            <Text style={[styles.headerCell, { backgroundColor: '#001524' }]}>b</Text>
            <Text style={[styles.headerCell, { backgroundColor: 'black' }]}>c</Text>
            <Text style={[styles.headerCell, { backgroundColor: '#001524' }]}>fc</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  msg: {
    fontSize: 20,
    color: 'green',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  resultText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  cell: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    borderRightColor: 'white',
    borderRightWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  headerCell: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightColor: 'white',
    borderRightWidth: 2,
  },
});

export default ResultScreen;
