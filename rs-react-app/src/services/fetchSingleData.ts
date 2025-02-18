export const fetchSingleData = async (id: string): Promise<unknown> => {
  const query = JSON.parse(localStorage.getItem('search') || 'animal');

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
