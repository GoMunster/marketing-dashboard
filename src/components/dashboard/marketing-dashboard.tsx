'use client';

import React, { useState } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function MarketingDashboard() {
  // Sample data matching your screenshot
  const [dateRange, setDateRange] = useState({
    current: { start: '12/1/2024', end: '12/31/2024' },
    previous: { start: '12/1/2023', end: '12/31/2023' }
  });

  const leadData = {
    totalLeads: 7991,
    currentPeriod: {
      total: 112,
      breakdown: {
        'FB/Meta Leads': 36,
        'IG Leads': 26,
        'Google Leads': 29,
        'ZoomInfo': 21
      }
    }
  };

  const jobTitleData = [
    { name: 'Nurse', value: 26.9, color: '#4299E1' },
    { name: 'Owner/Manager/Director', value: 56.2, color: '#F56565' },
    { name: 'Physician', value: 11.0, color: '#F6E05E' },
    { name: 'Aesthetician', value: 6.8, color: '#68D391' }
  ];

  const promoData = {
    current: [
      { name: 'Fall 2023 0% Promo Landing', value: 30 },
      { name: 'March Madness Promo', value: 0 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with Logo and Controls */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rohrer Aesthetics Dashboard</h1>
        <div className="flex gap-4">
          <select className="border rounded p-2">
            <option>All Sources</option>
            <option>FB/Meta</option>
            <option>Instagram</option>
            <option>Google</option>
            <option>ZoomInfo</option>
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Date Range Selectors */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Current Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <input 
                type="date" 
                className="border rounded p-2"
                value={dateRange.current.start}
                onChange={(e) => setDateRange(prev => ({
                  ...prev,
                  current: { ...prev.current, start: e.target.value }
                }))}
              />
              <input 
                type="date" 
                className="border rounded p-2"
                value={dateRange.current.end}
                onChange={(e) => setDateRange(prev => ({
                  ...prev,
                  current: { ...prev.current, end: e.target.value }
                }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Previous Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <input 
                type="date" 
                className="border rounded p-2"
                value={dateRange.previous.start}
                onChange={(e) => setDateRange(prev => ({
                  ...prev,
                  previous: { ...prev.previous, start: e.target.value }
                }))}
              />
              <input 
                type="date" 
                className="border rounded p-2"
                value={dateRange.previous.end}
                onChange={(e) => setDateRange(prev => ({
                  ...prev,
                  previous: { ...prev.previous, end: e.target.value }
                }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lead Statistics */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4 text-center">
              <div>
                <div className="font-bold text-lg">Leads</div>
                <div>{leadData.currentPeriod.total}</div>
              </div>
              <div>
                <div className="font-bold text-lg">FB/Meta Leads</div>
                <div>{leadData.currentPeriod.breakdown['FB/Meta Leads']}</div>
              </div>
              <div>
                <div className="font-bold text-lg">IG Leads</div>
                <div>{leadData.currentPeriod.breakdown['IG Leads']}</div>
              </div>
              <div>
                <div className="font-bold text-lg">Google Leads</div>
                <div>{leadData.currentPeriod.breakdown['Google Leads']}</div>
              </div>
              <div>
                <div className="font-bold text-lg">ZoomInfo</div>
                <div>{leadData.currentPeriod.breakdown['ZoomInfo']}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Leads By Origin */}
        <Card>
          <CardHeader>
            <CardTitle>Leads By Origin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={Object.entries(leadData.currentPeriod.breakdown).map(([name, value]) => ({
                      name,
                      value
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {Object.entries(leadData.currentPeriod.breakdown).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#4299E1', '#F56565', '#F6E05E', '#68D391'][index % 4]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Leads by Job Title */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Job Title</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobTitleData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
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
          </CardContent>
        </Card>

        {/* Promotional Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Leads by Promo (Current VS Previous)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={promoData.current}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4299E1" name="Leads" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
