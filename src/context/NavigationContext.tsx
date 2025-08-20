import React, { createContext, useContext, useState, ReactNode } from 'react';

type ScreenName = 'Welcome' | 'SignUp' | 'LeadData' | 'SetPassword' | 'Home' | 'Categories' | 'Feed' | 'Profile' | 'History' | 'MyAccount' | 'ResetPassword';

interface NavigationContextType {
  currentScreen: ScreenName;
  navigate: (screen: ScreenName) => void;
  goBack: () => void;
  userData: any;
  setUserData: (data: any) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

interface NavigationProviderProps {
  children: ReactNode;
}

const screenHistory: ScreenName[] = [];

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [userData, setUserData] = useState({});

  const navigate = (screen: ScreenName) => {
    console.log(`Navigating from ${currentScreen} to ${screen}`);
    screenHistory.push(currentScreen);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen = screenHistory.pop();
      if (previousScreen) {
        console.log(`Going back to ${previousScreen}`);
        setCurrentScreen(previousScreen);
      }
    }
  };

  return (
    <NavigationContext.Provider 
      value={{ 
        currentScreen, 
        navigate, 
        goBack,
        userData,
        setUserData
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};