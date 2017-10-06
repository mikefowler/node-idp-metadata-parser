/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';

import { parse } from '../src';

fs.readFile(path.join(__dirname, 'metadata.xml'), 'utf8', (err, content) => {
  if (err) return;

  parse(content).then((metadata) => {
    console.log('--------------------\t --------------------');
    console.log('Property            \t Value');
    console.log('--------------------\t --------------------');
    console.log('');
    console.log('IDP Entity ID:      \t', metadata.idpEntityId);
    console.log('IDP Name ID Format: \t', metadata.nameIdentifierFormat);
    console.log('SSO Service URL:    \t', metadata.idpSsoTargetUrl);
    console.log('SLO Service URL:    \t', metadata.idpSloTargetUrl);
    console.log('Attribute Names:    \t', metadata.idpAttributeNames);
  });
});
