import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [activeTab, setActiveTab] = useState('Offer Sheet');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerGlobalRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <AppContext.Provider value={{ user, setUser, activeTab, setActiveTab, refreshTrigger, triggerGlobalRefresh }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);