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
    if (response.status == 404)
      throw { message: "Request points to non-existing resource" };
    const { message } = await response.json();
    throw new Error(message);
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

export async function postListing(formData) {
  return await fetchHandler(() =>
    fetch(`${BASEURL}/api/my-listings/create-new`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })
  );
}

export async function putListing(formData, assetId) {
  return await fetchHandler(() =>
    fetch(`${BASEURL}/api/my-listings/${assetId}`, {
      method: "PUT",
      credentials: "include",
      body: formData,
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

export async function destroy(endpoint) {
  await fetchHandler(() =>
    fetch(`${BASEURL}/api/${endpoint}`, {
      credentials: "include",
      method: "DELETE",
    })
  );
}
