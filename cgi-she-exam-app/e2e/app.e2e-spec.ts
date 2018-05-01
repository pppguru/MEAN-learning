import { CGISHEEXAMAPPPage } from './app.po';

describe('cgi-she-exam-app App', () => {
  let page: CGISHEEXAMAPPPage;

  beforeEach(() => {
    page = new CGISHEEXAMAPPPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
