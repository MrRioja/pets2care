export default async function arrayStringToBoolean(vector: String[]) {
  var vectorBool: boolean[] = [];

  vector.forEach((element) => {
    if (element !== undefined) {
      vectorBool.push(Boolean(element.toLowerCase() == "true"));
    } else {
      vectorBool.push(false);
    }
  });
  return vectorBool;
}

export async function stringToBoolean(string: String) {
  return Boolean(string.toLowerCase() == "true");
}
