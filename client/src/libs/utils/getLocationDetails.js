export async function getLocationDetails(pincode) {
  let url = "https://api.postalpincode.in/pincode/" + pincode;
  let res = await fetch(url);
  let parsed = await res.json();
  let data = parsed[0].PostOffice;
  let { Circle: state, District: city } = data[0];
  let localities = data?.map((info) => info.Name);
  return {
    localities,
    state,
    city,
  };
}
