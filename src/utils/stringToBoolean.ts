export default async function stringToBoolean(vector: String[]) {
  var vectorBool: boolean[] = [];

  vector.forEach((element) => {
    vectorBool.push(Boolean(element.toLowerCase() == "true"));
  });
  return vectorBool;
}
