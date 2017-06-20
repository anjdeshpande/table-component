import { defineMessages } from "react-intl";

const $tenant = process.env.ELECTRODE_TENANT;
let tenantMessages;

try {
  tenantMessages = require(`./tenants/${$tenant}/default-messages`); //eslint-disable-line
} catch (err) {
  tenantMessages = {};
}

const messages = defineMessages({
  editMe: {
    description: "Edit this description",
    defaultMessage: "Sample",
    id: "TableComponent.defaultTenant.editMe"
  }
});

module.exports = Object.assign({}, messages, tenantMessages);
