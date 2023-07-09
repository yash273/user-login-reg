import { NameByIdPipe } from './name-by-id.pipe';

describe('NameByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new NameByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
