import { ping } from 'tcp-ping';

describe('Docs (e2e)', () => {
  test('Docs', (done) => {
    ping({ address: 'docs', port: 8011 }, (err) => {
      if (err) {
        fail();
      }
      done();
    });
  });

  test('Crawlers', (done) => {
    ping({ address: 'crawlers', port: 8021 }, (err) => {
      if (err) {
        fail();
      }
      done();
    });
  });
});
