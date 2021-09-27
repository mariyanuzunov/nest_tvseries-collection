import { Transform } from 'class-transformer';
import { IsAlphanumeric, MinLength } from 'class-validator';

export class CredentialsDto {
  @Transform(({ value }) => {
    console.log(value);
    value = value.trim();
    console.log(value + 'l');
    return value;
  })
  @MinLength(3, { message: 'The username must be at least 3 characters long!' })
  @IsAlphanumeric('en-US', {
    message: 'The username must contain only letters and numbers!',
  })
  username: string;

  @Transform(({ value }) => value.trim())
  @MinLength(5, { message: 'Password must be at least 5 characters long.' })
  password: string;
}
