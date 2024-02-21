export function fromEntriesv2(data) {
  let json = {};
  for (let [key, value] of data.entries()) {
    if (!json[key]) json[key] = value;
    else json[key] = [json[key], value].flat(Infinity);
  }
  return json;
}
