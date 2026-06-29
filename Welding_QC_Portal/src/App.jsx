import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LoginForm from './components/auth/LoginForm';
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';
import OfferSheetTab from './components/tabs/OfferSheetTab';
import WeldsTab from './components/tabs/WeldsTab';
import NdtTab from './components/tabs/NdtTab';
import WeldersTab from './components/tabs/WeldersTab';
import PwhtTab from './components/tabs/PwhtTab.jsx';

const MainLayout = () => {
  const { activeTab } = useApp();

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {activeTab === 'Offer Sheet' && <OfferSheetTab />}
          {activeTab === 'Welds' && <WeldsTab />}
          {activeTab === 'PWHT' && <PwhtTab />} 
          {['RT', 'PAUT', 'MPI'].includes(activeTab) && <NdtTab type={activeTab} />}
          {activeTab === 'Welders' && <WeldersTab />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const AppContent = () => {
  const { user } = useApp();
  return user ? <MainLayout /> : <LoginForm />;
};