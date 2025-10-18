# ModerMan - Instagram Content Moderation App

Instagram-like easy content moderation app built using React Native.

## Features

- View pending Instagram posts for approval
- Approve, reject, or delete scheduled posts
- Infinite scroll pagination
- Pull-to-refresh
- Clean, modern UI using react-native-boxes

## Tech Stack

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **react-native-boxes**: UI library for layout
- **Axios**: HTTP client for API calls

## API Integration

The app integrates with a REST API with the following endpoints:

### GET Schedules
```
GET /api/v1/schedules?type=publish_bot&status=pending_approval&platform=instagram&page=0&size=10&sort=targetTimestamp,DESC
```

### Update Schedule (Approve/Reject)
```
PATCH /api/v1/schedules/<scheduleID>
Body: { status: 'approved' | 'rejected' }
```

### Delete Schedule
```
DELETE /api/v1/schedules/<scheduleID>
```

## Configuration

Update the API base URL in `src/config/api.ts`:

```typescript
export const API_BASE_URL = 'https://your-api-domain.com';
```

## Data Model

```typescript
{
  id: string,
  tenant: string,
  targetTimestamp: number,
  timestamp: number,
  payload: {
    outpotPostItem: {
      text: string,
      media_type: string,
      generated_file_url: string
    }
  },
  extra?: any,
  status: string,
  platform: string,
  type: string,
  subType?: string
}
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install iOS dependencies (Mac only):
```bash
cd ios && pod install && cd ..
```

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Development

- **Lint**: `npm run lint`
- **Test**: `npm run test`
- **Start Metro**: `npm start`

## Project Structure

```
src/
  ├── components/      # Reusable UI components
  │   └── ScheduleCard.tsx
  ├── config/          # Configuration files
  │   └── api.ts
  ├── models/          # TypeScript interfaces/types
  │   └── Schedule.ts
  ├── screens/         # Screen components
  │   └── ModerationScreen.tsx
  └── services/        # API service layer
      └── scheduleService.ts
```

## License

MIT
