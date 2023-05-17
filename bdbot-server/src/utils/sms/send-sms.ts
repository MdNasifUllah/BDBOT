import axios from "axios";
import { env } from "config";

export const sendOtpSms = async (phoneNumber: string, otp: string) => {
  let url = "https://smsapi.bindulogic.com/send-sms";
  url = url.concat("?token=" + env.smsApiKey);
  url = url.concat("&to=" + phoneNumber);
  url = url.concat("&message=Your OTP is " + otp);

  await axios.get(url);
  return;
};
