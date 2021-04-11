import { SnappifyIntegration } from '../src/snappify-integration';

describe('Snappify Integration', () => {
  it('shouldn not have data right after constructing', () => {
    const integration = new SnappifyIntegration();
    expect(integration.data).toBeUndefined();
  });
});
