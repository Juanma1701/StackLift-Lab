import { authenticator } from "otplib";
import QRCode from "qrcode";

export function generateTwoFactorSecret(): string {
  return authenticator.generateSecret();
}

export function getTwoFactorQrCodeDataUrl(email: string, secret: string): Promise<string> {
  const otpauth = authenticator.keyuri(email, "StackLift Lab", secret);
  return QRCode.toDataURL(otpauth);
}

export function verifyTwoFactorCode(secret: string, code: string): boolean {
  return authenticator.verify({ token: code, secret });
}