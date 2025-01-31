export const fetchResults = async (name: string): Promise<unknown> => {
  if (!name) throw new Error('Name is required');

  try {
    const response = await fetch(`https://stapi.co/api/v1/rest/${name}/search`);
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
