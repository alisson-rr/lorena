import React, { useState } from 'react';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LeadDataScreen from '../screens/LeadDataScreen';
import MissingDataScreen from '../screens/MissingDataScreen';

export default function SimpleNavigator() {
  const [currentScreen, setCurrentScreen] = useState('Welcome');

  console.log('Current screen:', currentScreen);

  if (currentScreen === 'MissingData') {
    return <MissingDataScreen />;
  }

  if (currentScreen === 'LeadData') {
    return (
      <LeadDataScreen 
        onContinue={() => {
          console.log('Navigating to MissingData');
          setCurrentScreen('MissingData');
        }}
      />
    );
  }

  if (currentScreen === 'SignUp') {
    return (
      <SignUpScreen 
        onContinue={() => {
          console.log('Navigating to LeadData');
          setCurrentScreen('LeadData');
        }}
      />
    );
  }

  return (
    <WelcomeScreen 
      onNavigateToSignUp={() => {
        console.log('Navigating to SignUp');
        setCurrentScreen('SignUp');
      }}
    />
  );
}