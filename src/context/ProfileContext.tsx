import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Profile {
  id: string;
  name: string;
  type: 'flower' | 'star' | 'initial';
  color: string;
  initial?: string;
  isKids?: boolean;
}

interface ProfileContextType {
  selectedProfile: Profile | null;
  setSelectedProfile: (profile: Profile | null) => void;
  isKidsProfile: () => boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const isKidsProfile = () => {
    // Antônia (id: '1') e Maria (id: '2') são perfis kids
    return selectedProfile?.id === '1' || selectedProfile?.id === '2';
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        selectedProfile, 
        setSelectedProfile,
        isKidsProfile
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
