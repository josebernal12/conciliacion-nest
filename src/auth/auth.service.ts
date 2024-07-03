import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto, UpdateAuthDto, LoginAuthDto } from './dto';
import { Model } from 'mongoose';
import { Auth } from './entities/auth.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<Auth>,
    private jwtService: JwtService

  ) { }
  async create(createAuthDto: CreateAuthDto) {
    const { password, ...userData } = createAuthDto
    if (password !== userData.confirmPassword) throw new BadRequestException('password do not match')
    const response = await this.authModel.findOne({ email: userData.email })
    if (response) throw new BadRequestException('email already exists')
    const user = await this.authModel.create({
      ...userData,
      password: bcrypt.hashSync(password, 10)
    })
    if (!user) throw new NotFoundException('error creating user')
    const payload = { id: user._id, email: user.email }
    const token = await this.jwtService.signAsync(payload)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    }
    return userResponse


  }
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.authModel.findOne({ email: loginAuthDto.email });
    if (!user) throw new BadRequestException('invalid credentials')
    const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isMatch) throw new BadRequestException('invalid credentials')
    const payload = { id: user._id, email: user.email }
    const token = await this.jwtService.signAsync(payload)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    }
    return userResponse

  }
  async findOne(id: string) {
    const user = await this.authModel.findById(id).select('-password');
    if (!user) throw new NotFoundException('user not found')
    return user;

  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {

    if (updateAuthDto.password || updateAuthDto.confirmPassword) throw new BadRequestException('password and confirm password are not required')
    const user = await this.authModel.findByIdAndUpdate(id, updateAuthDto, { new: true })
    if (!user) throw new NotFoundException(`User ${id} not found`)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }
    return userResponse

  }

  async updatePassword(id: string, updateAuthDto: UpdateAuthDto) {
    const user = await this.findOne(id)
    if (updateAuthDto.name || updateAuthDto.email) throw new BadRequestException('data not required');
    if (!updateAuthDto.password || !updateAuthDto.confirmPassword) throw new BadRequestException('password and confirm password are required')
    if (updateAuthDto.password !== updateAuthDto.confirmPassword) throw new BadRequestException('password are not match')
    const hashedPassword = bcrypt.hashSync(updateAuthDto.password, 10);
    user.password = hashedPassword
    await user.save()
    return "password updated successfully"
  }
  async sendEmail(email: string) {
    if (!email) throw new BadRequestException("Please enter an email address")
    const user = await this.authModel.findOne({ email })
    if (!user) throw new NotFoundException("User not found")
    user.token = uuid()
    await user.save()
    return "email sent successfully"
  }

  async checkTokenEmail(token: string) {
    if (!token) throw new NotFoundException("Token not found")
    const user = await this.authModel.findOne({ token })
    if (!user) throw new NotFoundException("User not found")
    return user.email
  }

  async resetPassword(updateAuthDto: UpdateAuthDto, token: string) {
    if (updateAuthDto.email || updateAuthDto.name) throw new BadRequestException("data not required")
    if (!updateAuthDto.password || !updateAuthDto.confirmPassword) throw new BadRequestException("password and confirm password are required")
    if (updateAuthDto.password !== updateAuthDto.confirmPassword) throw new BadRequestException("password and confirm password do not match")
    const user = await this.authModel.findOne({ token })
    if (!user) throw new NotFoundException("User not found")
    const hashedPassword = bcrypt.hashSync(updateAuthDto.password, 10);
    user.password = hashedPassword
    user.token = null
    await user.save()
    return "password updated successfully"
  }

  async isTokenValid(token: string) {
    try {
      if (!token) throw new BadRequestException('token is required')
      const isValid = await this.jwtService.verify(token)
      console.log(isValid)
      if (!isValid) {
        return false
      }
      return true
    } catch (error) {
      return false
    }
  }

}
