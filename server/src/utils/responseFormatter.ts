export const successResponse = (data: any, message = "Success", meta?: any) => ({
  success: true,
  message,
  data,
  ...(meta && { meta }),
});

export const errorResponse = (message: string, errors?: any) => ({
  success: false,
  message,
  ...(errors && { errors }),
});
