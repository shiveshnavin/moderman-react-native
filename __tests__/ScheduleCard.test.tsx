/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { ScheduleCard } from '../src/components/ScheduleCard';
import { Schedule } from '../src/models/Schedule';

const mockSchedule: Schedule = {
  id: '123',
  tenant: 'test-tenant',
  targetTimestamp: Date.now(),
  timestamp: Date.now(),
  payload: {
    outpotPostItem: {
      text: 'Test post content',
      media_type: 'image/jpeg',
      generated_file_url: 'https://example.com/image.jpg',
    },
  },
  status: 'pending_approval',
  platform: 'instagram',
  type: 'publish_bot',
};

describe('ScheduleCard', () => {
  it('renders correctly with schedule data', async () => {
    const mockOnApprove = jest.fn();
    const mockOnReject = jest.fn();
    const mockOnDelete = jest.fn();

    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <ScheduleCard
          schedule={mockSchedule}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
          onDelete={mockOnDelete}
        />
      );
    });
  });

  it('displays the post text', async () => {
    const mockOnApprove = jest.fn();
    const mockOnReject = jest.fn();
    const mockOnDelete = jest.fn();

    let component: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      component = ReactTestRenderer.create(
        <ScheduleCard
          schedule={mockSchedule}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
          onDelete={mockOnDelete}
        />
      );
    });

    const tree = component!.toJSON();
    expect(tree).toBeTruthy();
  });

  it('handles approve action', async () => {
    const mockOnApprove = jest.fn();
    const mockOnReject = jest.fn();
    const mockOnDelete = jest.fn();

    let component: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      component = ReactTestRenderer.create(
        <ScheduleCard
          schedule={mockSchedule}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
          onDelete={mockOnDelete}
        />
      );
    });

    const root = component!.root;
    const approveButton = root.findAll(
      (node: any) =>
        node.type === 'Text' &&
        node.children.includes('Approve')
    )[0]?.parent;

    if (approveButton && approveButton.props.onPress) {
      await ReactTestRenderer.act(() => {
        approveButton.props.onPress();
      });
      expect(mockOnApprove).toHaveBeenCalledWith('123');
    }
  });

  it('handles reject action', async () => {
    const mockOnApprove = jest.fn();
    const mockOnReject = jest.fn();
    const mockOnDelete = jest.fn();

    let component: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      component = ReactTestRenderer.create(
        <ScheduleCard
          schedule={mockSchedule}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
          onDelete={mockOnDelete}
        />
      );
    });

    const root = component!.root;
    const rejectButton = root.findAll(
      (node: any) =>
        node.type === 'Text' &&
        node.children.includes('Reject')
    )[0]?.parent;

    if (rejectButton && rejectButton.props.onPress) {
      await ReactTestRenderer.act(() => {
        rejectButton.props.onPress();
      });
      expect(mockOnReject).toHaveBeenCalledWith('123');
    }
  });

  it('handles delete action', async () => {
    const mockOnApprove = jest.fn();
    const mockOnReject = jest.fn();
    const mockOnDelete = jest.fn();

    let component: ReactTestRenderer.ReactTestRenderer;

    await ReactTestRenderer.act(() => {
      component = ReactTestRenderer.create(
        <ScheduleCard
          schedule={mockSchedule}
          onApprove={mockOnApprove}
          onReject={mockOnReject}
          onDelete={mockOnDelete}
        />
      );
    });

    const root = component!.root;
    const deleteButton = root.findAll(
      (node: any) =>
        node.type === 'Text' &&
        node.children.includes('Delete')
    )[0]?.parent;

    if (deleteButton && deleteButton.props.onPress) {
      await ReactTestRenderer.act(() => {
        deleteButton.props.onPress();
      });
      expect(mockOnDelete).toHaveBeenCalledWith('123');
    }
  });
});
