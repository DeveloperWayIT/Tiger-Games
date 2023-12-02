
export function fillParametersData(params: any, data: Record<string, any>) {
  if (!params) {
    throw new Error("No parameters in input");
  }

  // Cycle throuh all parameters and assign only those defined:
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      data[key] = params[key];
    }
  }
}