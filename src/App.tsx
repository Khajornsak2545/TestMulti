import React from 'react';
// import ErrorBoundary from '../component/ErrorBoundary';
import ErrorBoundary from '../src/component/ErrorBoundary'
import TrashBinDashboard from '../src/component/TrashBinDashboard';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <TrashBinDashboard />
    </ErrorBoundary>
  );
};

export default App;
