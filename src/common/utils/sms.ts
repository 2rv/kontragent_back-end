import fetch from 'cross-fetch';

export async function sendCodeSMS(message: string, to: string) {
  const url = `https://igroovei@inbox.ru:nJ7e2RuOtIoXT620chuCxyBBbbJ7@gate.smsaero.ru/v2/sms/send?number=${to}&text=${message}&sign=Kontragent`;
  const encodedURI = encodeURI(url);

  const response = await fetch(encodedURI);
  const json = await response.json();
  console.log(json);
}
