const openapi = require('@wesleytodd/openapi');

const OpenApiService = openapi({
    openapi: '3.0.0',
    info: {
      title: 'Express Application',
      description: 'Generated docs from an Express api',
      version: '1.0.0',
    }
})

export default OpenApiService