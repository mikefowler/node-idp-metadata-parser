import libxmljs from 'libxmljs';

import {
  getAttributeNames,
  getCertificateMetadata,
  getCertificates,
  getEntityDescriptor,
  getIdpNameIdFormat,
  getSingleLogoutServiceUrl,
  getSingleSignonServiceUrl,
  requestMetadata,
} from './utils';

export function parse(metadataXml, options = {}) {
  return new Promise((resolve) => {
    const doc = libxmljs.parseXml(metadataXml);
    const { entityId, ssoBinding, sloBinding } = options;

    const entityDescriptor = getEntityDescriptor(doc, entityId);
    const idpNameIdFormat = getIdpNameIdFormat(entityDescriptor);
    const singleSignOnServiceUrl = getSingleSignonServiceUrl(entityDescriptor, ssoBinding);
    const singleLogoutServiceUrl = getSingleLogoutServiceUrl(entityDescriptor, sloBinding);
    const attributeNames = getAttributeNames(entityDescriptor);
    const certificates = getCertificates(entityDescriptor);
    const certificateMetadata = getCertificateMetadata(certificates);

    const metadata = {
      idpEntityId: entityDescriptor.attr('entityID').value(),
      nameIdentifierFormat: idpNameIdFormat,
      idpSsoTargetUrl: singleSignOnServiceUrl,
      idpSloTargetUrl: singleLogoutServiceUrl,
      idpAttributeNames: attributeNames,
      ...certificateMetadata,
    };

    resolve(metadata);
  });
}

export function parseRemote(metadataUrl, options = {}) {
  return requestMetadata(metadataUrl).then(metadata => (
    parse(metadata, options)
  ));
}
