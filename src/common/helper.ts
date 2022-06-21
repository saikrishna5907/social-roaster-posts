import { GraphQLError, GraphQLFormattedError } from 'graphql';
export const formatGqlError = (error: GraphQLError): GraphQLFormattedError => {
    if (error.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
    }
    if (error.message === 'VALIDATION_ERROR') {
        const extensions = {
            code: 'VALIDATION_ERROR',
            errors: [],
        };

        Object.keys(error.extensions.invalidArgs).forEach((key) => {
            const constraints = [];
            Object.keys(error.extensions.invalidArgs[key].constraints).forEach(
                (_key) => {
                    constraints.push(
                        error.extensions.invalidArgs[key].constraints[_key],
                    );
                },
            );

            extensions.errors.push({
                field: error.extensions.invalidArgs[key].property,
                errors: constraints,
            });
        });

        const graphQLFormattedError: GraphQLFormattedError = {
            message: 'VALIDATION_ERROR',
            extensions: extensions,
        };

        return graphQLFormattedError;
    }

    const graphQLFormattedError: GraphQLFormattedError = {
        message: error.message,
        locations: error.locations,
        path: error.path,
        extensions: error.extensions,
    };


    return graphQLFormattedError;
} 