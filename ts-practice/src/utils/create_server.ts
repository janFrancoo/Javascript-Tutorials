import express from "express"
import { Express } from "express-serve-static-core"
import YAML from "yamljs"
import { connector, summarise } from "swagger-routes-express"
import * as controllers from "@fclassroom/controllers"
import * as OpenApiValidator from "express-openapi-validator"
import * as swaggerUI from "swagger-ui-express"
import morganBody from "morgan-body"
import config from "@fclassroom/config"
import logger from "@fclassroom/utils/log/logger"

export function createServer(): Express {
	const server = express()

	server.use(express.json())

	const specFile = "./config/openapi.yaml"

	const definitionAPI = YAML.load(specFile)
	logger.verbose(summarise(definitionAPI))

	const validatorOptions = {
		apiSpec: specFile,
		validateRequests: true,
		validateResponses: true
	}

	server.use(OpenApiValidator.middleware(validatorOptions))

	server.use((err: any, _: express.Request, res: express.Response, __: express.NextFunction) => {
		res.status(err.status).json({
			error: {
				type: "request_validation",
				message: err.message,
				errors: err.errors
			}
		})
	})

	server.use("/doc", swaggerUI.serve, swaggerUI.setup(definitionAPI))

	/* istanbul ignore next */
	if (config.morganBodyLogger) {
		morganBody(server, {
			logReqUserAgent: false,
			logIP: false
		})
	}

	const connect = connector(controllers, definitionAPI, {
		onCreateRoute: (method: string, descriptor: any[]) => {
			logger.verbose(`${method}: ${descriptor[0]} : ${(descriptor[1] as any).name}`)
		},
		security: {
			bearerAuth: controllers.auth
		}
	})

	connect(server)

	return server
}
