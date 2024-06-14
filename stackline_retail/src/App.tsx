import React from 'react';
import logo from './assets/stackline_logo.svg';
import SalesGraph from './SalesGraph';
import SalesTable from "./SalesTable";
import './App.css';

function App() {
  return (
    <div className="App bg-grey-background">
        <header className="bg-blue-header">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div>
                    <a href="#" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-12 w-32 mr-2"/>
                    </a>
                </div>
            </div>
        </header>

        <div className="container mx-auto flex mt-20 h-screen">
            <aside className="w-1/4 bg-white">
                <div className="rounded-lg mb-6 p-6 flex flex-col items-center justify-center shadow-sm">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg" alt="Product Image"
                         className="w-1/2 mb-4"/>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Shark Ninja</h2>
                    <p className="text-xs text-grey-text mb-1 pl-6 pr-6">Magic Bullet NutriBullet 12-Piece High-Speed Blender/Mixer
                        System</p>
                </div>
                <div className="shadow-sm">
                    <div className="flex flex-wrap gap-2 shadow-sm p-6 pt-0">
                        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-sm text-xs shadow-sm">Pantry</span>
                        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-sm text-xs shadow-sm">Obsolete</span>
                        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-sm text-xs shadow-sm">Blender</span>
                        <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-sm text-xs shadow-sm">Lightning Deal</span>
                    </div>
                </div>
            </aside>

            <main className="w-3/4 pl-6">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-16">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Retail Sales</h3>
                    <div>
                        <SalesGraph/>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm h-screen">
                    <SalesTable/>
                </div>
            </main>
        </div>
    </div>
  );
}

export default App;
