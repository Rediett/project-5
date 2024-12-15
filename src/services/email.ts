import { api } from './api';
import { createPrivateEmailContent } from '../utils/privacy';
import { RideRequest } from '../types/event';

interface EmailOptions {
  to: string;
  subject: string;
  ticketUrl?: string;
  confirmationCode?: string;
  tickets?: number;
  amount?: number;
  rideRequest?: RideRequest;
}

export const emailService = {
  async sendConfirmationEmail(options: EmailOptions) {
    const content = createPrivateEmailContent('confirmation', {
      confirmationCode: options.confirmationCode,
      tickets: options.tickets,
      amount: options.amount
    });

    return api.sendEmail({
      to: options.to,
      subject: 'Your $1 Party Registration Confirmation',
      content,
      attachments: options.ticketUrl ? [{ url: options.ticketUrl }] : []
    });
  },

  async sendRideRequestConfirmation(options: EmailOptions) {
    if (!options.rideRequest) return;

    const content = createPrivateEmailContent('ride_request', {
      rideRequest: options.rideRequest
    });

    return api.sendEmail({
      to: options.to,
      subject: 'Your $1 Party Ride Request Confirmation',
      content
    });
  }
};