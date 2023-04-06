export interface BillingType {
  document_type_id: number | null;
  dni: string;
  business_name: string;
  business_line: string;
  address: string;
  email: string;
  phone: number | null;
  representative_fullname: string; // ! Preguntar a John
  representative_dni: string; // ! Preguntar a John
}
