export interface InfoAdminPago {
  nombre: string;
  career_id: number;
  name: string;
  value: number;
  freeDiscount: number;
  tuition: string;
  comments: string;
}

export class UpdateInfoAdminPago implements Partial<InfoAdminPago> {}
