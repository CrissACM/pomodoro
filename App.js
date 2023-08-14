import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './src/components/Header';
import Timer from './src/components/Timer';

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2'];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState('POMO' | 'SHORT' | 'BREAK');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 10);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  function handleStartStop() {
    playSound();
    setIsActive(!isActive);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/click.mp3')
    );
    await sound.playAsync();
  }

  return (
    <View style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <Text style={styles.text}>Pomodoro</Text>
      <Header
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setTime={setTime}
      />
      <Timer time={time} />
      <TouchableOpacity onPress={handleStartStop} style={styles.button}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isActive ? 'STOP' : 'START'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  text: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
  },
});
