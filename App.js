import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    console.log('endAddGoalHandler');
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    //console.log(enteredGoalText);
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, 
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endAddGoalHandler();
  }
function deleteGoalHandler(id) {
  setCourseGoals(currentCourseGoals => { return currentCourseGoals.filter((goal) => goal.id !== id);
});
}
  
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title='Add new Goal' color='#a065ec' onPress={startAddGoalHandler}/>
      <GoalInput visible={modalIsVisible} onCancel={endAddGoalHandler} onAddGoal={addGoalHandler} />
      <View style={styles.goalContainer}>
    <FlatList data={courseGoals} renderItem={(itemData) => {
      return (
        <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>
      );
    }}
    keyExtractor={(item, index) => {
      return item.id;
    } }
    alwaysBounceVertical={false} /> 
    </View>
    </View>
    </>
  );  
    
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  
  goalContainer: {
    flex: 5
  }
});
