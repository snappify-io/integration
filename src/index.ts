import './index.less';
import { SnappifyIntegration } from './snappify-integration';

const integration = new SnappifyIntegration();

export const openSnappify = integration.openSnappify;
