/**
 *
 * Asynchronously loads the component for GoogleMap
 *
 */

import loadable from '@loadable/component';

export default loadable(() => import('./index'));
