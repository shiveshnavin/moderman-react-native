export interface OutputPostItem {
  text: string;
  media_type: string;
  generated_file_url: string;
}

export interface SchedulePayload {
  outpotPostItem: OutputPostItem;
}

export interface Schedule {
  id: string;
  tenant: string;
  targetTimestamp: number;
  timestamp: number;
  payload: SchedulePayload;
  extra?: any;
  status: string;
  platform: string;
  type: string;
  subType?: string;
}

export interface ScheduleListResponse {
  content: Schedule[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
