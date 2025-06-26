import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { validatorCompiler, serializerCompiler, hasZodFastifySchemaValidationErrors, ZodTypeProvider } from "fastify-type-provider-zod";
import { postNewLink } from "./routes/post-new-link";
import { getMyLinks } from "./routes/get-my-links";
import { deleteLinks } from "./routes/delete-link";
import { transformSwaggerSchema } from "./transformSwaggerSchema";
import { redirectToOriginalLink } from "./routes/redirect-to-original-link";
import { exportToCSV } from "./routes/download-csv";


const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { 
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly Api',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(postNewLink);
server.register(getMyLinks);
server.register(deleteLinks);
server.register(redirectToOriginalLink);
server.register(exportToCSV);

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})




