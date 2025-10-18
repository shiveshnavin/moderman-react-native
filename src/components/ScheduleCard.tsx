import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Schedule } from '../models/Schedule';

interface ScheduleCardProps {
  schedule: Schedule;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  schedule,
  onApprove,
  onReject,
  onDelete,
}) => {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const { payload } = schedule;
  const postItem = payload?.outpotPostItem;

  return (
    <View style={styles.card}>
      {postItem?.generated_file_url && postItem.media_type?.includes('image') && (
        <Image
          source={{ uri: postItem.generated_file_url }}
          style={styles.media}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <Text style={styles.text}>{postItem?.text || 'No content'}</Text>
        
        <View style={styles.metadata}>
          <Text style={styles.metadataText}>Platform: {schedule.platform}</Text>
          <Text style={styles.metadataText}>Type: {schedule.type}</Text>
          <Text style={styles.metadataText}>
            Scheduled: {formatDate(schedule.targetTimestamp)}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.approveButton]}
            onPress={() => onApprove(schedule.id)}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={() => onReject(schedule.id)}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => onDelete(schedule.id)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  metadata: {
    marginBottom: 16,
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
