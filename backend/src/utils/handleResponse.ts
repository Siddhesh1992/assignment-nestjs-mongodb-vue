import { HttpException } from '@nestjs/common';

export function handleResponse({
  error = null,
  data = null,
  statusCode = 0,
  message = 'success',
}) {
  if (error) throw new HttpException(error, statusCode ? statusCode : 400);
  return { data, message, statusCode: statusCode == 0 ? 200 : statusCode };
}
