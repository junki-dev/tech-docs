describe('Docs (e2e)', () => {
  test('Get All Docs', async () => {
    const response = await fetch(
      'http://docs:8011/docs?limit=10&skip=0&sortField=createdAt&sortOrder=asc',
    );

    expect(response.ok).toBeTruthy();
  });
});
