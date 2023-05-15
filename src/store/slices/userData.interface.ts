export interface UserDataState {
  id: number;
  billing: UserBilling | null;
  billing_id: number | null;
  career: UserCareer | null;
  career_id: number | null;
  form_type_id: number;
  price: UserPrice | null;
  price_id: number | null;
  status: string;
  step: number;
  user: UserData | null;
  user_id: number;
  purchase: UserPurchase | null;
}

export interface UserBilling {
  id: number | null;
  address: string | null;
  business_line: string | null;
  business_name: string | null;
  dni: string | null;
  document_type_id: number | null;
  email: string | null;
  phone: number | null;
  representative_dni: string | null;
  representative_fullname: string | null;
}

interface UserCareer {
  id: number;
  description: string;
}

interface UserPrice {
  id: number;
  career_id: number;
  comments: string;
  created_at: string;
  currency: {
    id: number;
    description: string;
    code: string;
  };
  currency_id: number;
  name: string;
  suppliers: SuppliersData[];
  tuition: number;
  updated_at: string;
}

interface SuppliersData {
  id: number;
  description: string;
  pivot: {
    created_at: string;
    id: number;
    price_id: number;
    supplier_id: number;
    updated_at: string;
  } | null;
}

export interface UserPurchase {
  id: number | null;
  register_id: number | null;
  payment_method_id: number | null;
  sessions_id: string | null;
  quotes: number | null;
  total: number | null;
  supplier: string | null;
  status: number | null;
  created_at: string | null;
  updated_at: string | null;
  payment_method: {
    id: number | null;
    description: string | null;
  } | null;
}

export interface UserData {
  id: number | null;
  address: string | null;
  avatar: string | null;
  birthday: string | null;
  city: string | null;
  country: {
    id: number;
    description: string;
    nationality: string;
    number_code: string;
    created_at: string;
    updated_at: string;
  } | null;
  country_id: number | null;
  debts: [] | null;
  dni: string | null;
  education: {
    id: number | null;
    description: string;
    educational_level: {
      id: number;
      description: string;
    } | null;
    educational_level_id: number | null;
    english_level: {
      id: number;
      description: string;
    } | null;
    english_level_id: number | null;
    previous_knowledge: number | null;
    created_at: string | null;
    updated_at: string | null;
  } | null;
  email: string | null;
  email_verified_at: string | null;
  empleability: {
    id: number | null;
    linkedin: string | null;
    organization: string | null;
    position: string | null;
    rent: number | null;
    user_id: number | null;
    work_situation: {
      id: number;
      description: string;
      created_at: string;
      updated_at: string;
    } | null;
    work_situation_id: number | null;
    created_at: string | null;
    updated_at: string | null;
  } | null;
  external_auth: boolean | null;
  external_id: number | null;
  identity_type: {
    id: number;
    description: string;
    created_at: number;
    updated_at: number;
  } | null;
  identity_type_id: number | null;
  lastname: string | null;
  lastname2: string | null;
  name: string | null;
  nationality: string | null;
  phone: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UpdateOnlyEducation {
  description: string;
  educational_level_id: number | null;
  english_level_id: number | null;
}

export interface UpdateOnlyLabor {
  work_situation_id: number;
  linkedin: string;
  organization: string;
  position: string;
  rent: number;
}

export interface UpdateOnlyBilling {}
