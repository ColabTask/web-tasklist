import { ColabtaskAppPage } from './app.po';

describe('web-tasklist App', function() {
  let page: ColabtaskAppPage;

  beforeEach(() => {
    page = new ColabtaskAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
