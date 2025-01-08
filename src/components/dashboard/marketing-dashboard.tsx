'use client';

import React, { useState } from 'react';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Filter, TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SaleData {
  practiceName: string;
  dateClosed: string;
  daysToClose: number;
}

interface ROASData {
  adSpend: number;
  revenue: number;
  roas: number;
  leads: number;
}

export function MarketingDashboard() {
  const [dateRange, setDateRange] = useState({
    start: '11/1/2024',
    end: '11/30/2024'
  });

  const salesData = {
    totalRevenue: 151176.82,
    totalDevicesSold: 3,
    averageDaysToClose: 8,
    topResults: [
      { practiceName: 'Aurum MediSpa', dateClosed: '11/25/2024', daysToClose: 4 },
      { practiceName: 'Aurum MediSpa', dateClosed: '11/25/2024', daysToClose: 4 },
      { practiceName: 'Utilized IV Hydration, Wellness', dateClosed: '11/18/2024', daysToClose: 15 }
    ] as SaleData[]
  };

  const roasData = {
    currentMonth: {
      adSpend: 86922,
      revenue: 151176.82,
      roas: 1.74,
      leads: 125
    } as ROASData
  };

  const quarterlyData = [
    { quarter: 'Q1 2024', adSpend: 75000, revenue: 150000 },
    { quarter: 'Q2 2024', adSpend: 82000, revenue: 1400000 },
    { quarter: 'Q3 2024', adSpend: 90000, revenue: 2100000 },
    { quarter: 'Q4 2024', adSpend: 86922, revenue: 1200000 }
  ];

  const deviceSalesData = [
    { name: 'Px E', value: 33.3 },
    { name: 'EndLase', value: 33.3 },
    { name: 'Spectrum', value: 33.3 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sales Attribution & ROAS Dashboard</h1>
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Start Date:</span>
            <input 
              type="date" 
              className="border rounded p-2"
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">End Date:</span>
            <input 
              type="date" 
              className="border rounded p-2"
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${salesData.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Devices Sold</CardTitle>
            <BarChart2 className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.totalDevicesSold}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roasData.currentMonth.roas}x</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Days to Close</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.averageDaysToClose}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Device Sales by Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceSalesData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {deviceSalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quarterly Ad Spend VS Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="adSpend" fill="#8884d8" name="Ad Spend" />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales Attribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left border-b">Practice Name</th>
                  <th className="p-2 text-left border-b">Date Closed</th>
                  <th className="p-2 text-left border-b">Days to Close</th>
                </tr>
              </thead>
              <tbody>
                {salesData.topResults.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{sale.practiceName}</td>
                    <td className="p-2 border-b">{sale.dateClosed}</td>
                    <td className="p-2 border-b">{sale.daysToClose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
