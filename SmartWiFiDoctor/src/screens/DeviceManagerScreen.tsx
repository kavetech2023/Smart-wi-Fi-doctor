import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { colors } from '../constants/colors';
import { connectedDevices } from '../data/dummyData';
import { ConnectedDevice } from '../types';

const DeviceManagerScreen: React.FC = () => {
  const [devices, setDevices] = useState<ConnectedDevice[]>(connectedDevices);

  const getDeviceIcon = (deviceType: ConnectedDevice['deviceType']) => {
    switch (deviceType) {
      case 'phone':
        return 'phone-portrait';
      case 'laptop':
        return 'laptop';
      case 'tablet':
        return 'tablet-portrait';
      case 'smart-tv':
        return 'tv';
      default:
        return 'help-circle';
    }
  };

  const handleBlockDevice = (deviceId: string) => {
    Alert.alert(
      'Block Device',
      'Are you sure you want to block this device from your network?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: () => {
            setDevices(devices.filter(d => d.id !== deviceId));
          },
        },
      ]
    );
  };

  const handleMarkAsKnown = (deviceId: string) => {
    setDevices(devices.map(device => 
      device.id === deviceId 
        ? { ...device, isUnknown: false, name: `Device ${deviceId}` }
        : device
    ));
  };

  const totalBandwidth = devices.reduce((sum, device) => sum + device.bandwidthUsage, 0);
  const unknownDevices = devices.filter(d => d.isUnknown);

  const DeviceItem: React.FC<{ device: ConnectedDevice }> = ({ device }) => (
    <View style={[styles.deviceItem, device.isUnknown && styles.unknownDevice]}>
      <View style={styles.deviceInfo}>
        <View style={styles.deviceHeader}>
          <Ionicons 
            name={getDeviceIcon(device.deviceType)} 
            size={24} 
            color={device.isUnknown ? colors.danger : colors.primary} 
          />
          <View style={styles.deviceDetails}>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceIP}>{device.ipAddress}</Text>
            <Text style={styles.deviceLastSeen}>Last seen: {device.lastSeen}</Text>
          </View>
        </View>
        
        <View style={styles.bandwidthInfo}>
          <Text style={styles.bandwidthLabel}>Bandwidth Usage</Text>
          <View style={styles.bandwidthBar}>
            <View 
              style={[
                styles.bandwidthFill, 
                { 
                  width: `${(device.bandwidthUsage / totalBandwidth) * 100}%`,
                  backgroundColor: device.isUnknown ? colors.danger : colors.primary,
                }
              ]} 
            />
          </View>
          <Text style={styles.bandwidthValue}>{device.bandwidthUsage.toFixed(1)} Mbps</Text>
        </View>
      </View>
      
      <View style={styles.deviceActions}>
        {device.isUnknown ? (
          <>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleMarkAsKnown(device.id)}
            >
              <Ionicons name="checkmark" size={16} color={colors.success} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleBlockDevice(device.id)}
            >
              <Ionicons name="ban" size={16} color={colors.danger} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleBlockDevice(device.id)}
          >
            <Ionicons name="ellipsis-horizontal" size={16} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Network Overview */}
      <Card>
        <View style={styles.overviewHeader}>
          <Ionicons name="analytics" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Network Overview</Text>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{devices.length}</Text>
            <Text style={styles.statLabel}>Connected Devices</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.danger }]}>
              {unknownDevices.length}
            </Text>
            <Text style={styles.statLabel}>Unknown Devices</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalBandwidth.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Total Usage (Mbps)</Text>
          </View>
        </View>
      </Card>

      {/* Unknown Devices Alert */}
      {unknownDevices.length > 0 && (
        <Card style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <Ionicons name="warning" size={24} color={colors.danger} />
            <Text style={styles.alertTitle}>Security Alert</Text>
          </View>
          <Text style={styles.alertText}>
            {unknownDevices.length} unknown device(s) detected on your network. 
            Review and take action to secure your network.
          </Text>
          <Button
            title="Review Unknown Devices"
            onPress={() => console.log('Scroll to unknown devices')}
            variant="danger"
            size="small"
            style={styles.alertButton}
          />
        </Card>
      )}

      {/* Device List */}
      <Card>
        <View style={styles.deviceListHeader}>
          <Text style={styles.cardTitle}>Connected Devices</Text>
          <TouchableOpacity>
            <Ionicons name="refresh" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {devices.map((device) => (
          <DeviceItem key={device.id} device={device} />
        ))}
      </Card>

      {/* Network Security Tips */}
      <Card>
        <View style={styles.tipsHeader}>
          <Ionicons name="shield-checkmark" size={24} color={colors.success} />
          <Text style={styles.cardTitle}>Security Tips</Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.tipText}>
            Regularly review connected devices and remove unknown ones
          </Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.tipText}>
            Use strong, unique passwords for your Wi-Fi network
          </Text>
        </View>
        
        <View style={styles.tip}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.tipText}>
            Enable WPA3 security if supported by your router
          </Text>
        </View>
        
        <Button
          title="Learn More About Network Security"
          onPress={() => console.log('Open security guide')}
          variant="secondary"
          size="small"
          style={styles.learnMoreButton}
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
  overviewHeader: {
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  alertCard: {
    backgroundColor: colors.danger + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
    marginLeft: 8,
  },
  alertText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 20,
    marginBottom: 12,
  },
  alertButton: {
    alignSelf: 'flex-start',
  },
  deviceListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  unknownDevice: {
    backgroundColor: colors.danger + '05',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  deviceDetails: {
    marginLeft: 12,
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
  deviceIP: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  deviceLastSeen: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  bandwidthInfo: {
    marginLeft: 36,
  },
  bandwidthLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  bandwidthBar: {
    height: 4,
    backgroundColor: colors.lightGray,
    borderRadius: 2,
    marginBottom: 4,
  },
  bandwidthFill: {
    height: '100%',
    borderRadius: 2,
  },
  bandwidthValue: {
    fontSize: 12,
    color: colors.dark,
    fontWeight: '500',
  },
  deviceActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
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
  learnMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
});

export default DeviceManagerScreen;