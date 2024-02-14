const BASEURL =
  import.meta.env.MODE == "production" ? "" : import.meta.env.VITE_API_BASE_URL;

async function fetchHandler(callback) {
  //to throw error to react-query onError
  let response;
  try {
    response = await callback();
  } catch (err) {
    throw { message: "Server couldn't be reached" };
  }
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message ?? response.statusText);
  }
  return response;
}

export async function post({ data, endpoint }) {
  return await fetchHandler(() =>
    fetch(`${BASEURL}/api/${endpoint}`, {
      method: "POST",
      credentials: "include", //include cookies (jwt) in request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  );
}

export async function postForm({ data, endpoint }) {
  return await fetchHandler(() =>
    fetch(`${BASEURL}/api/${endpoint}`, {
      method: "POST",
      credentials: "include",
      body: data,
    })
  );
}

export async function get(endpoint) {
  let response = await fetchHandler(() =>
    fetch(`${BASEURL}/api/${endpoint}`, {
      credentials: "include",
    })
  );
  let { message } = await response.json();
  return message;
}
