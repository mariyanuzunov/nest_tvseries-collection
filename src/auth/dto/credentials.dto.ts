import { Transform } from 'class-transformer';
import { MinLength } from 'class-validator';

export class CredentialsDto {
  @Transform(({ value }) => value.trim())
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  username: string;

  @Transform(({ value }) => value.trim())
  @MinLength(5, { message: 'Password must be at least 5 characters long.' })
  password: string;
}
