import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  Alert,
} from 'react-native';
import { Schedule } from '../models/Schedule';
import { scheduleService } from '../services/scheduleService';
import { ScheduleCard } from '../components/ScheduleCard';

export const ModerationScreen: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadSchedules = useCallback(async (pageNum: number = 0, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else if (pageNum === 0) {
        setLoading(true);
      }

      const response = await scheduleService.getSchedules({
        type: 'publish_bot',
        status: 'pending_approval',
        platform: 'instagram',
        page: pageNum,
        size: 10,
        sort: ['targetTimestamp,DESC'],
      });

      if (isRefresh || pageNum === 0) {
        setSchedules(response.content);
      } else {
        setSchedules(prev => [...prev, ...response.content]);
      }

      setHasMore(response.number < response.totalPages - 1);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading schedules:', error);
      Alert.alert(
        'Error',
        'Failed to load schedules. Please check your API configuration.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadSchedules(0);
  }, [loadSchedules]);

  const handleRefresh = useCallback(() => {
    loadSchedules(0, true);
  }, [loadSchedules]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadSchedules(page + 1);
    }
  }, [loading, hasMore, page, loadSchedules]);

  const handleApprove = useCallback(async (id: string) => {
    try {
      await scheduleService.approveSchedule(id);
      setSchedules(prev => prev.filter(s => s.id !== id));
      Alert.alert('Success', 'Schedule approved successfully');
    } catch (error) {
      console.error('Error approving schedule:', error);
      Alert.alert('Error', 'Failed to approve schedule');
    }
  }, []);

  const handleReject = useCallback(async (id: string) => {
    try {
      await scheduleService.rejectSchedule(id);
      setSchedules(prev => prev.filter(s => s.id !== id));
      Alert.alert('Success', 'Schedule rejected successfully');
    } catch (error) {
      console.error('Error rejecting schedule:', error);
      Alert.alert('Error', 'Failed to reject schedule');
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this schedule?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await scheduleService.deleteSchedule(id);
              setSchedules(prev => prev.filter(s => s.id !== id));
              Alert.alert('Success', 'Schedule deleted successfully');
            } catch (error) {
              console.error('Error deleting schedule:', error);
              Alert.alert('Error', 'Failed to delete schedule');
            }
          },
        },
      ]
    );
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Schedule }) => (
      <ScheduleCard
        schedule={item}
        onApprove={handleApprove}
        onReject={handleReject}
        onDelete={handleDelete}
      />
    ),
    [handleApprove, handleReject, handleDelete]
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No pending schedules to moderate</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading || page === 0) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  if (loading && page === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading schedules...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Content Moderation</Text>
        <Text style={styles.headerSubtitle}>Instagram Posts Pending Approval</Text>
      </View>

      <FlatList
        data={schedules}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  list: {
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
