import { ParanovaPage } from './app.po';

describe('paranova App', () => {
  let page: ParanovaPage;

  beforeEach(() => {
    page = new ParanovaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
