# Lore In Play - React Native Development Guidelines

## 🎯 Project Overview
Lore In Play is a React Native Expo application for streaming educational content for children, featuring multiple child profiles, video content, and social features.

## 🎨 Design Implementation Rules
- **ALWAYS implement designs pixel-perfect** from Figma
- Use exact spacing, colors, fonts, and dimensions as specified in the design
- Pay attention to all visual details including shadows, borders, and border radius
- Match the exact typography settings (font family, size, weight, line height)
- Preserve the exact component hierarchy and structure from the design
- Use the exact color values provided in Figma, not approximations

## 📱 Tech Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Custom Context-based navigation
- **Styling**: StyleSheet with design tokens
- **Fonts**: Google Fonts (Anton, Almarai)
- **Icons**: Custom SVG components with react-native-svg

## 🎨 Design System

### Colors
```typescript
const colors = {
  primary: '#69162B',      // Lore in Play Primary
  secondary: '#9C00E2',    // Purple
  accent: '#5AF2B4',       // Green
  danger: '#DC372A',       // Red
  warning: '#FF8C00',      // Orange
  background: '#FFF8F5',   // Main background
  surface: '#F8F2F0',      // Card background
  border: '#E8E0DD',       // Borders
  text: {
    primary: '#69162B',
    secondary: '#8F7E81',
    muted: '#D8BFC4'
  }
};
```

### Typography
```typescript
const fonts = {
  anton: 'Anton',           // Headers, titles
  almarai: 'Almarai',      // Body text
  almaraiBold: 'Almarai-Bold' // Emphasis
};
```

## 🚀 Performance Best Practices

### 1. Avoid Unnecessary Re-renders
```typescript
// ❌ Bad - Creates new function on every render
<TouchableOpacity onPress={() => navigate('Home')}>

// ✅ Good - Use useCallback for functions
const handleNavigateHome = useCallback(() => {
  navigate('Home');
}, [navigate]);

<TouchableOpacity onPress={handleNavigateHome}>
```

### 2. Optimize Lists
```typescript
// Always use FlatList for large lists with these optimizations:
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
  initialNumToRender={10}
/>
```

### 3. Memoize Expensive Computations
```typescript
// Use React.memo for components
const ExpensiveComponent = React.memo(({ data }) => {
  return <View>...</View>;
}, (prevProps, nextProps) => {
  // Return true if props are equal
  return prevProps.data.id === nextProps.data.id;
});

// Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return heavyDataProcessing(rawData);
}, [rawData]);
```

### 4. Optimize Images
```typescript
// Always specify dimensions and use appropriate formats
<Image
  source={{ uri: imageUrl }}
  style={{ width: 200, height: 200 }}
  resizeMode="cover"
  // For remote images, use caching
  defaultSource={require('./placeholder.png')}
/>
```

## 🐛 Error Prevention

### 1. Type Safety
```typescript
// Always define interfaces for props
interface ScreenProps {
  navigation: NavigationType;
  route: RouteType;
}

// Use enums for constants
enum ScreenNames {
  HOME = 'Home',
  PROFILE = 'Profile',
  FEED = 'Feed'
}
```

### 2. Null Safety
```typescript
// Always check for null/undefined
const userName = user?.name ?? 'Guest';

// Use optional chaining
const city = user?.address?.city;

// Guard clauses
if (!data) {
  return <LoadingScreen />;
}
```

### 3. Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

## 📝 Code Quality Standards

### 1. Component Structure
```typescript
// Follow this order in components:
// 1. Imports
// 2. Interfaces/Types
// 3. Constants
// 4. Component
// 5. Styles

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ComponentProps {
  title: string;
}

const CONSTANTS = {
  MAX_LENGTH: 100
};

export default function Component({ title }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState('');
  
  // Callbacks/handlers
  const handlePress = useCallback(() => {
    // Handle logic
  }, []);
  
  // Render helpers
  const renderContent = () => {
    return <Text>{title}</Text>;
  };
  
  // Main render
  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
```

### 2. Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserData()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Interfaces**: PascalCase with descriptive names (`UserProfileProps`)
- **Event handlers**: handle + Event (`handlePress`, `handleSubmit`)

### 3. File Organization
```
src/
├── components/       # Reusable components
│   ├── icons/       # SVG icon components
│   └── modals/      # Modal components
├── screens/         # Screen components
├── navigation/      # Navigation configuration
├── context/         # React Context providers
├── utils/           # Utility functions
├── hooks/           # Custom hooks
├── services/        # API services
└── types/           # TypeScript type definitions
```

## 🔄 State Management

### 1. Local State
```typescript
// Use local state for UI-only state
const [isModalVisible, setModalVisible] = useState(false);
```

### 2. Context for Global State
```typescript
// Navigation context pattern used in the app
const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
```

## 🧪 Testing Checklist

Before committing code, ensure:
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Components render without errors
- [ ] Navigation flows work correctly
- [ ] Forms have proper validation
- [ ] Error states are handled
- [ ] Loading states are shown
- [ ] Accessibility props are added

## 📋 Common Commands

```bash
# Start development server
npm run web

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build for production
npx expo build
```

## 🎯 Current Features

### Implemented Screens
1. **Welcome Screen** - Initial app entry
2. **Registration Flow** - SignUp → LeadData → MissingData → SetPassword
3. **Home Screen** - Video carousel, continue watching, live streams
4. **Categories Page** - Grid layout of content categories
5. **Feed Page** - Social feed with posts, likes, comments
6. **Profile/My Account** - User profiles, settings menu

### Key Components
- Custom navigation system using React Context
- SVG icon components for consistent design
- Modal system for comments and dialogs
- Reusable form components
- Video carousel with featured content

## ⚠️ Important Notes

1. **Font Loading**: Always wait for fonts to load before rendering
```typescript
if (!fontsLoaded) {
  return <AppLoading />;
}
```

2. **Background Colors**: All screens use `#FFF8F5` as the base background

3. **Navigation Pattern**: Use the custom navigation context, not React Navigation
```typescript
const { navigate } = useNavigation();
navigate('ScreenName');
```

4. **SVG Icons**: Create separate components for each icon for better performance

5. **Modal Transitions**: Use 300ms delays between modal transitions for smooth UX

## 🔧 Debugging Tips

1. **Performance Issues**
   - Use React DevTools Profiler
   - Check for unnecessary re-renders
   - Optimize images and lists

2. **Navigation Problems**
   - Check NavigationContext provider wrapping
   - Verify screen names match exactly

3. **Styling Issues**
   - Use StyleSheet.create() for better performance
   - Check platform-specific styles

4. **State Management**
   - Use React Query for server state
   - Keep local state close to where it's used
   - Lift state up only when necessary

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Best Practices](https://reactnative.dev/docs/performance)
- [TypeScript React Native](https://reactnative.dev/docs/typescript)
- [React Native SVG](https://github.com/react-native-svg/react-native-svg)