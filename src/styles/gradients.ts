import { LinearGradient } from 'expo-linear-gradient';

// Gradiente principal roxo usado nas telas
export const PRIMARY_GRADIENT = {
  colors: ['#B847D1', '#9C00E2', '#7A00B8'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  locations: [0, 0.5, 1],
};

// Gradiente bege para a HomeScreen
export const HOME_GRADIENT = {
  colors: ['#F3DED9', '#F0EBEA'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  locations: [0, 1],
};

// Gradiente roxo claro para a KidsHomeScreen
export const KIDS_HOME_GRADIENT = {
  colors: ['#EAE2F6', '#EAE2F6'],
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
  locations: [0, 1],
};



// Componente de gradiente reutilizável
export { LinearGradient };

// Estilo para usar com o LinearGradient
export const gradientStyle = {
  flex: 1,
};
