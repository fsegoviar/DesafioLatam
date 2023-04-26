import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export const NotificationComponent = () => {
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Creado',
      detail: 'Elemento creado exitosamente',
      life: 3000
    });
  };

  const showSuccessEdit = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'Modificado',
      detail: 'Elemento editado exitosamente',
      life: 3000
    });
  };

  const showSuccessDelete = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Modificado',
      detail: 'Elemento borrado exitosamente',
      life: 3000
    });
  };

  return { toast, showSuccess, showSuccessEdit, showSuccessDelete };
};
