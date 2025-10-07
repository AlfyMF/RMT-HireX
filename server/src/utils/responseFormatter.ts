export const successResponse = (data: any, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, errors?: any) => ({
  success: false,
  message,
  ...(errors && { errors }),
});
