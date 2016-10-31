import { KorelinePlPage } from './app.po';

describe('koreline-pl App', function() {
  let page: KorelinePlPage;

  beforeEach(() => {
    page = new KorelinePlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
