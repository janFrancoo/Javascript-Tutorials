import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Session,
	UseGuards,
	UseInterceptors
} from "@nestjs/common"
import { AuthGuard } from "../guards/auth.guard"
import { Serialize } from "../interceptors/serialize.interceptor"
import { AuthService } from "./auth.service"
import { CurrentUser } from "./decorators/current-user.decorator"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"
import { UserDTO } from "./dto/user.dto"
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor"
import { User } from "./user.entity"
import { UserService } from "./user.service"

@Controller("auth")
export class UserController {
	constructor(private userService: UserService, private authService: AuthService) {}

	@Post("/signup")
	async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
		const user = await this.authService.signUp(body.email, body.password)
		session.userId = user.id
		return user
	}

	@Post("/signin")
	async signIn(@Body() body: CreateUserDTO, @Session() session: any) {
		const user = await this.authService.signIn(body.email, body.password)
		session.userId = user.id
		return user
	}

	@Post("/signout")
	signOut(@Session() session: any) {
		session.userId = null
	}

	@Get("/whoami")
	@UseInterceptors(CurrentUserInterceptor)
	@UseGuards(AuthGuard)
	whoAmI(@CurrentUser() user: User) {
		return user
	}

	@Serialize(UserDTO)
	@Get("/:id")
	async findUser(@Param("id") id: string) {
		const user = await this.userService.findOne(parseInt(id))
		if (!user) {
			throw new NotFoundException("User not found")
		}
		return user
	}

	@Patch("/:id")
	async updateUser(@Param("id") id: string, @Body() body: UpdateUserDTO) {
		await this.userService.update(parseInt(id), body)
	}
}
