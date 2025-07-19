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
import { troubleshootingSteps, faqs } from '../data/dummyData';

const TroubleshootingScreen: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'restart':
        Alert.alert(
          'Restart Router',
          'This will guide you through restarting your router. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: () => console.log('Show restart guide') },
          ]
        );
        break;
      case 'firmware':
        Alert.alert(
          'Update Firmware',
          'This will check for router firmware updates. Continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: () => console.log('Check firmware') },
          ]
        );
        break;
      case 'contact':
        Alert.alert(
          'Contact ISP',
          'This will help you contact your Internet Service Provider.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Continue', onPress: () => console.log('Contact ISP') },
          ]
        );
        break;
    }
  };

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Quick Actions */}
      <Card>
        <View style={styles.quickActionsHeader}>
          <Ionicons name="flash" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Quick Actions</Text>
        </View>
        
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => handleQuickAction('restart')}
          >
            <Ionicons name="refresh-circle" size={32} color={colors.primary} />
            <Text style={styles.actionTitle}>Restart Router</Text>
            <Text style={styles.actionDescription}>Fix common connectivity issues</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => handleQuickAction('firmware')}
          >
            <Ionicons name="download" size={32} color={colors.secondary} />
            <Text style={styles.actionTitle}>Update Firmware</Text>
            <Text style={styles.actionDescription}>Keep your router up to date</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => handleQuickAction('contact')}
          >
            <Ionicons name="call" size={32} color={colors.warning} />
            <Text style={styles.actionTitle}>Contact ISP</Text>
            <Text style={styles.actionDescription}>Get help from your provider</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => console.log('Run diagnostics')}
          >
            <Ionicons name="medical" size={32} color={colors.success} />
            <Text style={styles.actionTitle}>Run Diagnostics</Text>
            <Text style={styles.actionDescription}>Automated problem detection</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Step-by-Step Troubleshooting */}
      <Card>
        <View style={styles.troubleshootingHeader}>
          <Ionicons name="list" size={24} color={colors.primary} />
          <Text style={styles.cardTitle}>Step-by-Step Guide</Text>
        </View>
        
        <Text style={styles.troubleshootingDescription}>
          Follow these steps in order to resolve common Wi-Fi issues:
        </Text>
        
        {troubleshootingSteps.map((step, index) => (
          <View key={step.id} style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
              <Button
                title="Start This Step"
                onPress={() => console.log(`Start step: ${step.title}`)}
                variant="secondary"
                size="small"
                style={styles.stepButton}
              />
            </View>
          </View>
        ))}
      </Card>

      {/* Common Issues */}
      <Card>
        <View style={styles.issuesHeader}>
          <Ionicons name="help-circle" size={24} color={colors.warning} />
          <Text style={styles.cardTitle}>Common Issues</Text>
        </View>
        
        <View style={styles.issueItem}>
          <Ionicons name="wifi-off" size={20} color={colors.danger} />
          <View style={styles.issueContent}>
            <Text style={styles.issueTitle}>No Internet Connection</Text>
            <Text style={styles.issueDescription}>
              Check cables, restart router, contact ISP if needed
            </Text>
          </View>
          <TouchableOpacity style={styles.issueAction}>
            <Ionicons name="chevron-forward" size={16} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.issueItem}>
          <Ionicons name="speedometer" size={20} color={colors.warning} />
          <View style={styles.issueContent}>
            <Text style={styles.issueTitle}>Slow Internet Speed</Text>
            <Text style={styles.issueDescription}>
              Check for interference, limit connected devices
            </Text>
          </View>
          <TouchableOpacity style={styles.issueAction}>
            <Ionicons name="chevron-forward" size={16} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.issueItem}>
          <Ionicons name="refresh" size={20} color={colors.secondary} />
          <View style={styles.issueContent}>
            <Text style={styles.issueTitle}>Frequent Disconnections</Text>
            <Text style={styles.issueDescription}>
              Update drivers, check router placement, reduce interference
            </Text>
          </View>
          <TouchableOpacity style={styles.issueAction}>
            <Ionicons name="chevron-forward" size={16} color={colors.gray} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* FAQ Section */}
      <Card>
        <View style={styles.faqHeader}>
          <Ionicons name="chatbubbles" size={24} color={colors.secondary} />
          <Text style={styles.cardTitle}>Frequently Asked Questions</Text>
        </View>
        
        {faqs.map((faq) => (
          <View key={faq.id} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.faqQuestion}
              onPress={() => toggleFAQ(faq.id)}
            >
              <Text style={styles.faqQuestionText}>{faq.question}</Text>
              <Ionicons 
                name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"} 
                size={16} 
                color={colors.gray} 
              />
            </TouchableOpacity>
            
            {expandedFAQ === faq.id && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </Card>

      {/* Emergency Contact */}
      <Card style={styles.emergencyCard}>
        <View style={styles.emergencyHeader}>
          <Ionicons name="warning" size={24} color={colors.danger} />
          <Text style={styles.emergencyTitle}>Still Having Issues?</Text>
        </View>
        
        <Text style={styles.emergencyDescription}>
          If you've tried all the steps above and still experiencing problems, 
          we can help you get back online.
        </Text>
        
        <View style={styles.emergencyActions}>
          <Button
            title="Contact Support"
            onPress={() => console.log('Contact support')}
            variant="primary"
            style={styles.emergencyButton}
          />
          <Button
            title="Schedule Technician"
            onPress={() => console.log('Schedule technician')}
            variant="secondary"
            style={styles.emergencyButton}
          />
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
  quickActionsHeader: {
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
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.dark,
    marginTop: 8,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  troubleshootingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  troubleshootingDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
    marginBottom: 8,
  },
  stepButton: {
    alignSelf: 'flex-start',
  },
  issuesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  issueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  issueContent: {
    flex: 1,
    marginLeft: 12,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
  issueDescription: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 2,
  },
  issueAction: {
    padding: 4,
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    flex: 1,
  },
  faqAnswer: {
    paddingBottom: 16,
    paddingRight: 24,
  },
  faqAnswerText: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 20,
  },
  emergencyCard: {
    backgroundColor: colors.danger + '10',
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.danger,
    marginLeft: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 20,
    marginBottom: 16,
  },
  emergencyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencyButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default TroubleshootingScreen;