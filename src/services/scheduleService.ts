import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, DEFAULT_PAGE_SIZE } from '../config/api';
import { Schedule, ScheduleListResponse } from '../models/Schedule';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GetSchedulesParams {
  type?: string;
  status?: string;
  platform?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

export const scheduleService = {
  /**
   * Fetch schedules with optional filters
   */
  async getSchedules(params: GetSchedulesParams = {}): Promise<ScheduleListResponse> {
    const queryParams: any = {
      type: params.type || 'publish_bot',
      status: params.status || 'pending_approval',
      platform: params.platform || 'instagram',
      page: params.page || 0,
      size: params.size || DEFAULT_PAGE_SIZE,
    };

    // Add sort parameters
    if (params.sort && params.sort.length > 0) {
      queryParams.sort = params.sort;
    } else {
      queryParams.sort = ['targetTimestamp,DESC'];
    }

    const response = await apiClient.get<ScheduleListResponse>(
      API_ENDPOINTS.SCHEDULES,
      { params: queryParams }
    );

    return response.data;
  },

  /**
   * Approve a schedule (update status to approved)
   */
  async approveSchedule(scheduleId: string): Promise<Schedule> {
    const response = await apiClient.patch<Schedule>(
      `${API_ENDPOINTS.SCHEDULES}/${scheduleId}`,
      { status: 'approved' }
    );
    return response.data;
  },

  /**
   * Reject a schedule (update status to rejected)
   */
  async rejectSchedule(scheduleId: string): Promise<Schedule> {
    const response = await apiClient.patch<Schedule>(
      `${API_ENDPOINTS.SCHEDULES}/${scheduleId}`,
      { status: 'rejected' }
    );
    return response.data;
  },

  /**
   * Delete a schedule
   */
  async deleteSchedule(scheduleId: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.SCHEDULES}/${scheduleId}`);
  },
};
