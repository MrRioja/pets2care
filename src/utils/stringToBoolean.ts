export default async function arrayStringToBoolean(vector: String[]) {
  var vectorBool: boolean[] = [];

  vector.forEach((element) => {
    vectorBool.push(Boolean(element.toLowerCase() == "true"));
  });
  return vectorBool;
}

export async function stringToBoolean(string: String) {
  return Boolean(string.toLowerCase() == "true");
}
