import React from 'react'
import Navbar from '../../components/navbar'
import { useLocation } from 'react-router-dom';
const Dashboard = () => {
   
  // Mock data for the statistics
  const stats = [
    { title: 'Total Notes', value: 12, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Saved Notes', value: 9, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Unsaved Notes', value: 3, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  // Mock data for a single note
  const sampleNote = {
    title: 'Project Idea: Gemini App',
    content: 'Finalize the layout for the chat interface and integrate the state management for real-time updates. Check Tailwind responsiveness.',
    color: 'bg-yellow-200',
    date: 'Oct 27, 2025',
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-8">
  <div className="max-w-7xl mx-auto space-y-8">
    
    {/* Header and Action Button */}
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 border-gray-200">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">
        Sticky Note Dashboard
      </h1>
    </header>

    {/* Notes Statistics / Summary Section */}
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.title}
          className={`p-6 rounded-xl shadow-md border ${stat.bg} border-gray-200 transition duration-300 hover:shadow-lg`}
        >
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <p className={`mt-1 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </section>

    {/* Notes Grid Section */}
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notes List</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* ✅ FIXED Sticky Note Card */}
        <div 
          className={`relative flex flex-col justify-between p-5 rounded-xl shadow-md min-h-[220px] transition duration-300 hover:shadow-xl transform hover:-translate-y-1 border border-gray-300 ${sampleNote.color}`}
          style={{ transform: 'rotate(2deg)' }}
        >
          <h3 className="text-lg font-bold text-gray-900 mb-2 border-b border-gray-400 pb-1">
            {sampleNote.title}
          </h3>

          <p className="flex-1 text-gray-800 text-sm leading-relaxed overflow-hidden mb-3">
            {sampleNote.content}
          </p>

          <div className="flex justify-between items-center pt-2 border-t border-gray-300 text-sm">
            <span className="text-xs text-gray-600 italic">{sampleNote.date}</span>
            <div className="flex space-x-3">
              <button 
                className="text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => console.log('Edit Note')}
              >
                Edit
              </button>
              <button 
                className="text-red-500 hover:text-red-700 font-medium"
                onClick={() => console.log('Delete Note')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

     {/* Placeholder for Add New Card (Now a proper button with onClick) */}
            <button
              type="button"
              className="flex items-center justify-center min-h-[180px] border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition duration-300 text-gray-500 hover:text-blue-600 w-full"
              // onClick={handleAddNewNoteClick} // <-- onClick function applied here
            >
              <div className="text-center p-4">
                <p className="text-lg font-semibold">Click to Add Note</p>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>

      </div>
    </section>

  </div>
</div>

    </div>
  )
}

export default Dashboard
