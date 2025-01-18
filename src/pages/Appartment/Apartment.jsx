import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Apartment = () => {
  const [rentRange, setRentRange] = useState({ min: 0, max: 10000 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // Fetch apartments data
  const { data: apartments, error, isLoading, refetch } = useQuery({
    queryKey: ['apartments', rentRange, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/apartments?minRent=${rentRange.min}&maxRent=${rentRange.max}&page=${currentPage}&limit=8`
      );
      setTotalPages(Math.ceil(res.data.total / 8));
      return res.data.apartments;
    },
    refetchOnWindowFocus: false,
  });

  const handleSearch = () => {
    setCurrentPage(1);
    refetch();
  };

  const handleAgreement = async (apartment) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/auth/login');
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')); 
      await axios.post(
        '/api/agreements',
        {
          userName: userInfo.name,
          userEmail: userInfo.email,
          floorNo: apartment.floorNo,
          blockName: apartment.blockName,
          apartmentNo: apartment.apartmentNo,
          rent: apartment.rent,
          status: 'pending'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Agreement request submitted successfully!');
    } catch (error) {
      toast.error('Error submitting agreement. Please try again.');
    }
  };

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  // Clear rent range
  const handleClearSearch = () => {
    setRentRange({ min: 0, max: 10000 });
  };

  if (isLoading) return <div className='p-4 container mx-auto w-full '><div className='flex min-h-[calc(100vh-344px)] items-center justify-center border border-base-300 rounded-badge'>Loading apartments...</div></div>;
  if (error) return <div className='p-4 container mx-auto w-full '><div className='flex min-h-[calc(100vh-344px)] items-center justify-center border border-base-300 rounded-badge'>Error loading apartments.</div></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Apartments</h1>

      {/* Rent Range Search */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="number"
          placeholder="Min Rent"
          value={rentRange.min}
          onChange={(e) => setRentRange({ ...rentRange, min: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={rentRange.max}
          onChange={(e) => setRentRange({ ...rentRange, max: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={handleClearSearch}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {/* Apartments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apartments?.map((apartment) => (
          <div key={apartment.id} className="border rounded p-4 shadow">
            <img
              src={apartment.image}
              alt={`Apartment ${apartment.apartmentNo}`}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">Apartment {apartment.apartmentNo}</h2>
            <p>Floor: {apartment.floorNo}</p>
            <p>Block: {apartment.blockName}</p>
            <p>Rent: ${apartment.rent}</p>
            <button
              onClick={() => handleAgreement(apartment)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Apply for Agreement
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Apartment;
