interface ApiResponse {
  page: { totalPages: string };
  [key: string]: unknown[] | { totalPages: string };
}

export const fetchResults = async (
  name: string,
  page: string
): Promise<ApiResponse> => {
  if (!name) throw new Error('Name is required');
  try {
    const response = await fetch(
      `https://stapi.co/api/v1/rest/animal/search?pageNumber=${page}&pageSize=20`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: name,
        }),
      }
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
