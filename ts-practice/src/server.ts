import { createServer } from "@fclassroom/utils/create_server"
import logger from "@fclassroom/utils/log/logger"
import db from "@fclassroom/utils/db"
import cacheExternal from "@fclassroom/utils/cache/external_cache"

cacheExternal
	.open()
	.then(() => db.open())
	.then(() => createServer())
	.then((server) => {
		server.listen(process.env.PORT, () => {
			logger.info(`Server is running on ${process.env.PORT} 🚀`)
		})
	})
	.catch((err) => logger.error(`Error: ${err}`))
