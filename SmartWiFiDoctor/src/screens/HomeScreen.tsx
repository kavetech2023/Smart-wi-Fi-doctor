import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { SignalStrengthBar } from '../components/SignalStrengthBar';
import { Button } from '../components/Button';
import { colors } from '../constants/colors';
import { currentNetwork, speedTestResult } from '../data/dummyData';

const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleScanNetwork = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  const getSignalQuality = (strength: number) => {
    if (strength >= 80) return { text: 'Excellent', color: colors.success };
    if (strength >= 60) return { text: 'Good', color: colors.warning };
    if (strength >= 40) return { text: 'Fair', color: colors.warning };
    return { text: 'Poor', color: colors.danger };
  };

  const signalQuality = getSignalQuality(currentNetwork.signalStrength);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Current Network Status */}
      <Card>
        <View style={styles.networkHeader}>
          <Ionicons name="wifi" size={24} color={colors.primary} />
          <Text style={styles.networkName}>{currentNetwork.ssid}</Text>
        </View>
        
        <View style={styles.signalContainer}>
          <View style={styles.signalInfo}>
            <Text style={styles.signalLabel}>Signal Strength</Text>
            <View style={styles.signalDisplay}>
              <SignalStrengthBar strength={currentNetwork.signalStrength} size="large" />
              <Text style={styles.signalPercentage}>
                {currentNetwork.signalStrength}%
              </Text>
            </View>
            <Text style={[styles.signalQuality, { color: signalQuality.color }]}>
              {signalQuality.text}
            </Text>
          </View>
        </View>

        <View style={styles.networkDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Channel:</Text>
            <Text style={styles.detailValue}>{currentNetwork.channel}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Frequency:</Text>
            <Text style={styles.detailValue}>{currentNetwork.frequency}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Security:</Text>
            <Text style={styles.detailValue}>{currentNetwork.security}</Text>
          </View>
        </View>
      </Card>

      {/* Speed Test Results */}
      <Card>
        <View style={styles.speedHeader}>
          <Ionicons name="speedometer" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Internet Speed</Text>
        </View>
        
        <View style={styles.speedContainer}>
          <View style={styles.speedItem}>
            <Ionicons name="download" size={20} color={colors.success} />
            <Text style={styles.speedValue}>{speedTestResult.downloadSpeed}</Text>
            <Text style={styles.speedUnit}>Mbps</Text>
            <Text style={styles.speedLabel}>Download</Text>
          </View>
          
          <View style={styles.speedDivider} />
          
          <View style={styles.speedItem}>
            <Ionicons name="cloud-upload" size={20} color={colors.warning} />
            <Text style={styles.speedValue}>{speedTestResult.uploadSpeed}</Text>
            <Text style={styles.speedUnit}>Mbps</Text>
            <Text style={styles.speedLabel}>Upload</Text>
          </View>
          
          <View style={styles.speedDivider} />
          
          <View style={styles.speedItem}>
            <Ionicons name="time" size={20} color={colors.secondary} />
            <Text style={styles.speedValue}>{speedTestResult.ping}</Text>
            <Text style={styles.speedUnit}>ms</Text>
            <Text style={styles.speedLabel}>Ping</Text>
          </View>
        </View>
      </Card>

      {/* Quick Actions */}
      <Card>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        
        <Button
          title={isScanning ? "Scanning..." : "Scan Network"}
          onPress={handleScanNetwork}
          disabled={isScanning}
          style={styles.scanButton}
        />
        
        <View style={styles.actionButtons}>
          <Button
            title="Run Speed Test"
            onPress={() => console.log('Speed test')}
            variant="secondary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Find Dead Zones"
            onPress={() => console.log('Dead zones')}
            variant="secondary"
            size="small"
            style={styles.actionButton}
          />
        </View>
      </Card>

      {/* Status Alerts */}
      <Card>
        <View style={styles.alertHeader}>
          <Ionicons name="notifications" size={24} color={colors.warning} />
          <Text style={styles.cardTitle}>Status Alerts</Text>
        </View>
        
        <View style={styles.alert}>
          <Ionicons name="warning" size={16} color={colors.warning} />
          <Text style={styles.alertText}>
            Unknown device detected on your network
          </Text>
        </View>
        
        <View style={styles.alert}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.alertText}>
            All systems running normally
          </Text>
        </View>
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
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  networkName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.dark,
    marginLeft: 8,
  },
  signalContainer: {
    marginBottom: 16,
  },
  signalInfo: {
    alignItems: 'center',
  },
  signalLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  signalDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  signalPercentage: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginLeft: 12,
  },
  signalQuality: {
    fontSize: 14,
    fontWeight: '500',
  },
  networkDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.dark,
  },
  speedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginLeft: 8,
  },
  speedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  speedItem: {
    alignItems: 'center',
    flex: 1,
  },
  speedValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.dark,
    marginTop: 4,
  },
  speedUnit: {
    fontSize: 12,
    color: colors.gray,
  },
  speedLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  speedDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  scanButton: {
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertText: {
    fontSize: 14,
    color: colors.dark,
    marginLeft: 8,
    flex: 1,
  },
});

export default HomeScreen;