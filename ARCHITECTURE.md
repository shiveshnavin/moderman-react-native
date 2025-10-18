# Architecture Overview

## Project Structure

```
moderman-react-native/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── ScheduleCard.tsx # Card component for displaying schedule items
│   ├── config/              # Configuration files
│   │   └── api.ts           # API endpoints and configuration
│   ├── models/              # TypeScript type definitions
│   │   └── Schedule.ts      # Schedule data models
│   ├── screens/             # Screen components
│   │   └── ModerationScreen.tsx  # Main moderation screen
│   └── services/            # Business logic and API calls
│       └── scheduleService.ts    # Schedule API service
├── __tests__/               # Test files
├── android/                 # Android-specific code
├── ios/                     # iOS-specific code
└── App.tsx                  # Root application component
```

## Component Architecture

### ModerationScreen (Main Screen)
- Fetches and displays pending Instagram posts
- Implements infinite scroll with pagination
- Pull-to-refresh functionality
- Handles approve, reject, and delete actions
- Error handling with user-friendly alerts

### ScheduleCard (Component)
- Displays individual schedule item
- Shows post content, media (if image), metadata
- Action buttons (Approve, Reject, Delete)
- Responsive design with shadow/elevation

### scheduleService (Service Layer)
- Abstracts API calls from components
- Centralized error handling
- Configurable axios instance
- Testable with dependency injection

## Data Flow

1. **User opens app** → ModerationScreen loads
2. **ModerationScreen** → calls `scheduleService.getSchedules()`
3. **scheduleService** → makes GET request to API
4. **API response** → transformed to Schedule model
5. **ModerationScreen** → renders ScheduleCard for each item
6. **User action** (Approve/Reject/Delete) → calls appropriate service method
7. **Service** → makes PATCH/DELETE request to API
8. **Success** → removes item from list, shows success message

## API Integration

### Endpoints
- **GET** `/api/v1/schedules` - Fetch schedules with filters
- **PATCH** `/api/v1/schedules/:id` - Update schedule status
- **DELETE** `/api/v1/schedules/:id` - Delete schedule

### Request/Response Flow
```
GET /api/v1/schedules
  ?type=publish_bot
  &status=pending_approval
  &platform=instagram
  &page=0
  &size=10
  &sort=targetTimestamp,DESC

Response:
{
  content: Schedule[],
  totalElements: number,
  totalPages: number,
  size: number,
  number: number
}
```

## Testing Strategy

### Unit Tests
- **scheduleService.test.ts**: Tests API service methods
- **ScheduleCard.test.tsx**: Tests component rendering and interactions
- **App.test.tsx**: Tests app renders correctly

### Test Coverage
- Service layer: API calls, error handling
- Component layer: Rendering, user interactions
- Integration: Component-service interaction

## Configuration

### API Configuration
File: `src/config/api.ts`
- `API_BASE_URL`: Base URL for API (must be updated for production)
- `API_ENDPOINTS`: Endpoint paths
- `DEFAULT_PAGE_SIZE`: Pagination size

### Environment Variables
File: `.env` (create from `.env.example`)
- Set `API_BASE_URL` for your API endpoint

## Future Enhancements

1. **Authentication**: Add user login and token management
2. **Filtering**: Add UI controls for filtering by date, status
3. **Video Support**: Display video media in cards
4. **Batch Actions**: Select multiple items for bulk operations
5. **Analytics**: Track approval/rejection rates
6. **Push Notifications**: Alert on new pending items
7. **Offline Support**: Cache data for offline viewing
8. **Comments**: Add ability to comment on posts before approval
