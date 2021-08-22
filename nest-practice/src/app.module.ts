import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UserModule } from "./user/user.module"
import { ReportModule } from "./report/report.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { APP_PIPE } from "@nestjs/core"
import { ConfigModule, ConfigService } from "@nestjs/config"
const cookieSession = require("cookie-session") // cookie-session ts incompatibility

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		TypeOrmModule.forRoot(),
		/*TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => {
				return {
					type: "sqlite",
					database: config.get<string>("DB_NAME"),
					entities: ["**/ /*.entity.js"],
					synchronize: true // only on dev, prevent migration for db tables
				}
			}
		}),*/
		/*TypeOrmModule.forRoot({
			type: "sqlite",
			database: process.env.NODE_ENV === "test" ? "test.sqlite" : "db.sqlite",
			entities: [User, Report],
			synchronize: true // only on dev, prevent migration for db tables
		}),*/
		UserModule,
		ReportModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true
			})
		}
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(
				cookieSession({
					keys: ["janfrancojanfranco"]
				})
			)
			.forRoutes("*")
	}
}
