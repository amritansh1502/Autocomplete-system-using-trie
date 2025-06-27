import './App.css'
import SearchBar from './SearchBar'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-white">Autocomplete Search</h1>
        <SearchBar />
      </div>
    </div>
  )
}

export default App
