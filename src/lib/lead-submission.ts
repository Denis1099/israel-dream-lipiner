interface LeadData {
  name: string;
  phone: string;
  email?: string;
  service_type?: string;
  message?: string;
}

export async function submitLead(data: LeadData) {
  try {
    const response = await fetch('/real-estate/backend/submit_lead.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit lead');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting lead:', error);
    throw error;
  }
} 