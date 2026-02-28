interface WhatsAppMessage {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  orderStatus: string;
  orderAmount?: number;
}

export const sendOrderConfirmationTwilio = async (messageData: WhatsAppMessage) => {
  try {
    const response = await fetch('/api/twilio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...messageData,
        messageType: 'orderConfirmation'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending Twilio WhatsApp message:', error);
    throw error;
  }
};

export const sendOrderAcceptanceTwilio = async (messageData: WhatsAppMessage) => {
  try {
    const response = await fetch('/api/twilio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...messageData,
        messageType: 'orderAcceptance'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending Twilio WhatsApp message:', error);
    throw error;
  }
};

export const sendPaymentRequestTwilio = async (messageData: WhatsAppMessage) => {
  try {
    const response = await fetch('/api/twilio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...messageData,
        messageType: 'paymentRequest'
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send message');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending Twilio WhatsApp message:', error);
    throw error;
  }
};