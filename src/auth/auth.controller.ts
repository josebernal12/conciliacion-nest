import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, ParseUUIDPipe, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, UpdateAuthDto, LoginAuthDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes';
import { AuthGuard } from './auth-guard.ts/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @Post('email')
  sendEmail(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.sendEmail(updateAuthDto.email);
  }

  @Get('email/:token')
  checkTokenEmail(@Param('token', ParseUUIDPipe) token: string) {
    return this.authService.checkTokenEmail(token);
  }
  @Post('reset-password/:token')
  resetPassword(@Body() updateAuthDto: UpdateAuthDto, @Param('token', ParseUUIDPipe) token: string) {
    return this.authService.resetPassword(updateAuthDto, token);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(id, updateAuthDto);
  }


  @Patch(':id')
  updatePassword(@Param('id', ParseMongoIdPipe) id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.updatePassword(id, updateAuthDto);

  }


}
