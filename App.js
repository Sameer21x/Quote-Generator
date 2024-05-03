// App.js
import React, { useState, useEffect,useCallback } from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { View,Text,TouchableOpacity,StatusBar, Linking} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Speech from 'react-native-speak';
import Clipboard from '@react-native-clipboard/clipboard';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


const App = () => {

 

 

  const [Quote, setQuote] = useState('Loading......');
  const [Author, setAuthor] = useState('Loading......');
  const [isLoading,setIsLoading]=useState(false);



  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
      setQuote(result.content);
      setAuthor(result.author);
      setIsLoading(false);
    })
  }

    useEffect(() => {
      randomQuote();
    }, []);


    const copyToClipboard = async () => {
      if (await Clipboard.hasString()) {
        Clipboard.setString(Quote);
        Snackbar.show({
          text: 'Quote Copied',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        console.warn('Clipboard is not available.');
      }
    };
    

  const tweetNow = ()=>{
    const url='https://twitter.com/intent/tweet?text='+ Quote;
    Linking.openURL(url);
  }

  const speakNow = () => {
    try {
      Speech.speak(Quote);
    } catch (error) {
      console.error('Speech.speak error:', error);
    }
  }
  

  return (

    
   <View style={{flex:1, justifyContent:'center',backgroundColor:'green'}}>
        <StatusBar barStyle="light-content" />
    <View style={{width:'80%',backgroundColor:'white',borderRadius:22,padding:20,marginLeft:37}}>
      <Text style=
        {{textAlign:'center',
        fontSize:26,
        fontWeight:'600',
        color:'black',
        margin:25}}>Quote of the Day!
      </Text>
      <FontAwesome5 name='quote-left' style={{fontSize:20,color:'black',marginBottom:-15}}></FontAwesome5>


      <Text style=
        {{color:'black',
        fontSize:16,
        lineHeight:20,
        letterSpacing:1.2,
        fontWeight:'400',
        textAlign:'center',
      marginBottom:10,
      paddingHorizontal:30}}>{Quote}
      </Text>
      <FontAwesome5 name='quote-right' style={{fontSize:20,color:'black',textAlign:'right'}}></FontAwesome5>

      <Text style={{textAlign:'right',fontWeight:'300',fontStyle:'italic',fontSize:15,color:'black',marginTop:20}}>---- {Author}</Text>


      <TouchableOpacity onPress={randomQuote} 
      style={{backgroundColor: isLoading ? 'rgba(0, 128, 0, 0.5)' :'green',padding:20,borderRadius:30,marginVertical:20}}>
        <Text style={{color:'white',fontSize:18,textAlign:'center'}}>{isLoading ? 'Loading....' : 'New Quote'}</Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row',justifyContent:'space-around'}}>

        <TouchableOpacity onPress={speakNow} 
        style={{borderWidth:2,
          borderColor:'green',
          borderRadius:100,
          padding:15}}>
          <FontAwesome name='volume-up' size={22} color='green'></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={tweetNow} 
        style={{borderWidth:2,
          borderColor:'green',
        borderRadius:50,
        padding:15}}>
          <FontAwesome name='twitter' size={22} color='green'></FontAwesome>
        </TouchableOpacity>

        <TouchableOpacity onPress={copyToClipboard} 
        style={{borderWidth:2,
          borderColor:'green',
        borderRadius:50,padding:15}}>
          <FontAwesome name='copy' size={22} color='green'></FontAwesome>
        </TouchableOpacity>
        
      </View>
    </View>

   </View>
  );
};

export default App;
