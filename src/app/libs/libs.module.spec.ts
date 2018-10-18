import { LibsModule } from './libs.module';

describe('LibsModule', () => {
  let libsModule: LibsModule;

  beforeEach(() => {
    libsModule = new LibsModule();
  });

  it('should create an instance', () => {
    expect(libsModule).toBeTruthy();
  });
});
