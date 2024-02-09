const BASEURL =
  import.meta.env.MODE == "production" ? "" : import.meta.env.VITE_API_BASE_URL;

class ApiClient {
  async post({ data, endpoint }) {
    let response;
    try {
      response = await fetch(`${BASEURL}/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      throw { message: "Server couldn't be reached" };
    }

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
  }
}

const apiClient = new ApiClient();
export default apiClient;
