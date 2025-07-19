import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/Card';
import { SignalStrengthBar } from '../components/SignalStrengthBar';
import { Button } from '../components/Button';
import { colors } from '../constants/colors';
import { nearbyNetworks } from '../data/dummyData';
import { WiFiNetwork } from '../types';

const NetworkScanScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [networks, setNetworks] = useState<WiFiNetwork[]>(nearbyNetworks);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getChannelRecommendation = () => {
    const usedChannels = networks.map(n => n.channel);
    const recommendedChannels = [1, 6, 11]; // Common non-overlapping channels for 2.4GHz
    
    for (const channel of recommendedChannels) {
      if (!usedChannels.includes(channel)) {
        return channel;
      }
    }
    
    // If all recommended channels are used, find the least congested
    const channelCounts = usedChannels.reduce((acc, channel) => {
      acc[channel] = (acc[channel] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    return Object.keys(channelCounts).reduce((a, b) => 
      channelCounts[parseInt(a)] < channelCounts[parseInt(b)] ? a : b
    );
  };

  const recommendedChannel = getChannelRecommendation();

  const NetworkItem: React.FC<{ network: WiFiNetwork }> = ({ network }) => (
    <TouchableOpacity style={styles.networkItem}>
      <View style={styles.networkInfo}>
        <View style={styles.networkHeader}>
          <Text style={styles.networkSSID}>{network.ssid}</Text>
          {network.isConnected && (
            <View style={styles.connectedBadge}>
              <Text style={styles.connectedText}>Connected</Text>
            </View>
          )}
          {network.isRecommended && (
            <View style={styles.recommendedBadge}>
              <Text style={styles.recommendedText}>Recommended</Text>
            </View>
          )}
        </View>
        
        <View style={styles.networkDetails}>
          <Text style={styles.networkDetail}>
            Channel {network.channel} • {network.frequency} • {network.security}
          </Text>
        </View>
      </View>
      
      <View style={styles.networkSignal}>
        <SignalStrengthBar strength={network.signalStrength} />
        <Text style={styles.signalText}>{network.signalStrength}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Channel Recommendation */}
      <Card>
        <View style={styles.recommendationHeader}>
          <Ionicons name="bulb" size={24} color={colors.warning} />
          <Text style={styles.cardTitle}>Channel Recommendation</Text>
        </View>
        
        <Text style={styles.recommendationText}>
          For optimal performance, consider switching to channel{' '}
          <Text style={styles.recommendedChannelText}>{recommendedChannel}</Text>
          {' '}to reduce interference.
        </Text>
        
        <Button
          title="How to Change Channel"
          onPress={() => console.log('Show channel change guide')}
          variant="secondary"
          size="small"
          style={styles.guideButton}
        />
      </Card>

      {/* Network List */}
      <Card>
        <View style={styles.networkListHeader}>
          <Text style={styles.cardTitle}>Nearby Networks ({networks.length})</Text>
          <TouchableOpacity onPress={onRefresh}>
            <Ionicons name="refresh" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {networks.map((network, index) => (
          <NetworkItem key={`${network.ssid}-${index}`} network={network} />
        ))}
      </Card>

      {/* Channel Usage Chart */}
      <Card>
        <Text style={styles.cardTitle}>Channel Usage</Text>
        <Text style={styles.chartDescription}>
          Visual representation of channel congestion
        </Text>
        
        <View style={styles.channelChart}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((channel) => {
            const networksOnChannel = networks.filter(n => n.channel === channel).length;
            const height = Math.max(20, networksOnChannel * 30);
            const isRecommended = channel === parseInt(recommendedChannel.toString());
            
            return (
              <View key={channel} style={styles.channelBar}>
                <View
                  style={[
                    styles.channelBarFill,
                    {
                      height,
                      backgroundColor: isRecommended ? colors.success : 
                        networksOnChannel > 2 ? colors.danger : 
                        networksOnChannel > 0 ? colors.warning : colors.lightGray,
                    },
                  ]}
                />
                <Text style={styles.channelLabel}>{channel}</Text>
              </View>
            );
          })}
        </View>
        
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.success }]} />
            <Text style={styles.legendText}>Recommended</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.warning }]} />
            <Text style={styles.legendText}>Moderate</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.danger }]} />
            <Text style={styles.legendText}>Congested</Text>
          </View>
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
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.dark,
    marginLeft: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendedChannelText: {
    fontWeight: '600',
    color: colors.primary,
  },
  guideButton: {
    alignSelf: 'flex-start',
  },
  networkListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  networkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  networkInfo: {
    flex: 1,
  },
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  networkSSID: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    marginRight: 8,
  },
  connectedBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  connectedText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '500',
  },
  recommendedBadge: {
    backgroundColor: colors.warning,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recommendedText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '500',
  },
  networkDetails: {
    marginTop: 2,
  },
  networkDetail: {
    fontSize: 12,
    color: colors.gray,
  },
  networkSignal: {
    alignItems: 'center',
  },
  signalText: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  chartDescription: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 16,
  },
  channelChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 16,
  },
  channelBar: {
    alignItems: 'center',
    flex: 1,
  },
  channelBarFill: {
    width: 20,
    borderRadius: 2,
    marginBottom: 4,
  },
  channelLabel: {
    fontSize: 10,
    color: colors.gray,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: colors.gray,
  },
});

export default NetworkScanScreen;