# Navigation Structure - Lore In Play App

## Overview
The app uses React Navigation v6 with a bottom tab navigator as the main navigation structure.

## Navigation Architecture

```
NavigationContainer
├── RootNavigator (Stack)
│   ├── Authentication Flow (when not authenticated)
│   │   ├── Welcome
│   │   ├── SignUp
│   │   ├── LeadData
│   │   ├── MissingData
│   │   └── SetPassword
│   └── MainTabs (Bottom Tabs - when authenticated)
│       ├── HomeTab (Stack)
│       │   └── Home
│       ├── CategoriesTab (Stack)
│       │   └── Categories
│       ├── FeedTab (Stack)
│       │   └── Feed
│       └── ProfileTab (Stack)
│           ├── Profile (Main)
│           ├── MyAccount
│           ├── ResetPassword
│           └── History
```

## Key Components

### Root Navigator (`src/navigation/RootNavigator.tsx`)
- Manages authentication state
- Routes to either Auth flow or Main tabs

### Bottom Tab Navigator (`src/navigation/BottomTabNavigator.tsx`)
- Main navigation with 4 tabs
- Custom styled tab bar with icons
- Always visible except in auth flow

### Stack Navigators
Each tab has its own stack navigator for nested screens:
- **HomeStackNavigator**: Home screen
- **CategoriesStackNavigator**: Categories screen
- **FeedStackNavigator**: Feed screen
- **ProfileStackNavigator**: Profile, MyAccount, ResetPassword, History

## Navigation Hooks

### `useAppNavigation()`
Custom typed navigation hook located in `src/hooks/useAppNavigation.ts`

Usage:
```typescript
import { useAppNavigation, ProfileScreenNavigationProp } from '../hooks/useAppNavigation';

const navigation = useAppNavigation<ProfileScreenNavigationProp>();

// Navigate to another screen
navigation.navigate('MyAccount');

// Go back
navigation.goBack();
```

## Screen Props Types
All navigation prop types are defined in `src/navigation/types.ts`

## Navigation Methods

### Within Same Stack
```typescript
navigation.navigate('ScreenName');
navigation.goBack();
```

### Navigate to Different Tab
```typescript
// From any screen, navigate to a different tab
navigation.navigate('HomeTab');
navigation.navigate('CategoriesTab');
navigation.navigate('FeedTab');
navigation.navigate('ProfileTab');
```

### Navigate to Nested Screen in Different Tab
```typescript
// Navigate to Profile tab and then to MyAccount screen
navigation.navigate('ProfileTab', {
  screen: 'MyAccount'
});
```

## Authentication Flow
Currently set to `isAuthenticated: true` in `RootNavigator.tsx`
To implement proper authentication:
1. Replace hardcoded state with auth context/redux
2. Handle login/logout navigation resets
3. Implement token persistence

## Styling
- Background color: `#F1E1DD`
- Active tab color: `#69162B`
- Inactive tab color: `#8F7E81`
- Tab bar height: 70px
- Border color: `#D8BFC4`

## Testing Navigation

### On Mobile (Recommended)
1. Install Expo Go app
2. Scan QR code from terminal
3. Test navigation between screens

### On Web
Note: Some React Navigation features may have issues on web with Expo.
For production web app, consider using Next.js with React Navigation for Web.

## Common Issues & Solutions

### Issue: Navigation not working
Solution: Ensure screen is registered in appropriate stack navigator

### Issue: Can't navigate to screen
Solution: Check if screen name matches exactly in types and navigator

### Issue: TypeScript errors
Solution: Use proper typed navigation hooks from `useAppNavigation`