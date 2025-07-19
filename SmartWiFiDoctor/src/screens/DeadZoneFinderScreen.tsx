import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors } from '../constants/colors';

const DeadZoneFinderScreen: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [currentSignal, setCurrentSignal] = useState(75);
  const [scanResults, setScanResults] = useState<Array<{
    location: string;
    signal: number;
    timestamp: string;
  }>>([]);
  
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (isScanning) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();

      // Simulate signal changes during scanning
      const interval = setInterval(() => {
        setCurrentSignal(Math.floor(Math.random() * 100));
      }, 1500);

      return () => {
        pulseAnimation.stop();
        clearInterval(interval);
      };
    }
  }, [isScanning]);

  const startScanning = () => {
    setIsScanning(true);
    setScanResults([]);
    
    // Stop scanning after 10 seconds and add some dummy results
    setTimeout(() => {
      setIsScanning(false);
      setScanResults([
        { location: 'Living Room', signal: 85, timestamp: 'Just now' },
        { location: 'Kitchen', signal: 72, timestamp: '1 min ago' },
        { location: 'Bedroom', signal: 45, timestamp: '2 min ago' },
        { location: 'Bathroom', signal: 28, timestamp: '3 min ago' },
        { location: 'Garage', signal: 15, timestamp: '4 min ago' },
      ]);
    }, 10000);
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 70) return colors.success;
    if (signal >= 40) return colors.warning;
    return colors.danger;
  };

  const getSignalQuality = (signal: number) => {
    if (signal >= 70) return 'Excellent';
    if (signal >= 40) return 'Good';
    if (signal >= 20) return 'Poor';
    return 'Dead Zone';
  };

  const SignalMeter: React.FC<{ signal: number }> = ({ signal }) => (
    <View style={styles.signalMeter}>
      <View style={styles.signalMeterBackground}>
        <View 
          style={[
            styles.signalMeterFill, 
            { 
              width: `${signal}%`,
              backgroundColor: getSignalColor(signal),
            }
          ]} 
        />
      </View>
      <Text style={[styles.signalPercentage, { color: getSignalColor(signal) }]}>
        {signal}%
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Current Signal Status */}
      <Card>
        <View style={styles.currentSignalHeader}>
          <Ionicons name="radio" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Current Signal Strength</Text>
        </View>
        
        <View style={styles.currentSignalContainer}>
          <Animated.View 
            style={[
              styles.signalIndicator,
              {
                backgroundColor: getSignalColor(currentSignal),
                transform: [{ scale: isScanning ? pulseAnim : 1 }],
              },
            ]}
          >
            <Ionicons name="wifi" size={40} color={colors.white} />
          </Animated.View>
          
          <Text style={styles.signalValue}>{currentSignal}%</Text>
          <Text style={[styles.signalQuality, { color: getSignalColor(currentSignal) }]}>
            {getSignalQuality(currentSignal)}
          </Text>
        </View>
        
        <SignalMeter signal={currentSignal} />
      </Card>

      {/* Scanning Controls */}
      <Card>
        <Text style={styles.cardTitle}>Dead Zone Detection</Text>
        <Text style={styles.scanDescription}>
          Walk around your home while scanning to identify areas with weak Wi-Fi signal.
        </Text>
        
        {!isScanning ? (
          <Button
            title="Start Scanning"
            onPress={startScanning}
            style={styles.scanButton}
          />
        ) : (
          <View style={styles.scanningContainer}>
            <View style={styles.scanningIndicator}>
              <Ionicons name="radio" size={20} color={colors.primary} />
              <Text style={styles.scanningText}>Scanning... Walk around your home</Text>
            </View>
            <Button
              title="Stop Scanning"
              onPress={() => setIsScanning(false)}
              variant="danger"
              size="small"
            />
          </View>
        )}
      </Card>

      {/* Scan Results */}
      {scanResults.length > 0 && (
        <Card>
          <Text style={styles.cardTitle}>Scan Results</Text>
          <Text style={styles.resultsDescription}>
            Signal strength measurements from different locations
          </Text>
          
          {scanResults.map((result, index) => (
            <View key={index} style={styles.resultItem}>
              <View style={styles.resultInfo}>
                <Text style={styles.resultLocation}>{result.location}</Text>
                <Text style={styles.resultTimestamp}>{result.timestamp}</Text>
              </View>
              
              <View style={styles.resultSignal}>
                <View 
                  style={[
                    styles.resultIndicator,
                    { backgroundColor: getSignalColor(result.signal) },
                  ]}
                />
                <Text style={styles.resultValue}>{result.signal}%</Text>
              </View>
            </View>
          ))}
          
          <Button
            title="Save Results"
            onPress={() => console.log('Save scan results')}
            variant="secondary"
            size="small"
            style={styles.saveButton}
          />
        </Card>
      )}

      {/* Improvement Tips */}
      <Card>
        <View style={styles.tipsHeader}>
          <Ionicons name="bulb" size={24} color={colors.warning} />
          <Text style={styles.cardTitle}>Improvement Tips</Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <Text style={styles.tipText}>
            Place your router in a central, elevated location
          </Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="remove-circle" size={16} color={colors.primary} />
          <Text style={styles.tipText}>
            Remove obstacles like walls and metal objects between router and devices
          </Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="repeat" size={16} color={colors.primary} />
          <Text style={styles.tipText}>
            Consider a Wi-Fi extender or mesh system for large homes
          </Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="settings" size={16} color={colors.primary} />
          <Text style={styles.tipText}>
            Adjust router antennas (if adjustable) for better coverage
          </Text>
        </View>
      </Card>

      {/* Router Placement Guide */}
      <Card>
        <View style={styles.guideHeader}>
          <Ionicons name="home" size={24} color={colors.secondary} />
          <Text style={styles.cardTitle}>Optimal Router Placement</Text>
        </View>
        
        <View style={styles.placementGrid}>
          <View style={styles.placementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.placementText}>Central location</Text>
          </View>
          <View style={styles.placementItem}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.placementText}>Elevated position</Text>
          </View>
          <View style={styles.placementItem}>
            <Ionicons name="close-circle" size={20} color={colors.danger} />
            <Text style={styles.placementText}>Near metal objects</Text>
          </View>
          <View style={styles.placementItem}>
            <Ionicons name="close-circle" size={20} color={colors.danger} />
            <Text style={styles.placementText}>In closed cabinets</Text>
          </View>
        </View>
        
        <Button
          title="View Detailed Placement Guide"
          onPress={() => console.log('Open placement guide')}
          variant="secondary"
          size="small"
          style={styles.guideButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  currentSignalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginLeft: 8,
  },
  currentSignalContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signalIndicator: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  signalValue: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: 4,
  },
  signalQuality: {
    fontSize: 16,
    fontWeight: '500',
  },
  signalMeter: {
    alignItems: 'center',
  },
  signalMeterBackground: {
    width: '100%',
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  signalMeterFill: {
    height: '100%',
    borderRadius: 4,
  },
  signalPercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  scanDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  scanButton: {
    marginTop: 8,
  },
  scanningContainer: {
    alignItems: 'center',
  },
  scanningIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scanningText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: '500',
  },
  resultsDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultInfo: {
    flex: 1,
  },
  resultLocation: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
  resultTimestamp: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  resultSignal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
  },
  saveButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: colors.dark,
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  guideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  placementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  placementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  placementText: {
    fontSize: 12,
    color: colors.dark,
    marginLeft: 6,
    flex: 1,
  },
  guideButton: {
    alignSelf: 'flex-start',
  },
});

export default DeadZoneFinderScreen;