import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface SignalStrengthBarProps {
  strength: number; // 0-100
  size?: 'small' | 'medium' | 'large';
}

export const SignalStrengthBar: React.FC<SignalStrengthBarProps> = ({ 
  strength, 
  size = 'medium' 
}) => {
  const getBarHeight = (index: number) => {
    const heights = {
      small: [8, 12, 16, 20],
      medium: [12, 18, 24, 30],
      large: [16, 24, 32, 40],
    };
    return heights[size][index];
  };

  const getBarColor = (index: number) => {
    const threshold = (index + 1) * 25;
    if (strength >= threshold) {
      if (strength >= 75) return colors.success;
      if (strength >= 50) return colors.warning;
      return colors.danger;
    }
    return colors.lightGray;
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              height: getBarHeight(index),
              backgroundColor: getBarColor(index),
              marginLeft: index > 0 ? 2 : 0,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 4,
    borderRadius: 2,
  },
});