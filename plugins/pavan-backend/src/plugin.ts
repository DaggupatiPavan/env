import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * pavanPlugin backend plugin
 *
 * @public
 */
export const plugin = createBackendPlugin({
  pluginId: 'pavan',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        httpAuth: coreServices.httpAuth,
        discovery: coreServices.discovery,
      },
      async init({ httpRouter, logger, config, httpAuth, discovery }) {
        logger.info('pavan plugin :: init');
        httpRouter.use(
          await createRouter({
            logger,
            config,
            httpAuth,
            discovery
          }),
        );
        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
