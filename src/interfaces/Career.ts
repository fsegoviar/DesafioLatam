export interface Career {
  id: number;
  description: string;
  price: {
    id: number;
    career_id: number;
    value: string;
  };
  sis_program_id: number;
}
