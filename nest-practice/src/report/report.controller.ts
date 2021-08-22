import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common"
import { AdminGuard } from "src/guards/admin.guard"
import { AuthGuard } from "src/guards/auth.guard"
import { Serialize } from "src/interceptors/serialize.interceptor"
import { CurrentUser } from "src/user/decorators/current-user.decorator"
import { User } from "src/user/user.entity"
import { ApproveReportDTO } from "./dtos/approve-report.dto"
import { CreateReportDTO } from "./dtos/create-report.dto"
import { GetEstimateDTO } from "./dtos/get-estimate.dto"
import { ReportDTO } from "./dtos/report.dto"
import { ReportService } from "./report.service"

@Controller("report")
export class ReportController {
	constructor(private reportService: ReportService) {}

	@Post()
	@UseGuards(AuthGuard)
	@Serialize(ReportDTO)
	createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
		return this.reportService.create(body, user)
	}

	@Patch("/:id")
	@UseGuards(AdminGuard)
	approveReport(@Param("id") id: string, @Body() body: ApproveReportDTO) {
		return this.reportService.changeApproval(id, body.approved)
	}

	@Get()
	getEstimate(@Query() query: GetEstimateDTO) {
		return this.reportService.createEstimate(query)
	}
}
