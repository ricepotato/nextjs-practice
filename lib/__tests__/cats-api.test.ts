import { getCats } from "@/lib/cats-api";

// Mock the fetch function
global.fetch = jest.fn();

describe("getCats", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should fetch cats with the specified limit", async () => {
    // Mock response data
    const mockCats = [
      {
        id: "1",
        url: "https://example.com/cat1.jpg",
        width: 500,
        height: 500,
        breeds: [],
      },
      {
        id: "2",
        url: "https://example.com/cat2.jpg",
        width: 600,
        height: 600,
        breeds: [],
      },
    ];

    // Mock the fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockCats),
    });

    // Call the function
    const result = await getCats({ limit: 2, page: 1 });

    // Verify the fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.thecatapi.com/v1/images/search?limit=2&page=1",
      {
        headers: {
          "x-api-key": process.env.CAT_API_KEY,
        },
      }
    );

    // Verify the result
    expect(result).toEqual(mockCats);
  });

  it("should handle API errors", async () => {
    // Mock a failed fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    // Verify that the function throws an error
    await expect(getCats({ limit: 1, page: 1 })).rejects.toThrow("API Error");
  });
});
