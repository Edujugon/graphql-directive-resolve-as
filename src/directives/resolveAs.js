const { SchemaDirectiveVisitor } = require('graphql-tools');
const {
  DirectiveLocation,
  GraphQLDirective,
  GraphQLString,
} = require('graphql');

class ResolveAs extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = 'resolve_as') {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION],
      args: {
        name: {
          type: GraphQLString,
        },
      },
    });
  }

  visitFieldDefinition(field) {
    const { name } = this.args;

    field.resolve = source => {
      return name.split('.').reduce((o,i)=>o[i], source);
    }
  }
}

module.exports = ResolveAs;
