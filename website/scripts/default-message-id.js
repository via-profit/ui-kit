/**
 * Legacy live examples keep their Russian ICU messages inline. react-intl requires
 * an ID even for a defaultMessage. Use the message itself as its stable ID:
 * no extraction, generated translations or dependency on babel-plugin-formatjs.
 */
module.exports = ({ types: t }) => ({
  name: 'default-message-id',
  visitor: {
    ObjectExpression({ node }) {
      const property = node.properties.find(
        item => t.isObjectProperty(item) && t.isIdentifier(item.key, { name: 'defaultMessage' }),
      );
      const hasId = node.properties.some(
        item => t.isObjectProperty(item) && t.isIdentifier(item.key, { name: 'id' }),
      );
      if (property && t.isStringLiteral(property.value) && !hasId) {
        node.properties.push(t.objectProperty(t.identifier('id'), t.cloneNode(property.value)));
      }
    },
    JSXOpeningElement({ node }) {
      if (!t.isJSXIdentifier(node.name, { name: 'FormattedMessage' })) {
        return;
      }
      const message = node.attributes.find(
        item => t.isJSXAttribute(item) && item.name.name === 'defaultMessage',
      );
      const hasId = node.attributes.some(item => t.isJSXAttribute(item) && item.name.name === 'id');
      if (message && t.isStringLiteral(message.value) && !hasId) {
        node.attributes.push(t.jsxAttribute(t.jsxIdentifier('id'), t.cloneNode(message.value)));
      }
    },
  },
});
