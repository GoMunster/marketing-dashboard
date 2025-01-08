'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({
    current: { start: '', end: '' },
    previous: { start: '', end: '' }
  });

  const leadData = {
    totalLeads: 112,
    breakdown: {
      'FB/Meta Leads': 36,
      'IG Leads': 26,
      'Google Leads': 29,
      'ZoomInfo': 21
    }
  };

  const jobTitleData = [
    { name: 'Nurse', value: 26.9, color: '#4299E1' },
    { name: 'Owner/Manager/Director', value: 56.2, color: '#F56565' },
    { name: 'Physician', value: 11.0, color: '#F6E05E' },
    { name: 'Aesthetician', value: 6.8, color: '#68D391' }
  ];

  const promoData = [
    { name: 'Fall 2023 0% Promo Landing', current: 30, previous: 0 },
    { name: 'March Madness Promo', current: 0, previous: 0 }
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Rohrer Aesthetics Dashboard</h1>
      
      {/* Filters */}
      <div className="mb-6 flex gap-2">
        <select className="border rounded px-2 py-1 bg-white">
          <option>FB/Meta</option>
          <option>IG</option>
          <option>Google</option>
          <option>ZoomInfo</option>
        </select>
        <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          Clear Filters
        </button>
      </div>

      {/* Date Ranges */}
      <div className="mb-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Current Period</h2>
          <div className="flex gap-2">
            <input type="date" className="border rounded px-2 py-1" />
            <input type="date" className="border rounded px-2 py-1" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Previous Period</h2>
          <div className="flex gap-2">
            <input type="date" className="border rounded px-2 py-1" />
            <input type="date" className="border rounded px-2 py-1" />
          </div>
        </div>
      </div>

      {/* Lead Statistics */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Lead Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="font-medium text-gray-600">Leads</div>
            <div className="text-2xl font-bold">{leadData.totalLeads}</div>
          </div>
          {Object.entries(leadData.breakdown).map(([key, value]) => (
            <div key={key} className="bg-white p-4 rounded shadow">
              <div className="font-medium text-gray-600">{key}</div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Leads By Origin</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={Object.entries(leadData.breakdown).map(([name, value]) => ({
                    name,
                    value
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {Object.entries(leadData.breakdown).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={['#4299E1', '#F56565', '#F6E05E', '#68D391'][index % 4]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Leads by Job Title</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={jobTitleData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {jobTitleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Leads by Promo (Current VS Previous)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={promoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#4299E1" name="Current" />
                <Bar dataKey="previous" fill="#F56565" name="Previous" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
