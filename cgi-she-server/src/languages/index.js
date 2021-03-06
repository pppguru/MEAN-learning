/* @flow */
import Router from 'http/Router';
import LanguageService from './service/LanguageService';
import LanguagesController from './controllers/LanguagesController';
import type { Server } from 'http/index';

export const register = (server: Server, options: Object, next: Function) => {
  const controller = new LanguagesController(new LanguageService());
  const router = new Router({server, resource: 'languages'});

  router
    .get('/')
    .authorize('urn:cgi:permission:languages::list')
    .bind(controller, 'list');

  router.register(next);
};

register.attributes = {
  name: 'Languages resource service',
  version: '0.0.1'
};
