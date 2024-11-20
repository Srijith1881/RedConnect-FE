// // src/App.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://blood-report-server.onrender.com');
//         setData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {data.name}
//       </ul>
//     </div>
//   );
// };

// export default App;