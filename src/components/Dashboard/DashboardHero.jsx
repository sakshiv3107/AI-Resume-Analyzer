import React from 'react';
import { Search } from 'lucide-react';

function DashboardHero() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
            Analysis Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
            Optimize your resume against target job descriptions.
        </p>
      </div>
      
     
    </div>
  )
}

export default DashboardHero;