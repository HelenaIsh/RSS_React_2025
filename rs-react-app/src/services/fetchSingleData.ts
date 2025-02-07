// interface ApiResponse {
//     page: { totalPages: string };
//     [key: string]: unknown[] | { totalPages: string };
//   }

export const fetchSingleData = async (id: string): Promise<unknown> => {
  const query = JSON.parse(localStorage.getItem('search') || 'animal');
  console.log(`https://stapi.co/api/v1/rest/${query}?uid=${id}`);

  try {
    const response = await fetch(
      `https://stapi.co/api/v1/rest/${query}?uid=${id}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
};
