import { envValidationSchema } from './env.validation';

describe('envValidationSchema', () => {
  const validEnvironment = {
    NODE_ENV: 'test',
    DATABASE_URL: 'postgresql://user:password@localhost:5432/visit_servant',
    AWS_S3_PUBLIC_BASE_URL: 'https://cdn.example.com',
  };

  it('accepts an HTTP(S) S3 public base URL', () => {
    const result = envValidationSchema.validate(validEnvironment);

    expect(result.error).toBeUndefined();
    expect(result.value).toEqual(
      expect.objectContaining({ AWS_S3_PUBLIC_BASE_URL: 'https://cdn.example.com' }),
    );
  });

  it('rejects a missing S3 public base URL', () => {
    const environment = {
      NODE_ENV: validEnvironment.NODE_ENV,
      DATABASE_URL: validEnvironment.DATABASE_URL,
    };
    const result = envValidationSchema.validate(environment);

    expect(result.error?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['AWS_S3_PUBLIC_BASE_URL'],
          type: 'any.required',
        }),
      ]),
    );
  });

  it('rejects a non-HTTP(S) S3 public base URL', () => {
    const result = envValidationSchema.validate({
      ...validEnvironment,
      AWS_S3_PUBLIC_BASE_URL: 'ftp://cdn.example.com',
    });

    expect(result.error?.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ['AWS_S3_PUBLIC_BASE_URL'],
          type: 'string.uriCustomScheme',
        }),
      ]),
    );
  });
});
