import axios from 'axios';

interface WhatsAppMessage {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderStatus: string;
  orderAmount?: number;
}

const WHATSAPP_API_URL = process.env.NEXT_PUBLIC_WHATSAPP_API_URL || '';
const WHATSAPP_ACCESS_TOKEN = process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || '';

if (!WHATSAPP_API_URL || !WHATSAPP_ACCESS_TOKEN) {
  console.error('WhatsApp API configuration is missing. Please check your environment variables.');
}

export const sendOrderConfirmation = async (messageData: WhatsAppMessage) => {
  if (!messageData.customerPhone) {
    throw new Error('Customer phone number is required for WhatsApp notification');
  }

  if (!WHATSAPP_API_URL || !WHATSAPP_ACCESS_TOKEN) {
    throw new Error('WhatsApp API configuration is missing');
  }

  try {
    const message = {
      messaging_product: 'whatsapp',
      to: messageData.customerPhone,
      type: 'template',
      template: {
        name: 'order_confirmation',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: messageData.orderNumber },
              { type: 'text', text: messageData.customerName }
            ]
          }
        ]
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};

export const sendOrderAcceptance = async (messageData: WhatsAppMessage) => {
  try {
    const message = {
      messaging_product: 'whatsapp',
      to: messageData.customerPhone,
      type: 'template',
      template: {
        name: 'order_accepted',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: messageData.orderNumber }
            ]
          }
        ]
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};

export const sendPaymentRequest = async (messageData: WhatsAppMessage) => {
  try {
    const message = {
      messaging_product: 'whatsapp',
      to: messageData.customerPhone,
      type: 'template',
      template: {
        name: 'payment_request',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [
              { type: 'text', text: messageData.orderNumber },
              { type: 'currency', amount: messageData.orderAmount || 0 }
            ]
          }
        ]
      }
    };

    const response = await axios.post(WHATSAPP_API_URL, message, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};