export interface InvoiceItem {
    description: string;
    qty: number;
    rate: number;
    vatPercent: number;
  }
  
  export interface PartyDetails {
    name: string;
    addressLines: string[]; // e.g. ["124 City Road", "London EC1V 2NX", "United Kingdom"]
    phone?: string;
    email?: string;
  }
  
  export interface InvoicePayload {
    invoiceNumber: string;
    invoiceDate: string; // e.g. "03/08/2025"
    dueDate: string;
    terms: string; // e.g. "Due on Receipt"
    sender: PartyDetails;
    receiver: PartyDetails;
    items: InvoiceItem[];
    notes?: string;
    deposit?: number; // optional deposit amount
    vatRegistered: boolean;
  }