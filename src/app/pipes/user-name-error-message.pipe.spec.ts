import { UserNameErrorMessagePipe } from './user-name-error-message.pipe';

describe('UserNameErrorMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new UserNameErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
