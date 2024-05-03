// components/QuoteGenerator.js
import * as Sharing from 'expo-sharing';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Share from 'react-native-share';

const quotes = [
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  // Add more quotes as needed
];

const QuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const shareQuote = async () => {
    try {
      await Sharing.shareAsync({
        message: currentQuote,
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };
  
  return (
    <View>
      <Text>{currentQuote}</Text>
      <TouchableOpacity onPress={getRandomQuote}>
        <FontAwesome name="refresh" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareQuote}>
        <FontAwesome name="share" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default QuoteGenerator;
