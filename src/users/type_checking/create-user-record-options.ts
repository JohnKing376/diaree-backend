import UserInterface from '../interfaces/user.interface';

type CreateUserRecordOptions = Pick<
  UserInterface,
  'firstName' | 'lastName' | 'email' | 'password'
>;

export default CreateUserRecordOptions;
