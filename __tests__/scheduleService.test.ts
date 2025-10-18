/**
 * @format
 */

import type { Schedule, ScheduleListResponse } from '../src/models/Schedule';
import { scheduleService, setApiClient } from '../src/services/scheduleService';
import type { AxiosInstance } from 'axios';

describe('scheduleService', () => {
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    // Create a mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    } as any;

    // Set the mock instance for testing
    setApiClient(mockAxiosInstance);
  });

  describe('getSchedules', () => {
    it('should fetch schedules with default parameters', async () => {
      const mockResponse: ScheduleListResponse = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 0,
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await scheduleService.getSchedules();

      expect(result).toEqual(mockResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalled();
    });

    it('should fetch schedules with custom parameters', async () => {
      const mockResponse: ScheduleListResponse = {
        content: [],
        totalElements: 0,
        totalPages: 0,
        size: 20,
        number: 1,
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await scheduleService.getSchedules({
        page: 1,
        size: 20,
      });

      expect(result).toEqual(mockResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalled();
    });
  });

  describe('approveSchedule', () => {
    it('should approve a schedule', async () => {
      const mockSchedule: Partial<Schedule> = {
        id: '123',
        status: 'approved',
      };

      mockAxiosInstance.patch.mockResolvedValue({ data: mockSchedule });

      const result = await scheduleService.approveSchedule('123');

      expect(result).toEqual(mockSchedule);
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
        '/api/v1/schedules/123',
        { status: 'approved' }
      );
    });
  });

  describe('rejectSchedule', () => {
    it('should reject a schedule', async () => {
      const mockSchedule: Partial<Schedule> = {
        id: '123',
        status: 'rejected',
      };

      mockAxiosInstance.patch.mockResolvedValue({ data: mockSchedule });

      const result = await scheduleService.rejectSchedule('123');

      expect(result).toEqual(mockSchedule);
      expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
        '/api/v1/schedules/123',
        { status: 'rejected' }
      );
    });
  });

  describe('deleteSchedule', () => {
    it('should delete a schedule', async () => {
      mockAxiosInstance.delete.mockResolvedValue({});

      await expect(
        scheduleService.deleteSchedule('123')
      ).resolves.not.toThrow();

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith(
        '/api/v1/schedules/123'
      );
    });
  });
});


