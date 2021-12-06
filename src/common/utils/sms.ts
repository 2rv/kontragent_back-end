import fetch from 'cross-fetch';

export async function sendCodeSMS(message: string, to: string) {
  const url = `https://arutyunyan.davitt@yandex.ru:dHx02iTCaBOEqLfYhhEW7SyyZvkM@gate.smsaero.ru/v2/sms/send?number=${to}&text=${message}&sign=SMS Aero`;
  const encodedURI = encodeURI(url);

  const response = await fetch(encodedURI);
  const json = await response.json();
  console.log(json);
}
