import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, Appearance, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';


const defImg = require('./assets/omor.jpg');
const grad = require('./assets/grad.png');

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <View style={styles.container} backgroundColor={'black'} backgroundImage={selectedImage  ? { uri: selectedImage } : 'black'} >
        <Image style={styles.absolute} source={{uri: selectedImage}} blurRadius={100} resizeMode="cover" />
        <Image source={grad} style={styles.bottomFill}/>
        <View style={styles.container}>
          <Pressable marginBottom={90}>
            <Image source={selectedImage ? { uri: selectedImage } : defImg} style={styles.Image}/>
          </Pressable>
          <Pressable style={styles.button} onPress={pickImageAsync} android_ripple={{color: '#d4d4d'}} >
            <FontAwesome name="image" size={18} color="black" />
            <Text style={styles.buttonLabel}>Choose a photo</Text>
          </Pressable>
          <Text style={styles.redText}>Use this photo</Text>
          <StatusBar style="auto" />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redText: {
    color: '#b4b4b4',
    fontWeight: 'bold',
  },
  bottomFill: {
    position: 'absolute',
    bottom: 0,
    height: '80%',
    width: '100%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  Image:{
    width: 300,
    height: 400,
    borderRadius: 5,
  },
  button: {
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 50,
    width: 300,
    marginTop: 100,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 8,
  },
  buttonLabel: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  }
});

