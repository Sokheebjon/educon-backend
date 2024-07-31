import { LoginResponse, SMSResponse } from '@edufin-back/shared/dto';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
class GeneralSmsService {
  private token: string;

  constructor(private http: HttpService, private configService: ConfigService) {
    this.getToken().then((data) => {
      this.token = data?.data?.data?.token;
    });
  }

  async getToken() {
    try {
      const data = await this.http.axiosRef.post<LoginResponse>(
        'https://notify.eskiz.uz/api/auth/login',
        {
          email: this.configService.get('SMS_EMAIL'),
          password: this.configService.get('SMS_PASSWORD'),
        }
      );
      return data;
    } catch (error) {
      throw new RpcException(new InternalServerErrorException(error));
    }
  }

  async sendSms(phone: string, content: string) {
    try {
      const responce = await this.http.axiosRef.post<SMSResponse>(
        'https://notify.eskiz.uz/api/message/sms/send',
        {
          mobile_phone: phone,
          message: content,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );
      return { success: true, message_id: responce.data?.id };
    } catch (error) {
      if (error?.status === 401) {
        this.getToken().then((data) => {
          this.token = data.data.data.token;
          this.sendSms(phone, content);
        });
      } else {
        console.log(error);
        throw new RpcException(new BadRequestException({ message: error }));
      }
    }
  }
}
export default GeneralSmsService;
