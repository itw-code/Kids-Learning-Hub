import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HubLayout } from './components/HubLayout';
import { AlphabetGame } from './games/alphabet/AlphabetGame';
import { NumbersHub } from './games/numbers/NumbersHub';
import { ShapesHub } from './games/shapes/ShapesHub';
import { TrophyRoom } from './components/TrophyRoom';
import { HomeButton } from './components/HomeButton';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Floating Home Button visible on all game/progression routes */}
      <HomeButton />
      
      <Routes>
        <Route path="/" element={<HubLayout />} />
        <Route path="/alphabet" element={<AlphabetGame />} />
        <Route path="/numbers" element={<NumbersHub />} />
        <Route path="/shapes" element={<ShapesHub />} />
        <Route path="/trophy" element={<TrophyRoom />} />
        {/* Fallback to Hub */}
        <Route path="*" element={<HubLayout />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
